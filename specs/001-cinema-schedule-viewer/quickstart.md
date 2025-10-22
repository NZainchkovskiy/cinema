# Quick Start Guide: Cinema Schedule Viewer

**Time to First Running App**: ~5 minutes

## Prerequisites

- Node.js 20+ installed
- npm or pnpm package manager
- Git (optional, for version control)

## Setup Instructions

### 1. Create Project (1 minute)

```bash
# Create Vite project with React + TypeScript
npm create vite@latest cinema-schedule-viewer -- --template react-ts
cd cinema-schedule-viewer
npm install
```

### 2. Install Core Dependencies (2 minutes)

```bash
# Routing
npm install @tanstack/react-router

# Development tools
npm install -D @tanstack/router-plugin @tanstack/router-devtools

# UI Components & Styling
npx shadcn@latest init -d

# When prompted during shadcn init:
# - Would you like to use TypeScript? → Yes
# - Which style would you like to use? → Default
# - Which color would you like to use as base? → Slate
# - Where is your global CSS file? → src/index.css
# - Would you like to use CSS variables? → Yes
# - Where is your tailwind.config.js? → tailwind.config.js
# - Configure import alias? → src/*
# - Configure components.json? → Yes

# Add required shadcn components
npx shadcn@latest add tabs card badge skeleton alert button separator scroll-area
```

### 3. Configure Vite (30 seconds)

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tanstackRouter(), // Must be before react
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 4. Create Project Structure (1 minute)

```bash
# Create directory structure
mkdir -p src/routes
mkdir -p src/components/{ui,layout,cinema}
mkdir -p src/lib
mkdir -p src/types
mkdir -p src/services
mkdir -p public/data
mkdir -p public/images

# Create route files
touch src/routes/__root.tsx
touch src/main.tsx
```

### 5. Setup Router (30 seconds)

Replace `src/main.tsx`:

```typescript
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './index.css'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent'
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
```

Create `src/routes/__root.tsx`:

```typescript
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})
```

### 6. Add Sample Data (1 minute)

Create `public/data/movies.json`:

```json
[
  {
    "id": "movie-1",
    "title": "Oppenheimer",
    "genre": "Drama",
    "duration": 180,
    "rating": "R",
    "coverImage": "https://via.placeholder.com/300x450",
    "description": "The story of American scientist J. Robert Oppenheimer."
  },
  {
    "id": "movie-2",
    "title": "Barbie",
    "genre": "Comedy",
    "duration": 114,
    "rating": "PG-13",
    "coverImage": "https://via.placeholder.com/300x450",
    "description": "Barbie discovers the real world."
  }
]
```

Create `public/data/halls.json`:

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
    "features": ["IMAX", "3D"]
  }
]
```

Create `public/data/schedule.json`:

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
    "startTime": "19:00"
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

### 7. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app running!

## Next Steps

### Priority 1 (P1) - Core Features
1. Create movies list view (`src/routes/movies/index.tsx`)
2. Add movie cards with shadcn/ui Card component
3. Implement basic navigation tabs

### Priority 2 (P2) - Schedule Views
1. Add movie detail view with showtimes
2. Create halls list and schedule views
3. Implement date filtering

### Priority 3 (P3) - Enhancements
1. Add combined schedule view
2. Implement advanced filtering
3. Polish UI with transitions

## Development Commands

```bash
# Development
npm run dev           # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Add more shadcn components as needed
npx shadcn@latest add [component-name]
```

## Project Structure

```
cinema-schedule-viewer/
├── src/
│   ├── routes/          # File-based routing
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── layout/     # Layout components
│   │   └── cinema/     # Cinema-specific components
│   ├── lib/            # Utilities
│   ├── types/          # TypeScript types
│   └── services/       # Data services
├── public/
│   ├── data/           # JSON data files
│   └── images/         # Movie covers
└── package.json
```

## Troubleshooting

### Common Issues

1. **Route generation error**: Run `npm run dev` to trigger route generation
2. **Missing types**: Restart TypeScript server in your IDE
3. **Tailwind not working**: Ensure `src/index.css` has Tailwind directives
4. **Components not found**: Check shadcn components are installed

### Quick Fixes

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Regenerate routes
npm run dev
```

## Resources

- [Vite Documentation](https://vite.dev/)
- [React 19 Documentation](https://react.dev/)
- [TanStack Router](https://tanstack.com/router/latest)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Sample Component

Here's a starter movie card component:

```tsx
// src/components/cinema/MovieCard.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface MovieCardProps {
  movie: {
    id: string
    title: string
    genre: string
    duration: number
    rating: string
    coverImage: string
  }
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-0">
        <img
          src={movie.coverImage}
          alt={movie.title}
          className="w-full h-[300px] object-cover"
        />
      </CardContent>
      <CardHeader>
        <CardTitle className="line-clamp-1">{movie.title}</CardTitle>
        <CardDescription className="flex gap-2 items-center">
          <Badge variant="secondary">{movie.genre}</Badge>
          <span className="text-xs">{movie.duration} min</span>
          <Badge>{movie.rating}</Badge>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
```

You're now ready to build your cinema schedule viewer! 🎬