# Railway Deployment Guide

This guide will help you deploy your FastAPI + React application to Railway with PostgreSQL and Redis services.

## Prerequisites

1. A Railway account (sign up at [railway.app](https://railway.app))
2. Railway CLI installed (`npm install -g @railway/cli`)
3. Your application code in a Git repository

## Deployment Steps

### 1. Prepare Your Repository

Ensure your repository has the following files:
- `railway.json` - Railway configuration
- `railway.Dockerfile` - Railway-optimized Dockerfile
- `railway.env.template` - Environment variables template

### 2. Create Railway Project

```bash
# Login to Railway
railway login

# Create a new project
railway new

# Link to your existing project (if you have one)
railway link
```

### 3. Add Services

#### PostgreSQL Database
```bash
# Add PostgreSQL service
railway add postgresql
```

#### Redis Cache
```bash
# Add Redis service
railway add redis
```

### 4. Configure Environment Variables

Copy the variables from `railway.env.template` to your Railway project:

1. Go to your Railway project dashboard
2. Select your service
3. Go to Variables tab
4. Add the following variables:

**Required Variables:**
- `DATABASE_URL` - Will be automatically set by Railway PostgreSQL service
- `REDIS_URL` - Will be automatically set by Railway Redis service
- `SECRET_KEY` - Generate a secure random string
- `JWT_SECRET_KEY` - Generate another secure random string

**Optional Variables:**
- `INIT_DEMO_DATA=false`
- `INIT_DEMO_USERS=true`
- `INIT_DEMO_DATA_MODE=no-resources`
- `MANDRILL_API_KEY` - If using email features
- `FROM_EMAIL` - Your sender email
- `GOOGLE_AI_API_KEY` - If using AI features
- `SENTRY_DSN` - For error tracking

### 5. Deploy Your Application

```bash
# Deploy to Railway
railway up
```

Or push to your connected Git repository:
```bash
git add .
git commit -m "Deploy to Railway"
git push
```

### 6. Configure Custom Domain (Optional)

1. Go to your Railway project dashboard
2. Select your service
3. Go to Settings > Domains
4. Add your custom domain
5. Update DNS records as instructed

## Architecture Overview

Your Railway deployment includes:

- **Main Service**: FastAPI application with bundled React frontend
- **PostgreSQL**: Database service for data persistence
- **Redis**: Cache service for session management and caching

## Frontend Integration

The deployment automatically:
1. Builds the React frontend using Vite
2. Copies the built files to `/app/static` in the FastAPI container
3. Serves static files through FastAPI's static file serving

## Environment Variables Reference

### Railway Automatic Variables
- `PORT` - Port number (automatically set)
- `RAILWAY_ENVIRONMENT` - Environment name
- `RAILWAY_PROJECT_ID` - Project identifier
- `RAILWAY_SERVICE_ID` - Service identifier

### Database Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-generated)

### Cache Variables
- `REDIS_URL` - Redis connection string (auto-generated)

### Application Variables
- `SECRET_KEY` - Application secret key
- `JWT_SECRET_KEY` - JWT signing key
- `INIT_DEMO_DATA` - Initialize demo data on startup
- `INIT_DEMO_USERS` - Create demo users
- `INIT_DEMO_DATA_MODE` - Demo data mode

## Monitoring and Logs

Access your application logs:
```bash
railway logs
```

Monitor your application:
1. Go to Railway dashboard
2. Select your service
3. View metrics, logs, and deployment status

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `requirements.txt`
   - Verify Node.js build process completes successfully
   - Check Railway logs for specific error messages

2. **Database Connection Issues**
   - Ensure `DATABASE_URL` is properly set
   - Verify PostgreSQL service is running
   - Check database credentials

3. **Static Files Not Loading**
   - Verify frontend build completes successfully
   - Check that files are copied to `/app/static`
   - Ensure `STATIC_WEB_DIR` environment variable is set

4. **Environment Variables**
   - Verify all required variables are set
   - Check variable names match exactly
   - Ensure sensitive data is properly secured

### Useful Commands

```bash
# View service status
railway status

# View logs
railway logs --follow

# Connect to database
railway connect postgresql

# Connect to Redis
railway connect redis

# View environment variables
railway variables

# Redeploy
railway redeploy
```

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **Database Access**: Use Railway's built-in security features
3. **HTTPS**: Railway provides automatic HTTPS for custom domains
4. **Secrets**: Use Railway's secrets management for sensitive data

## Scaling

Railway automatically handles:
- Load balancing
- Auto-scaling based on traffic
- Health checks and restarts
- Resource allocation

## Support

- Railway Documentation: [docs.railway.app](https://docs.railway.app)
- Railway Community: [discord.gg/railway](https://discord.gg/railway)
- Railway Support: [railway.app/support](https://railway.app/support)