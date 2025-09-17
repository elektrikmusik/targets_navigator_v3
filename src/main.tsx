import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'

// Filter out common browser extension errors
const originalError = console.error
console.error = (...args) => {
  const message = args[0]?.toString() || ''
  if (
    message.includes('runtime.lastError') ||
    message.includes('message port closed')
  ) {
    return // Suppress these specific errors
  }
  originalError.apply(console, args)
}

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreloadDelay: 50,
  defaultPendingMs: 1000,
  defaultPendingMinMs: 500,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
