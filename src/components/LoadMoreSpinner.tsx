import React from 'react'

interface LoadMoreSpinnerProps {
  size?: number
  color?: string
  thickness?: number
  className?: string
  isLoading?: boolean
}

const LoadMoreSpinner: React.FC<LoadMoreSpinnerProps> = ({
  size = 24,
  color = '#000000',
  thickness = 2,
  className = '',
  isLoading = true
}) => {
  if (!isLoading) return null

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className="animate-spin"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: `${thickness}px solid ${color}20`,
          borderTop: `${thickness}px solid ${color}`,
          borderRadius: '50%'
        }}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default LoadMoreSpinner
