"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { FiBarChart2, FiEdit3, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi"

function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: FiBarChart2 },
    { path: "/log", label: "Health Log", icon: FiEdit3 },
    { path: "/profile", label: "Profile", icon: FiUser },
  ]

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/dashboard" className="nav-brand">
          <div className="brand-icon">H</div>
          HealthPulse
        </Link>

        <div className="nav-links desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
            >
              <item.icon />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-user desktop-nav">
          <span className="user-name">Hi, {user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut />
            Logout
          </button>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon />
              {item.label}
            </Link>
          ))}
          <button onClick={handleLogout} className="mobile-logout-btn">
            <FiLogOut />
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
