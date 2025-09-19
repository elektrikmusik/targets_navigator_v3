import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { CompanyOverview } from '../db/schema'

export function useCompanyOverview() {
  const [data, setData] = useState<CompanyOverview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        
        const { data: companyData, error: fetchError } = await supabase
          .from('company_overview')
          .select('*')
          .order('overallScore', { ascending: false })

        if (fetchError) {
          throw fetchError
        }

        setData(companyData || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching company overview data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
