export interface FastingSession {
  id: string
  startTime: Date
  endTime?: Date
  duration: number
  goalHours: number
  completed: boolean
}

export interface UserProfile {
  weight: number
  height: number
  bmi: number
  fastingGoal: number
}

export interface FastingBenefit {
  hours: number
  title: string
  description: string
  color: string
  scientificBasis?: string
}

export interface MotivationalQuote {
  text: string
  author?: string
  category: 'motivation' | 'health' | 'discipline'
}