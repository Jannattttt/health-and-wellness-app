function Chart({ data, type = "bar", title, color = "#8B5CF6" }) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <h3 className="chart-title">{title}</h3>
        <div className="chart-empty">No data available</div>
      </div>
    )
  }

  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className="chart">
        {type === "bar" && (
          <div className="bar-chart">
            {data.map((item, index) => (
              <div key={index} className="bar-item">
                <div
                  className="bar"
                  style={{
                    height: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: color,
                  }}
                ></div>
                <span className="bar-label">{item.label}</span>
                <span className="bar-value">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {type === "line" && (
          <div className="line-chart">
            <svg viewBox="0 0 400 200" className="line-svg">
              <polyline
                points={data
                  .map(
                    (item, index) => `${(index / (data.length - 1)) * 380 + 10},${190 - (item.value / maxValue) * 170}`,
                  )
                  .join(" ")}
                fill="none"
                stroke={color}
                strokeWidth="2"
              />
              {data.map((item, index) => (
                <circle
                  key={index}
                  cx={(index / (data.length - 1)) * 380 + 10}
                  cy={190 - (item.value / maxValue) * 170}
                  r="4"
                  fill={color}
                />
              ))}
            </svg>
            <div className="line-labels">
              {data.map((item, index) => (
                <span key={index} className="line-label">
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chart
