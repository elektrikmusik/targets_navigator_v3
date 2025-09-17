import { createFileRoute } from '@tanstack/react-router'

function About() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-muted-foreground">
          This is a modern React starter template built with the latest tools
          and best practices.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Vite for fast development and building</li>
          <li>React 19 with TypeScript</li>
          <li>TanStack Router for type-safe routing</li>
          <li>TanStack Query for server state management</li>
          <li>Zustand for client state management</li>
          <li>shadcn/ui components with Tailwind CSS</li>
          <li>React Hook Form with Zod validation</li>
          <li>Vitest and React Testing Library for testing</li>
          <li>Playwright for E2E testing</li>
          <li>Storybook for component development</li>
          <li>i18next for internationalization</li>
          <li>Nivo for data visualization</li>
          <li>Husky and Commitlint for Git workflow</li>
          <li>Docker support for deployment</li>
        </ul>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/about')({
  component: About,
})
