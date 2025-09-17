import React, { useState, useEffect } from 'react'
import {
  testSupabaseConnection,
  testEnvironmentVariables,
} from '../../lib/supabase-test'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Badge } from '../ui/badge'

export function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<
    'idle' | 'testing' | 'success' | 'error'
  >('idle')
  const [envStatus, setEnvStatus] = useState<unknown>(null)
  const [testResult, setTestResult] = useState<unknown>(null)

  useEffect(() => {
    // Check environment variables on mount
    const envCheck = testEnvironmentVariables()
    setEnvStatus(envCheck)
  }, [])

  const handleTestConnection = async () => {
    setConnectionStatus('testing')
    try {
      const result = await testSupabaseConnection()
      setTestResult(result)
      setConnectionStatus(result.success ? 'success' : 'error')
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      setConnectionStatus('error')
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Supabase Test</CardTitle>
        <CardDescription className="text-xs">
          Test your Supabase configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Environment Variables Status */}
        <div className="space-y-1">
          <h4 className="font-medium text-xs">Environment Variables</h4>
          <div className="flex gap-1">
            <Badge
              variant={envStatus?.urlSet ? 'default' : 'destructive'}
              className="text-xs"
            >
              URL {envStatus?.urlSet ? 'Set' : 'Missing'}
            </Badge>
            <Badge
              variant={envStatus?.keySet ? 'default' : 'destructive'}
              className="text-xs"
            >
              Key {envStatus?.keySet ? 'Set' : 'Missing'}
            </Badge>
          </div>
          {!envStatus?.bothSet && (
            <p className="text-xs text-muted-foreground">
              Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
            </p>
          )}
        </div>

        {/* Connection Test */}
        <div className="space-y-1">
          <h4 className="font-medium text-xs">Connection Test</h4>
          <Button
            onClick={handleTestConnection}
            disabled={connectionStatus === 'testing' || !envStatus?.bothSet}
            className="w-full text-xs h-8"
            size="sm"
          >
            {connectionStatus === 'testing' ? 'Testing...' : 'Test Connection'}
          </Button>

          {testResult && (
            <div className="p-2 rounded-md bg-muted">
              <div className="flex items-center gap-1 mb-1">
                <Badge
                  variant={testResult.success ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {testResult.success ? 'Success' : 'Error'}
                </Badge>
              </div>
              <pre className="text-xs text-muted-foreground overflow-auto max-h-20">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
