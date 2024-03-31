import { DotLoader } from './Loading'
import { cn } from '@/utils'
import React from 'react'

type Props = React.ComponentProps<'button'> & {
  loading?: boolean
  variant?: 'filled' | 'outline' | 'standard'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: (props: any) => JSX.Element | any
}

export const Button = ({
  className,
  disabled,
  variant = 'filled',
  title,
  loading = false,
  icon: Icon,
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
      {Icon ? <Icon className="mr-2 inline-block size-5" /> : null}
      {loading ? <DotLoader /> : title}
    </button>
  )
}
