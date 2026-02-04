#!/usr/bin/env python3
"""
Performance testing script for the resources API endpoints.
Tests performance improvements from caching and database indexing.
"""

import asyncio
import aiohttp
import time
import statistics
import json
from typing import List, Dict, Any
import argparse
import sys

# Test configuration
DEFAULT_BASE_URL = "http://localhost:8000"
DEFAULT_CONCURRENT_REQUESTS = 10
DEFAULT_TEST_DURATION = 30  # seconds

class PerformanceTest:
    """Performance testing class for resources API"""
    
    def __init__(self, base_url: str = DEFAULT_BASE_URL):
        self.base_url = base_url
        self.session = None
        self.results = []
    
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def make_request(self, endpoint: str, params: Dict[str, Any] = None) -> Dict[str, Any]:
        """Make a single API request and measure response time"""
        start_time = time.time()
        
        try:
            url = f"{self.base_url}/api/resources{endpoint}"
            async with self.session.get(url, params=params) as response:
                data = await response.json()
                end_time = time.time()
                
                return {
                    "success": True,
                    "status_code": response.status,
                    "response_time": end_time - start_time,
                    "cached": data.get("cached", False),
                    "endpoint": endpoint,
                    "params": params or {}
                }
                
        except Exception as e:
            end_time = time.time()
            return {
                "success": False,
                "error": str(e),
                "response_time": end_time - start_time,
                "endpoint": endpoint,
                "params": params or {}
            }
    
    async def test_search_performance(self, test_cases: List[Dict], concurrent_requests: int = 10, duration: int = 30) -> List[Dict]:
        """Test search endpoint performance with various query patterns"""
        print(f"🚀 Starting search performance test...")
        print(f"   Concurrent requests: {concurrent_requests}")
        print(f"   Test duration: {duration}s")
        print(f"   Test cases: {len(test_cases)}")
        
        results = []
        start_time = time.time()
        request_count = 0
        
        async def worker():
            nonlocal request_count
            while time.time() - start_time < duration:
                # Cycle through test cases
                test_case = test_cases[request_count % len(test_cases)]
                result = await self.make_request("/", test_case)
                results.append(result)
                request_count += 1
                
                # Small delay to prevent overwhelming the server
                await asyncio.sleep(0.01)
        
        # Run concurrent workers
        tasks = [worker() for _ in range(concurrent_requests)]
        await asyncio.gather(*tasks)
        
        return results
    
    async def test_cache_effectiveness(self) -> Dict[str, Any]:
        """Test cache hit/miss ratios and performance improvement"""
        print("🎯 Testing cache effectiveness...")
        
        # Test case that should be cacheable
        test_params = {"category": "housing", "location": "Pittsburgh"}
        
        # First request (cache miss)
        print("   Making first request (should be cache miss)...")
        result1 = await self.make_request("/", test_params)
        
        # Wait a moment
        await asyncio.sleep(0.1)
        
        # Second request (should be cache hit)
        print("   Making second request (should be cache hit)...")
        result2 = await self.make_request("/", test_params)
        
        # Multiple subsequent requests
        print("   Making 10 additional requests (should all be cache hits)...")
        subsequent_results = []
        for i in range(10):
            result = await self.make_request("/", test_params)
            subsequent_results.append(result)
            await asyncio.sleep(0.05)  # Small delay between requests
        
        return {
            "first_request": result1,
            "second_request": result2,
            "subsequent_requests": subsequent_results,
            "cache_improvement": {
                "first_response_time": result1["response_time"],
                "cached_response_time": statistics.mean([r["response_time"] for r in subsequent_results]),
                "improvement_factor": result1["response_time"] / statistics.mean([r["response_time"] for r in subsequent_results]) if subsequent_results else 1
            }
        }
    
    async def test_different_endpoints(self) -> Dict[str, List[Dict]]:
        """Test performance of different resource endpoints"""
        print("🔍 Testing different endpoints...")
        
        endpoints = [
            ("/", {"search": "housing"}),
            ("/", {"category": "education"}),
            ("/", {"language": "Spanish"}),
            ("/categories/list", {}),
            ("/languages/list", {}),
        ]
        
        results = {}
        
        for endpoint, params in endpoints:
            endpoint_name = f"{endpoint}?{json.dumps(params) if params else 'no_params'}"
            print(f"   Testing {endpoint_name}")
            
            # Test each endpoint multiple times
            endpoint_results = []
            for i in range(5):
                result = await self.make_request(endpoint, params)
                endpoint_results.append(result)
                await asyncio.sleep(0.1)
            
            results[endpoint_name] = endpoint_results
        
        return results
    
    def analyze_results(self, results: List[Dict]) -> Dict[str, Any]:
        """Analyze performance test results"""
        if not results:
            return {"error": "No results to analyze"}
        
        successful_results = [r for r in results if r.get("success", False)]
        failed_results = [r for r in results if not r.get("success", False)]
        
        if not successful_results:
            return {"error": "No successful requests"}
        
        response_times = [r["response_time"] for r in successful_results]
        cached_results = [r for r in successful_results if r.get("cached", False)]
        non_cached_results = [r for r in successful_results if not r.get("cached", False)]
        
        analysis = {
            "summary": {
                "total_requests": len(results),
                "successful_requests": len(successful_results),
                "failed_requests": len(failed_results),
                "success_rate": len(successful_results) / len(results) * 100,
                "cache_hit_rate": len(cached_results) / len(successful_results) * 100 if successful_results else 0
            },
            "response_times": {
                "mean": statistics.mean(response_times),
                "median": statistics.median(response_times),
                "min": min(response_times),
                "max": max(response_times),
                "std_dev": statistics.stdev(response_times) if len(response_times) > 1 else 0
            },
            "cache_performance": {
                "cached_requests": len(cached_results),
                "non_cached_requests": len(non_cached_results),
                "avg_cached_response_time": statistics.mean([r["response_time"] for r in cached_results]) if cached_results else 0,
                "avg_non_cached_response_time": statistics.mean([r["response_time"] for r in non_cached_results]) if non_cached_results else 0,
            }
        }
        
        # Calculate cache improvement
        if cached_results and non_cached_results:
            analysis["cache_performance"]["improvement_factor"] = (
                analysis["cache_performance"]["avg_non_cached_response_time"] / 
                analysis["cache_performance"]["avg_cached_response_time"]
            )
        
        return analysis

async def main():
    """Main function to run performance tests"""
    parser = argparse.ArgumentParser(description="Performance testing for Pioneer Resources API")
    parser.add_argument("--url", default=DEFAULT_BASE_URL, help="Base URL for the API")
    parser.add_argument("--concurrent", type=int, default=DEFAULT_CONCURRENT_REQUESTS, help="Number of concurrent requests")
    parser.add_argument("--duration", type=int, default=DEFAULT_TEST_DURATION, help="Test duration in seconds")
    parser.add_argument("--test", choices=["search", "cache", "endpoints", "all"], default="all", help="Type of test to run")
    
    args = parser.parse_args()
    
    # Test cases for search performance
    test_cases = [
        {"category": "housing"},
        {"category": "education"},
        {"category": "employment"},
        {"search": "ESL"},
        {"search": "housing"},
        {"language": "Spanish"},
        {"language": "English"},
        {"location": "Pittsburgh"},
        {"category": "housing", "language": "Spanish"},
        {"search": "food", "location": "Pittsburgh"},
        {"page": 1, "limit": 10},
        {"page": 2, "limit": 5},
    ]
    
    print("🎯 Pioneer Resources API Performance Testing")
    print("=" * 50)
    print(f"Target URL: {args.url}")
    print(f"Testing against: {args.url}/api/resources")
    print()
    
    async with PerformanceTest(args.url) as tester:
        try:
            # Test API availability
            print("🔍 Checking API availability...")
            health_check = await tester.make_request("/cache/stats")
            if not health_check["success"]:
                print(f"❌ API not available: {health_check.get('error', 'Unknown error')}")
                return
            print("✅ API is available")
            print()
            
            if args.test in ["cache", "all"]:
                # Test cache effectiveness
                cache_results = await tester.test_cache_effectiveness()
                print("\n📊 Cache Effectiveness Results:")
                print("-" * 30)
                improvement = cache_results["cache_improvement"]
                print(f"First request (miss): {improvement['first_response_time']:.3f}s")
                print(f"Cached requests avg: {improvement['cached_response_time']:.3f}s")
                print(f"Performance improvement: {improvement['improvement_factor']:.2f}x")
                print()
            
            if args.test in ["search", "all"]:
                # Test search performance
                search_results = await tester.test_search_performance(
                    test_cases, args.concurrent, args.duration
                )
                
                analysis = tester.analyze_results(search_results)
                print("\n📊 Search Performance Results:")
                print("-" * 30)
                print(f"Total requests: {analysis['summary']['total_requests']}")
                print(f"Success rate: {analysis['summary']['success_rate']:.1f}%")
                print(f"Cache hit rate: {analysis['summary']['cache_hit_rate']:.1f}%")
                print(f"Average response time: {analysis['response_times']['mean']:.3f}s")
                print(f"Median response time: {analysis['response_times']['median']:.3f}s")
                print(f"Min response time: {analysis['response_times']['min']:.3f}s")
                print(f"Max response time: {analysis['response_times']['max']:.3f}s")
                
                if analysis["cache_performance"]["improvement_factor"]:
                    print(f"Cache improvement factor: {analysis['cache_performance']['improvement_factor']:.2f}x")
                print()
            
            if args.test in ["endpoints", "all"]:
                # Test different endpoints
                endpoint_results = await tester.test_different_endpoints()
                print("\n📊 Endpoint Performance Results:")
                print("-" * 30)
                
                for endpoint, results in endpoint_results.items():
                    response_times = [r["response_time"] for r in results if r.get("success")]
                    if response_times:
                        avg_time = statistics.mean(response_times)
                        cache_hits = sum(1 for r in results if r.get("cached"))
                        print(f"{endpoint:<40} {avg_time:.3f}s avg ({cache_hits}/{len(results)} cached)")
                print()
            
            print("🎉 Performance testing completed!")
            print("\n💡 Performance Optimization Tips:")
            print("• Cache hit rates above 70% indicate good caching effectiveness")
            print("• Response times under 100ms are excellent for search queries")
            print("• Database indexes should provide 2-5x improvement for complex queries")
            print("• Redis caching should provide 5-10x improvement for repeated queries")
            
        except Exception as e:
            print(f"❌ Performance test failed: {e}")
            return 1
    
    return 0

if __name__ == "__main__":
    try:
        exit_code = asyncio.run(main())
        sys.exit(exit_code)
    except KeyboardInterrupt:
        print("\n⚠️ Test interrupted by user")
        sys.exit(1) 