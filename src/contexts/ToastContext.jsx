"use client"

import { createContext, useContext, useState } from "react"

const ToastContext = createContext()

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = "info") => {
    const id = Date.now().toString()
    const toast = { id, message, type }

    setToasts((prev) => [...prev, toast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const value = {
    toasts,
    showToast,
    removeToast,
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
