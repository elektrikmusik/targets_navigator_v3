import React, { useState, useEffect } from 'react'
import {
  testSupabaseConnection,
  testEnvironmentVariables,
} from '../../lib/supabase-test'
import { cn } from '@/lib/utils'

interface SupabaseStatusProps {
  className?: string
}

const SupabaseLogo = ({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) => (
  <svg
    width="109"
    height="113"
    viewBox="0 0 109 113"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
      fill="url(#paint0_linear)"
    />
    <path
      d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
      fill="url(#paint1_linear)"
      fillOpacity="0.2"
    />
    <path
      d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
      fill="#3ECF8E"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="53.9738"
        y1="54.974"
        x2="94.1635"
        y2="71.8295"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#249361" />
        <stop offset="1" stopColor="#3ECF8E" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="36.1558"
        y1="30.578"
        x2="54.4844"
        y2="65.0806"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
)

interface EnvStatus {
  urlSet: boolean
  keySet: boolean
  bothSet: boolean
}

export function SupabaseStatus({ className }: SupabaseStatusProps) {
  const [connectionStatus, setConnectionStatus] = useState<
    'idle' | 'testing' | 'connected' | 'disconnected'
  >('idle')
  const [envStatus, setEnvStatus] = useState<EnvStatus | null>(null)

  useEffect(() => {
    // Check environment variables on mount
    const envCheck = testEnvironmentVariables()
    setEnvStatus(envCheck)

    // Test connection on mount
    testConnection()
  }, [])

  const testConnection = async () => {
    setConnectionStatus('testing')
    try {
      const result = await testSupabaseConnection()
      setConnectionStatus(result.success ? 'connected' : 'disconnected')
    } catch {
      setConnectionStatus('disconnected')
    }
  }

  const getStatusFilter = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)'
      case 'disconnected':
        return 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)'
      case 'testing':
        return 'brightness(0) saturate(100%) invert(69%) sepia(98%) saturate(1192%) hue-rotate(358deg) brightness(102%) contrast(105%)'
      default:
        return 'brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
    }
  }

  const getStatusTooltip = () => {
    if (!envStatus?.bothSet) {
      return 'Supabase: Environment variables not set'
    }

    switch (connectionStatus) {
      case 'connected':
        return 'Supabase: Connected'
      case 'disconnected':
        return 'Supabase: Disconnected'
      case 'testing':
        return 'Supabase: Testing connection...'
      default:
        return 'Supabase: Unknown status'
    }
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer',
        className
      )}
      onClick={testConnection}
      title={getStatusTooltip()}
    >
      <div className="relative">
        <SupabaseLogo
          className="h-6 w-6 transition-all duration-200"
          style={{ filter: getStatusFilter() }}
        />
        {connectionStatus === 'testing' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </div>
  )
}
