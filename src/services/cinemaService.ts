import type {
  Movie,
  Hall,
  Showtime,
  EnrichedShowtime,
  ShowtimeWithHall,
  ShowtimeWithMovie,
  DailySchedule,
} from '@/types'

// Data loading functions
export async function loadMovies(): Promise<Movie[]> {
  const response = await fetch('/data/movies.json')
  if (!response.ok) {
    throw new Error('Failed to load movies')
  }
  return response.json()
}

export async function loadHalls(): Promise<Hall[]> {
  const response = await fetch('/data/halls.json')
  if (!response.ok) {
    throw new Error('Failed to load halls')
  }
  return response.json()
}

export async function loadSchedule(): Promise<Showtime[]> {
  const response = await fetch('/data/schedule.json')
  if (!response.ok) {
    throw new Error('Failed to load schedule')
  }
  return response.json()
}

// Helper function to check if a showtime is upcoming
export function isShowtimeUpcoming(showtime: Showtime): boolean {
  const now = new Date()
  const showtimeStart = new Date(`${showtime.date}T${showtime.startTime}`)
  return showtimeStart > now
}

// Get all movies
export async function getAllMovies(): Promise<Movie[]> {
  return loadMovies()
}

// Get movie by ID
export async function getMovieById(movieId: string): Promise<Movie | undefined> {
  const movies = await loadMovies()
  return movies.find((m) => m.id === movieId)
}

// Get hall by ID
export async function getHallById(hallId: string): Promise<Hall | undefined> {
  const halls = await loadHalls()
  return halls.find((h) => h.id === hallId)
}

// Get all halls
export async function getAllHalls(): Promise<Hall[]> {
  return loadHalls()
}

// Get all showtimes for a specific movie across all halls
export async function getMovieShowtimes(
  movieId: string,
  date?: string
): Promise<ShowtimeWithHall[]> {
  const [schedule, halls] = await Promise.all([loadSchedule(), loadHalls()])

  let filteredShowtimes = schedule
    .filter((s) => s.movieId === movieId)
    .filter(isShowtimeUpcoming)

  if (date) {
    filteredShowtimes = filteredShowtimes.filter((s) => s.date === date)
  }

  return filteredShowtimes
    .map((showtime) => {
      const hall = halls.find((h) => h.id === showtime.hallId)
      if (!hall) return null
      return {
        ...showtime,
        hall,
      }
    })
    .filter((s): s is ShowtimeWithHall => s !== null)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date)
      if (dateCompare !== 0) return dateCompare
      return a.startTime.localeCompare(b.startTime)
    })
}

// Get complete schedule for a specific hall
export async function getHallSchedule(
  hallId: string,
  date?: string
): Promise<ShowtimeWithMovie[]> {
  const [schedule, movies] = await Promise.all([loadSchedule(), loadMovies()])

  let filteredShowtimes = schedule
    .filter((s) => s.hallId === hallId)
    .filter(isShowtimeUpcoming)

  if (date) {
    filteredShowtimes = filteredShowtimes.filter((s) => s.date === date)
  }

  return filteredShowtimes
    .map((showtime) => {
      const movie = movies.find((m) => m.id === showtime.movieId)
      if (!movie) return null
      return {
        ...showtime,
        movie,
      }
    })
    .filter((s): s is ShowtimeWithMovie => s !== null)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date)
      if (dateCompare !== 0) return dateCompare
      return a.startTime.localeCompare(b.startTime)
    })
}

// Get daily schedule (all showtimes for a specific date)
export async function getDailySchedule(date?: string): Promise<DailySchedule[]> {
  const [schedule, movies, halls] = await Promise.all([
    loadSchedule(),
    loadMovies(),
    loadHalls(),
  ])

  let filteredShowtimes = schedule.filter(isShowtimeUpcoming)

  if (date) {
    filteredShowtimes = filteredShowtimes.filter((s) => s.date === date)
  }

  const enrichedShowtimes: EnrichedShowtime[] = filteredShowtimes
    .map((showtime) => {
      const movie = movies.find((m) => m.id === showtime.movieId)
      const hall = halls.find((h) => h.id === showtime.hallId)
      if (!movie || !hall) return null
      return {
        ...showtime,
        movie,
        hall,
      }
    })
    .filter((s): s is EnrichedShowtime => s !== null)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date)
      if (dateCompare !== 0) return dateCompare
      return a.startTime.localeCompare(b.startTime)
    })

  // Group by date
  const groupedByDate = enrichedShowtimes.reduce(
    (acc, showtime) => {
      const existing = acc.find((d) => d.date === showtime.date)
      if (existing) {
        existing.showtimes.push(showtime)
      } else {
        acc.push({
          date: showtime.date,
          showtimes: [showtime],
        })
      }
      return acc
    },
    [] as DailySchedule[]
  )

  return groupedByDate
}
