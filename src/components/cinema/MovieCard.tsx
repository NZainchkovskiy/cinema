import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PlaceholderImage from '@/components/ui/placeholder-image'
import { formatDuration } from '@/lib/utils'
import type { Movie } from '@/types'
import { Clock } from 'lucide-react'

interface MovieCardProps {
  movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      to="/movies/$movieId"
      params={{ movieId: movie.id }}
      className="block group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full group-hover:scale-[1.02]">
        <CardContent className="p-0">
          <PlaceholderImage
            src={movie.coverImage}
            alt={movie.title}
            aspectRatio="poster"
            className="w-full"
          />
        </CardContent>
        <CardHeader className="space-y-2">
          <CardTitle className="line-clamp-1 text-lg">{movie.title}</CardTitle>
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <Badge variant="secondary">{movie.genre}</Badge>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{formatDuration(movie.duration)}</span>
            </div>
            <Badge variant="outline">{movie.rating}</Badge>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default MovieCard
