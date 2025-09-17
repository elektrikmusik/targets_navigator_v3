import { createRootRoute, Outlet } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'
import { AppLayout } from '@/components/layout/AppLayout'
import { ThemeProvider } from '@/contexts/ThemeContextProvider'
import { DevelopmentTools } from '@/components/dev/DevelopmentTools'
import '@/lib/i18n'

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <AppLayout>
            <Outlet />
          </AppLayout>
        </div>
        <DevelopmentTools />
      </ThemeProvider>
    </QueryClientProvider>
  ),
})
