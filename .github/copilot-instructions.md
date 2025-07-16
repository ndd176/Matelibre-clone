# Copilot Instructions for Matelibre-clone

## Project Overview
- This monorepo contains two main apps:
  - `matelibre-clone`: Next.js frontend (TypeScript, TailwindCSS, Framer Motion)
  - `matelibre-backend`: Strapi backend (Node.js, API, content management)
- Data flows from Strapi backend to Next.js frontend via custom API clients in `src/lib/api/strapi`.
- Images and assets are managed in `public/` and utility functions in `src/lib/utils/`.

## Key Patterns & Conventions
- **API Integration:**
  - Use `strapiApi` from `src/lib/api/strapi` for all backend data fetches.
  - Data types for API responses are defined in `src/types/api/strapi`.
  - Always handle fallback data for UI components if API is unavailable.
- **Component Structure:**
  - Major UI features are in `src/components/` and `src/app/`.
  - Use Framer Motion for all animations and transitions.
  - Use TailwindCSS for styling; avoid inline styles except for dynamic animation props.
- **State Management:**
  - Prefer local state (`useState`, `useEffect`) for most UI logic.
  - Use context/providers only for cross-cutting concerns (see `src/providers/`).
- **Error Handling:**
  - Always log API errors to console and provide fallback UI/data.
  - Use loading spinners and error messages for async data fetches.
- **File Naming:**
  - Use PascalCase for React components, camelCase for utility functions.
  - Place shared types in `src/types/`.

## Developer Workflows
- **Frontend:**
  - Start dev server: `npm run dev` (Next.js, port 3000)
  - Build: `npm run build`
  - Deploy: Vercel or manual server (see README)
- **Backend:**
  - Start Strapi: `npm run develop` (autoReload), `npm run start` (prod)
  - Build admin panel: `npm run build`
  - Deploy: See Strapi docs for options

## Integration Points
- **Image Handling:**
  - Use `getImageUrl` from `src/lib/utils/image` for all image URLs.
  - Fallback images are in `public/images/`.
- **Job Data:**
  - Job details and listings are fetched from Strapi and rendered in accordion UI (`ProductAccordionSection.tsx`).
  - Always provide fallback data for job listings.

## Examples
- See `src/app/careers/ProductAccordionSection.tsx` for API-driven UI with fallback and animation.
- See `src/components/CVSubmissionForm.tsx` for form handling, validation, and notification patterns.

## External Dependencies
- Next.js, Strapi, Framer Motion, TailwindCSS, Lucide Icons
- See `package.json` for full list

---
For more details, see the README files in each app folder.
