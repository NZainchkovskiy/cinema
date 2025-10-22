import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PlaceholderImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: 'poster' | 'banner' | 'square'
}

const PlaceholderImage = ({
  src,
  alt,
  className,
  aspectRatio = 'poster',
}: PlaceholderImageProps) => {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const aspectRatioClasses = {
    poster: 'aspect-[2/3]',
    banner: 'aspect-[16/9]',
    square: 'aspect-square',
  }

  if (imageError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted',
          aspectRatioClasses[aspectRatio],
          className
        )}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <ImageOff className="h-8 w-8" />
          <span className="text-xs">Image unavailable</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', aspectRatioClasses[aspectRatio], className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="text-muted-foreground text-xs">Loading...</div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-opacity',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}

export default PlaceholderImage
