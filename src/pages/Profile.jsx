"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useHealth } from "../contexts/HealthContext"
import { useToast } from "../contexts/ToastContext"
import { FiUser, FiMail, FiCalendar, FiTrendingUp, FiTarget, FiAward } from "react-icons/fi"

function Profile() {
  const { user } = useAuth()
  const { logs, calculateStreak } = useHealth()
  const { showToast } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    showToast("Profile updated successfully!", "success")
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditData({
      name: user?.name || "",
      email: user?.email || "",
    })
    setIsEditing(false)
  }

  const streak = calculateStreak()
  const totalLogs = logs.length
  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"

  const achievements = [
    {
      id: 1,
      title: "First Log",
      description: "Completed your first health log",
      earned: totalLogs >= 1,
      icon: FiTarget,
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Logged health data for 7 consecutive days",
      earned: streak >= 7,
      icon: FiTrendingUp,
    },
    {
      id: 3,
      title: "Consistency Champion",
      description: "Completed 30 health logs",
      earned: totalLogs >= 30,
      icon: FiAward,
    },
  ]

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="page-header">
          <h1>Profile & Settings</h1>
          <p>Manage your account and view your progress</p>
        </div>

        <div className="profile-grid">
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Personal Information</h2>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="btn btn-outline btn-small">
                  Edit
                </button>
              )}
            </div>

            <div className="profile-info">
              <div className="profile-avatar">
                <div className="avatar-circle">{user?.name?.charAt(0).toUpperCase()}</div>
              </div>

              {isEditing ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label htmlFor="name">
                      <FiUser />
                      Full Name
                    </label>
                    <input type="text" id="name" name="name" value={editData.name} onChange={handleEditChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <FiMail />
                      Email Address
                    </label>
                    <input type="email" id="email" name="email" value={editData.email} onChange={handleEditChange} />
                  </div>

                  <div className="edit-actions">
                    <button onClick={handleSaveProfile} className="btn btn-primary">
                      Save Changes
                    </button>
                    <button onClick={handleCancelEdit} className="btn btn-ghost">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="profile-details">
                  <div className="detail-item">
                    <FiUser />
                    <div>
                      <label>Full Name</label>
                      <span>{user?.name}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <FiMail />
                    <div>
                      <label>Email Address</label>
                      <span>{user?.email}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <FiCalendar />
                    <div>
                      <label>Member Since</label>
                      <span>{joinDate}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="stats-card">
            <h2>Your Progress</h2>
            <div className="progress-stats">
              <div className="progress-stat">
                <div className="stat-icon">
                  <FiTrendingUp />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{streak}</span>
                  <span className="stat-label">Day Streak</span>
                </div>
              </div>

              <div className="progress-stat">
                <div className="stat-icon">
                  <FiTarget />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{totalLogs}</span>
                  <span className="stat-label">Total Logs</span>
                </div>
              </div>

              <div className="progress-stat">
                <div className="stat-icon">
                  <FiAward />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{achievements.filter((a) => a.earned).length}</span>
                  <span className="stat-label">Achievements</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="achievements-section">
          <h2>Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`achievement-card ${achievement.earned ? "earned" : "locked"}`}>
                <div className="achievement-icon">
                  <achievement.icon />
                </div>
                <div className="achievement-info">
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
                <div className="achievement-status">
                  {achievement.earned ? (
                    <span className="earned-badge">Earned</span>
                  ) : (
                    <span className="locked-badge">Locked</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="preferences-section">
          <h2>Preferences</h2>
          <div className="preferences-card">
            <div className="preference-item">
              <div className="preference-info">
                <h3>Daily Reminders</h3>
                <p>Get reminded to log your health data</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="preference-item">
              <div className="preference-info">
                <h3>Weekly Reports</h3>
                <p>Receive weekly health insights via email</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="preference-item">
              <div className="preference-info">
                <h3>Data Export</h3>
                <p>Download your health data as CSV</p>
              </div>
              <button className="btn btn-outline btn-small">Export Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
