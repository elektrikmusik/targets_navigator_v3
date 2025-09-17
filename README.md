# Modern React Starter

A production-ready React starter template built with modern tools and best practices.

## Features

- ⚡ **Vite** - Fast development and building
- ⚛️ **React 19** with TypeScript
- 🧭 **TanStack Router** - Type-safe routing
- 🔄 **TanStack Query** - Server state management
- 🏪 **Zustand** - Client state management
- 🎨 **shadcn/ui** - Beautiful components with Tailwind CSS
- 📝 **React Hook Form** with Zod validation
- 🧪 **Vitest** and React Testing Library for testing
- 🎭 **Playwright** for E2E testing
- 📚 **Storybook** for component development
- 🌍 **i18next** for internationalization
- 📊 **Nivo** for data visualization
- 🐕 **Husky** and Commitlint for Git workflow
- 🐳 **Docker** support for deployment

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Testing

- `npm run test` - Run unit tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI
- `npm run test:e2e:report` - Show E2E test report

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:css` - Run Stylelint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Storybook

- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

### Git Workflow

- `npm run commit` - Use Commitizen for conventional commits
- `npm run prepare` - Install Husky hooks

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   ├── charts/         # Data visualization components
│   ├── forms/          # Form components
│   └── dev/            # Development tools
├── lib/                # Utilities and configurations
│   ├── locales/        # i18n translation files
│   ├── query-client.ts # TanStack Query configuration
│   ├── store.ts        # Zustand store
│   └── i18n.ts         # i18next configuration
├── routes/             # TanStack Router pages
├── test/               # Test utilities
└── main.tsx           # Application entry point
```

## Key Technologies

### State Management

- **TanStack Query**: Server state management with caching, synchronization, and background updates
- **Zustand**: Lightweight client state management

### Routing

- **TanStack Router**: Type-safe routing with file-based routing and data loading

### UI & Styling

- **shadcn/ui**: Pre-built components with Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework

### Forms

- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: TypeScript-first schema validation

### Testing

- **Vitest**: Fast unit testing with Vite integration
- **React Testing Library**: Simple and complete testing utilities
- **Playwright**: End-to-end testing

### Development Tools

- **Storybook**: Component development and documentation
- **i18next**: Internationalization framework
- **Nivo**: Data visualization library

## Deployment

### Docker

1. Build the Docker image:

   ```bash
   docker build -t starter-app .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 starter-app
   ```

### Without Docker

1. Build the application:

   ```bash
   npm run build
   ```

2. Serve the `dist` folder with any static file server

## Contributing

1. Use conventional commits with `npm run commit`
2. Ensure all tests pass: `npm run test`
3. Format code: `npm run format`
4. Run linting: `npm run lint`

## License

MIT
