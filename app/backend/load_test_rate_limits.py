"""
Load testing script for API rate limiting with in-memory storage.

This script simulates concurrent requests to verify rate limiting works under load.

Usage:
    # Test against local Docker environment
    python load_test_rate_limits.py --target http://localhost:8000
    
    # Test against Railway production (use with caution!)
    python load_test_rate_limits.py --target https://your-app.railway.app --concurrency 5
    
    # Test specific endpoint
    python load_test_rate_limits.py --target http://localhost:8000 --endpoint /api/resources/

Safety: Always test locally first before testing production!
"""

import argparse
import asyncio
import aiohttp
import time
from typing import Dict, List
from collections import Counter
import statistics


class RateLimitLoadTester:
    """Load tester for API rate limiting"""
    
    def __init__(self, base_url: str, concurrency: int = 10):
        self.base_url = base_url.rstrip('/')
        self.concurrency = concurrency
        self.results = []
    
    async def make_request(self, session: aiohttp.ClientSession, endpoint: str, request_id: int) -> Dict:
        """Make a single request and record results"""
        start_time = time.time()
        url = f"{self.base_url}{endpoint}"
        
        try:
            async with session.get(url) as response:
                elapsed = time.time() - start_time
                
                # Extract rate limit headers if present
                rate_limit_headers = {
                    'limit': response.headers.get('X-RateLimit-Limit'),
                    'remaining': response.headers.get('X-RateLimit-Remaining'),
                    'reset': response.headers.get('X-RateLimit-Reset'),
                }
                
                return {
                    'request_id': request_id,
                    'status_code': response.status,
                    'elapsed': elapsed,
                    'rate_limit_headers': rate_limit_headers,
                    'success': response.status == 200,
                    'rate_limited': response.status == 429,
                }
        except Exception as e:
            elapsed = time.time() - start_time
            return {
                'request_id': request_id,
                'status_code': 0,
                'elapsed': elapsed,
                'error': str(e),
                'success': False,
                'rate_limited': False,
            }
    
    async def run_batch(self, endpoint: str, num_requests: int) -> List[Dict]:
        """Run a batch of concurrent requests"""
        async with aiohttp.ClientSession() as session:
            tasks = []
            for i in range(num_requests):
                task = self.make_request(session, endpoint, i)
                tasks.append(task)
                
                # Add small delay between starting requests to avoid all hitting at once
                if i % self.concurrency == 0 and i > 0:
                    await asyncio.sleep(0.1)
            
            results = await asyncio.gather(*tasks)
            return results
    
    def analyze_results(self, results: List[Dict]) -> Dict:
        """Analyze test results and generate report"""
        status_codes = Counter([r['status_code'] for r in results])
        successful = sum(1 for r in results if r['success'])
        rate_limited = sum(1 for r in results if r['rate_limited'])
        elapsed_times = [r['elapsed'] for r in results]
        
        analysis = {
            'total_requests': len(results),
            'successful': successful,
            'rate_limited': rate_limited,
            'failed': len(results) - successful - rate_limited,
            'status_codes': dict(status_codes),
            'response_times': {
                'min': min(elapsed_times) if elapsed_times else 0,
                'max': max(elapsed_times) if elapsed_times else 0,
                'mean': statistics.mean(elapsed_times) if elapsed_times else 0,
                'median': statistics.median(elapsed_times) if elapsed_times else 0,
            },
            'rate_limit_effectiveness': (rate_limited / len(results) * 100) if results else 0,
        }
        
        return analysis
    
    def print_report(self, analysis: Dict, endpoint: str):
        """Print formatted test report"""
        print("\n" + "="*70)
        print(f"RATE LIMIT LOAD TEST REPORT - {endpoint}")
        print("="*70)
        print(f"\nTotal Requests: {analysis['total_requests']}")
        print(f"Successful (200): {analysis['successful']}")
        print(f"Rate Limited (429): {analysis['rate_limited']}")
        print(f"Failed/Error: {analysis['failed']}")
        print(f"\nStatus Code Distribution:")
        for code, count in sorted(analysis['status_codes'].items()):
            print(f"  {code}: {count}")
        print(f"\nResponse Times (seconds):")
        print(f"  Min: {analysis['response_times']['min']:.3f}")
        print(f"  Max: {analysis['response_times']['max']:.3f}")
        print(f"  Mean: {analysis['response_times']['mean']:.3f}")
        print(f"  Median: {analysis['response_times']['median']:.3f}")
        print(f"\nRate Limiting Effectiveness: {analysis['rate_limit_effectiveness']:.1f}%")
        print("="*70 + "\n")


async def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(description='Load test API rate limiting')
    parser.add_argument('--target', required=True, help='Base URL of API (e.g., http://localhost:8000)')
    parser.add_argument('--endpoint', default='/api/categories', help='Endpoint to test (default: /api/categories)')
    parser.add_argument('--requests', type=int, default=50, help='Number of requests to make (default: 50)')
    parser.add_argument('--concurrency', type=int, default=10, help='Concurrent requests (default: 10)')
    
    args = parser.parse_args()
    
    # Safety check for production URLs
    if 'railway.app' in args.target or 'production' in args.target:
        print("\n⚠️  WARNING: You are about to test a production URL!")
        print(f"Target: {args.target}")
        print(f"This will make {args.requests} requests with {args.concurrency} concurrency")
        confirmation = input("Are you sure? Type 'yes' to continue: ")
        if confirmation.lower() != 'yes':
            print("Test cancelled.")
            return
    
    print(f"\n🚀 Starting load test...")
    print(f"Target: {args.target}{args.endpoint}")
    print(f"Requests: {args.requests}")
    print(f"Concurrency: {args.concurrency}")
    print(f"\nThis will take approximately {args.requests / args.concurrency * 0.1:.1f} seconds...\n")
    
    tester = RateLimitLoadTester(args.target, args.concurrency)
    
    start_time = time.time()
    results = await tester.run_batch(args.endpoint, args.requests)
    total_time = time.time() - start_time
    
    analysis = tester.analyze_results(results)
    tester.print_report(analysis, args.endpoint)
    
    print(f"Total test duration: {total_time:.2f} seconds")
    print(f"Requests per second: {args.requests / total_time:.2f}")
    
    # Check if rate limiting is working
    if analysis['rate_limited'] == 0 and args.requests > 20:
        print("\n⚠️  WARNING: No rate limiting detected!")
        print("This could mean:")
        print("  - Rate limiting is disabled")
        print("  - Rate limits are too high for this test")
        print("\nCheck /api/health/rate-limit for status")
    else:
        print("\n✅ Rate limiting is working correctly!")
        print(f"   In-memory storage is tracking requests and enforcing limits")


if __name__ == "__main__":
    asyncio.run(main())

