import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useData } from '@/contexts/DataContext'
import MovieDetail from '@/components/cinema/MovieDetail'
import MovieShowtimes from '@/components/cinema/MovieShowtimes'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getMovieShowtimes } from '@/services/cinemaService'
import type { ShowtimeWithHall } from '@/types'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/_layout/movies/$movieId')({
  component: MovieDetailComponent,
})

const MovieDetailSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-32" />
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <Skeleton className="w-full aspect-[2/3]" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
      <Skeleton className="h-48 w-full" />
    </div>
  )
}

function MovieDetailComponent() {
  const { movieId } = Route.useParams()
  const { movies, isLoading: dataLoading, error: dataError } = useData()
  const [showtimes, setShowtimes] = useState<ShowtimeWithHall[]>([])
  const [isLoadingShowtimes, setIsLoadingShowtimes] = useState(true)
  const [showtimesError, setShowtimesError] = useState<Error | null>(null)

  useEffect(() => {
    const loadShowtimes = async () => {
      try {
        setIsLoadingShowtimes(true)
        const data = await getMovieShowtimes(movieId)
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
  }, [movieId, dataLoading])

  if (dataError) {
    return (
      <div className="space-y-4">
        <Link to="/movies">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Movies
          </Button>
        </Link>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading movie</AlertTitle>
          <AlertDescription>{dataError.message}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (dataLoading || isLoadingShowtimes) {
    return <MovieDetailSkeleton />
  }

  const movie = movies.find((m) => m.id === movieId)

  if (!movie) {
    return (
      <div className="space-y-4">
        <Link to="/movies">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Movies
          </Button>
        </Link>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Movie not found</AlertTitle>
          <AlertDescription>
            The movie you're looking for doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link to="/movies">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Movies
        </Button>
      </Link>
      <MovieDetail movie={movie} />

      <Separator />

      <div>
        <h2 className="text-2xl font-bold mb-4">Showtimes</h2>
        {showtimesError ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading showtimes</AlertTitle>
            <AlertDescription>{showtimesError.message}</AlertDescription>
          </Alert>
        ) : (
          <MovieShowtimes showtimes={showtimes} />
        )}
      </div>
    </div>
  )
}
