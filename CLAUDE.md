# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run preview` - Preview production build

### Testing
- `npm run test` - Run Vitest unit tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:css` - Run Stylelint for CSS
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Storybook
- `npm run storybook` - Start Storybook dev server
- `npm run build-storybook` - Build Storybook

### Git Workflow
- `npm run commit` - Use Commitizen for conventional commits

## Architecture Overview

### Framework Stack
- **React 19** with TypeScript
- **Vite** for build tooling
- **TanStack Router** for type-safe routing
- **TanStack Query** for server state management
- **Zustand** for client state management
- **shadcn/ui** with Radix UI primitives
- **Tailwind CSS** for styling

### Key Files & Structure
- `src/main.tsx` - Application entry point with TanStack Router setup
- `src/routeTree.gen.ts` - Auto-generated route definitions
- `src/routes/` - File-based routing pages
- `src/routes/__root.tsx` - Root layout with providers
- `src/lib/query-client.ts` - TanStack Query configuration
- `src/contexts/` - Theme and other context providers
- `src/components/ui/` - shadcn/ui components
- `src/components/charts/` - Nivo data visualization components

### State Management
- **Server State**: TanStack Query with 5-minute stale time
- **Client State**: Zustand stores
- **Routing State**: TanStack Router with file-based routes

### Routing Structure
Routes are defined in `src/routes/` with file-based routing:
- `/` - Home page
- `/about` - About page
- `/companies-table` - Data table view
- `/demo` - Demo components
- `/map` - Map visualization
- `/profile` - User profile
- `/settings` - Application settings
- `/territories` - Territory management
- `/test` - Test components

### Styling Approach
- Tailwind CSS for utility-first styling
- shadcn/ui components with Radix UI primitives
- CSS-in-JS patterns with clsx and tailwind-merge

### Testing Strategy
- **Unit Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright
- **Component Tests**: Storybook + Testing Library
- **Coverage**: Vitest coverage reports

### Development Tools
- ESLint with TypeScript support
- Prettier for code formatting
- Stylelint for CSS validation
- Husky for Git hooks
- Commitizen for conventional commits

### Build Process
1. TypeScript compilation (`tsc -b`)
2. Vite build with optimized bundles
3. Static asset optimization
4. Docker container support available