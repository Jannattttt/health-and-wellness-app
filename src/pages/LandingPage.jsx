import { Link } from "react-router-dom"
import { FiActivity, FiTrendingUp, FiShield, FiSmartphone } from "react-icons/fi"

function LandingPage() {
  const features = [
    {
      icon: FiActivity,
      title: "Daily Health Tracking",
      description: "Log your sleep, water intake, mood, and symptoms in just 60 seconds",
    },
    {
      icon: FiTrendingUp,
      title: "Visual Analytics",
      description: "See your health trends with beautiful charts and insights",
    },
    {
      icon: FiShield,
      title: "Privacy First",
      description: "Your health data stays secure and private, stored locally",
    },
    {
      icon: FiSmartphone,
      title: "Mobile Friendly",
      description: "Track your health anywhere with our responsive design",
    },
  ]

  return (
    <div className="landing-page">
      <header className="landing-header">
        <nav className="landing-nav">
          <div className="nav-brand">
            <div className="brand-icon">H</div>
            HealthPulse
          </div>
          <div className="nav-actions">
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Track Your Health in
              <span className="highlight"> 60 Seconds </span>
              Per Day
            </h1>
            <p className="hero-description">
              Simple, beautiful health tracking that helps you understand your wellness patterns and make better
              decisions for your health.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-large">
                Start Tracking Free
              </Link>
              <Link to="/login" className="btn btn-outline btn-large">
                Sign In
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="preview-card">
                <div className="preview-header">
                  <div className="preview-dot"></div>
                  <div className="preview-dot"></div>
                  <div className="preview-dot"></div>
                </div>
                <div className="preview-content">
                  <div className="preview-stat">
                    <div className="stat-icon sleep"></div>
                    <div className="stat-info">
                      <span className="stat-label">Sleep</span>
                      <span className="stat-value">7.5h</span>
                    </div>
                  </div>
                  <div className="preview-stat">
                    <div className="stat-icon water"></div>
                    <div className="stat-info">
                      <span className="stat-label">Water</span>
                      <span className="stat-value">2.1L</span>
                    </div>
                  </div>
                  <div className="preview-stat">
                    <div className="stat-icon mood"></div>
                    <div className="stat-info">
                      <span className="stat-label">Mood</span>
                      <span className="stat-value">Good</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="features-container">
            <h2 className="features-title">Everything You Need to Stay Healthy</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <feature.icon />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="cta-container">
            <h2 className="cta-title">Ready to Start Your Health Journey?</h2>
            <p className="cta-description">
              Join thousands of users who are already tracking their health with HealthPulse
            </p>
            <Link to="/register" className="btn btn-primary btn-large">
              Get Started Now
            </Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-icon">H</div>
            HealthPulse
          </div>
          <p className="footer-text">Simple health tracking for a better you.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
