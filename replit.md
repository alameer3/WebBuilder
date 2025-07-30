# Project Overview

This is a modern full-stack web application built with React, TypeScript, Express.js, and PostgreSQL. The application appears to be an Arabic-language website (with RTL support) featuring a contact form system and modern UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client-side (React) and server-side (Express) code, with shared schemas and types.

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Internationalization**: Arabic language support with RTL layout

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Style**: RESTful endpoints
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot module replacement with Vite integration

## Key Components

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Contacts Table**: Contact form submissions with name, email, subject, message, and timestamp
- **Schema Validation**: Zod schemas for type-safe data validation

### API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Retrieve all contact messages (admin)

### UI Components
- Comprehensive component library using shadcn/ui
- Form components with validation
- Toast notifications for user feedback
- Responsive design with mobile-first approach

## Data Flow

1. **Contact Form Submission**:
   - Client validates form data using Zod schemas
   - Data sent to `/api/contact` endpoint
   - Server validates and stores in PostgreSQL
   - Success/error feedback via toast notifications

2. **Development Setup**:
   - Vite dev server proxies API requests to Express
   - Hot module replacement for fast development
   - TypeScript compilation across frontend and backend

## External Dependencies

### Core Technologies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Components**: Radix UI primitives
- **Validation**: Zod for schema validation
- **ORM**: Drizzle with automatic migrations
- **Fonts**: Google Fonts (Inter and Noto Sans Arabic)

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Strict mode with path aliases
- **Linting**: ESBuild for server bundling
- **Runtime**: Node.js with ES modules

## Deployment Strategy

### Production Build
- Frontend builds to `dist/public` directory
- Backend bundles with ESBuild to `dist/index.js`
- Static files served by Express in production
- Environment-based configuration for database connections

### Database Management
- Drizzle migrations stored in `/migrations` directory
- Schema defined in `/shared/schema.ts`
- Push-based deployment with `db:push` command

### Environment Configuration
- Development: Vite dev server with Express API
- Production: Single Express server serving static files and API
- Database URL required via environment variables

## Notable Architecture Decisions

1. **Monorepo Structure**: Shared types and schemas between client and server prevent type mismatches
2. **Memory Storage Fallback**: Development includes in-memory storage implementation for quick setup
3. **Arabic Language Support**: RTL layout and Arabic fonts configured throughout
4. **Type Safety**: End-to-end TypeScript with Zod validation ensures data integrity
5. **Modern React Patterns**: Uses latest React features with functional components and hooks
6. **Serverless-Ready**: Compatible with Neon Database for serverless deployments