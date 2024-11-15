import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function formatTime({ hours, minutes }) {
  const pad = (num) => String(num).padStart(2, '0')
  return `${pad(hours)}:${pad(minutes)}`
}

export function formatSchedule(schedule) {
  return Object.entries(schedule).map(([day, times]) => ({
    day,
    startTime: formatTime(times[0]),
    endTime: formatTime(times[1]),
  }))
}

export function generateNewId() {
  return Math.random().toString(36).substring(2, 8)
}
