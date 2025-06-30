"use client"
import { useToast } from "../contexts/ToastContext"
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi"

function Toast() {
  const { toasts, removeToast } = useToast()

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FiCheckCircle />
      case "error":
        return <FiAlertCircle />
      default:
        return <FiInfo />
    }
  }

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-icon">{getIcon(toast.type)}</div>
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            <FiX />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast
