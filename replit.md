# BookSync

## Overview

BookSync is a book reading application with highlighting, note-taking, and cross-device synchronization capabilities. The application provides a distraction-free reading experience inspired by Apple Books and Readwise, allowing users to upload books, track reading progress, create highlights with different colors, and add notes to their reading material.

The application is built as a full-stack web application with a React frontend and Express backend, designed to support PDF and EPUB book formats with features for managing a personal digital library.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Client-side routing using Wouter (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management with disabled refetching to reduce unnecessary requests

**UI Component System**
- shadcn/ui component library (Radix UI primitives with Tailwind styling)
- Custom design system following Apple Books and Material Design principles
- Theme system supporting light/dark modes with localStorage persistence
- Responsive design with mobile-first approach

**Styling Approach**
- Tailwind CSS with custom configuration for reading-optimized color schemes
- CSS variables for theme customization
- Typography system with serif fonts for reading content (Charter, Iowan Old Style) and sans-serif for UI (Inter, System-UI)
- Custom elevation and hover states for interactive elements

**State Management**
- React Context for theme management
- Local state with React hooks
- localStorage for persisting user preferences and reading progress
- React Query for API data caching

**Key Features Implementation**
- Reading progress tracking with localStorage persistence per book
- Keyboard navigation in reader (arrow keys, spacebar for page navigation)
- Highlight toolbar with color selection (yellow, green, blue, pink)
- Note-taking system with highlight association
- Bookmark functionality
- Font size adjustment in reader

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- HTTP server using Node's built-in `http` module
- Session-based architecture preparation with connect-pg-simple

**Development Setup**
- Vite middleware integration in development mode
- Custom logging middleware for API requests
- Error handling middleware with status code mapping
- Runtime error overlay for development (Replit plugins)

**Storage Layer**
- In-memory storage implementation (MemStorage class)
- Storage interface pattern for future database integration
- CRUD operations abstracted through IStorage interface
- Prepared for user authentication (user schema defined)

**API Structure**
- RESTful API design (routes prefixed with `/api`)
- Placeholder route registration system
- JSON request/response handling

### Database & ORM

**Drizzle ORM Configuration**
- PostgreSQL dialect configured (using Neon serverless driver)
- WebSocket support for serverless Postgres connections
- Schema-first approach with TypeScript types
- Migration support configured (output to `./migrations`)

**Database Schema**
- Users table with UUID primary keys
- Zod validation schemas for type-safe inserts
- Extensible schema structure ready for books, highlights, and notes tables

**Current Limitation**: The application uses in-memory storage but is architecturally prepared for PostgreSQL integration. The database schema is defined but not yet utilized by the API layer.

### Design System

**Color Philosophy**
- Reading-optimized light mode with off-white backgrounds (99% lightness) to reduce eye strain
- Dark mode with warm dark backgrounds (220° hue, 20% saturation, 10% lightness)
- Primary blue color (220° hue) for trust and focus
- Four highlight colors with adjusted lightness for light/dark modes

**Component Hierarchy**
- Library view for book management
- Reader view for immersive reading experience
- Settings view for preferences
- Modal dialogs for upload and search functionality

**Interaction Patterns**
- Progressive disclosure (show complexity only when needed)
- Hover elevation effects for interactive elements
- Smooth transitions and animations
- Keyboard shortcuts for reader navigation

## External Dependencies

### UI & Styling
- **Radix UI** - Headless UI primitives for accessible components (accordion, dialog, dropdown, popover, etc.)
- **Tailwind CSS** - Utility-first CSS framework
- **class-variance-authority** - CVA for component variant management
- **clsx** & **tailwind-merge** - Conditional class name utilities

### Data & Forms
- **TanStack Query** - Server state management and caching
- **React Hook Form** - Form state management (via @hookform/resolvers)
- **Zod** - Schema validation
- **drizzle-zod** - Zod schema generation from Drizzle schemas

### Database & Backend
- **Drizzle ORM** - TypeScript ORM with PostgreSQL support
- **@neondatabase/serverless** - Neon serverless Postgres driver
- **connect-pg-simple** - PostgreSQL session store for Express

### Routing & Navigation
- **Wouter** - Lightweight React router (~1.2KB)

### Development Tools
- **Vite** - Build tool and dev server
- **esbuild** - JavaScript bundler for production builds
- **tsx** - TypeScript execution for development
- **@replit/vite-plugin-runtime-error-modal** - Development error overlay
- **@replit/vite-plugin-cartographer** & **dev-banner** - Replit-specific development tools

### Utilities
- **date-fns** - Date manipulation library
- **cmdk** - Command menu component
- **embla-carousel-react** - Carousel component
- **lucide-react** - Icon library
- **nanoid** - Unique ID generation

### Planned Integrations
The application architecture suggests future integration with:
- File upload service for PDF/EPUB handling
- Search API for book discovery
- Sync service for cross-device progress tracking
- Cloud storage for book files and user data