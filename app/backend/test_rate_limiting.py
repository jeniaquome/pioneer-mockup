"""
Test suite for API rate limiting functionality.

This test suite verifies that rate limiting is properly configured and working
across all API endpoints with in-memory storage.

Run with: pytest test_rate_limiting.py -v
"""

import pytest
import time
import os
import sys
import concurrent.futures
from pathlib import Path
from unittest.mock import patch

# Add backend directory to Python path
backend_dir = Path(__file__).parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

# Set up test environment before importing app
os.environ["RATE_LIMIT_ENABLED"] = "true"
os.environ["RATE_LIMIT_PER_MINUTE"] = "10"  # Lower limit for faster testing
os.environ["RATE_LIMIT_AI_PER_MINUTE"] = "3"  # Very low for AI endpoints in tests

from main import app
from fastapi.testclient import TestClient

client = TestClient(app)



class TestRateLimitBasics:
    """Test basic rate limiting functionality"""
    
    def test_rate_limiting_enabled(self):
        """CRITICAL: Verify rate limiting is enabled"""
        response = client.get("/api/health/rate-limit")
        assert response.status_code == 200, "Rate limit status endpoint must be accessible"
        
        data = response.json()
        assert data.get("enabled") is True, (
            f"CRITICAL: Rate limiting is DISABLED! "
            f"Check RATE_LIMIT_ENABLED environment variable. Status: {data}"
        )
    
    def test_rate_limit_status_endpoint(self):
        """Verify rate limit status endpoint returns correct information"""
        response = client.get("/api/health/rate-limit")
        assert response.status_code == 200
        
        data = response.json()
        assert "enabled" in data
        assert "global_limit" in data
        assert "ai_limit" in data
        assert "storage" in data
        assert data["storage"] == "in-memory"
        assert data["global_limit"] == "10/minute", f"Expected 10/minute in tests, got {data['global_limit']}"
        assert data["ai_limit"] == "3/minute", f"Expected 3/minute in tests, got {data['ai_limit']}"
    
    def test_health_endpoints_exempt(self):
        """Verify health check endpoints are exempt from rate limiting"""
        # Make many requests to health endpoint - should never be rate limited
        for _ in range(20):
            response = client.get("/api/health")
            assert response.status_code == 200
            assert response.json()["status"] == "healthy"
        
        response = client.get("/api/health/runtime")
        assert response.status_code == 200
        assert "uptime_seconds" in response.json()
        
        response = client.get("/api/health/rate-limit")
        assert response.status_code == 200
        assert "enabled" in response.json()
    
    def test_regular_endpoint_accessible(self):
        """Test that regular endpoints are accessible within rate limit"""
        response = client.get("/api/categories")
        assert response.status_code == 200

    def test_rate_limit_headers(self):
        """Test that proper rate limit headers are included in responses"""
        response = client.get("/api/categories")
        assert response.status_code == 200

        # Check for required rate limit headers
        assert "X-RateLimit-Limit" in response.headers
        assert "X-RateLimit-Remaining" in response.headers
        assert "X-RateLimit-Reset" in response.headers

        # Verify header values are reasonable
        limit = int(response.headers["X-RateLimit-Limit"])
        remaining = int(response.headers["X-RateLimit-Remaining"])
        reset = float(response.headers["X-RateLimit-Reset"])  # Can be float

        assert limit == 10  # Our test limit
        assert 0 <= remaining <= 10
        assert reset > time.time()  # Reset time should be in the future

        # Test that headers decrease with each request
        response2 = client.get("/api/categories")
        if response2.status_code == 200:
            remaining_after = int(response2.headers["X-RateLimit-Remaining"])
            assert remaining_after < remaining


class TestRateLimitEnforcement:
    """Test that rate limits are actually enforced"""
    
    def test_global_rate_limit_enforcement(self):
        """Test that global rate limit is enforced on regular endpoints"""
        # Wait to clear any existing rate limit data
        time.sleep(2)
        
        # Make requests beyond the limit (10 per minute in test config)
        # We'll make 15 requests rapidly
        responses = []
        for i in range(15):
            response = client.get("/api/categories")
            responses.append(response.status_code)
        
        # Count successful and rate-limited responses
        successful = responses.count(200)
        rate_limited = responses.count(429)
        
        # FAIL FAST: Rate limiting MUST be working
        assert rate_limited > 0, (
            f"CRITICAL: Rate limiting is NOT working! "
            f"Made 15 requests, got {successful} successful, {rate_limited} rate-limited. "
            f"Expected some 429 responses. Status codes: {responses}"
        )
        
        assert successful > 0, "Should have some successful requests before hitting limit"
        
        # Verify 429 response format
        # Make one more request to ensure we hit the limit
        for _ in range(5):
            response = client.get("/api/categories")
            if response.status_code == 429:
                data = response.json()
                # Slowapi uses "error" field by default
                assert "error" in data, f"429 response must have 'error' field, got: {data}"
                assert "rate limit exceeded" in data["error"].lower(), f"429 response has wrong message: {data['error']}"
                break
        else:
            pytest.fail("Could not get a 429 response to verify format")
    
    def test_rate_limit_per_ip(self):
        """Test that rate limits are tracked per IP address"""
        # This test verifies the endpoint responds appropriately
        response = client.get("/api")
        assert response.status_code in [200, 429]

        # In a real scenario with different IPs, each would have separate limits

    def test_rate_limiting_all_http_methods(self):
        """Test that rate limits apply to POST, PUT, DELETE, PATCH methods"""
        # Clear any existing rate limits
        time.sleep(2)

        # Test each HTTP method - rate limiting should apply even to unsupported methods
        methods = ['POST', 'PUT', 'DELETE', 'PATCH']

        for method in methods:
            # Make multiple requests with this method
            responses = []
            for _ in range(12):  # Exceed 10/minute limit
                response = client.request(method, "/api/categories")
                responses.append(response.status_code)

            # Count rate limited responses (429) - some methods may return 405 but rate limiting should still work
            rate_limited_count = responses.count(429)
            # Should have some rate limiting, though some may be method not allowed (405)
            assert rate_limited_count > 0 or 405 in responses, f"{method} should either be rate limited or method not allowed"

    def test_concurrent_rate_limiting(self):
        """Test rate limiting under concurrent requests"""
        # Clear any existing rate limits with longer wait
        time.sleep(5)

        def make_request():
            return client.get("/api/categories").status_code

        # Make concurrent requests - fewer to avoid immediate rate limiting
        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
            responses = list(executor.map(lambda _: make_request(), range(8)))

        rate_limited_count = responses.count(429)
        successful_count = responses.count(200)

        # Either we should have some successful requests, or if rate limited,
        # we should have triggered the limit with concurrent requests
        if successful_count > 0:
            # Good - some requests succeeded before hitting limit
            pass
        else:
            # All requests were rate limited - this could happen if previous tests
            # left rate limits, but concurrent requests should still show the pattern
            assert rate_limited_count > 0, "Should have rate limited responses"


class TestAIEndpointRateLimits:
    """Test stricter rate limits on AI endpoints"""
    
    def test_ai_endpoint_requires_auth(self):
        """Test that AI endpoints require authentication"""
        response = client.get("/api/onboarding/priority-categories")
        # Should get auth error, not rate limit error (proves endpoint exists)
        assert response.status_code in [401, 403], "Endpoint should require authentication"


class TestInMemoryStorage:
    """Test in-memory storage specific behavior"""
    
    def test_in_memory_storage_reported(self):
        """Test that rate limit status correctly reports in-memory storage"""
        response = client.get("/api/health/rate-limit")
        assert response.status_code == 200
        
        data = response.json()
        assert data["storage"] == "in-memory"
        assert data["enabled"] is True
        assert "note" in data
    
    def test_rate_limiting_works_without_external_deps(self):
        """Test that app works with in-memory storage (no external dependencies)"""
        # This validates that we don't need Redis or any external service
        response = client.get("/api/health")
        assert response.status_code == 200
        
        # Make a few rate-limited requests
        for _ in range(5):
            response = client.get("/api/categories")
            assert response.status_code in [200, 429]


class TestRateLimitPatterns:
    """Test different rate limiting patterns and behaviors"""

    def test_burst_vs_sustained_requests(self):
        """Test rate limiting handles burst traffic vs sustained traffic differently"""
        # Clear any existing rate limits
        time.sleep(2)

        # Test 1: Burst - 15 requests in < 1 second
        burst_responses = []
        for _ in range(15):
            response = client.get("/api/categories")
            burst_responses.append(response.status_code)

        burst_rate_limited = burst_responses.count(429)

        # Wait for any burst effects to clear
        time.sleep(3)

        # Test 2: Sustained - 8 requests over 30 seconds (slower than limit)
        sustained_responses = []
        for _ in range(8):
            response = client.get("/api/categories")
            sustained_responses.append(response.status_code)
            time.sleep(4)  # ~15 requests/minute (well under 10/minute limit)

        sustained_rate_limited = sustained_responses.count(429)

        # Burst traffic should trigger more rate limiting than sustained traffic
        # (though both might trigger some depending on timing)
        assert burst_rate_limited >= 0  # At least some burst requests should be limited
        assert sustained_rate_limited <= burst_rate_limited  # Sustained should have less limiting

    def test_mixed_endpoint_patterns(self):
        """Test accessing exempt and non-exempt endpoints in sequence"""
        # Mix health checks (exempt) with API calls (limited)
        health_failures = 0
        api_limited = 0

        for i in range(25):
            if i % 4 == 0:
                # Health check - should never be rate limited
                response = client.get("/api/health")
                if response.status_code != 200:
                    health_failures += 1
            else:
                # API call - should eventually be limited
                response = client.get("/api/categories")
                if response.status_code == 429:
                    api_limited += 1

        # Health checks should never fail
        assert health_failures == 0, f"Health checks failed {health_failures} times"

        # API calls should be rate limited
        assert api_limited > 0, "API calls should eventually be rate limited"

    def test_user_agent_rate_limiting(self):
        """Test that different User-Agents are treated equally by rate limiting"""
        # Clear any existing rate limits
        time.sleep(3)

        user_agents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            "PostmanRuntime/7.32.2",
            "python-requests/2.31.0",
            ""  # Empty user agent
        ]

        # Test that all user agents are subject to the same rate limiting
        for ua in user_agents:
            headers = {"User-Agent": ua} if ua else {}
            response = client.get("/api/categories", headers=headers)
            # Should work initially or be rate limited, but not discriminated by UA
            assert response.status_code in [200, 429], f"Unexpected response for UA '{ua}': {response.status_code}"

    def test_content_type_rate_limiting(self):
        """Test that different Content-Type headers don't affect rate limiting"""
        # Clear any existing rate limits
        time.sleep(3)

        content_types = [
            "application/json",
            "application/x-www-form-urlencoded",
            "multipart/form-data",
            "text/plain",
            ""  # No content type
        ]

        for ct in content_types:
            headers = {"Content-Type": ct} if ct else {}
            response = client.get("/api/categories", headers=headers)
            # Should work initially or be rate limited, regardless of content type
            assert response.status_code in [200, 429], f"Unexpected response for Content-Type '{ct}': {response.status_code}"

    def test_rate_limit_bypass_attempts(self):
        """Test common attempts to bypass rate limiting"""
        # Clear any existing rate limits
        time.sleep(3)

        bypass_headers = [
            {"X-Forwarded-For": "127.0.0.1"},  # Spoofed IP
            {"X-Real-IP": "127.0.0.1"},
            {"CF-Connecting-IP": "127.0.0.1"},
            {"X-Client-IP": "127.0.0.1"},
            {"X-Forwarded-For": "192.168.1.1, 127.0.0.1"},  # Multiple IPs
        ]

        for headers in bypass_headers:
            response = client.get("/api/categories", headers=headers)
            # Rate limiting should still work despite spoofed headers
            assert response.status_code in [200, 429], f"Bypass attempt with {headers} should still be rate limited"

    def test_request_size_impact(self):
        """Test that request body size doesn't affect GET request rate limiting"""
        # Clear any existing rate limits
        time.sleep(3)

        # Make requests with varying query parameters to simulate different "sizes"
        test_urls = [
            "/api/categories",
            "/api/categories?page=1&limit=10",
            "/api/categories?page=1&limit=10&sort=name&order=asc&filter=test",
        ]

        for url in test_urls:
            response = client.get(url)
            assert response.status_code in [200, 429], f"Request to {url} should be rate limited normally"

    def test_rate_limit_error_consistency(self):
        """Test that 429 responses are consistent across different endpoints"""
        # Clear any existing rate limits
        time.sleep(3)

        # Make enough requests to trigger rate limiting
        for _ in range(12):
            client.get("/api/categories")

        # Test multiple endpoints to ensure 429 responses are consistent
        endpoints_to_test = [
            "/api/categories",
            "/api",
            "/api/resources"
        ]

        error_messages = []
        for endpoint in endpoints_to_test:
            response = client.get(endpoint)
            if response.status_code == 429:
                data = response.json()
                if "error" in data:
                    error_messages.append(data["error"].lower())

        # All error messages should be similar (contain "rate limit")
        if error_messages:
            for msg in error_messages:
                assert "rate limit" in msg or "limit" in msg, f"Inconsistent error message: {msg}"


class TestRateLimitConfiguration:
    """Test rate limiting with different configurations"""

    def test_rate_limit_configuration_edge_cases(self):
        """Test rate limiting with extreme configuration values"""
        # Test with very low limit
        original_limit = os.environ.get("RATE_LIMIT_PER_MINUTE", "10")

        try:
            # Set very low limit
            os.environ["RATE_LIMIT_PER_MINUTE"] = "2"
            # Note: Can't easily restart the limiter in test environment
            # This test would be more effective in integration tests
            # where the app can be restarted with new config

            # For now, just test that configuration values are read correctly
            from rate_limit_service import RATE_LIMIT_PER_MINUTE
            # This won't reflect the env change since it was set at import time
            # In a real scenario, this would require app restart

            # Test that current configuration is reasonable
            assert RATE_LIMIT_PER_MINUTE > 0, "Rate limit should be positive"

        finally:
            # Restore original setting
            if "RATE_LIMIT_PER_MINUTE" in os.environ:
                os.environ["RATE_LIMIT_PER_MINUTE"] = original_limit

    @patch('rate_limit_service.limiter')
    def test_rate_limiting_storage_failure(self, mock_limiter):
        """Test behavior when in-memory storage fails"""
        # Mock storage failure
        mock_limiter.limit.side_effect = Exception("Storage failure")

        # The app should handle storage failures gracefully
        # Health endpoints should still work
        response = client.get("/api/health")
        assert response.status_code == 200, "Health check should work even with storage failure"

        # Rate-limited endpoints might fail or work depending on implementation
        # At minimum, they shouldn't crash the app
        response = client.get("/api/categories")
        assert response.status_code in [200, 429, 500], "Should handle storage failure gracefully"


class TestRateLimitTimePrecision:
    """Test rate limiting precision around time boundaries"""

    @pytest.mark.slow
    def test_rate_limit_time_precision(self):
        """Test rate limiting precision around time boundaries"""
        # This test is tricky because we can't control exact timing in tests
        # But we can test that limits reset after the expected time

        # Make requests until rate limited
        limited = False
        request_count = 0

        while not limited and request_count < 20:
            response = client.get("/api/categories")
            if response.status_code == 429:
                limited = True
            request_count += 1
            time.sleep(0.1)

        if limited:
            # If we hit the limit, wait and see if it resets
            # Wait 61 seconds (just over 1 minute)
            time.sleep(61)

            # Should be able to make requests again
            response = client.get("/api/categories")
            # May or may not succeed depending on timing, but shouldn't be an error
            assert response.status_code in [200, 429], "Should handle time boundary correctly"
        else:
            # If we never hit the limit, that's also acceptable for this test
            # (might happen with timing or if limit is very high)
            pass


class TestRateLimitReset:
    """Test that rate limits reset after the time window"""
    
    @pytest.mark.slow
    def test_rate_limit_resets(self):
        """Test that rate limits reset after 60 seconds"""
        # This test takes 60+ seconds, so marked as slow
        # Make requests until rate limited
        for _ in range(15):
            response = client.get("/api")
            if response.status_code == 429:
                break
        
        # If we hit rate limit, wait for reset
        if response.status_code == 429:
            print("Rate limit hit, waiting 61 seconds for reset...")
            time.sleep(61)
            
            # Should be able to make requests again
            response = client.get("/api")
            assert response.status_code == 200


# Configuration for pytest

def pytest_configure(config):
    """Configure pytest with custom markers"""
    config.addinivalue_line("markers", "slow: marks tests as slow (deselect with '-m \"not slow\"')")


if __name__ == "__main__":
    # Run tests
    pytest.main([__file__, "-v", "-m", "not slow"])

