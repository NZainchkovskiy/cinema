import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

const Index = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Cinema Schedule Viewer</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Browse movies and view cinema schedules
        </p>
        <div className="text-sm text-muted-foreground">
          Project setup complete. Router configured successfully.
        </div>
      </div>
    </div>
  )
}
