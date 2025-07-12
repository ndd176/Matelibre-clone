# API Test Dashboard

## Overview

The API Test Dashboard is a comprehensive frontend interface designed to test and showcase the integration between the Next.js frontend and Strapi CMS backend. It provides an interactive way to view, test, and validate all API endpoints.

## Features

### 🔄 Dual Data Mode

- **Mock Data Mode**: Uses predefined sample data for testing without backend
- **Strapi API Mode**: Connects to live Strapi backend for real-time data

### 📊 Data Visualization

- **Job Positions**: Interactive cards with detailed position information
- **Hero Slides**: Homepage banner content with images and CTAs
- **Company Moments**: Timeline of company milestones and events
- **Testimonials**: Client feedback with ratings and avatars

### 🎨 Interactive UI

- **Responsive Design**: Optimized for all screen sizes
- **Smooth Animations**: Powered by Framer Motion
- **Modal Dialogs**: Detailed view for job positions
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages

## Getting Started

### 1. Access the Dashboard

Navigate to: `http://localhost:3002/api-test`

### 2. Choose Data Source

Use the toggle buttons at the top to switch between:

- **Mock Data**: Instant preview with sample data
- **Strapi API**: Live connection to Strapi backend

### 3. Explore Content Types

Click through the tabs to view different content types:

- Job Positions
- Hero Slides
- Moments
- Testimonials

## API Integration

### Mock Data Structure

```typescript
interface JobPosition {
  id: string
  title: string
  description: string
  department: string
  location: string
  type: string
  color: 'white' | 'milk' | 'matcha' | 'dark_green' | 'black'
  salaryRange: string
  isActive: boolean
  requirements: string[]
  benefits: string[]
  canImage: string
  bgImage: string
}
```

### Real API Endpoints

When connected to Strapi:

- GET `/api/job-positions` - List all job positions
- GET `/api/hero-slides` - Get hero slides (sorted by order)
- GET `/api/moments` - Get company moments (sorted by date)
- GET `/api/testimonials` - Get client testimonials

### React Hooks Used

```typescript
// Job positions with sorting and filtering
const jobPositionsQuery = useJobPositions({
  sort: 'createdAt:desc',
})

// Hero slides ordered by display order
const heroSlidesQuery = useHeroSlides('order:asc')

// Recent moments first
const momentsQuery = useMoments({
  sort: 'date:desc',
})

// Active testimonials
const testimonialsQuery = useTestimonials({
  sort: 'createdAt:desc',
})
```

## UI Components

### JobPositionCard

- Hover animations with product can rotation
- Color-coded backgrounds based on department
- Expandable quick requirements preview
- Click to open detailed modal

### HeroSlideCard

- Full-width image with gradient overlay
- Order indicator and CTA buttons
- Responsive aspect ratio

### MomentCard

- Square aspect ratio for consistent grid
- Category badges
- Position coordinates display

### TestimonialCard

- Star rating system
- Professional avatar display
- Company and role information

## Error Handling

### Connection Status Indicator

- 🟢 Green: Successfully connected to Strapi
- 🔵 Blue: Using mock data
- 🔴 Red: API connection error

### Fallback Behavior

- Shows loading skeleton during API calls
- Displays helpful error messages
- Graceful degradation to empty states
- Retry functionality for failed requests

## Performance Features

### Data Transformation

- Efficient transformation from Strapi format to frontend format
- Image URL resolution for Strapi media
- Type-safe data handling

### Loading Optimization

- Parallel API calls for different content types
- Conditional loading based on selected tab
- Caching through React Query (future enhancement)

## Development Tools

### API Status Panel

Bottom section shows real-time connection status for each API endpoint:

- Connection state indicator
- Item count for each content type
- Last update timestamp

### Debug Information

In development mode, additional information is available:

- Raw API response data in browser console
- Network request timing
- Error stack traces

## Future Enhancements

### Planned Features

- [ ] Search and filtering capabilities
- [ ] Pagination for large datasets
- [ ] Real-time updates via WebSocket
- [ ] Export functionality (JSON, CSV)
- [ ] Performance metrics dashboard
- [ ] API response time monitoring

### CRUD Operations

- [ ] Create new job positions
- [ ] Edit existing content
- [ ] Delete items with confirmation
- [ ] Bulk operations

## Troubleshooting

### Common Issues

**"API Connection Error"**

- Ensure Strapi backend is running on port 1337
- Check CORS configuration in Strapi
- Verify network connectivity

**"No data available"**

- Switch to Mock Data mode to test UI
- Check if Strapi has content in the admin panel
- Verify API permissions are set correctly

**"Loading indefinitely"**

- Check browser network tab for failed requests
- Ensure API endpoints exist in Strapi
- Verify content types are published

### Environment Variables

Make sure these are set in `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=your-token-here
```

## Related Files

### API Integration

- `/src/lib/api/strapi-api.ts` - API service functions
- `/src/lib/hooks/use-api.ts` - React hooks for data fetching
- `/src/lib/utils/strapi-transforms.ts` - Data transformation utilities

### UI Components

- `/src/app/api-test/page.tsx` - Main dashboard component
- Individual card components within the same file

### Configuration

- `/STRAPI-SETUP.md` - Strapi backend setup guide
- `/.env.local` - Environment configuration
