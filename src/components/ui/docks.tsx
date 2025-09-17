'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface DockProps {
  children: React.ReactNode
  className?: string
}

interface DockItemProps {
  children: React.ReactNode
  tooltip?: string
  badge?: string | number
  className?: string
  onClick?: () => void
}

export function Dock({ children, className }: DockProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 rounded-full border bg-background/80 backdrop-blur-sm p-2 shadow-lg',
        className
      )}
    >
      {children}
    </div>
  )
}

export function DockItem({
  children,
  tooltip,
  badge,
  className,
  onClick,
}: DockItemProps) {
  const [showTooltip, setShowTooltip] = React.useState(false)

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'relative h-12 w-12 rounded-full transition-all duration-200 hover:scale-110',
          'bg-background/50 hover:bg-background/80',
          className
        )}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
        {badge && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
          >
            {badge}
          </Badge>
        )}
      </Button>
      {tooltip && showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded shadow-lg whitespace-nowrap z-50">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
        </div>
      )}
    </div>
  )
}

export function DockSeparator() {
  return <div className="mx-1 h-8 w-px bg-border" />
}
