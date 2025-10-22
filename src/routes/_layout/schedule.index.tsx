import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import CombinedSchedule from '@/components/cinema/CombinedSchedule'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getDailySchedule } from '@/services/cinemaService'
import type { EnrichedShowtime } from '@/types'
import { AlertCircle } from 'lucide-react'

export const Route = createFileRoute('/_layout/schedule/')({
  component: ScheduleComponent,
})

const ScheduleSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-12 w-full max-w-md" />
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  )
}

function ScheduleComponent() {
  const [schedule, setSchedule] = useState<EnrichedShowtime[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        setIsLoading(true)
        const dailySchedules = await getDailySchedule()
        // Flatten all showtimes from all days
        const allShowtimes = dailySchedules.flatMap((ds) => ds.showtimes)
        setSchedule(allShowtimes)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load schedule'))
      } finally {
        setIsLoading(false)
      }
    }

    loadSchedule()
  }, [])

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Complete Schedule</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading schedule</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (isLoading) {
    return <ScheduleSkeleton />
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Complete Schedule</h1>
      <p className="text-muted-foreground mb-6">
        View all upcoming showtimes for the next 7 days
      </p>
      <CombinedSchedule showtimes={schedule} />
    </div>
  )
}
