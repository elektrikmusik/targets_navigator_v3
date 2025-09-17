import { useWorldData } from './useWorldData'

/**
 * Hook that loads world data with Antarctica excluded by default
 * This is a convenience wrapper around useWorldData
 */
export const useWorldDataWithoutAntarctica = () => {
  return useWorldData({ excludeAntarctica: true })
}

/**
 * Hook that loads world data with custom exclusions
 * @param excludeCountries - Array of country names or IDs to exclude
 * @param excludeAntarctica - Whether to exclude Antarctica (default: true)
 */
export const useWorldDataWithExclusions = (
  excludeCountries: string[] = [],
  excludeAntarctica: boolean = true
) => {
  return useWorldData({ excludeCountries, excludeAntarctica })
}
