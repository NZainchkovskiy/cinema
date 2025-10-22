import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date utility functions

/**
 * Format a date string (YYYY-MM-DD) to a human-readable format
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "Mon, Oct 22")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00')
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', options)
}

/**
 * Format a time string (HH:MM) to 12-hour format
 * @param timeString - Time in HH:MM format (24-hour)
 * @returns Formatted time string (e.g., "2:00 PM")
 */
export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

/**
 * Format movie duration from minutes to hours and minutes
 * @param minutes - Duration in minutes
 * @returns Formatted duration (e.g., "2h 30m")
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

/**
 * Generate an array of dates starting from today for the next N days
 * @param days - Number of days to generate (default 7)
 * @returns Array of date strings in YYYY-MM-DD format
 */
export function generateDateRange(days: number = 7): string[] {
  const dates: string[] = []
  const today = new Date()

  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push(formatDateToYYYYMMDD(date))
  }

  return dates
}

/**
 * Convert a Date object to YYYY-MM-DD format
 * @param date - Date object
 * @returns Date string in YYYY-MM-DD format
 */
export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Get today's date in YYYY-MM-DD format
 * @returns Today's date string
 */
export function getTodayDate(): string {
  return formatDateToYYYYMMDD(new Date())
}

/**
 * Check if a date string is today
 * @param dateString - Date in YYYY-MM-DD format
 * @returns True if the date is today
 */
export function isToday(dateString: string): boolean {
  return dateString === getTodayDate()
}

/**
 * Get a human-readable label for a date (e.g., "Today", "Tomorrow", or formatted date)
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Date label
 */
export function getDateLabel(dateString: string): string {
  const today = getTodayDate()
  const tomorrow = formatDateToYYYYMMDD(new Date(new Date().setDate(new Date().getDate() + 1)))

  if (dateString === today) return 'Today'
  if (dateString === tomorrow) return 'Tomorrow'
  return formatDate(dateString)
}
