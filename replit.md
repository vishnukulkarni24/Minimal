# E-Commerce Platform - Replit Documentation

## Overview

This is a modern, minimalist e-commerce web application built with React and Express. The platform features a clean, product-focused design inspired by contemporary e-commerce leaders like Everlane, Muji, and Apple Store. The application provides a complete shopping experience including product browsing, cart management, checkout, and order confirmation.

**Key Features:**
- Product catalog with categories and filtering
- Shopping cart with persistent state
- Multi-step checkout process with multiple payment methods
- Order management and invoice generation
- Responsive, mobile-first design
- Clean, minimalist UI using shadcn/ui components

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management
- React Hook Form with Zod for form validation

**State Management:**
- Context API for cart state (CartContext)
- TanStack Query for server-side data caching and synchronization
- Local storage for cart persistence across sessions

**UI Component System:**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Custom theme configuration supporting light/dark modes
- Component aliases configured for clean imports (@/components, @/lib, etc.)

**Design Decisions:**
- Mobile-first responsive design approach
- Minimalist aesthetic with generous whitespace
- Typography system using Inter and Playfair Display fonts
- Product photography as the primary visual element

### Backend Architecture

**Server Framework:**
- Express.js as the HTTP server
- TypeScript for type-safe server code
- Custom route registration system
- Request/response logging middleware

**Data Layer:**
- In-memory storage implementation (MemStorage class)
- Drizzle ORM configured for PostgreSQL (ready for database integration)
- Schema definitions shared between client and server
- Zod schemas for runtime validation

**API Structure:**
- RESTful API design with `/api` prefix
- Product CRUD operations
- Category management
- Order creation and retrieval
- Request validation using Zod schemas

**Development Features:**
- Vite middleware integration for HMR in development
- Static file serving in production
- Custom error overlay for development
- Replit-specific plugins for enhanced development experience

### Data Storage Solutions

**Current Implementation:**
- In-memory storage using Map data structures
- Data seeding on server startup with dummy products/categories
- Generates UUIDs for entity identification

**Database Schema (Prepared for PostgreSQL):**
- Products table: id, name, description, price, salePrice, category, image, images[], stock, featured
- Categories table: id, name, slug, image, description
- Orders table: id, orderNumber, customerName, customerEmail, totalAmount, status, shippingAddress, paymentMethod, createdAt
- OrderItems table: id, orderId, productId, quantity, price

**Migration Strategy:**
- Drizzle Kit configured for schema migrations
- Schema definitions in shared/schema.ts for type safety
- Ready to connect to PostgreSQL via DATABASE_URL environment variable

### External Dependencies

**Third-Party UI Libraries:**
- Radix UI primitives for accessible components (dialog, dropdown, select, etc.)
- Embla Carousel for product image galleries
- Lucide React for iconography
- React Icons for additional icon sets (PayPal, etc.)
- class-variance-authority for component variant management

**Development Tools:**
- TypeScript for static typing
- ESBuild for production server bundling
- PostCSS with Tailwind CSS and Autoprefixer
- Drizzle Kit for database schema management

**Database Connector (Configured):**
- @neondatabase/serverless for PostgreSQL connectivity
- connect-pg-simple for session storage (when sessions are implemented)

**Form and Validation:**
- React Hook Form for performant form handling
- Zod for schema validation
- @hookform/resolvers for Zod integration

**Utilities:**
- date-fns for date formatting
- clsx and tailwind-merge for className management
- nanoid for unique ID generation

**Asset Management:**
- Static assets stored in attached_assets/generated_images/
- Vite alias configuration for @assets path resolution
- Product and category images pre-generated