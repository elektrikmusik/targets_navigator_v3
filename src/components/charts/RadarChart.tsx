import React from 'react'
import { ResponsiveRadar } from '@nivo/radar'
import type { CompanyOverview } from '../../db/schema'

interface RadarChartProps {
  data: CompanyOverview[]
  selectedCompanyIds: Set<string>
  height?: number
  width?: number
  margin?: {
    top: number
    right: number
    bottom: number
    left: number
  }
  maxValue?: number
  curve?: 'linearClosed' | 'catmullRomClosed'
  borderWidth?: number
  borderColor?: string
  gridLevels?: number
  gridShape?: 'circular' | 'linear'
  gridLabelOffset?: number
  enableDots?: boolean
  dotSize?: number
  dotColor?: string
  dotBorderWidth?: number
  dotBorderColor?: string
  enableDotLabel?: boolean
  dotLabel?: string
  dotLabelYOffset?: number
  colors?: string[]
  fillOpacity?: number
  blendMode?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
  animate?: boolean
  motionConfig?: 'gentle' | 'wobbly' | 'stiff' | 'slow' | 'molasses' | 'default'
  isInteractive?: boolean
  legends?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  valueFormat?: string
  sliceTooltip?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Score keys to display in radar chart
const scoreKeys = [
  'finance_score',
  'industry_score',
  'manufacturing_score',
  'H2Score',
  'IPActivityScore',
  'OwnershipScore',
] as const

// Friendly names for the score keys
const scoreLabels: Record<string, string> = {
  finance_score: 'Finance',
  industry_score: 'Industry',
  manufacturing_score: 'Manufacturing',
  H2Score: 'H2 Score',
  IPActivityScore: 'IP Activity',
  OwnershipScore: 'Ownership',
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  selectedCompanyIds,
  height = 400,
  width = 500,
  margin = { top: 70, right: 80, bottom: 40, left: 80 },
  maxValue = 10,
  curve = 'catmullRomClosed',
  borderWidth = 2,
  borderColor = 'inherit',
  gridLevels = 5,
  gridShape = 'circular',
  gridLabelOffset = 16,
  enableDots = true,
  dotSize = 8,
  dotColor = 'inherit',
  dotBorderWidth = 2,
  dotBorderColor = '#ffffff',
  enableDotLabel = false,
  dotLabel = 'value',
  dotLabelYOffset = -12,
  colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
  fillOpacity = 0.1,
  blendMode = 'multiply',
  animate = true,
  motionConfig = 'gentle',
  isInteractive = true,
  legends = [
    {
      anchor: 'top-left',
      direction: 'column',
      translateX: -50,
      translateY: -40,
      itemWidth: 80,
      itemHeight: 20,
      itemTextColor: '#999',
      symbolSize: 12,
      symbolShape: 'circle',
      effects: [
        {
          on: 'hover',
          style: {
            itemTextColor: '#000',
          },
        },
      ],
    },
  ],
  valueFormat = '>-.2f',
  sliceTooltip,
}) => {
  // Filter data to only include selected companies
  const selectedCompanies = data.filter(company => {
    // Use the key field from schema as the primary identifier
    const companyKey = company.key?.toString() || ''
    const englishName = company.englishName || ''
    const companyName = company.companyName || ''
    const chartId = companyKey || englishName || companyName || 'Unknown'
    return selectedCompanyIds.has(chartId)
  })

  // Get company display names for the keys prop (for legend display)
  const companyKeys = selectedCompanies.map(
    company =>
      company.englishName ||
      company.companyName ||
      company.key?.toString() ||
      'Unknown'
  )

  // Transform data for Nivo Radar - CORRECT STRUCTURE
  // Each object represents a dimension with values for each company
  const radarData = scoreKeys.map(key => {
    const dimensionData: Record<string, string | number> = {
      dimension: scoreLabels[key] || key,
    }

    // Add each company's score for this dimension
    selectedCompanies.forEach(company => {
      const companyDisplayName =
        company.englishName ||
        company.companyName ||
        company.key?.toString() ||
        'Unknown'
      const rawValue = company[key]

      // Convert to number safely, default to 0 if invalid
      let value = 0
      if (rawValue !== undefined && rawValue !== null) {
        const numValue = Number(rawValue)
        if (!isNaN(numValue) && typeof numValue === 'number') {
          value = numValue
        }
      }

      dimensionData[companyDisplayName] = Math.max(0, Math.min(value, maxValue))
    })

    return dimensionData
  })

  // Check for NaN values that would break the chart
  const hasNaNValues = radarData.some(dimension =>
    companyKeys.some(companyDisplayName =>
      isNaN(dimension[companyDisplayName] as number)
    )
  )

  if (radarData.length === 0 || hasNaNValues || companyKeys.length === 0) {
    return (
      <div
        className="flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50"
        style={{ height, width }}
      >
        <div className="text-center text-gray-500">
          <div className="text-base font-medium mb-2">
            {hasNaNValues ? 'Invalid Score Data' : 'No Companies Selected'}
          </div>
          <div className="text-sm">
            {hasNaNValues
              ? 'Cannot display chart due to invalid score values'
              : 'Select companies from the table to view their scores'}
          </div>
          {hasNaNValues && (
            <div className="mt-2 text-xs">
              Check console for detailed error information
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ height, width }}>
      <ResponsiveRadar
        data={radarData}
        keys={companyKeys}
        indexBy="dimension"
        valueFormat={valueFormat}
        maxValue={maxValue}
        margin={margin}
        curve={curve}
        borderWidth={borderWidth}
        borderColor={borderColor}
        gridLevels={gridLevels}
        gridShape={gridShape}
        gridLabelOffset={gridLabelOffset}
        enableDots={enableDots}
        dotSize={dotSize}
        dotColor={dotColor}
        dotBorderWidth={dotBorderWidth}
        dotBorderColor={dotBorderColor}
        enableDotLabel={enableDotLabel}
        dotLabel={dotLabel}
        dotLabelYOffset={dotLabelYOffset}
        colors={colors}
        fillOpacity={fillOpacity}
        blendMode={blendMode}
        animate={animate}
        motionConfig={motionConfig}
        isInteractive={isInteractive}
        legends={legends}
        sliceTooltip={sliceTooltip}
        theme={{
          background: 'transparent',
          text: {
            fontSize: 11,
            fill: '#333333',
            outlineWidth: 0,
            outlineColor: 'transparent',
          },
          axis: {
            domain: {
              line: {
                stroke: '#777777',
                strokeWidth: 1,
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill: '#333333',
                outlineWidth: 0,
                outlineColor: 'transparent',
              },
            },
            ticks: {
              line: {
                stroke: '#777777',
                strokeWidth: 1,
              },
              text: {
                fontSize: 11,
                fill: '#333333',
                outlineWidth: 0,
                outlineColor: 'transparent',
              },
            },
          },
          grid: {
            line: {
              stroke: '#dddddd',
              strokeWidth: 1,
            },
          },
          legends: {
            title: {
              text: {
                fontSize: 11,
                fill: '#333333',
                outlineWidth: 0,
                outlineColor: 'transparent',
              },
            },
            text: {
              fontSize: 11,
              fill: '#333333',
              outlineWidth: 0,
              outlineColor: 'transparent',
            },
            ticks: {
              line: {},
              text: {
                fontSize: 10,
                fill: '#333333',
                outlineWidth: 0,
                outlineColor: 'transparent',
              },
            },
          },
          annotations: {
            text: {
              fontSize: 13,
              fill: '#333333',
              outlineWidth: 2,
              outlineColor: '#ffffff',
              outlineOpacity: 1,
            },
            link: {
              stroke: '#000000',
              strokeWidth: 1,
              outlineWidth: 2,
              outlineColor: 'transparent',
              outlineOpacity: 1,
            },
            outline: {
              stroke: '#000000',
              strokeWidth: 2,
              outlineWidth: 2,
              outlineColor: '#ffffff',
              outlineOpacity: 1,
            },
            symbol: {
              fill: '#000000',
              outlineWidth: 2,
              outlineColor: '#ffffff',
              outlineOpacity: 1,
            },
          },
          tooltip: {
            container: {
              background: '#ffffff',
              color: '#333333',
              fontSize: 12,
              borderRadius: '9px',
              boxShadow: '0 3px 9px 0 rgba(0, 0, 0, 0.5)',
            },
            basic: {},
            chip: {},
            table: {},
            tableCell: {},
            tableCellValue: {},
          },
        }}
      />
    </div>
  )
}

export default RadarChart
