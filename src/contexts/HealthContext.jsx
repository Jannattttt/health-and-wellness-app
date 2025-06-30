"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

const HealthContext = createContext()

export function useHealth() {
  return useContext(HealthContext)
}

export function HealthProvider({ children }) {
  const { user } = useAuth()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadLogs()
    }
  }, [user])

  const loadLogs = () => {
    if (!user) return

    const userLogs = JSON.parse(localStorage.getItem(`healthLogs_${user.id}`) || "[]")
    setLogs(userLogs)
  }

  const addLog = (logData) => {
    return new Promise((resolve) => {
      setLoading(true)
      setTimeout(() => {
        const newLog = {
          id: Date.now().toString(),
          userId: user.id,
          ...logData,
          createdAt: new Date().toISOString(),
        }

        const updatedLogs = [...logs, newLog]
        setLogs(updatedLogs)
        localStorage.setItem(`healthLogs_${user.id}`, JSON.stringify(updatedLogs))
        setLoading(false)
        resolve(newLog)
      }, 500)
    })
  }

  const getLogsByDateRange = (startDate, endDate) => {
    return logs.filter((log) => {
      const logDate = new Date(log.date)
      return logDate >= startDate && logDate <= endDate
    })
  }

  const getWeeklyStats = () => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const weekLogs = logs.filter((log) => new Date(log.date) >= oneWeekAgo)

    if (weekLogs.length === 0) return null

    const avgSleep = weekLogs.reduce((sum, log) => sum + log.sleep, 0) / weekLogs.length
    const avgWater = weekLogs.reduce((sum, log) => sum + log.water, 0) / weekLogs.length
    const totalLogs = weekLogs.length

    return {
      avgSleep: avgSleep.toFixed(1),
      avgWater: avgWater.toFixed(1),
      totalLogs,
      streak: calculateStreak(),
    }
  }

  const calculateStreak = () => {
    if (logs.length === 0) return 0

    const sortedLogs = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date))
    let streak = 0
    let currentDate = new Date()

    for (const log of sortedLogs) {
      const logDate = new Date(log.date)
      const diffDays = Math.floor((currentDate - logDate) / (1000 * 60 * 60 * 24))

      if (diffDays === streak) {
        streak++
        currentDate = logDate
      } else {
        break
      }
    }

    return streak
  }

  const value = {
    logs,
    loading,
    addLog,
    getLogsByDateRange,
    getWeeklyStats,
    calculateStreak,
  }

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>
}
