// Core entities from data-model.md

export interface Movie {
  id: string
  title: string
  genre: string
  duration: number // in minutes
  rating: string
  coverImage: string
  description: string
}

export interface Hall {
  id: string
  name: string
  capacity: number
  features: string[]
}

export interface Showtime {
  id: string
  movieId: string
  hallId: string
  date: string // YYYY-MM-DD format
  startTime: string // HH:MM format (24-hour)
  endTime?: string // Calculated from startTime + movie.duration
}

// Derived data structures

export interface ShowtimeWithHall extends Showtime {
  hall: Hall
}

export interface MovieWithShowtimes extends Movie {
  showtimes: ShowtimeWithHall[]
}

export interface ShowtimeWithMovie extends Showtime {
  movie: Movie
}

export interface HallSchedule {
  hall: Hall
  schedule: ShowtimeWithMovie[]
}

export interface EnrichedShowtime extends Showtime {
  movie: Movie
  hall: Hall
}

export interface DailySchedule {
  date: string // YYYY-MM-DD format
  showtimes: EnrichedShowtime[]
}
