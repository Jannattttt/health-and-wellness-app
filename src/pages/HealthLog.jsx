"use client"

import { useState } from "react"
import { useHealth } from "../contexts/HealthContext"
import { useToast } from "../contexts/ToastContext"
import LoadingSpinner from "../components/LoadingSpinner"
import { FiCalendar, FiMoon, FiDroplet, FiSmile, FiFileText, FiSave } from "react-icons/fi"

function HealthLog() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    sleep: 8,
    water: 2,
    mood: "neutral",
    symptoms: "",
  })
  const [errors, setErrors] = useState({})

  const { addLog, loading } = useHealth()
  const { showToast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    if (!formData.sleep || formData.sleep < 0 || formData.sleep > 24) {
      newErrors.sleep = "Sleep hours must be between 0 and 24"
    }

    if (!formData.water || formData.water < 0 || formData.water > 10) {
      newErrors.water = "Water intake must be between 0 and 10 liters"
    }

    if (!formData.mood) {
      newErrors.mood = "Please select your mood"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await addLog({
        ...formData,
        sleep: Number.parseFloat(formData.sleep),
        water: Number.parseFloat(formData.water),
      })

      showToast("Health log saved successfully!", "success")

      // Reset form to today's date but keep other values
      setFormData((prev) => ({
        ...prev,
        date: new Date().toISOString().split("T")[0],
        symptoms: "",
      }))
    } catch (error) {
      showToast("Failed to save health log", "error")
    }
  }

  const moodOptions = [
    { value: "happy", label: "Happy", color: "#10B981" },
    { value: "neutral", label: "Neutral", color: "#F59E0B" },
    { value: "stressed", label: "Stressed", color: "#EF4444" },
  ]

  return (
    <div className="health-log">
      <div className="health-log-container">
        <div className="page-header">
          <h1>Daily Health Log</h1>
          <p>Track your daily health metrics in just a few clicks</p>
        </div>

        <div className="log-form-card">
          <form onSubmit={handleSubmit} className="log-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">
                  <FiCalendar />
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  className={errors.date ? "error" : ""}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sleep">
                  <FiMoon />
                  Sleep Hours
                </label>
                <div className="slider-group">
                  <input
                    type="range"
                    id="sleep"
                    name="sleep"
                    min="0"
                    max="12"
                    step="0.5"
                    value={formData.sleep}
                    onChange={handleChange}
                    className="slider"
                  />
                  <div className="slider-value">{formData.sleep}h</div>
                </div>
                {errors.sleep && <span className="error-message">{errors.sleep}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="water">
                  <FiDroplet />
                  Water Intake (Liters)
                </label>
                <div className="slider-group">
                  <input
                    type="range"
                    id="water"
                    name="water"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.water}
                    onChange={handleChange}
                    className="slider"
                  />
                  <div className="slider-value">{formData.water}L</div>
                </div>
                {errors.water && <span className="error-message">{errors.water}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>
                <FiSmile />
                Mood
              </label>
              <div className="mood-options">
                {moodOptions.map((option) => (
                  <label key={option.value} className="mood-option">
                    <input
                      type="radio"
                      name="mood"
                      value={option.value}
                      checked={formData.mood === option.value}
                      onChange={handleChange}
                    />
                    <div
                      className="mood-button"
                      style={{
                        backgroundColor: formData.mood === option.value ? option.color : "transparent",
                        borderColor: option.color,
                        color: formData.mood === option.value ? "white" : option.color,
                      }}
                    >
                      {option.label}
                    </div>
                  </label>
                ))}
              </div>
              {errors.mood && <span className="error-message">{errors.mood}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="symptoms">
                <FiFileText />
                Symptoms or Notes (Optional)
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Any symptoms, notes, or observations about your day..."
                rows="4"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-large" disabled={loading}>
              {loading ? (
                <LoadingSpinner size="small" />
              ) : (
                <>
                  <FiSave />
                  Save Health Log
                </>
              )}
            </button>
          </form>
        </div>

        <div className="log-tips">
          <h3>Tips for Better Health Tracking</h3>
          <ul>
            <li>Try to log your data at the same time each day</li>
            <li>Be honest about your sleep and water intake</li>
            <li>Use the notes section to track patterns or triggers</li>
            <li>Consistency is key - even partial data is valuable</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HealthLog
