# Overview

This is a modern full-stack web application built with React, TypeScript, Express.js, and PostgreSQL. The application is an Arabic-language (RTL support) website featuring a contact form system and modern UI components. The project aims to replicate the authentic design of AKWAM, rebranded as "YEMEN_FLIX", focusing on a comprehensive media platform for movies, series, TV shows, and mixed content, including detailed pages for filmography, cast, and episodes.

# User Preferences

Preferred communication style: Simple and everyday language.
User preference: Do not take any actions without prior user approval.
UI design approach: Use original AKWAM CSS files for an authentic design instead of recreation from scratch.
Color scheme: Use reference AKWAM colors (#161619, #27272c, #f3951e).

# System Architecture

The application follows a monorepo structure with clear separation between client (React) and server (Express) code, using shared schemas and types.

## Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for rapid development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming, and integrated original AKWAM CSS.
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Internationalization**: Arabic language support with RTL layout

## Backend Architecture

- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Pattern**: RESTful endpoints
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot Module Replacement with Vite integration

## Key Components

### Database Schema

- **Users Table**: Basic user authentication with username/password
- **Contact Table**: Contact form submissions with name, email, subject, message, and timestamp
- **Schema Validation**: Zod schemas for type-safe data validation

### API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Retrieve all contact messages (Admin)

### UI Components

- Comprehensive component library using shadcn/ui
- Form components with validation
- Toast notifications for user feedback
- Responsive design with a mobile-first approach
- Integration of advanced JavaScript libraries like SweetAlert, Swiper, and Fancybox for enhanced interactivity.

## Data Flow

1. **Contact Form Submission**:
   - Client validates form data using Zod schemas
   - Data sent to `/api/contact` endpoint
   - Server validates and stores in PostgreSQL
   - Success/error feedback via toast notifications

2. **Development Setup**:
   - Vite dev server proxies API requests to Express
   - Hot Module Replacement for rapid development
   - TypeScript compilation across frontend and backend

## Noteworthy Architectural Decisions

1.  **Monorepo Structure**: Shared types and schemas between client and server prevent type mismatches.
2.  **Arabic Language Support**: RTL layout and Arabic fonts are configured throughout the application.
3.  **Type Safety**: End-to-end TypeScript with Zod validation ensures data integrity.
4.  **Modern React Patterns**: Utilizes the latest React features with functional components and hooks.
5.  **Serverless Ready**: Compatible with Neon Database for serverless deployment.
6.  **Authentic CSS Integration**: Original AKWAM CSS files are integrated for an authentic design.
7.  **Comprehensive Design Replication**: Full replication of the original AKWAM website's structure, styling, and interactions, including headers, footers, navigation, search, and detailed content pages.

# External Dependencies

- **Database**: Neon Database (serverless PostgreSQL)
- **UI Components**: Radix UI primitives
- **Validation**: Zod for schema validation
- **ORM**: Drizzle for database interactions with automatic migrations
- **Fonts**: Google Fonts (Inter and Noto Sans Arabic), and STC Arabic fonts
- **JavaScript Libraries**: jQuery, Typed.js, SweetAlert, Swiper, Fancybox, Select2, Pace Loading Indicator.
- **Analytics**: Google Analytics and Histats tracking.