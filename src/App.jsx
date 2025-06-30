"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import { HealthProvider } from "./contexts/HealthContext"
import { ToastProvider } from "./contexts/ToastContext"
import Navbar from "./components/Navbar"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Dashboard from "./pages/Dashboard"
import HealthLog from "./pages/HealthLog"
import Profile from "./pages/Profile"
import Toast from "./components/Toast"
import "./App.css"

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

function AppContent() {
  const { user } = useAuth()

  return (
    <div className="App">
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/log"
          element={
            <ProtectedRoute>
              <HealthLog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toast />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <HealthProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </HealthProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
