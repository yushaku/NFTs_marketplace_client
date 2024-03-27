import { DotLoader } from './Loading'
import { cn } from '@/utils'
import React from 'react'

type Props = React.ComponentProps<'button'> & {
  loading?: boolean
  variant?: 'filled' | 'outline' | 'standard'
}

export const Button = ({
  className,
  disabled,
  variant = 'filled',
  title,
  loading = false,
  ...props
}: Props) => {
  let style = ''
  switch (variant) {
    case 'filled':
      style = 'bg-accent hover:bg-accent/90'
      break
    case 'outline':
      style = 'border border-gray-600 bg-layer hover:bg-focus'
      break
    case 'standard':
      style = 'border-b border-gray-600 bg-layer hover:bg-focus'
      break
  }

  return (
    <button
      className={cn('rounded-lg px-6 py-3', style, className, {
        'bg-gray-400': disabled,
        'bg-blue-300': loading
      })}
      {...props}
    >
      {loading ? <DotLoader /> : title}
    </button>
  )
}
