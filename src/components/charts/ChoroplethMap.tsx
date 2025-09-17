import React, { useMemo, useState, useCallback } from 'react'
import { ResponsiveChoroplethCanvas, ResponsiveChoropleth } from '@nivo/geo'
import type { ChoroplethMapProps } from './types'
import { useWorldData } from '../../hooks/useWorldData'
import {
  useTerritories,
  type UseTerritoriesOptions,
} from '../../hooks/useTerritories'
import { getTerritoryForCountry, type TerritoryId } from '../../lib/territories'

// Stable empty array to prevent re-renders
const EMPTY_ARRAY: string[] = []

// Sample data for the map
const sampleData = [
  { id: 'AFG', value: 928048 },
  { id: 'AGO', value: 704643 },
  { id: 'ALB', value: 641894 },
  { id: 'ARE', value: 1234567 },
  { id: 'ARG', value: 2345678 },
  { id: 'ARM', value: 345678 },
  { id: 'AUS', value: 4567890 },
  { id: 'AUT', value: 567890 },
  { id: 'AZE', value: 678901 },
  { id: 'BDI', value: 789012 },
  { id: 'BEL', value: 890123 },
  { id: 'BEN', value: 901234 },
  { id: 'BFA', value: 123456 },
  { id: 'BGD', value: 2345678 },
  { id: 'BGR', value: 345678 },
  { id: 'BHR', value: 456789 },
  { id: 'BHS', value: 56789 },
  { id: 'BIH', value: 678901 },
  { id: 'BLR', value: 789012 },
  { id: 'BLZ', value: 89012 },
  { id: 'BOL', value: 901234 },
  { id: 'BRA', value: 12345678 },
  { id: 'BRN', value: 234567 },
  { id: 'BTN', value: 345678 },
  { id: 'BWA', value: 456789 },
  { id: 'CAF', value: 567890 },
  { id: 'CAN', value: 6789012 },
  { id: 'CHE', value: 7890123 },
  { id: 'CHL', value: 8901234 },
  { id: 'CHN', value: 90123456 },
  { id: 'CIV', value: 1234567 },
  { id: 'CMR', value: 2345678 },
  { id: 'COD', value: 3456789 },
  { id: 'COG', value: 4567890 },
  { id: 'COL', value: 5678901 },
  { id: 'COM', value: 678901 },
  { id: 'CPV', value: 789012 },
  { id: 'CRI', value: 890123 },
  { id: 'CUB', value: 901234 },
  { id: 'CYP', value: 123456 },
  { id: 'CZE', value: 2345678 },
  { id: 'DEU', value: 34567890 },
  { id: 'DJI', value: 456789 },
  { id: 'DNK', value: 5678901 },
  { id: 'DOM', value: 6789012 },
  { id: 'DZA', value: 7890123 },
  { id: 'ECU', value: 8901234 },
  { id: 'EGY', value: 9012345 },
  { id: 'ERI', value: 1234567 },
  { id: 'ESP', value: 23456789 },
  { id: 'EST', value: 3456789 },
  { id: 'ETH', value: 45678901 },
  { id: 'FIN', value: 5678901 },
  { id: 'FJI', value: 678901 },
  { id: 'FRA', value: 78901234 },
  { id: 'GAB', value: 8901234 },
  { id: 'GBR', value: 90123456 },
  { id: 'GEO', value: 1234567 },
  { id: 'GHA', value: 23456789 },
  { id: 'GIN', value: 3456789 },
  { id: 'GMB', value: 456789 },
  { id: 'GNB', value: 567890 },
  { id: 'GNQ', value: 678901 },
  { id: 'GRC', value: 7890123 },
  { id: 'GTM', value: 8901234 },
  { id: 'GUY', value: 901234 },
  { id: 'HND', value: 1234567 },
  { id: 'HRV', value: 2345678 },
  { id: 'HTI', value: 3456789 },
  { id: 'HUN', value: 4567890 },
  { id: 'IDN', value: 56789012 },
  { id: 'IND', value: 67890123 },
  { id: 'IRL', value: 7890123 },
  { id: 'IRN', value: 89012345 },
  { id: 'IRQ', value: 9012345 },
  { id: 'ISL', value: 123456 },
  { id: 'ISR', value: 2345678 },
  { id: 'ITA', value: 34567890 },
  { id: 'JAM', value: 456789 },
  { id: 'JOR', value: 5678901 },
  { id: 'JPN', value: 67890123 },
  { id: 'KAZ', value: 7890123 },
  { id: 'KEN', value: 89012345 },
  { id: 'KGZ', value: 901234 },
  { id: 'KHM', value: 1234567 },
  { id: 'KOR', value: 23456789 },
  { id: 'KWT', value: 3456789 },
  { id: 'LAO', value: 4567890 },
  { id: 'LBN', value: 5678901 },
  { id: 'LBR', value: 6789012 },
  { id: 'LBY', value: 7890123 },
  { id: 'LKA', value: 8901234 },
  { id: 'LSO', value: 901234 },
  { id: 'LTU', value: 1234567 },
  { id: 'LUX', value: 234567 },
  { id: 'LVA', value: 3456789 },
  { id: 'MAR', value: 45678901 },
  { id: 'MDA', value: 5678901 },
  { id: 'MDG', value: 6789012 },
  { id: 'MEX', value: 78901234 },
  { id: 'MKD', value: 8901234 },
  { id: 'MLI', value: 9012345 },
  { id: 'MMR', value: 12345678 },
  { id: 'MNE', value: 234567 },
  { id: 'MNG', value: 3456789 },
  { id: 'MOZ', value: 45678901 },
  { id: 'MRT', value: 5678901 },
  { id: 'MWI', value: 6789012 },
  { id: 'MYS', value: 78901234 },
  { id: 'NAM', value: 8901234 },
  { id: 'NER', value: 9012345 },
  { id: 'NGA', value: 123456789 },
  { id: 'NIC', value: 2345678 },
  { id: 'NLD', value: 34567890 },
  { id: 'NOR', value: 4567890 },
  { id: 'NPL', value: 56789012 },
  { id: 'NZL', value: 6789012 },
  { id: 'OMN', value: 7890123 },
  { id: 'PAK', value: 89012345 },
  { id: 'PAN', value: 9012345 },
  { id: 'PER', value: 12345678 },
  { id: 'PHL', value: 23456789 },
  { id: 'PNG', value: 3456789 },
  { id: 'POL', value: 45678901 },
  { id: 'PRK', value: 5678901 },
  { id: 'PRT', value: 67890123 },
  { id: 'PRY', value: 7890123 },
  { id: 'QAT', value: 8901234 },
  { id: 'ROU', value: 90123456 },
  { id: 'RUS', value: 123456789 },
  { id: 'RWA', value: 2345678 },
  { id: 'SAU', value: 34567890 },
  { id: 'SDN', value: 45678901 },
  { id: 'SEN', value: 5678901 },
  { id: 'SGP', value: 6789012 },
  { id: 'SLB', value: 789012 },
  { id: 'SLE', value: 8901234 },
  { id: 'SLV', value: 9012345 },
  { id: 'SOM', value: 1234567 },
  { id: 'SRB', value: 2345678 },
  { id: 'SSD', value: 3456789 },
  { id: 'STP', value: 456789 },
  { id: 'SUR', value: 567890 },
  { id: 'SVK', value: 6789012 },
  { id: 'SVN', value: 7890123 },
  { id: 'SWE', value: 8901234 },
  { id: 'SWZ', value: 901234 },
  { id: 'SYR', value: 12345678 },
  { id: 'TCD', value: 2345678 },
  { id: 'TGO', value: 3456789 },
  { id: 'THA', value: 45678901 },
  { id: 'TJK', value: 5678901 },
  { id: 'TKM', value: 6789012 },
  { id: 'TLS', value: 789012 },
  { id: 'TTO', value: 8901234 },
  { id: 'TUN', value: 9012345 },
  { id: 'TUR', value: 12345678 },
  { id: 'TWN', value: 23456789 },
  { id: 'TZA', value: 34567890 },
  { id: 'UGA', value: 45678901 },
  { id: 'UKR', value: 56789012 },
  { id: 'URY', value: 6789012 },
  { id: 'USA', value: 789012345 },
  { id: 'UZB', value: 89012345 },
  { id: 'VCT', value: 901234 },
  { id: 'VEN', value: 12345678 },
  { id: 'VNM', value: 23456789 },
  { id: 'VUT', value: 345678 },
  { id: 'WSM', value: 456789 },
  { id: 'YEM', value: 5678901 },
  { id: 'ZAF', value: 67890123 },
  { id: 'ZMB', value: 7890123 },
  { id: 'ZWE', value: 8901234 },
]

export type FittingMode = 'centered' | 'north-focused' | 'equatorial' | 'custom'

// Predefined fitting configurations
const fittingConfigs = {
  centered: {
    projectionTranslation: [0.5, 0.42] as [number, number],
    projectionRotation: [0, 0, 0] as [number, number, number],
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    description: 'Centered view optimized for maps without Antarctica',
  },
  'north-focused': {
    projectionTranslation: [0.5, 0.35] as [number, number],
    projectionRotation: [0, 0, 0] as [number, number, number],
    margin: { top: 10, right: 20, bottom: 40, left: 20 },
    description: 'North-focused view, good for showing Arctic regions',
  },
  equatorial: {
    projectionTranslation: [0.5, 0.5] as [number, number],
    projectionRotation: [0, 0, 0] as [number, number, number],
    margin: { top: 30, right: 20, bottom: 30, left: 20 },
    description: 'Equatorial view, balanced for all continents',
  },
}

export interface ChoroplethMapComponentProps extends ChoroplethMapProps {
  // Rendering mode
  mode?: 'canvas' | 'svg'

  // Data loading options
  excludeAntarctica?: boolean
  excludeCountries?: string[]

  // Fitting options
  fittingMode?: FittingMode
  customTranslation?: [number, number]
  customRotation?: [number, number, number]

  // Data override
  useSampleData?: boolean

  // Territory options
  territoryMode?: 'country' | 'territory'
  selectedTerritory?: TerritoryId | null
  showTerritoryBorders?: boolean
  territoryOptions?: UseTerritoriesOptions

  // Zoom options
  enableZoom?: boolean
  initialZoom?: number
  minZoom?: number
  maxZoom?: number
  zoomStep?: number
  showZoomControls?: boolean
}

export const ChoroplethMap: React.FC<ChoroplethMapComponentProps> = ({
  // Data
  data = sampleData,
  features = [],
  useSampleData = true,

  // Rendering
  mode = 'canvas',
  width = 800,
  height = 600,

  // Data loading
  excludeAntarctica = true,
  excludeCountries = EMPTY_ARRAY,

  // Fitting
  fittingMode = 'centered',
  customTranslation,
  customRotation,

  // Territory options
  territoryMode = 'country',
  selectedTerritory = null,
  showTerritoryBorders = true,
  territoryOptions = {},

  // Zoom options
  enableZoom = true,
  initialZoom = 1,
  minZoom = 0.5,
  maxZoom = 4,
  zoomStep = 0.2,
  showZoomControls = true,

  // Styling
  unknownColor = '#666666',
  label = 'properties.name',
  valueFormat = '.2s',
  enableGraticule = true,
  graticuleLineColor = '#dddddd',
  borderWidth = 0.5,
  borderColor = '#152538',

  // Legends
  legends = [
    {
      anchor: 'bottom-left',
      direction: 'column',
      justify: true,
      translateX: 20,
      translateY: -20,
      itemsSpacing: 0,
      itemWidth: 94,
      itemHeight: 18,
      itemDirection: 'left-to-right',
      itemTextColor: '#444444',
      itemOpacity: 0.85,
      symbolSize: 18,
      effects: [
        {
          on: 'hover',
          style: {
            itemTextColor: '#000000',
            itemOpacity: 1,
          },
        },
      ],
    },
  ],

  ...props
}) => {
  // Memoize world data options to prevent infinite re-renders
  const worldDataOptions = useMemo(
    () => ({
      excludeAntarctica,
      excludeCountries:
        excludeCountries && excludeCountries.length > 0
          ? excludeCountries
          : undefined,
    }),
    [excludeAntarctica, excludeCountries]
  )

  // Load world data with memoized options
  const {
    features: worldFeatures,
    loading,
    error,
  } = useWorldData(worldDataOptions)

  // Use sample data or provided data
  const mapData = useSampleData ? sampleData : data

  // Memoize territory options to prevent infinite re-renders
  const territoryOptionsMemo = useMemo(
    () => ({
      data: mapData,
      mode: territoryMode,
      selectedTerritory: selectedTerritory as TerritoryId | null,
      showTerritoryBorders,
      ...territoryOptions,
    }),
    [
      mapData,
      territoryMode,
      selectedTerritory,
      showTerritoryBorders,
      territoryOptions,
    ]
  )

  // Territory management - simplified for now
  useTerritories(territoryOptionsMemo)

  // Zoom state management
  const [zoom, setZoom] = useState(initialZoom)
  const [pan, setPan] = useState<[number, number]>([0, 0])

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + zoomStep, maxZoom))
  }, [zoomStep, maxZoom])

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - zoomStep, minZoom))
  }, [zoomStep, minZoom])

  const handleResetZoom = useCallback(() => {
    setZoom(initialZoom)
    setPan([0, 0])
  }, [initialZoom])

  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      if (!enableZoom) return

      event.preventDefault()
      const delta = event.deltaY > 0 ? -zoomStep : zoomStep
      setZoom(prev => Math.max(minZoom, Math.min(maxZoom, prev + delta)))
    },
    [enableZoom, zoomStep, minZoom, maxZoom]
  )

  // Get the appropriate configuration based on fitting mode
  const baseConfig =
    fittingMode === 'custom'
      ? {
          projectionTranslation: customTranslation || [0.5, 0.42],
          projectionRotation: customRotation || [0, 0, 0],
          margin: { top: 20, right: 20, bottom: 20, left: 20 },
        }
      : fittingConfigs[fittingMode]

  // Apply zoom and pan to the configuration
  const config = {
    ...baseConfig,
    projectionTranslation: enableZoom
      ? ([
          baseConfig.projectionTranslation[0] + pan[0] * zoom,
          baseConfig.projectionTranslation[1] + pan[1] * zoom,
        ] as [number, number])
      : baseConfig.projectionTranslation,
    projectionScale: enableZoom ? zoom * 100 : 100,
  }

  // Determine which data and features to use
  const featuresToUse = features.length > 0 ? features : worldFeatures

  // Use features as-is without modifying fill properties
  // Nivo will handle colors through its own color mapping system
  const featuresWithTerritoryColors = featuresToUse

  // Process data to include territory information and categorical values
  const processedData = React.useMemo(() => {
    const territoryMap = new Map<string, number>()
    let territoryIndex = 0

    return mapData.map(item => {
      if (territoryMode === 'country') {
        // Country mode: map countries to their territories
        const territory = getTerritoryForCountry(item.id)
        if (territory) {
          if (!territoryMap.has(territory.id)) {
            territoryMap.set(territory.id, territoryIndex++)
          }
          return {
            ...item,
            value: territoryMap.get(territory.id) || 0,
          }
        }
        return item
      } else {
        // Territory mode: use country data directly (no territory grouping)
        return {
          ...item,
          value: item.value,
        }
      }
    })
  }, [mapData, territoryMode])

  // Determine color scheme based on territory mode
  const { finalColors, finalDomain } = React.useMemo(() => {
    if (territoryMode === 'country') {
      // Country mode: use territory colors
      const territoryColors = [
        '#3B82F6', // APAC - Blue
        '#10B981', // AMER - Green
        '#F59E0B', // MENA - Orange
        '#EF4444', // AFRICA - Red
        '#8B5CF6', // EUROPE - Purple
      ]
      return {
        finalColors: territoryColors,
        finalDomain: [0, territoryColors.length - 1] as [number, number],
      }
    } else {
      // Territory mode: use default Nivo color scheme for individual countries
      return {
        finalColors: 'nivo',
        finalDomain: [0, 1000000] as [number, number],
      }
    }
  }, [territoryMode])

  // Generate appropriate legends based on territory mode
  const territoryLegends = React.useMemo(() => {
    if (territoryMode === 'country') {
      // Country mode: show territory legend
      const allTerritories = [
        { id: 'APAC', name: 'Asia Pacific', color: '#3B82F6' },
        { id: 'AMER', name: 'Americas', color: '#10B981' },
        { id: 'MENA', name: 'Middle East & North Africa', color: '#F59E0B' },
        { id: 'AFRICA', name: 'Africa', color: '#EF4444' },
        { id: 'EUROPE', name: 'Europe', color: '#8B5CF6' },
      ]

      return [
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: true,
          translateX: -20,
          translateY: -20,
          itemsSpacing: 0,
          itemWidth: 140,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemTextColor: '#444444',
          itemOpacity: 0.85,
          symbolSize: 20,
          data: allTerritories.map(territory => ({
            id: territory.id.toLowerCase(),
            label: territory.name,
            color: territory.color,
          })),
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000000',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]
    } else {
      // Territory mode: show default value-based legend for individual countries
      return legends
    }
  }, [territoryMode, legends])

  if (loading) {
    return (
      <div
        className="w-full flex items-center justify-center"
        style={{ height: `${height}px` }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="w-full flex items-center justify-center"
        style={{ height: `${height}px` }}
      >
        <div className="text-center">
          <p className="text-red-600 mb-2">Error: {error}</p>
          <p className="text-gray-600">Map data could not be loaded</p>
        </div>
      </div>
    )
  }

  if (featuresToUse.length === 0) {
    return (
      <div
        className="w-full flex items-center justify-center"
        style={{ height: `${height}px` }}
      >
        <div className="text-center">
          <p className="text-gray-600">No map data available</p>
        </div>
      </div>
    )
  }

  const commonProps = {
    ...props,
    data: processedData,
    features: featuresWithTerritoryColors,
    width,
    height,
    margin: config.margin,
    colors: finalColors,
    domain: finalDomain,
    unknownColor,
    label,
    valueFormat,
    projectionTranslation: config.projectionTranslation,
    projectionRotation: config.projectionRotation,
    enableGraticule,
    graticuleLineColor,
    borderWidth,
    borderColor,
    legends: territoryLegends,
  }

  return (
    <div
      className="w-full relative"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Zoom Controls */}
      {showZoomControls && enableZoom && (
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 bg-white border border-gray-300 rounded shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            title="Zoom In"
          >
            <span className="text-lg font-bold text-gray-700">+</span>
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 bg-white border border-gray-300 rounded shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            title="Zoom Out"
          >
            <span className="text-lg font-bold text-gray-700">−</span>
          </button>
          <button
            onClick={handleResetZoom}
            className="w-8 h-8 bg-white border border-gray-300 rounded shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            title="Reset Zoom"
          >
            <span className="text-sm font-bold text-gray-700">⌂</span>
          </button>
          <div className="w-8 h-6 bg-white border border-gray-300 rounded shadow-md flex items-center justify-center text-xs text-gray-600">
            {Math.round(zoom * 100)}%
          </div>
        </div>
      )}

      {/* Map Container */}
      <div
        className="w-full h-full"
        onWheel={handleWheel}
        style={{ cursor: enableZoom ? 'grab' : 'default' }}
      >
        {mode === 'canvas' ? (
          <ResponsiveChoroplethCanvas {...commonProps} />
        ) : (
          <ResponsiveChoropleth {...commonProps} />
        )}
      </div>
    </div>
  )
}

export default ChoroplethMap
