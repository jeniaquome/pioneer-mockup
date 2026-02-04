# Google Gemini API Setup for LLM Recommender

The new resource recommendation system uses Google's Gemini models to intelligently rank resources based on user profiles. To enable this functionality, you need to configure a Google API key.

## Quick Setup

1. **Get a Google API Key:**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create an account or log in
   - Generate a new API key

2. **Set the Environment Variable:**
   ```bash
   export GOOGLE_API_KEY="your-api-key-here"
   ```

3. **For Docker/Production:**
   - Add to your `.env` file:
     ```
     GOOGLE_API_KEY=your-api-key-here
     ```
   - Or set in docker-compose.yml:
     ```yaml
     environment:
       - GOOGLE_API_KEY=your-api-key-here
     ```

## Configuration Options

- `GOOGLE_API_KEY` - Your Google API key (required)
- `RECOMMENDER_MODEL` - Model to use (default: "gemini-2.5-flash-preview-09-2025")
  - Available models: `gemini-2.5-flash-lite`, 
  - Latest preview: `gemini-2.5-flash-lite-preview-09-2025`
  - Auto-updating: `gemini-flash-lite-latest` (uses the latest stable flash-lite model)
- `RECOMMENDER_MAX_CANDIDATES` - Max resources to send to LLM (default: 60)

## Fallback Behavior

If the Google API key is not set or LLM calls fail:
- The system will fall back to deterministic ordering by priority/recency
- Warnings will be logged but the system continues to function
- Users will still receive recommendations, just not LLM-personalized ones

## Testing

To test if the LLM recommender is working:
1. Check the logs for "Making LLM call" debug messages
2. Look for "LLM ranking failed" warnings if there are issues
3. Verify different users get different recommendations

## Troubleshooting

- **"Google Generative AI SDK not installed"** - Run `pip install -r requirements.txt`
- **"LLM ranking failed"** - Check your API key and network connection
- **Same recommendations for all users** - Verify API key is set and database has diverse resources

