'use client'
import { useState } from 'react'
import { useTheme } from '../../contexts/useTheme'
import {
  IconSun,
  IconMoon,
  IconDeviceDesktop,
  IconChevronDown,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'

interface ThemeSwitchProps {
  open?: boolean
}

export function ThemeSwitch({ open = false }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { value: 'light', label: 'Light', icon: IconSun },
    { value: 'dark', label: 'Dark', icon: IconMoon },
    { value: 'system', label: 'System', icon: IconDeviceDesktop },
  ] as const

  const getNextTheme = () => {
    const currentIndex = themes.findIndex(t => t.value === theme)
    const nextIndex = (currentIndex + 1) % themes.length
    return themes[nextIndex].value
  }

  const handleToggle = () => {
    if (open) {
      setIsOpen(!isOpen)
    } else {
      const nextTheme = getNextTheme()
      setTheme(nextTheme)
    }
  }

  const currentTheme = themes.find(t => t.value === theme)
  const Icon = currentTheme?.icon || IconSun

  if (open) {
    return (
      <div className="relative">
        <button
          onClick={handleToggle}
          className={cn(
            'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all',
            'disabled:pointer-events-none disabled:opacity-50',
            "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
            'outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            'group/toggle extend-touch-target',
            'p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 w-full justify-between'
          )}
          title={`Current theme: ${currentTheme?.label}`}
        >
          <div className="flex items-center gap-2">
            <Icon className="size-4" />
            <span>{currentTheme?.label}</span>
          </div>
          <IconChevronDown
            className={cn(
              'size-4 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
            {themes.map(({ value, label, icon: ThemeIcon }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value)
                  setIsOpen(false)
                }}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-md last:rounded-b-md',
                  theme === value && 'bg-gray-100 dark:bg-gray-700'
                )}
              >
                <ThemeIcon className="size-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all',
        'disabled:pointer-events-none disabled:opacity-50',
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
        'outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        'group/toggle extend-touch-target size-8',
        'p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800'
      )}
      title={`Toggle theme (Current: ${currentTheme?.label})`}
    >
      <Icon className="size-4" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
