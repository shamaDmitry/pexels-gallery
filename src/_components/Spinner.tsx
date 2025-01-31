import { FC } from 'react'

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: string
}

const Spinner: FC<SpinnerProps> = ({ size = 'md', color = 'currentColor' }) => {
  const sizeMap = {
    xs: 'size-4',
    sm: 'size-6',
    md: 'size-8',
    lg: 'size-12'
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeMap[size]} animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        style={{ color }}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  )
}

export default Spinner
