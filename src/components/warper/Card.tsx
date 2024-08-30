import { cn } from '@/utils'
import React from 'react'

type Props = React.ComponentProps<'div'> & {
  children: React.ReactNode
}

export const Card = ({ className, children, ...props }: Props) => {
  return (
    <div
      className={cn(
        'rounded-lg bg-layer p-5 transition-all duration-300 border-2 border-background hover:border-focus hover:shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
