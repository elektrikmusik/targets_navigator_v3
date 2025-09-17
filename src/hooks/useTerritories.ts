import { useMemo } from 'react'
import {
  BUSINESS_TERRITORIES,
  TERRITORY_COLORS,
  getTerritoryForCountry,
  convertToTerritoryData,
  getTerritoryStats,
  type Territory,
  type TerritoryId,
} from '../lib/territories'

export interface TerritoryData {
  id: string
  value: number
  count: number
  average: number
}

export interface UseTerritoriesOptions {
  data?: Array<{ id: string; value: number }>
  mode?: 'country' | 'territory'
  selectedTerritory?: TerritoryId | null
  showTerritoryBorders?: boolean
}

export interface UseTerritoriesReturn {
  // Data
  territoryData: TerritoryData[]
  countryData: Array<{ id: string; value: number; territory: Territory | null }>
  territories: Territory[]

  // Stats
  territoryStats: Record<
    string,
    { count: number; total: number; average: number; countries: string[] }
  >

  // State
  mode: 'country' | 'territory'
  selectedTerritory: TerritoryId | null
  showTerritoryBorders: boolean

  // Actions
  setMode: (mode: 'country' | 'territory') => void
  setSelectedTerritory: (territory: TerritoryId | null) => void
  setShowTerritoryBorders: (show: boolean) => void

  // Computed
  colors: string[]
  domain: [number, number]
  legendData: Array<{ id: string; label: string; color: string; value: number }>
}

export const useTerritories = (
  options: UseTerritoriesOptions = {}
): UseTerritoriesReturn => {
  const {
    data = [],
    mode = 'country',
    selectedTerritory = null,
    showTerritoryBorders = true,
  } = options

  // Use the props directly instead of maintaining separate state
  const currentMode = mode
  const currentSelectedTerritory = selectedTerritory
  const currentShowTerritoryBorders = showTerritoryBorders

  // Process country data with territory information
  const countryData = useMemo(() => {
    return data.map(item => ({
      ...item,
      territory: getTerritoryForCountry(item.id),
    }))
  }, [data])

  // Convert to territory data
  const territoryData = useMemo(() => {
    return convertToTerritoryData(data)
  }, [data])

  // Calculate territory statistics
  const territoryStats = useMemo(() => {
    return getTerritoryStats(data)
  }, [data])

  // Generate colors based on mode
  const colors = useMemo(() => {
    if (currentMode === 'territory') {
      return Object.values(TERRITORY_COLORS)
    } else {
      // For country mode, use territory colors for countries
      return countryData.map(item =>
        item.territory
          ? TERRITORY_COLORS[item.territory.id as TerritoryId]
          : '#666666'
      )
    }
  }, [currentMode, countryData])

  // Calculate domain
  const domain = useMemo(() => {
    const values =
      currentMode === 'territory'
        ? territoryData.map(item => item.value)
        : data.map(item => item.value)

    if (values.length === 0) return [0, 1000] as [number, number]

    const min = Math.min(...values)
    const max = Math.max(...values)

    // Add some padding
    const padding = (max - min) * 0.1
    return [Math.max(0, min - padding), max + padding] as [number, number]
  }, [currentMode, territoryData, data])

  // Generate legend data
  const legendData = useMemo(() => {
    if (currentMode === 'territory') {
      return territoryData.map(item => {
        const territory = BUSINESS_TERRITORIES.find(t => t.id === item.id)
        return {
          id: item.id,
          label: territory?.name || item.id,
          color: territory?.color || '#666666',
          value: item.value,
        }
      })
    } else {
      // For country mode, show territories that have data
      const territoryMap = new Map<
        string,
        { label: string; color: string; value: number; count: number }
      >()

      countryData.forEach(item => {
        if (item.territory) {
          const existing = territoryMap.get(item.territory.id)
          if (existing) {
            existing.value += item.value
            existing.count += 1
          } else {
            territoryMap.set(item.territory.id, {
              label: item.territory.name,
              color: item.territory.color,
              value: item.value,
              count: 1,
            })
          }
        }
      })

      return Array.from(territoryMap.values()).map(item => ({
        id: item.label.toLowerCase().replace(/\s+/g, '-'),
        label: item.label,
        color: item.color,
        value: item.value,
      }))
    }
  }, [currentMode, territoryData, countryData])

  // Filter data based on selected territory
  const filteredData = useMemo(() => {
    if (currentMode === 'territory' || !currentSelectedTerritory) {
      return countryData // Always return countryData for consistency
    }

    // Filter countries by selected territory
    return countryData.filter(
      item => item.territory?.id === currentSelectedTerritory
    )
  }, [currentMode, currentSelectedTerritory, countryData])

  // No need for useEffect since we're using props directly

  return {
    // Data
    territoryData,
    countryData: filteredData,
    territories: BUSINESS_TERRITORIES,

    // Stats
    territoryStats,

    // State
    mode: currentMode,
    selectedTerritory: currentSelectedTerritory,
    showTerritoryBorders: currentShowTerritoryBorders,

    // Actions - these are no-ops since we use props directly
    setMode: () => {},
    setSelectedTerritory: () => {},
    setShowTerritoryBorders: () => {},

    // Computed
    colors,
    domain,
    legendData,
  }
}
