# ResumeForge AI - Frontend

Modern, responsive Next.js frontend for ResumeForge AI resume builder.

## Features

- Smart landing page for public users
- Authentication-aware dashboard for logged-in users
- AI-powered resume generation with real-time preview
- ATS score calculation and optimization suggestions
- PDF export functionality
- Multiple resume templates
- Responsive design for mobile, tablet, and desktop
- Modern SaaS aesthetic

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **jsPDF** - PDF generation

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  page.tsx              # Landing page / Dashboard (smart routing)
  layout.tsx            # Root layout with Navbar
  login/page.tsx        # Login page
  register/page.tsx     # Register page
  dashboard/page.tsx    # Dashboard route
  globals.css           # Global styles

components/
  Navbar.tsx            # Sticky navbar with auth-aware routing
  LandingPage.tsx       # Public landing page
  Dashboard.tsx         # Resume generator and manager
  ui/
    Button.tsx          # Reusable button component
    Card.tsx            # Reusable card component
    Input.tsx           # Reusable input component

lib/
  theme.ts              # Design system (colors, spacing, typography)
  api.ts                # API configuration and endpoints
  constants.ts          # App-wide constants (features, tech stack, etc.)
```

## Key Pages

### Landing Page (/)
- Hero section with tagline and CTA
- Features showcase (6 cards)
- How it works (4-step process)
- Tech stack display
- CTA section
- Footer with links

### Dashboard (/dashboard)
- Resume generator form
- AI-powered generation with OpenAI
- Real-time ATS score
- Resume preview
- Save/Delete resumes
- PDF export
- Responsive sidebar with saved resumes

### Authentication
- /login - Login page with validation
- /register - Registration page with password confirmation

## Design System

### Colors
- **Navy** (#001a33) - Primary dark color
- **Blue** (#2563eb) - Primary accent
- **Soft Blue** (#3b82f6) - Secondary accent
- **Light Gray** (#f3f4f6) - Background
- **White** (#ffffff) - Content background

### Components
- `Button` - Primary, secondary, outline variants
- `Card` - Flexible card component with padding options
- `Input` - Form input with validation and labels

## API Integration

The frontend communicates with the backend API at:
`http://localhost:5000/api`

### Endpoints Used
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /resume/create` - Create resume
- `GET /resume/my-resumes` - Get user's resumes
- `DELETE /resume/:id` - Delete resume
- `POST /ai/generate-resume` - Generate resume with AI

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel automatically detects Next.js and configures build settings
3. Deploy with a single push to main branch

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

## Environment Variables

No environment variables needed in frontend - API URL is hardcoded.

## Performance Optimizations

- Image optimization with Next.js Image component (if used)
- Code splitting and lazy loading
- Responsive images for different device sizes
- CSS-in-JS for minimal CSS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
