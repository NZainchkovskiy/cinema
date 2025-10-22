import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import PlaceholderImage from '@/components/ui/placeholder-image'
import { formatDuration } from '@/lib/utils'
import type { Movie } from '@/types'
import { Clock, Star } from 'lucide-react'

interface MovieDetailProps {
  movie: Movie
}

const MovieDetail = ({ movie }: MovieDetailProps) => {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <div className="p-4">
            <PlaceholderImage
              src={movie.coverImage}
              alt={movie.title}
              aspectRatio="poster"
              className="w-full rounded-lg"
            />
          </div>

          <div className="p-6 space-y-4">
            <CardHeader className="p-0">
              <CardTitle className="text-3xl">{movie.title}</CardTitle>
              <CardDescription className="text-base mt-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge variant="secondary" className="text-sm">
                    {movie.genre}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatDuration(movie.duration)}</span>
                  </div>
                  <Badge variant="outline" className="text-sm flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {movie.rating}
                  </Badge>
                </div>
              </CardDescription>
            </CardHeader>

            <Separator />

            <CardContent className="p-0">
              <h3 className="font-semibold text-lg mb-2">Synopsis</h3>
              <p className="text-muted-foreground leading-relaxed">
                {movie.description}
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default MovieDetail
