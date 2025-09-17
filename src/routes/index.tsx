import { createFileRoute } from '@tanstack/react-router'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

function Index() {
  const { count, increment, decrement, reset } = useAppStore()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Starter
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          A modern React app with Vite, TanStack Router, and shadcn/ui
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="text-6xl font-bold">{count}</div>
        <div className="flex space-x-2">
          <Button onClick={decrement} variant="outline">
            Decrement
          </Button>
          <Button onClick={increment}>Increment</Button>
          <Button onClick={reset} variant="destructive">
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">TanStack Router</h3>
          <p className="text-sm text-muted-foreground">
            Type-safe routing with file-based routing and data loading.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">TanStack Query</h3>
          <p className="text-sm text-muted-foreground">
            Powerful data synchronization for React applications.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">shadcn/ui</h3>
          <p className="text-sm text-muted-foreground">
            Beautifully designed components built with Radix UI and Tailwind
            CSS.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Data Visualization</h3>
          <p className="text-sm text-muted-foreground">
            Interactive charts and maps with Nivo and D3.js.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <a
          href="/demo"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Demo
        </a>
        <a
          href="/map"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Interactive Map
        </a>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})
