import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatTime, formatDate } from '@/lib/utils'
import type { EnrichedShowtime } from '@/types'
import { Clock, Film, Building, Calendar } from 'lucide-react'

interface CombinedScheduleProps {
  showtimes: EnrichedShowtime[]
}

const CombinedSchedule = ({ showtimes }: CombinedScheduleProps) => {
  if (showtimes.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No showtimes available</h3>
          <p className="text-muted-foreground">There are no scheduled showtimes at this time</p>
        </CardContent>
      </Card>
    )
  }

  // Group by movie
  const byMovie = showtimes.reduce(
    (acc, showtime) => {
      const key = showtime.movie.id
      if (!acc[key]) {
        acc[key] = {
          movie: showtime.movie,
          showtimes: [],
        }
      }
      acc[key].showtimes.push(showtime)
      return acc
    },
    {} as Record<string, { movie: typeof showtimes[0]['movie']; showtimes: EnrichedShowtime[] }>
  )

  // Group by hall
  const byHall = showtimes.reduce(
    (acc, showtime) => {
      const key = showtime.hall.id
      if (!acc[key]) {
        acc[key] = {
          hall: showtime.hall,
          showtimes: [],
        }
      }
      acc[key].showtimes.push(showtime)
      return acc
    },
    {} as Record<string, { hall: typeof showtimes[0]['hall']; showtimes: EnrichedShowtime[] }>
  )

  return (
    <Tabs defaultValue="by-movie" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="by-movie">
          <Film className="h-4 w-4 mr-2" />
          By Movie
        </TabsTrigger>
        <TabsTrigger value="by-hall">
          <Building className="h-4 w-4 mr-2" />
          By Hall
        </TabsTrigger>
      </TabsList>

      <TabsContent value="by-movie" className="space-y-6 mt-6">
        {Object.values(byMovie).map(({ movie, showtimes: movieShowtimes }) => (
          <Card key={movie.id}>
            <CardHeader>
              <Link
                to="/movies/$movieId"
                params={{ movieId: movie.id }}
                className="hover:underline"
              >
                <CardTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  {movie.title}
                </CardTitle>
              </Link>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">{movie.genre}</Badge>
                <Badge variant="outline">{movie.rating}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {movieShowtimes.map((showtime) => (
                <Link
                  key={showtime.id}
                  to="/halls/$hallId"
                  params={{ hallId: showtime.hall.id }}
                  className="block p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 font-semibold">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(showtime.startTime)}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(showtime.date)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building className="h-3 w-3" />
                        <span>{showtime.hall.name}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {showtime.hall.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="by-hall" className="space-y-6 mt-6">
        {Object.values(byHall).map(({ hall, showtimes: hallShowtimes }) => (
          <Card key={hall.id}>
            <CardHeader>
              <Link to="/halls/$hallId" params={{ hallId: hall.id }} className="hover:underline">
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {hall.name}
                </CardTitle>
              </Link>
              <div className="flex gap-2 mt-2">
                {hall.features.map((feature) => (
                  <Badge key={feature} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {hallShowtimes.map((showtime) => (
                <Link
                  key={showtime.id}
                  to="/movies/$movieId"
                  params={{ movieId: showtime.movie.id }}
                  className="block p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 font-semibold">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(showtime.startTime)}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(showtime.date)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Film className="h-3 w-3" />
                        <span className="font-medium">{showtime.movie.title}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{showtime.movie.genre}</Badge>
                      <Badge variant="outline">{showtime.movie.rating}</Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  )
}

export default CombinedSchedule
