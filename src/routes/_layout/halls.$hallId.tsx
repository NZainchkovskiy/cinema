import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useData } from '@/contexts/DataContext'
import HallSchedule from '@/components/cinema/HallSchedule'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getHallSchedule } from '@/services/cinemaService'
import type { ShowtimeWithMovie } from '@/types'
import { AlertCircle, ArrowLeft, Calendar } from 'lucide-react'

export const Route = createFileRoute('/_layout/halls/$hallId')({
  component: HallScheduleComponent,
})

const HallScheduleSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-32 w-full" />
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  )
}

function HallScheduleComponent() {
  const { hallId } = Route.useParams()
  const { halls, isLoading: dataLoading, error: dataError } = useData()
  const [showtimes, setShowtimes] = useState<ShowtimeWithMovie[]>([])
  const [isLoadingShowtimes, setIsLoadingShowtimes] = useState(true)
  const [showtimesError, setShowtimesError] = useState<Error | null>(null)

  useEffect(() => {
    const loadShowtimes = async () => {
      try {
        setIsLoadingShowtimes(true)
        const data = await getHallSchedule(hallId)
        setShowtimes(data)
      } catch (err) {
        setShowtimesError(err instanceof Error ? err : new Error('Failed to load showtimes'))
      } finally {
        setIsLoadingShowtimes(false)
      }
    }

    if (!dataLoading) {
      loadShowtimes()
    }
  }, [hallId, dataLoading])

  if (dataError || showtimesError) {
    return (
      <div className="space-y-4">
        <Link to="/halls">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Halls
          </Button>
        </Link>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading hall schedule</AlertTitle>
          <AlertDescription>
            {dataError?.message || showtimesError?.message}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (dataLoading || isLoadingShowtimes) {
    return <HallScheduleSkeleton />
  }

  const hall = halls.find((h) => h.id === hallId)

  if (!hall) {
    return (
      <div className="space-y-4">
        <Link to="/halls">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Halls
          </Button>
        </Link>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Hall not found</AlertTitle>
          <AlertDescription>
            The hall you're looking for doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link to="/halls">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Halls
        </Button>
      </Link>

      {showtimes.length === 0 ? (
        <div>
          <HallSchedule hall={hall} showtimes={[]} />
          <Alert className="mt-6">
            <Calendar className="h-4 w-4" />
            <AlertTitle>No upcoming showtimes</AlertTitle>
            <AlertDescription>
              There are no scheduled showtimes for {hall.name} in the next 7 days.
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <HallSchedule hall={hall} showtimes={showtimes} />
      )}
    </div>
  )
}
