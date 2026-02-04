import os
import json
import redis
from typing import Optional, Any, Dict, List
from datetime import timedelta
import logging

# Configure logging
logger = logging.getLogger(__name__)

class CacheService:
    """Redis cache service for application caching"""
    
    def __init__(self):
        self.redis_url = os.environ.get("REDIS_URL", "redis://localhost:6379/0")
        self.redis_client = None
        self.cache_enabled = True
        self._connect()
    
    def _connect(self):
        """Initialize Redis connection with fallback handling"""
        try:
            self.redis_client = redis.from_url(
                self.redis_url,
                decode_responses=True,
                socket_connect_timeout=5,
                socket_timeout=5,
                retry_on_timeout=True,
                health_check_interval=30
            )
            # Test connection
            self.redis_client.ping()
            logger.info(f"✅ Redis connected successfully at {self.redis_url}")
            
        except Exception as e:
            logger.warning(f"⚠️ Redis connection failed: {e}. Caching disabled.")
            self.cache_enabled = False
            self.redis_client = None
    
    def is_available(self) -> bool:
        """Check if Redis cache is available"""
        if not self.cache_enabled or not self.redis_client:
            return False
        
        try:
            self.redis_client.ping()
            return True
        except Exception:
            logger.warning("Redis ping failed, disabling cache temporarily")
            return False
    
    def set(self, key: str, value: Any, ttl: int = 300) -> bool:
        """Set a cache value with TTL (default 5 minutes)"""
        if not self.is_available():
            return False
        
        try:
            # Serialize value to JSON
            serialized_value = json.dumps(value, default=str)
            self.redis_client.setex(key, timedelta(seconds=ttl), serialized_value)
            logger.debug(f"Cache SET: {key} (TTL: {ttl}s)")
            return True
            
        except Exception as e:
            logger.error(f"Cache SET failed for key {key}: {e}")
            return False
    
    def get(self, key: str) -> Optional[Any]:
        """Get a cache value"""
        if not self.is_available():
            return None
        
        try:
            value = self.redis_client.get(key)
            if value is None:
                logger.debug(f"Cache MISS: {key}")
                return None
            
            # Deserialize from JSON
            deserialized_value = json.loads(value)
            logger.debug(f"Cache HIT: {key}")
            return deserialized_value
            
        except Exception as e:
            logger.error(f"Cache GET failed for key {key}: {e}")
            return None
    
    def delete(self, key: str) -> bool:
        """Delete a cache key"""
        if not self.is_available():
            return False
        
        try:
            result = self.redis_client.delete(key)
            logger.debug(f"Cache DELETE: {key} (existed: {bool(result)})")
            return bool(result)
            
        except Exception as e:
            logger.error(f"Cache DELETE failed for key {key}: {e}")
            return False
    
    def delete_pattern(self, pattern: str) -> int:
        """Delete all keys matching a pattern"""
        if not self.is_available():
            return 0
        
        try:
            keys = self.redis_client.keys(pattern)
            if keys:
                deleted = self.redis_client.delete(*keys)
                logger.debug(f"Cache DELETE PATTERN: {pattern} ({deleted} keys deleted)")
                return deleted
            return 0
            
        except Exception as e:
            logger.error(f"Cache DELETE PATTERN failed for pattern {pattern}: {e}")
            return 0
    
    def invalidate_resources_cache(self):
        """Invalidate all resource-related cache entries"""
        patterns = [
            "resources:*",
            "categories:*", 
            "languages:*",
            "recommendations:*"
        ]
        
        total_deleted = 0
        for pattern in patterns:
            total_deleted += self.delete_pattern(pattern)
        
        logger.info(f"Invalidated {total_deleted} resource cache entries")
        return total_deleted
    
    def get_cache_stats(self) -> Dict[str, Any]:
        """Get cache statistics"""
        if not self.is_available():
            return {"status": "disabled", "error": "Redis not available"}
        
        try:
            info = self.redis_client.info('memory')
            stats = {
                "status": "connected",
                "used_memory": info.get('used_memory_human', 'unknown'),
                "connected_clients": self.redis_client.info('clients').get('connected_clients', 0),
                "total_commands_processed": self.redis_client.info('stats').get('total_commands_processed', 0),
                "cache_hit_rate": "N/A"  # Would need to implement hit/miss tracking
            }
            return stats
            
        except Exception as e:
            logger.error(f"Failed to get cache stats: {e}")
            return {"status": "error", "error": str(e)}

# Global cache instance
cache = CacheService()

# Helper functions for common cache operations
def get_resources_cache_key(
    category: Optional[str] = None,
    subcategory: Optional[str] = None,
    search: Optional[str] = None,
    language: Optional[str] = None,
    location: Optional[str] = None,
    audience_type: Optional[str] = None,
    page: int = 1,
    limit: int = 10
) -> str:
    """Generate cache key for resources search"""
    params = {
        "category": category,
        "subcategory": subcategory,
        "search": search,
        "language": language,
        "location": location,
        "audience_type": audience_type,
        "page": page,
        "limit": limit
    }
    # Remove None values and create a deterministic key
    filtered_params = {k: v for k, v in params.items() if v is not None}
    param_string = "&".join(f"{k}={v}" for k, v in sorted(filtered_params.items()))
    return f"resources:search:{hash(param_string) % 1000000}"  # Limit hash size

def get_categories_cache_key() -> str:
    """Cache key for categories list"""
    return "categories:list"

def get_languages_cache_key() -> str:
    """Cache key for languages list"""
    return "languages:list"

def get_resource_detail_cache_key(resource_id: str) -> str:
    """Cache key for individual resource details"""
    return f"resources:detail:{resource_id}"

 