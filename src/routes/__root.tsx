import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import ErrorBoundary from '@/components/layout/ErrorBoundary'
import { DataProvider } from '@/contexts/DataContext'

export const Route = createRootRoute({
  component: () => (
    <ErrorBoundary>
      <DataProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Outlet />
          <TanStackRouterDevtools />
        </div>
      </DataProvider>
    </ErrorBoundary>
  ),
})
