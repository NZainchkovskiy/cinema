import { createFileRoute } from '@tanstack/react-router'
import { useData } from '@/contexts/DataContext'
import HallCard from '@/components/cinema/HallCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Building } from 'lucide-react'

export const Route = createFileRoute('/_layout/halls/')({
  component: HallsListComponent,
})

const HallCardSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-24 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  )
}

function HallsListComponent() {
  const { halls, isLoading, error } = useData()

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error loading halls</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Cinema Halls</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <HallCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (halls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Building className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No halls available</h2>
        <p className="text-muted-foreground">Hall information is not available at the moment</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Cinema Halls</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {halls.map((hall) => (
          <HallCard key={hall.id} hall={hall} />
        ))}
      </div>
    </div>
  )
}
