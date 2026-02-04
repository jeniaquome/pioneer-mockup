
// Use relative URLs in production, absolute URLs in development
// This eliminates the need for VITE_API_BASE_URL environment variable
export const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:8000/api'  // Development: use absolute URL for proxy
  : '/api'  // Production: use relative URL

// In future, we can add the API client here.