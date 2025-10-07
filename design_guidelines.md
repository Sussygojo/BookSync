# BookSync Design Guidelines

## Design Approach: Hybrid System
**Primary Reference**: Apple Books + Readwise reading experience  
**Supporting System**: Material Design for interactions  
**Rationale**: Reading apps demand distraction-free interfaces with excellent typography and subtle interactions. Drawing from Apple Books' minimalist reader and Readwise's annotation features while using Material Design patterns for library management.

## Core Design Principles
1. **Reading-First Philosophy**: Prioritize content clarity and reading comfort
2. **Progressive Disclosure**: Show complexity only when needed
3. **Seamless Continuity**: Visual indicators for sync status and reading progress
4. **Intelligent Hierarchy**: Clear separation between reading, organizing, and annotating modes

## Color Palette

### Light Mode
- **Background**: 0 0% 99% (off-white for reduced eye strain)
- **Surface**: 0 0% 100% (pure white for cards/modals)
- **Primary**: 220 90% 56% (deep blue - trust, focus)
- **Text Primary**: 220 20% 15% (dark blue-gray)
- **Text Secondary**: 220 15% 45%
- **Highlight Yellow**: 45 95% 65%
- **Highlight Green**: 140 60% 65%
- **Highlight Blue**: 210 75% 70%
- **Highlight Pink**: 330 70% 75%

### Dark Mode (Reading Optimized)
- **Background**: 220 20% 10% (warm dark for comfortable night reading)
- **Surface**: 220 15% 15%
- **Primary**: 220 85% 65% (lighter blue for contrast)
- **Text Primary**: 220 10% 90% (soft white)
- **Text Secondary**: 220 10% 65%
- **Highlight Colors**: Same hues, adjusted lightness to 45-55% for dark backgrounds

## Typography System

### Font Families
- **Display/Headers**: 'Literata' or 'Merriweather' (serif for book titles, elegant)
- **Reading Content**: 'Charter' or 'Iowan Old Style' (optimized for long-form reading)
- **UI/Interface**: 'Inter' or 'System-UI' (clean, modern for controls)

### Type Scale
- **Book Title (Display)**: text-4xl md:text-5xl, font-bold
- **Chapter Heading**: text-2xl md:text-3xl, font-semibold
- **Reading Body**: text-lg md:text-xl leading-relaxed (user-adjustable: base to 2xl)
- **UI Labels**: text-sm font-medium
- **Metadata**: text-xs text-secondary

## Layout System

### Spacing Primitives
Use Tailwind units: **2, 4, 6, 12, 16** for consistency
- Micro spacing (gaps, padding): 2, 4
- Component spacing: 6, 12
- Section spacing: 16, 24

### Reading View Layout
- **Max Content Width**: max-w-3xl (optimal 65-75 characters per line)
- **Margins**: px-6 md:px-12 lg:px-16
- **Reader Chrome**: Minimal top bar (40px) with auto-hide on scroll

### Library Grid
- **Mobile**: Single column, full-width cards
- **Tablet**: grid-cols-2, gap-6
- **Desktop**: grid-cols-3 lg:grid-cols-4, gap-8

## Component Library

### Navigation
- **Top Bar**: Fixed, glass-morphism effect (backdrop-blur-md bg-surface/80), contains: logo, search, sync status, user menu
- **Reading Mode Bar**: Floating bottom controls (font size, highlights, notes, bookmark) with rounded-full buttons

### Book Cards (Library)
- **Structure**: Vertical card with shadow-sm hover:shadow-lg transition
- **Cover**: aspect-[2/3], rounded-lg, object-cover
- **Progress Bar**: Thin (h-1) gradient indicator at card bottom
- **Metadata**: Title (2 lines, truncate), Author (1 line), Reading progress %

### Reader Components
- **Highlight Popover**: Appears above selected text, contains color picker (circular swatches) + note button
- **Note Card**: Sticky-note aesthetic with slight rotation (-1 to 1deg), shows first 2 lines + "Read more"
- **Page Controls**: Minimal arrows at viewport edges (opacity-0 hover:opacity-100), center page indicator

### Sync Indicator
- **Status Badge**: Top-right corner, icon + text
  - Syncing: Rotating icon, blue pulse
  - Synced: Checkmark, green
  - Offline: Cloud-off icon, gray

### Modal Patterns
- **Book Upload**: Drag-drop zone with dashed border, file type icons, progress bar for processing
- **Note Editor**: Full-screen overlay, rich text editor, book context preview on side

## Interaction Patterns

### Reading Experience
- **Page Turn**: Subtle slide animation (150ms ease-out)
- **Scroll Behavior**: Smooth scroll with reading progress bar in top chrome
- **Highlight Creation**: Text selection → floating toolbar appears with 200ms delay
- **Touch Tap**: Single tap shows/hides chrome, double-tap for bookmark

### Library Interactions
- **Card Hover**: Lift effect (translateY(-4px)) + shadow increase
- **Search**: Real-time filter with debounce, show result count
- **Import Flow**: Multi-step wizard with progress dots

## Reading Modes

### Focus Mode
- Hide all chrome except page number
- Sepia background option (40 85% 92%)
- Reduced highlight opacity (30%)

### Study Mode  
- Split view: Book content (60%) + Notes panel (40%)
- Highlight legend visible
- Quick jump to annotations

## Images

### Hero Section (Landing/Welcome)
**Description**: Serene reading scene - cozy armchair by window with soft natural light, open book, warm beverage. Conveys comfort and focus.  
**Placement**: Full-width hero (h-[70vh]), subtle overlay gradient for text readability  
**Treatment**: Slight blur on background, sharp focus on book/reading area

### Library Empty State
**Description**: Minimalist illustration of bookshelf with a few books and upload icon  
**Style**: Line art, primary color, centered in empty library grid

### Feature Showcase (Marketing)
**Description**: Product screenshots showing highlight colors, note-taking, cross-device sync  
**Treatment**: Device mockups (iPad/phone) with slight 3D perspective, shadow-2xl

## Accessibility & Performance
- **Color Contrast**: Minimum 4.5:1 for all text
- **Keyboard Navigation**: Full support with visible focus rings
- **Font Scaling**: Support up to 200% zoom without breaking layout
- **Lazy Loading**: Book covers and content load progressively
- **Reduced Motion**: Respect prefers-reduced-motion for animations