import { createFileRoute, Navigate } from '@tanstack/react-router'

const IndexComponent = () => {
  return <Navigate to="/movies" />
}

export const Route = createFileRoute('/')({
  component: IndexComponent,
})
