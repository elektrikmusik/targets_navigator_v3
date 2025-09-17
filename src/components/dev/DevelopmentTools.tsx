import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export function DevelopmentTools() {
  if (import.meta.env.PROD) return null

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </>
  )
}
