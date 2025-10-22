import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { Movie, Hall, Showtime } from '@/types'
import { loadMovies, loadHalls, loadSchedule } from '@/services/cinemaService'

interface DataContextType {
  movies: Movie[]
  halls: Hall[]
  schedule: Showtime[]
  isLoading: boolean
  error: Error | null
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

interface DataProviderProps {
  children: ReactNode
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [halls, setHalls] = useState<Hall[]>([])
  const [schedule, setSchedule] = useState<Showtime[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [moviesData, hallsData, scheduleData] = await Promise.all([
          loadMovies(),
          loadHalls(),
          loadSchedule(),
        ])
        setMovies(moviesData)
        setHalls(hallsData)
        setSchedule(scheduleData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load data'))
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <DataContext.Provider value={{ movies, halls, schedule, isLoading, error }}>
      {children}
    </DataContext.Provider>
  )
}
