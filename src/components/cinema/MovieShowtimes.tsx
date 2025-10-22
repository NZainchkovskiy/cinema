import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatTime, formatDate } from '@/lib/utils'
import type { ShowtimeWithHall } from '@/types'
import { Clock, Calendar, Building, ExternalLink } from 'lucide-react'

interface MovieShowtimesProps {
  showtimes: ShowtimeWithHall[]
}

const MovieShowtimes = ({ showtimes }: MovieShowtimesProps) => {
  if (showtimes.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No upcoming showtimes available</p>
        </CardContent>
      </Card>
    )
  }

  // Group by date
  const groupedShowtimes = showtimes.reduce(
    (acc, showtime) => {
      if (!acc[showtime.date]) {
        acc[showtime.date] = []
      }
      acc[showtime.date].push(showtime)
      return acc
    },
    {} as Record<string, ShowtimeWithHall[]>
  )

  return (
    <div className="space-y-6">
      {Object.entries(groupedShowtimes).map(([date, dateShowtimes]) => (
        <Card key={date}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5" />
              {formatDate(date)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dateShowtimes.map((showtime) => (
              <div
                key={showtime.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 font-semibold text-lg">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(showtime.startTime)}</span>
                    </div>
                    <Link
                      to="/halls/$hallId"
                      params={{ hallId: showtime.hall.id }}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Building className="h-3 w-3" />
                      <span>{showtime.hall.name}</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                  {showtime.hall.features.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {showtime.hall.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    {showtime.hall.capacity} seats
                  </div>
                  <Link to="/halls/$hallId" params={{ hallId: showtime.hall.id }}>
                    <Button variant="outline" size="sm">
                      View Hall
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default MovieShowtimes
