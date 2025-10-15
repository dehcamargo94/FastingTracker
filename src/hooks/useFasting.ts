import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue] as const
}

export function useFastingTimer() {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [startTime, setStartTime] = useLocalStorage<Date | null>('fastingStartTime', null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    if (startTime) {
      const now = new Date()
      const elapsed = Math.floor((now.getTime() - new Date(startTime).getTime()) / 1000)
      setTime(elapsed)
      setIsRunning(true)
    }
  }, [startTime])

  const startFasting = () => {
    const now = new Date()
    setStartTime(now)
    setIsRunning(true)
    setTime(0)
  }

  const pauseFasting = () => {
    setIsRunning(false)
  }

  const resetFasting = () => {
    setIsRunning(false)
    setTime(0)
    setStartTime(null)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getHours = () => Math.floor(time / 3600)

  return {
    isRunning,
    time,
    startTime,
    startFasting,
    pauseFasting,
    resetFasting,
    formatTime: () => formatTime(time),
    getHours
  }
}