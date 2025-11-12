# E-Commerce Website Design Guidelines

## Design Approach
**Selected Approach**: Minimalist Design System inspired by modern e-commerce leaders (Everlane, Muji, Apple Store) with emphasis on product showcase through clean typography, generous whitespace, and content-first philosophy.

**Core Principles**:
- Product photography takes center stage
- Typography creates clear hierarchy
- Whitespace guides user attention
- Functionality over decoration
- Mobile-first responsive design

## Typography System

**Font Stack**: 
- Primary: 'Inter' or 'DM Sans' (Google Fonts)
- Display headings where needed: 'Playfair Display' or serif for product names

**Type Scale**:
- Hero/Display: text-5xl to text-6xl, font-light
- Page Headings: text-3xl to text-4xl, font-medium
- Section Titles: text-2xl, font-semibold
- Product Names: text-lg, font-medium
- Body Text: text-base, font-normal
- Small/Meta: text-sm, font-normal
- Micro (prices, labels): text-xs, uppercase tracking-wide

## Layout & Spacing System

**Container Widths**:
- Homepage hero: full-width with max-w-7xl inner container
- Product grids: max-w-7xl
- Product details: max-w-6xl
- Cart/Checkout: max-w-4xl
- Invoice: max-w-3xl

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Component padding: p-4 (mobile), p-6 to p-8 (desktop)
- Section spacing: py-12 (mobile), py-16 to py-24 (desktop)
- Grid gaps: gap-4 (mobile), gap-6 to gap-8 (desktop)
- Card padding: p-4 to p-6

**Grid Systems**:
- Product grids: grid-cols-1 md:grid-cols-3 lg:grid-cols-4
- Categories: grid-cols-2 md:grid-cols-4 lg:grid-cols-6
- Cart items: Single column with flexible layouts
- Checkout: Two-column (form + summary) on desktop, stacked on mobile

## Page-Specific Layouts

### Homepage
**Hero Section** (50vh to 60vh):
- Full-width lifestyle product image showcasing featured collection
- Centered overlay content with blurred background container
- Large headline (text-5xl) + subtitle (text-xl)
- Primary CTA button with backdrop-blur-md

**Featured Products**:
- 4-column grid on desktop, 2-column tablet, 1-column mobile
- Product cards with 3:4 aspect ratio images
- Hover state: subtle scale transform (scale-105)

**Category Showcase**:
- 6-column grid on desktop showing category tiles
- Each tile: image + category name overlay

### Product Listing Page
**Filter Panel**:
- Sticky sidebar (desktop): w-64, hidden on mobile (drawer)
- Search bar at top: w-full with icon
- Category checkboxes with clear labels
- Price range slider with min/max inputs
- Clear filters button

**Product Grid**:
- Responsive grid with consistent card sizes
- Each card: product image (square ratio), name, price, short description (2 lines max), add-to-cart button
- Quick view option on hover (desktop)

### Product Detail Page
**Layout**: Two-column split (image gallery + product info)
- Left: 60% width - Main image + thumbnail gallery below
- Right: 40% width - Product name, price, description, quantity selector, add-to-cart CTA, specs accordion

### Cart Page
**Structure**: Single column max-w-4xl
- Each cart item: Horizontal layout (image thumbnail + details + quantity controls + remove button)
- Sticky summary sidebar on desktop showing subtotal, shipping, total
- Prominent checkout CTA button

### Checkout Page
**Two-Column Layout**:
- Left (60%): Shipping form, payment method cards (visual radio buttons)
- Right (40%): Sticky order summary with line items

**Payment Options**:
- Credit card form with card icon
- PayPal button (use official styling reference)
- Cash on Delivery option with icon

### Invoice Page
**Centered Document Layout**: max-w-3xl
- Header: Order number, date, status badge
- Customer info block
- Line items table
- Summary with subtotal, shipping, total
- Print button (top-right)

## Component Library

**Navigation Bar**:
- Full-width with max-w-7xl container
- Logo (left), nav links (center), cart icon with badge + search icon (right)
- Sticky position with subtle shadow on scroll
- Mobile: Hamburger menu

**Product Card**:
- Aspect ratio container (3:4) for images
- Overlay quick-add button on hover
- Product name truncated to 2 lines
- Price with strikethrough for sale items

**Filter Panel Components**:
- Accordion sections for filter categories
- Checkbox groups with counts
- Range sliders with styled thumbs
- Applied filters as dismissible chips

**Cart Item Component**:
- Thumbnail (100px square)
- Product details (name, variant, price)
- Quantity controls (- button, input, + button)
- Remove icon button
- Responsive: Stack on mobile

**Buttons**:
- Primary CTA: Rounded (rounded-md), medium padding (px-6 py-3), text-base font-medium
- Secondary: Outlined variant
- Icon buttons: Squared with padding p-2
- Buttons over images: backdrop-blur-md background

**Form Inputs**:
- Consistent height (h-12), rounded-md
- Border on all inputs
- Focus states with ring
- Labels above inputs (text-sm font-medium)

**Footer**:
- Multi-column layout: Newsletter signup, Quick links, Customer service, Social icons
- Subscribe form with inline button
- Copyright and payment icons at bottom

## Images

**Homepage Hero**: 
- Full-width lifestyle shot showing products in aspirational context
- Professional product photography with neutral backgrounds
- Placement: Top of homepage, 50-60vh height

**Product Images**:
- High-quality product photography on white/minimal backgrounds
- Multiple angles in detail page gallery
- Consistent aspect ratios across all product cards (3:4 ratio)

**Category Tiles**:
- Representative product or lifestyle images for each category
- Square aspect ratio (1:1)

**Icons**: Use Heroicons (outline style for primary navigation, solid for actions)

## Responsive Behavior

**Breakpoints**:
- Mobile: Base (< 768px) - Single column layouts, drawer navigation
- Tablet: md (768px+) - 2-3 column grids, visible filters
- Desktop: lg (1024px+) - Full grid layouts, sidebar filters

**Mobile Optimizations**:
- Bottom navigation bar for cart/account access
- Swipeable product galleries
- Drawer filters instead of sidebar
- Simplified checkout (single column)
- Larger touch targets (min 44px)

## Animations

Use sparingly and purposefully:
- Page transitions: Fade-in on mount
- Product card hover: Gentle scale (duration-200)
- Cart updates: Slide-in notification
- Filter applications: Smooth list updates
- No parallax, no complex scroll-triggered animations

## Accessibility

- Clear focus indicators on all interactive elements
- Proper heading hierarchy (h1 → h6)
- Alt text for all product images
- Form labels associated with inputs
- Keyboard navigation for all features
- ARIA labels for icon-only buttons
- Skip-to-content link