'use client'
import React from 'react'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
}

export function Sidebar({ open, setOpen, children }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={cn(
          'relative flex h-full w-64 flex-col border-r border-neutral-200 bg-white transition-all duration-300 ease-in-out dark:border-neutral-700 dark:bg-neutral-800',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {children}
      </div>
    </>
  )
}

export function SidebarBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex h-full flex-col p-4', className)}>{children}</div>
  )
}

interface SidebarLinkProps {
  link: {
    label: string
    href: string
    icon: React.ReactNode
  }
}

export function SidebarLink({ link }: SidebarLinkProps) {
  return (
    <Link
      to={link.href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-white"
    >
      {link.icon}
      <span className="truncate">{link.label}</span>
    </Link>
  )
}
