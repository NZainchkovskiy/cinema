import { Link, useLocation } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Film, Building, Calendar } from 'lucide-react'

const Navigation = () => {
  const location = useLocation()

  // Determine active tab based on current path
  const getActiveTab = () => {
    const pathname = location.pathname
    if (pathname.startsWith('/halls')) return 'halls'
    if (pathname.startsWith('/schedule')) return 'schedule'
    return 'movies'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Film className="h-6 w-6" />
              <h1 className="text-xl font-bold">Cinema Schedule</h1>
            </Link>
          </div>

          <Tabs value={getActiveTab()} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <Link to="/movies">
                <TabsTrigger value="movies" className="w-full gap-2">
                  <Film className="h-4 w-4" />
                  <span className="hidden sm:inline">Movies</span>
                </TabsTrigger>
              </Link>
              <Link to="/halls">
                <TabsTrigger value="halls" className="w-full gap-2">
                  <Building className="h-4 w-4" />
                  <span className="hidden sm:inline">Halls</span>
                </TabsTrigger>
              </Link>
              <Link to="/schedule">
                <TabsTrigger value="schedule" className="w-full gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Schedule</span>
                </TabsTrigger>
              </Link>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </header>
  )
}

export default Navigation
