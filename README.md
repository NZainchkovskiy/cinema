# Cinema Schedule Viewer

A modern, responsive single-page application for browsing movies and viewing cinema schedules across multiple halls.

## Features

### 🎬 Browse Current Movies (P1 - MVP)
- View all currently showing movies in a responsive grid layout
- Display movie details including cover image, title, genre, duration, and rating
- Click on any movie to see full details and available showtimes

### 🏢 View Movie Schedule by Hall (P2)
- Browse all cinema halls with their capacity and features
- View complete schedule for each hall showing all movies chronologically
- Filter showtimes for today and the next 7 days
- Automatic filtering of past showtimes

### 🎥 View Hall Schedule by Movie (P2)
- See all available showtimes for a selected movie across all halls
- Showtimes grouped by date for easy scanning
- Hall information clearly displayed for each showtime
- Quick navigation to hall details

### 📅 Complete Schedule View (Enhancement)
- Unified view showing all movies and halls
- Toggle between "By Movie" and "By Hall" views
- Comprehensive schedule for the next 7 days

## Tech Stack

- **Framework**: React 19.2
- **Build Tool**: Vite 7.x
- **Routing**: TanStack Router v1 (file-based routing)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript 5.x
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cinema-schedule-viewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
cinema-schedule-viewer/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Navigation, ErrorBoundary
│   │   └── cinema/          # MovieCard, HallCard, ShowtimeList, etc.
│   ├── routes/              # File-based routing
│   │   ├── __root.tsx       # Root layout with providers
│   │   ├── _layout.tsx      # Main layout with navigation
│   │   ├── _layout/
│   │   │   ├── movies.index.tsx
│   │   │   ├── movies.$movieId.tsx
│   │   │   ├── halls.index.tsx
│   │   │   ├── halls.$hallId.tsx
│   │   │   └── schedule.index.tsx
│   │   └── index.tsx        # Redirects to /movies
│   ├── contexts/
│   │   └── DataContext.tsx  # Global data provider
│   ├── services/
│   │   └── cinemaService.ts # Data fetching and filtering
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   └── main.tsx             # Application entry point
├── public/
│   ├── data/
│   │   ├── movies.json      # Movie data
│   │   ├── halls.json       # Hall data
│   │   └── schedule.json    # Showtime data
│   └── images/              # Movie cover images
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Data Format

### Movies (`public/data/movies.json`)
```json
{
  "id": "movie-1",
  "title": "Movie Title",
  "genre": "Action",
  "duration": 120,
  "rating": "PG-13",
  "coverImage": "/images/movie-cover.jpg",
  "description": "Movie description..."
}
```

### Halls (`public/data/halls.json`)
```json
{
  "id": "hall-1",
  "name": "IMAX Theater",
  "capacity": 400,
  "features": ["IMAX", "3D", "Dolby Atmos"]
}
```

### Schedule (`public/data/schedule.json`)
```json
{
  "id": "show-1",
  "movieId": "movie-1",
  "hallId": "hall-1",
  "date": "2025-10-22",
  "startTime": "14:00"
}
```

## Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: < 640px (1 column)
  - Tablet: 640-1024px (2-3 columns)
  - Desktop: > 1024px (4+ columns)

### Loading States
- Skeleton loaders for all views
- Smooth transitions between loading and loaded states

### Error Handling
- Global error boundary
- Graceful error messages
- Placeholder images for failed image loads

### Navigation
- Tab-based navigation between Movies, Halls, and Schedule
- Breadcrumb navigation with back buttons
- Quick links between related content

### Data Filtering
- Automatic filtering of past showtimes
- 7-day schedule window (today + 6 days)
- Chronological sorting of all showtimes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Fast HMR with Vite
- Code splitting with TanStack Router
- Lazy loading of images
- Optimized production build

## Contributing

This is a hackathon project focused on speed and user experience. Follow the project's constitution principles:
- Speed over perfection
- User experience first
- Visual polish matters
- Pragmatic quality (manual testing)
- Scope discipline

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Built with [Vite](https://vite.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Routing powered by [TanStack Router](https://tanstack.com/router)
- Icons from [Lucide](https://lucide.dev/)
