# Strapi Backend Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 1. Navigate to Strapi Backend

```bash
cd ../matelibre-backend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create `.env` file in the backend root:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Security
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3002,http://localhost:3000
```

## 4. Start Strapi

```bash
npm run develop
```

Strapi will start on http://localhost:1337

## 5. First Time Setup

1. Open http://localhost:1337/admin
2. Create an admin account
3. Complete the setup wizard

## 6. Create Content Types

### Job Position Content Type

1. Go to Content-Type Builder
2. Create Collection Type: "Job Position"
3. Add fields:
   - title (Text, Required)
   - description (Rich Text, Required)
   - department (Text)
   - location (Text)
   - employment_type (Enumeration: full-time, part-time, contract)
   - card_color (Enumeration: white, milk, matcha, dark_green, black)
   - salary_range (Text)
   - is_active (Boolean, default: true)
   - requirements (JSON)
   - benefits (JSON)
   - can_image (Media, Single)
   - background_image (Media, Single)
4. Save and restart server

### Hero Slide Content Type

1. Create Collection Type: "Hero Slide"
2. Add fields:
   - title (Text, Required)
   - subtitle (Text)
   - description (Rich Text)
   - image (Media, Single, Required)
   - cta_text (Text)
   - cta_link (Text)
   - order (Number, Required)
3. Save and restart server

### Moment Content Type

1. Create Collection Type: "Moment"
2. Add fields:
   - title (Text, Required)
   - description (Rich Text)
   - image (Media, Single, Required)
   - date (Date, Required)
   - category (Text)
   - top_position (Number)
   - left_position (Number)
3. Save and restart server

### Testimonial Content Type

1. Create Collection Type: "Testimonial"
2. Add fields:
   - name (Text, Required)
   - position (Text, Required)
   - company (Text, Required)
   - content (Rich Text, Required)
   - avatar (Media, Single)
   - rating (Number, min: 1, max: 5, default: 5)
   - is_active (Boolean, default: true)
3. Save and restart server

## 7. Configure Permissions

1. Go to Settings → Roles & Permissions → Public
2. Enable permissions for each content type:
   - find (to list items)
   - findOne (to get single item)
   - count (for pagination)

## 8. Add Sample Data

Add some sample data through the Strapi admin panel for each content type.

## 9. Get API Token (Optional for public content)

1. Go to Settings → API Tokens
2. Create new token with read permissions
3. Copy token to frontend .env.local file

## 10. Test API Endpoints

You can test the API at:

- http://localhost:1337/api/job-positions
- http://localhost:1337/api/hero-slides
- http://localhost:1337/api/moments
- http://localhost:1337/api/testimonials

## Frontend Integration

Once Strapi is running:

1. Switch to "Strapi API" mode in the frontend test page
2. The frontend will automatically connect to http://localhost:1337
3. Data will be fetched from Strapi instead of mock data

## Troubleshooting

### CORS Issues

If you get CORS errors, make sure:

1. CORS is enabled in `config/middlewares.ts`
2. Frontend URL is allowed in CORS origin
3. Restart Strapi after configuration changes

### API Not Found

If APIs return 404:

1. Make sure content types are published
2. Check permissions are set correctly
3. Verify URL structure in browser

### Connection Refused

If frontend can't connect:

1. Ensure Strapi is running on port 1337
2. Check firewall settings
3. Verify NEXT_PUBLIC_STRAPI_URL in frontend .env.local
