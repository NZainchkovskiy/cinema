import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatTime, formatDate } from '@/lib/utils'
import type { ShowtimeWithMovie } from '@/types'
import { Clock, Calendar } from 'lucide-react'

interface ShowtimeListProps {
  showtimes: ShowtimeWithMovie[]
  groupByDate?: boolean
}

const ShowtimeList = ({ showtimes, groupByDate = true }: ShowtimeListProps) => {
  if (showtimes.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No showtimes available
        </CardContent>
      </Card>
    )
  }

  if (!groupByDate) {
    return (
      <div className="space-y-4">
        {showtimes.map((showtime) => (
          <Card key={showtime.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{showtime.movie.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(showtime.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(showtime.startTime)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{showtime.movie.genre}</Badge>
                  <Badge variant="outline">{showtime.movie.rating}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
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
    {} as Record<string, ShowtimeWithMovie[]>
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
                <div className="space-y-1">
                  <h4 className="font-semibold">{showtime.movie.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatTime(showtime.startTime)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{showtime.movie.genre}</Badge>
                  <Badge variant="outline">{showtime.movie.rating}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ShowtimeList
