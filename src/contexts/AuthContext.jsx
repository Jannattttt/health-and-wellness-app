"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("healthTracker_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("healthTracker_users") || "[]")
        const user = users.find((u) => u.email === email && u.password === password)

        if (user) {
          const userWithoutPassword = { ...user }
          delete userWithoutPassword.password
          setUser(userWithoutPassword)
          localStorage.setItem("healthTracker_user", JSON.stringify(userWithoutPassword))
          resolve(userWithoutPassword)
        } else {
          reject(new Error("Invalid email or password"))
        }
      }, 1000)
    })
  }

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("healthTracker_users") || "[]")

        if (users.find((u) => u.email === email)) {
          reject(new Error("User already exists"))
          return
        }

        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password,
          createdAt: new Date().toISOString(),
        }

        users.push(newUser)
        localStorage.setItem("healthTracker_users", JSON.stringify(users))

        const userWithoutPassword = { ...newUser }
        delete userWithoutPassword.password
        setUser(userWithoutPassword)
        localStorage.setItem("healthTracker_user", JSON.stringify(userWithoutPassword))
        resolve(userWithoutPassword)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("healthTracker_user")
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
