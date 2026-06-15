# ResumeForge AI

An AI-powered Resume Builder that generates professional resumes, analyzes ATS compatibility, provides ATS improvement suggestions, supports multiple resume templates, and exports resumes as PDFs.

## Features

- User Authentication (JWT)
- Register & Login
- Protected Routes
- AI Resume Generation
- ATS Score Analysis
- ATS Suggestions
- Resume CRUD Operations
- PDF Download
- Multiple Resume Templates
  - Classic
  - Modern
  - ATS Friendly
- Loading States
- Responsive UI
- Modern SaaS Design

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Prisma ORM

### Database
- PostgreSQL

### AI
- OpenAI API

### Authentication
- JWT

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL

## Installation

### Clone Repository

```bash
git clone <your-repository-url>
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the server directory:

```env
DATABASE_URL=your_database_url
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_secret_key
PORT=5000
```

## Project Structure

```
client/
  app/
    page.tsx              # Landing page / Dashboard (smart routing)
    layout.tsx            # Root layout with navbar
    login/                # Login page
    register/             # Register page
    dashboard/            # Dashboard route
    globals.css           # Global styles
  components/
    Navbar.tsx            # Sticky navbar with auth-aware routing
    LandingPage.tsx       # Public landing page with 6 sections
    Dashboard.tsx         # Resume generation and management
    ui/                   # Reusable UI components
      Button.tsx
      Card.tsx
      Input.tsx
  lib/
    theme.ts              # Design system (colors, spacing, typography)
    api.ts                # API configuration and endpoints
    constants.ts          # App-wide constants

server/
  src/
    index.js              # Express app setup
    routes/               # API routes
    controllers/          # Route controllers
    middleware/           # Authentication middleware
    utils/                # Utility functions
  prisma/
    schema.prisma         # Database schema
    migrations/           # Database migrations
```

## Landing Page Sections

1. **Hero** - Tagline, CTA buttons, visual mockup
2. **Features** - 6 feature cards with icons
3. **How It Works** - 4-step process visualization
4. **Tech Stack** - Technologies used
5. **CTA** - Call-to-action section
6. **Footer** - Links and information

## Usage

1. **Register/Login** - Create an account or sign in
2. **Generate Resume** - Enter job role and skills, click "Generate with AI"
3. **Review** - Check generated resume, ATS score, and suggestions
4. **Save** - Save resume to your account
5. **Export** - Download as PDF
6. **Manage** - View, edit, or delete saved resumes

## Future Improvements

- Resume Sharing
- Cover Letter Generator
- Resume Version History
- Job Description Matching
- Advanced ATS Analytics
- Batch Resume Generation
- Team Collaboration

## Author

Anant Raj Srivastav