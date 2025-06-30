"use client"

import { useMemo } from "react"
import { useHealth } from "../contexts/HealthContext"
import { useAuth } from "../contexts/AuthContext"
import Chart from "../components/Chart"
import { FiTrendingUp, FiDroplet, FiMoon, FiHeart, FiCalendar, FiTarget } from "react-icons/fi"

function Dashboard() {
  const { logs, getWeeklyStats } = useHealth()
  const { user } = useAuth()

  const weeklyStats = getWeeklyStats()

  const chartData = useMemo(() => {
    const last7Days = []
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      const dayLog = logs.find((log) => log.date === dateStr)

      last7Days.push({
        date: dateStr,
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
        sleep: dayLog?.sleep || 0,
        water: dayLog?.water || 0,
        mood: dayLog?.mood || "neutral",
      })
    }

    return last7Days
  }, [logs])

  const sleepData = chartData.map((day) => ({
    label: day.label,
    value: day.sleep,
  }))

  const waterData = chartData.map((day) => ({
    label: day.label,
    value: day.water,
  }))

  const moodData = chartData.map((day) => ({
    label: day.label,
    value: day.mood === "happy" ? 3 : day.mood === "neutral" ? 2 : day.mood === "stressed" ? 1 : 0,
  }))

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: `${color}20`, color }}>
        <Icon />
      </div>
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <div className="stat-value">{value}</div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
      </div>
    </div>
  )

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name}!</h1>
            <p>Here's your health overview</p>
          </div>
          <div className="dashboard-date">
            <FiCalendar />
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {logs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <FiTarget />
            </div>
            <h2>Start Your Health Journey</h2>
            <p>You haven't logged any health data yet. Start by adding your first entry!</p>
            <a href="/log" className="btn btn-primary">
              Add Your First Log
            </a>
          </div>
        ) : (
          <>
            <div className="stats-grid">
              <StatCard
                icon={FiMoon}
                title="Average Sleep"
                value={weeklyStats ? `${weeklyStats.avgSleep}h` : "0h"}
                subtitle="This week"
                color="#8B5CF6"
              />
              <StatCard
                icon={FiDroplet}
                title="Average Water"
                value={weeklyStats ? `${weeklyStats.avgWater}L` : "0L"}
                subtitle="This week"
                color="#06B6D4"
              />
              <StatCard
                icon={FiTrendingUp}
                title="Streak"
                value={`${weeklyStats?.streak || 0} days`}
                subtitle="Keep it up!"
                color="#10B981"
              />
              <StatCard icon={FiHeart} title="Total Logs" value={logs.length} subtitle="All time" color="#F59E0B" />
            </div>

            <div className="charts-grid">
              <div className="chart-card">
                <Chart data={sleepData} type="bar" title="Sleep Hours (Last 7 Days)" color="#8B5CF6" />
              </div>

              <div className="chart-card">
                <Chart data={waterData} type="line" title="Water Intake (Last 7 Days)" color="#06B6D4" />
              </div>
            </div>

            <div className="insights-section">
              <h2>Weekly Insights</h2>
              <div className="insights-grid">
                <div className="insight-card">
                  <h3>Sleep Pattern</h3>
                  <p>
                    {weeklyStats && Number.parseFloat(weeklyStats.avgSleep) >= 7
                      ? "Great job! You're getting enough sleep."
                      : "Try to get more sleep for better health."}
                  </p>
                </div>
                <div className="insight-card">
                  <h3>Hydration</h3>
                  <p>
                    {weeklyStats && Number.parseFloat(weeklyStats.avgWater) >= 2
                      ? "Excellent hydration levels!"
                      : "Consider drinking more water daily."}
                  </p>
                </div>
                <div className="insight-card">
                  <h3>Consistency</h3>
                  <p>
                    {weeklyStats?.streak > 3
                      ? "Amazing consistency! Keep up the great work."
                      : "Try to log your health data daily for better insights."}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard
