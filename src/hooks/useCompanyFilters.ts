import { useState, useMemo } from 'react'
import type { CompanyOverview } from '../db/schema'

export interface FilterOption {
  label: string
  value: string
}

export interface CompanyFiltersState {
  globalFilter: string
  columnFilters: Array<{ id: string; value: string[] }>
  minRevenue: number | null
}

export interface CompanyFiltersActions {
  setGlobalFilter: (value: string) => void
  setColumnFilter: (columnId: string, values: string[]) => void
  setMinRevenue: (value: number | null) => void
  clearAllFilters: () => void
  clearColumnFilter: (columnId: string) => void
  hasActiveFilters: boolean
  activeFiltersCount: number
}

export function useCompanyFilters(data: CompanyOverview[]) {
  const [state, setState] = useState<CompanyFiltersState>({
    globalFilter: '',
    columnFilters: [],
    minRevenue: null,
  })

  const setGlobalFilter = (value: string) => {
    setState(prev => ({ ...prev, globalFilter: value }))
  }

  const setColumnFilter = (columnId: string, values: string[]) => {
    setState(prev => {
      const existingIndex = prev.columnFilters.findIndex(f => f.id === columnId)
      const newFilters = [...prev.columnFilters]

      if (existingIndex >= 0) {
        if (values.length === 0) {
          newFilters.splice(existingIndex, 1)
        } else {
          newFilters[existingIndex] = { id: columnId, value: values }
        }
      } else if (values.length > 0) {
        newFilters.push({ id: columnId, value: values })
      }

      return { ...prev, columnFilters: newFilters }
    })
  }

  const setMinRevenue = (value: number | null) => {
    setState(prev => ({ ...prev, minRevenue: value }))
  }

  const clearColumnFilter = (columnId: string) => {
    setState(prev => ({
      ...prev,
      columnFilters: prev.columnFilters.filter(f => f.id !== columnId)
    }))
  }

  const clearAllFilters = () => {
    setState({
      globalFilter: '',
      columnFilters: [],
      minRevenue: null,
    })
  }

  // Generate filter options from data
  const filterOptions = useMemo(() => {
    const tiers = Array.from(new Set(data.map(item => item.Tier).filter(Boolean)))
    const regions = Array.from(new Set(data.map(item => item.ceres_region).filter(Boolean)))
    const markets = Array.from(new Set(data.map(item => item.primaryMarket).filter(Boolean)))
    const businessModels = Array.from(new Set(data.map(item => item.businessModel).filter(Boolean)))

    return {
      tiers: tiers.map(tier => ({ label: tier!, value: tier! })),
      regions: regions.map(region => ({ label: region!, value: region! })),
      markets: markets.map(market => ({ label: market!, value: market! })),
      businessModels: businessModels.map(model => ({ label: model!, value: model! })),
    }
  }, [data])

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = state.columnFilters.length
    if (state.minRevenue !== null) count++
    if (state.globalFilter) count++
    return count
  }, [state])

  const hasActiveFilters = activeFiltersCount > 0

  // Apply filters to data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Global search filter
      if (state.globalFilter) {
        const searchLower = state.globalFilter.toLowerCase()
        const searchableText = [
          item.englishName,
          item.companyName,
          item.country,
          item.ceres_region,
          item.primaryMarket,
          item.businessModel,
          item.Tier,
        ].filter(Boolean).join(' ').toLowerCase()

        if (!searchableText.includes(searchLower)) {
          return false
        }
      }

      // Column filters
      for (const filter of state.columnFilters) {
        const columnValue = item[filter.id as keyof CompanyOverview]
        if (columnValue && !filter.value.includes(String(columnValue))) {
          return false
        }
      }

      // Revenue filter
      if (state.minRevenue !== null && item.annual_revenue) {
        if (item.annual_revenue < state.minRevenue) {
          return false
        }
      }

      return true
    })
  }, [data, state])

  const actions: CompanyFiltersActions = {
    setGlobalFilter,
    setColumnFilter,
    setMinRevenue,
    clearAllFilters,
    clearColumnFilter,
    hasActiveFilters,
    activeFiltersCount,
  }

  return {
    state,
    actions,
    filterOptions,
    filteredData,
  }
}