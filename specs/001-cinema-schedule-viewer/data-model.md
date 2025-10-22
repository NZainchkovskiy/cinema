# Data Model: Cinema Schedule Viewer

**Generated**: 2025-10-22
**Source**: Feature specification entities and requirements

## Core Entities

### Movie
Represents a film currently showing at the cinema.

```typescript
interface Movie {
  id: string;                // Unique identifier
  title: string;              // Movie title (required, max 200 chars)
  genre: string;              // Genre classification (e.g., "Action", "Drama")
  duration: number;           // Runtime in minutes (required, min: 1, max: 500)
  rating: string;             // Age rating (e.g., "G", "PG", "PG-13", "R")
  coverImage: string;         // URL to cover image (can be relative or absolute)
  description: string;        // Movie synopsis (max 1000 chars)
}
```

**Validation Rules**:
- `id`: Non-empty string, unique across all movies
- `title`: Required, 1-200 characters
- `genre`: Required, from predefined list
- `duration`: Positive integer, 1-500 minutes
- `rating`: Must match standard rating system
- `coverImage`: Valid URL format or relative path
- `description`: Optional, max 1000 characters

**State Transitions**: None (static data)

### Hall
Represents a cinema screening room.

```typescript
interface Hall {
  id: string;                 // Unique identifier
  name: string;               // Hall name/number (e.g., "Hall 1", "IMAX Theater")
  capacity: number;           // Total seat count (required, min: 1)
  features: string[];         // Special features (e.g., ["IMAX", "3D", "Dolby Atmos"])
}
```

**Validation Rules**:
- `id`: Non-empty string, unique across all halls
- `name`: Required, 1-100 characters
- `capacity`: Positive integer, minimum 1
- `features`: Array of strings, can be empty

**State Transitions**: None (static data)

### Showtime
Represents a scheduled screening linking a movie to a hall at a specific time.

```typescript
interface Showtime {
  id: string;                 // Unique identifier
  movieId: string;            // Reference to Movie.id (required)
  hallId: string;             // Reference to Hall.id (required)
  date: string;               // Date in YYYY-MM-DD format (required)
  startTime: string;          // Time in HH:MM format (24-hour, required)
  endTime?: string;           // Calculated from startTime + movie.duration
}
```

**Validation Rules**:
- `id`: Non-empty string, unique across all showtimes
- `movieId`: Must reference existing Movie.id
- `hallId`: Must reference existing Hall.id
- `date`: Valid date in YYYY-MM-DD format
- `startTime`: Valid time in HH:MM format (00:00-23:59)
- No overlapping showtimes in the same hall
- Showtimes must be within the 7-day window from today

**Relationships**:
- Many-to-One with Movie (multiple showtimes per movie)
- Many-to-One with Hall (multiple showtimes per hall)
- Unique constraint on (hallId, date, startTime) combination

**State Transitions**:
- Active → Past (when current time > startTime)

## Derived Data Structures

### MovieWithShowtimes
Extended movie information with associated showtimes.

```typescript
interface MovieWithShowtimes extends Movie {
  showtimes: ShowtimeWithHall[];
}

interface ShowtimeWithHall extends Showtime {
  hall: Hall;
}
```

### HallSchedule
Hall information with its complete schedule.

```typescript
interface HallSchedule {
  hall: Hall;
  schedule: ShowtimeWithMovie[];
}

interface ShowtimeWithMovie extends Showtime {
  movie: Movie;
}
```

### DailySchedule
Complete schedule organized by date.

```typescript
interface DailySchedule {
  date: string;                    // YYYY-MM-DD format
  showtimes: EnrichedShowtime[];
}

interface EnrichedShowtime extends Showtime {
  movie: Movie;
  hall: Hall;
}
```

## Data Constraints

### Business Rules

1. **No Overlapping Showtimes**:
   - A hall cannot have overlapping movie screenings
   - Minimum 15-minute buffer between showtimes for cleaning

2. **Date Range Limitation**:
   - Only showtimes for today + next 6 days are valid
   - Past showtimes (already started) are filtered from display

3. **Showtime Duration**:
   - Calculated as: endTime = startTime + movie.duration + 15 minutes (cleaning buffer)

4. **Required Relationships**:
   - Every showtime must reference valid movie and hall
   - Orphaned showtimes (missing movie/hall) are invalid

### Data Integrity Rules

```typescript
// Validation helper functions
function validateShowtimeNoOverlap(
  newShowtime: Showtime,
  existingShowtimes: Showtime[]
): boolean {
  const newStart = parseTime(newShowtime.startTime);
  const newEnd = addMinutes(newStart, getMovieDuration(newShowtime.movieId) + 15);

  return !existingShowtimes
    .filter(s => s.hallId === newShowtime.hallId && s.date === newShowtime.date)
    .some(s => {
      const existingStart = parseTime(s.startTime);
      const existingEnd = addMinutes(existingStart, getMovieDuration(s.movieId) + 15);
      return (newStart < existingEnd && newEnd > existingStart);
    });
}

function validateDateInRange(date: string): boolean {
  const showDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 6);

  return showDate >= today && showDate <= maxDate;
}

function isShowtimeUpcoming(showtime: Showtime): boolean {
  const now = new Date();
  const showtimeStart = new Date(`${showtime.date}T${showtime.startTime}`);
  return showtimeStart > now;
}
```

## Sample Data Structure

### movies.json
```json
[
  {
    "id": "movie-1",
    "title": "Oppenheimer",
    "genre": "Drama",
    "duration": 180,
    "rating": "R",
    "coverImage": "/images/oppenheimer.jpg",
    "description": "The story of American scientist J. Robert Oppenheimer..."
  },
  {
    "id": "movie-2",
    "title": "Barbie",
    "genre": "Comedy",
    "duration": 114,
    "rating": "PG-13",
    "coverImage": "/images/barbie.jpg",
    "description": "Barbie suffers a crisis that leads her to question her world..."
  }
]
```

### halls.json
```json
[
  {
    "id": "hall-1",
    "name": "Main Theater",
    "capacity": 250,
    "features": ["Dolby Atmos", "Recliner Seats"]
  },
  {
    "id": "hall-2",
    "name": "IMAX",
    "capacity": 400,
    "features": ["IMAX", "3D", "Laser Projection"]
  }
]
```

### schedule.json
```json
[
  {
    "id": "show-1",
    "movieId": "movie-1",
    "hallId": "hall-1",
    "date": "2025-10-22",
    "startTime": "14:00"
  },
  {
    "id": "show-2",
    "movieId": "movie-1",
    "hallId": "hall-1",
    "date": "2025-10-22",
    "startTime": "18:00"
  },
  {
    "id": "show-3",
    "movieId": "movie-2",
    "hallId": "hall-2",
    "date": "2025-10-22",
    "startTime": "15:30"
  }
]
```

## Query Patterns

### Common Queries

1. **Get all current movies**
```typescript
const getCurrentMovies = (): Movie[] => movies;
```

2. **Get movie showtimes by date**
```typescript
const getMovieShowtimes = (movieId: string, date: string): Showtime[] =>
  schedule
    .filter(s => s.movieId === movieId && s.date === date)
    .filter(isShowtimeUpcoming)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
```

3. **Get hall schedule**
```typescript
const getHallSchedule = (hallId: string, date: string): ShowtimeWithMovie[] =>
  schedule
    .filter(s => s.hallId === hallId && s.date === date)
    .filter(isShowtimeUpcoming)
    .map(s => ({
      ...s,
      movie: movies.find(m => m.id === s.movieId)!
    }))
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
```

4. **Get daily schedule**
```typescript
const getDailySchedule = (date: string): EnrichedShowtime[] =>
  schedule
    .filter(s => s.date === date)
    .filter(isShowtimeUpcoming)
    .map(s => ({
      ...s,
      movie: movies.find(m => m.id === s.movieId)!,
      hall: halls.find(h => h.id === s.hallId)!
    }))
    .sort((a, b) => {
      // Sort by hall, then by time
      const hallCompare = a.hall.name.localeCompare(b.hall.name);
      return hallCompare !== 0 ? hallCompare : a.startTime.localeCompare(b.startTime);
    });
```

## Indexing Strategy

For optimal query performance with static JSON data:

1. **Pre-process on Load**:
   - Create lookup maps for O(1) access
   - Pre-calculate derived data

```typescript
// Create indexes on application startup
const movieIndex = new Map(movies.map(m => [m.id, m]));
const hallIndex = new Map(halls.map(h => [h.id, h]));
const showtimesByMovie = new Map<string, Showtime[]>();
const showtimesByHall = new Map<string, Showtime[]>();

schedule.forEach(showtime => {
  // Index by movie
  if (!showtimesByMovie.has(showtime.movieId)) {
    showtimesByMovie.set(showtime.movieId, []);
  }
  showtimesByMovie.get(showtime.movieId)!.push(showtime);

  // Index by hall
  if (!showtimesByHall.has(showtime.hallId)) {
    showtimesByHall.set(showtime.hallId, []);
  }
  showtimesByHall.get(showtime.hallId)!.push(showtime);
});
```

2. **Cache Computed Values**:
   - Cache filtered/sorted results
   - Invalidate only when date changes

## Data Volume Estimates

Based on typical cinema operations:

- **Movies**: 10-20 active movies
- **Halls**: 3-10 screening rooms
- **Showtimes**:
  - Per hall: 4-6 showings per day
  - Total: ~200-400 showtimes for 7-day window
- **Total JSON size**: ~50-100KB (easily cached in memory)

## Migration & Extensibility

Future enhancements could include:

1. **Seat Selection**: Add `availableSeats` to Showtime
2. **Pricing**: Add `price` field to Showtime or create PriceCategory entity
3. **Booking**: Add Booking entity with user and seat information
4. **Dynamic Data**: Replace static JSON with API endpoints
5. **Real-time Updates**: WebSocket for availability updates

The current data model is designed to be extensible without breaking changes to core entities.