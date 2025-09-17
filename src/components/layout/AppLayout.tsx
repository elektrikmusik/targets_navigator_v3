'use client'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Sidebar, SidebarBody, SidebarLink } from '../ui/sidebar'
import { SearchBar } from '../ui/search-bar'
import { Dock, DockItem, DockSeparator } from '../ui/docks'
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconMenu2,
} from '@tabler/icons-react'
import { Sun, Moon, Settings } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/ThemeContext'
import { SupabaseStatus } from '../dev/SupabaseStatus'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { theme, setTheme, actualTheme } = useTheme()
  const navigate = useNavigate()

  const links = [
    {
      label: 'Dashboard',
      href: '/',
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: 'Logout',
      href: '/logout',
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ]

  const [open, setOpen] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    // Add your search logic here
  }

  const handleThemeToggle = () => {
    const themes = ['light', 'dark', 'system'] as const
    const currentIndex = themes.findIndex(t => t === theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  return (
    <div
      className={cn(
        'flex w-full flex-1 flex-col  border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800',
        'h-screen relative'
      )}
    >
      <div
        className="hidden md:block"
        onMouseEnter={() => {
          if (hoverTimeout) {
            clearTimeout(hoverTimeout)
            setHoverTimeout(null)
          }
          setOpen(true)
        }}
        onMouseLeave={() => {
          const timeout = setTimeout(() => setOpen(false), 150)
          setHoverTimeout(timeout)
        }}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <div className="flex items-center">
                {open ? <Logo /> : <LogoIcon />}
              </div>
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} open={open} />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <SidebarLink
                link={{
                  label: 'Manu Arora',
                  href: '#',
                  icon: (
                    <img
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
                open={open}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <div className="md:hidden">
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                <div className="flex items-center">
                  {open ? <Logo /> : <LogoIcon />}
                </div>
                <div className="mt-8 flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} open={open} />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <SidebarLink
                  link={{
                    label: 'Manu Arora',
                    href: '#',
                    icon: (
                      <img
                        src="https://assets.aceternity.com/manu.png"
                        className="h-7 w-7 shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar"
                      />
                    ),
                  }}
                  open={open}
                />
              </div>
            </SidebarBody>
          </Sidebar>
        </div>
      )}

      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle menu"
              >
                <IconMenu2 className="h-6 w-6" />
              </button>

              {/* Search Bar */}
              <div className="flex-1 max-w-md">
                <SearchBar
                  placeholder="Search anything..."
                  onSearch={handleSearch}
                  className="w-full"
                />
              </div>
            </div>

            {/* Dock with Theme Switch and Settings */}
            <Dock className="border-0 bg-transparent shadow-none">
              <DockItem
                tooltip="Settings"
                onClick={() => {
                  navigate({ to: '/settings' })
                }}
              >
                <Settings className="h-5 w-5" />
              </DockItem>
              <DockSeparator />
              <DockItem
                tooltip={`Theme: ${theme} (${actualTheme})`}
                onClick={handleThemeToggle}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </DockItem>

              <DockItem tooltip="Supabase Status">
                <SupabaseStatus />
              </DockItem>
            </Dock>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-2 md:p-10">{children}</div>
        </div>
      </div>
    </div>
  )
}

export const Logo = () => {
  return (
    <Link
      to="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Acet Labs
      </motion.span>
    </Link>
  )
}

export const LogoIcon = () => {
  return (
    <Link
      to="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </Link>
  )
}
