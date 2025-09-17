import { useState, useEffect, useCallback, useRef } from 'react'
import { logDataInfo } from '../utils/dataValidation'
import worldCountriesData from '../components/charts/world_countries.json'

interface GeoFeature {
  id: string
  properties: {
    name: string
    [key: string]: unknown
  }
  geometry: {
    type: string
    coordinates: unknown
  }
}

interface UseWorldDataOptions {
  excludeCountries?: string[]
  excludeAntarctica?: boolean
}

interface UseWorldDataReturn {
  features: GeoFeature[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useWorldData = (
  options: UseWorldDataOptions = {}
): UseWorldDataReturn => {
  const { excludeCountries = [], excludeAntarctica = true } = options
  const [features, setFeatures] = useState<GeoFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasLoadedRef = useRef(false)
  const isLoadingRef = useRef(false)
  const lastOptionsRef = useRef<string>('')

  // Create a stable key for the options to prevent unnecessary re-runs
  const optionsKey = `${excludeCountries.join(',')}-${excludeAntarctica}`

  useEffect(() => {
    // Only run if options have actually changed
    if (lastOptionsRef.current === optionsKey && hasLoadedRef.current) {
      return
    }

    const loadWorldData = () => {
      // Prevent multiple simultaneous loads
      if (isLoadingRef.current) {
        console.log('🔄 Data loading already in progress, skipping...')
        return
      }

      try {
        isLoadingRef.current = true
        setLoading(true)
        setError(null)

        console.log('🔄 Starting data load...')

        // Use imported data instead of fetching
        const worldData = worldCountriesData

        // Validate the data
        const validation = logDataInfo(worldData, 'World Countries Data')

        if (validation.isValid) {
          // Filter out specified countries using current values
          const filteredFeatures = worldData.features.filter(
            (feature: GeoFeature) => {
              const countryName = feature.properties?.name
              const countryId = feature.id

              // Exclude Antarctica if requested
              if (
                excludeAntarctica &&
                (countryName === 'Antarctica' || countryId === 'ATA')
              ) {
                return false
              }

              // Exclude other specified countries
              if (excludeCountries.length > 0) {
                return (
                  !excludeCountries.includes(countryName) &&
                  !excludeCountries.includes(countryId)
                )
              }

              return true
            }
          )

          setFeatures(filteredFeatures)
          hasLoadedRef.current = true
          lastOptionsRef.current = optionsKey
          console.log(
            `✅ Data loaded successfully (${excludeAntarctica ? 'Antarctica excluded' : 'all countries included'})`
          )
        } else {
          throw new Error(
            `Invalid data format: ${validation.errors.join(', ')}`
          )
        }
      } catch (err) {
        console.error('❌ Error loading world countries data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load map data')
        setFeatures([])
      } finally {
        setLoading(false)
        isLoadingRef.current = false
      }
    }

    // Reset loading state when options change
    hasLoadedRef.current = false
    isLoadingRef.current = false
    setError(null)

    if (!isLoadingRef.current) {
      loadWorldData()
    }
  }, [optionsKey]) // eslint-disable-line react-hooks/exhaustive-deps

  const refetch = useCallback(() => {
    // Prevent multiple simultaneous loads
    if (isLoadingRef.current) {
      console.log('🔄 Data loading already in progress, skipping...')
      return
    }

    try {
      isLoadingRef.current = true
      setLoading(true)
      setError(null)

      console.log('🔄 Starting data refetch...')

      // Use imported data instead of fetching
      const worldData = worldCountriesData

      // Validate the data
      const validation = logDataInfo(worldData, 'World Countries Data')

      if (validation.isValid) {
        // Filter out specified countries using current values
        const filteredFeatures = worldData.features.filter(
          (feature: GeoFeature) => {
            const countryName = feature.properties?.name
            const countryId = feature.id

            // Exclude Antarctica if requested
            if (
              excludeAntarctica &&
              (countryName === 'Antarctica' || countryId === 'ATA')
            ) {
              return false
            }

            // Exclude other specified countries
            if (excludeCountries.length > 0) {
              return (
                !excludeCountries.includes(countryName) &&
                !excludeCountries.includes(countryId)
              )
            }

            return true
          }
        )

        setFeatures(filteredFeatures)
        hasLoadedRef.current = true
        lastOptionsRef.current = optionsKey
        console.log(
          `✅ Data refetched successfully (${excludeAntarctica ? 'Antarctica excluded' : 'all countries included'})`
        )
      } else {
        throw new Error(`Invalid data format: ${validation.errors.join(', ')}`)
      }
    } catch (err) {
      console.error('❌ Error refetching world countries data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load map data')
      setFeatures([])
    } finally {
      setLoading(false)
      isLoadingRef.current = false
    }
  }, [optionsKey]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    features,
    loading,
    error,
    refetch,
  }
}
