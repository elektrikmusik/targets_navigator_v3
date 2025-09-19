import React, { useState } from 'react'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import type { Theme } from '@nivo/core'
import type { AxisProps } from '@nivo/axes'
import type { LegendProps } from '@nivo/legends'
import type { ScatterPlotNodeData } from '@nivo/scatterplot'
import type { AnyScale } from '@nivo/scales'
import type { CompanyOverview } from '../../db/schema'
import { getTierColor } from '../../lib/tier-colors'
import './BubbleChart.css'

// Extended axis props that include orientation for scatter plot
interface ScatterPlotAxisProps extends AxisProps {
  orient?: 'top' | 'right' | 'bottom' | 'left'
}

// Define the data structure for our bubble chart
interface BubbleChartData {
  x: number
  y: number
  size: number
  id: string
  company: CompanyOverview
  logourl?: string
  tier?: string
  country?: string
  region?: string
  primarymarket?: string
  businessmodel?: string
  annualrevenue?: number
  financescore?: number
  h2score?: number
  color: string
}

export interface BubbleChartProps {
  data: CompanyOverview[]
  height?: number
  width?: number
  margin?: {
    top: number
    right: number
    bottom: number
    left: number
  }
  theme?: Theme
  onNodeClick?: (node: ScatterPlotNodeData<BubbleChartData>) => void
  enableGridX?: boolean
  enableGridY?: boolean
  axisBottom?: ScatterPlotAxisProps | null
  axisLeft?: ScatterPlotAxisProps | null
  legends?: LegendProps[]
  // Additional Nivo ScatterPlot parameters
  nodeSize?: number
  animate?: boolean
  motionConfig?: 'gentle' | 'wobbly' | 'stiff' | 'slow' | 'molasses' | 'default'
  useMesh?: boolean
  xScaleMin?: number
  xScaleMax?: number
  yScaleMin?: number
  yScaleMax?: number
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion'
  // Tooltip customization
  tooltipSize?: 'small' | 'medium' | 'large' | 'extra-large'
  // Highlighting support
  highlightedCompany?: string | null
  // Logo rendering
  renderLogos?: boolean
}


// Transform company data for Nivo ScatterPlot, grouped by tier
const transformData = (companies: CompanyOverview[]) => {
  console.log('transformData - Input companies:', companies)
  
  if (!Array.isArray(companies)) {
    console.error('transformData - Input is not an array:', companies)
    return []
  }
  
  const filtered = companies.filter(company =>
    company.strategicFit != null &&
    company.abilityToExecute != null &&
    company.overallScore != null
  )

  console.log('BubbleChart data transformation:', {
    totalCompanies: companies.length,
    filteredCompanies: filtered.length,
    sampleScores: filtered.slice(0, 3).map(c => ({
      name: c.englishName || c.companyName,
      strategicFit: c.strategicFit,
      abilityToExecute: c.abilityToExecute,
      overallScore: c.overallScore
    }))
  })
  
  console.log('transformData - Filtered companies:', filtered.length)
  
  // Group by tier
  const groupedByTier = filtered.reduce((acc, company) => {
    const tier = company.Tier || 'Unknown'
    if (!acc[tier]) {
      acc[tier] = []
    }
    
    acc[tier].push({
      x: company.strategicFit!,
      y: company.abilityToExecute!,
      size: company.overallScore!,
      id: company.englishName || company.companyName || 'Unknown',
      company: company,
      logourl: company.logoUrl,
      tier: company.Tier,
      country: company.country,
      region: company.ceres_region,
      primarymarket: company.primaryMarket,
      businessmodel: company.businessModel,
      annualrevenue: company.annual_revenue,
      financescore: company.finance_score,
      h2score: company.H2Score,
      color: getTierColor(tier)
    })
    
    return acc
  }, {} as Record<string, BubbleChartData[]>)
  
  console.log('transformData - Grouped by tier:', Object.keys(groupedByTier))
  
  // Convert to Nivo series format
  const series = Object.entries(groupedByTier).map(([tier, data]) => ({
    id: tier,
    data: data,
    color: getTierColor(tier)
  }))
  
  console.log('BubbleChart - Using centralized tier colors')
  console.log('BubbleChart - Series with colors:', series.map(s => ({ tier: s.id, color: s.color, count: s.data.length })))
  console.log('BubbleChart - Sample data points with colors:', series[0]?.data?.slice(0, 2)?.map(d => ({ id: d.id, tier: d.tier, color: d.color })))
  
  return series
}


export const BubbleChart: React.FC<BubbleChartProps> = ({
  data,
  height = 400,
  width = 600,
  margin = { top: 50, right: 50, bottom: 50, left: 50 },
  nodeSize = 5,
  
  useMesh = false,
  xScaleMin = 0,
  xScaleMax = 20,
  yScaleMin = 0,
  yScaleMax = 20,
  blendMode = 'normal',
  tooltipSize = 'medium',
  highlightedCompany = null,
  renderLogos = false,
  theme = {
    background: 'transparent',
    text: {
      fontSize: 11,
      fill: '#333333',
      outlineWidth: 0,
      outlineColor: 'transparent'
    },
    axis: {
      domain: {
        line: {
          stroke: '#000000',
          strokeWidth: 2
        }
      },
      legend: {
        text: {
          fontSize: 12,
          fill: '#333333',
          outlineWidth: 0,
          outlineColor: 'transparent'
        }
      },
      ticks: {
        line: {
          stroke: '#000000',
          strokeWidth: 2
        },
        text: {
          fontSize: 11,
          fill: '#333333',
          outlineWidth: 0,
          outlineColor: 'transparent'
        }
      }
    },
    grid: {
      line: {
        stroke: '#000000',
        strokeWidth: 2
      }
    },
    legends: {
      title: {
        text: {
          fontSize: 11,
          fill: '#333333',
          outlineWidth: 0,
          outlineColor: 'transparent'
        }
      },
      text: {
        fontSize: 11,
        fill: '#333333',
        outlineWidth: 0,
        outlineColor: 'transparent'
      },
      ticks: {
        line: {},
        text: {
          fontSize: 10,
          fill: '#333333',
          outlineWidth: 0,
          outlineColor: 'transparent'
        }
      }
    },
    annotations: {
      text: {
        fontSize: 13,
        fill: '#333333',
        outlineWidth: 2,
        outlineColor: '#ffffff',
        outlineOpacity: 1
      },
      link: {
        stroke: '#000000',
        strokeWidth: 1,
        outlineWidth: 2,
        outlineColor: '#ffffff',
        outlineOpacity: 1
      },
      outline: {
        stroke: '#000000',
        strokeWidth: 2,
        outlineWidth: 2,
        outlineColor: '#ffffff',
        outlineOpacity: 1
      },
      symbol: {
        fill: '#000000',
        outlineWidth: 2,
        outlineColor: '#ffffff',
        outlineOpacity: 1
      }
    },
    tooltip: {
      container: {
        background: '#ffffff',
        color: '#333333',
        fontSize: 12,
        borderRadius: '9px',
        boxShadow: '0 3px 9px 0 rgba(0, 0, 0, 0.5)'
      },
      basic: {},
      chip: {},
      table: {},
      tableCell: {},
      tableCellValue: {}
    }
  },
  onNodeClick,
  enableGridX = true,
  enableGridY = true,
  axisBottom = {
    orient: 'bottom',
    tickSize: 0,
    tickPadding: 0,
    tickRotation: 0,
    legend: 'Strategic Fit',
    legendPosition: 'middle',
    legendOffset: 20,
    tickValues: []
  },
  axisLeft = {
    orient: 'left',
    tickSize: 0,
    tickPadding: 0,
    tickRotation: 0,
    legend: 'Ability to Execute',
    legendPosition: 'middle',
    legendOffset: -20,
    tickValues: []
  },
  legends = [
    {
      anchor: 'bottom-right',
      direction: 'column',
      justify: false,
      translateX: 120,
      translateY: 0,
      itemWidth: 120,
      itemHeight: 20,
      itemsSpacing: 4,
      itemDirection: 'left-to-right',
      itemOpacity: 0.85,
      symbolSize: 20,
      effects: [
        {
          on: 'hover',
          style: {
            itemOpacity: 1
          }
        }
      ]
    }
  ]
}) => {
  // State for selected node to create focus effect
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  // Update selectedNodeId when highlightedCompany changes
  React.useEffect(() => {
    if (highlightedCompany) {
      setSelectedNodeId(highlightedCompany)
    } else {
      setSelectedNodeId(null)
    }
  }, [highlightedCompany])
  
  // Custom tooltip without selection button - selection happens on click
  const customTooltip = ({ node }: { node: ScatterPlotNodeData<BubbleChartData> }) => {
    console.log('Tooltip triggered for node:', node.data.id)
    const isSelected = selectedNodeId === node.data.id

    return (
      <div className={`bubble-chart-tooltip ${tooltipSize !== 'medium' ? tooltipSize : ''}`}>
        <div className="tooltip-header">
          {node.data.logourl && (
            <img 
              src={node.data.logourl} 
              alt={`${node.data.id} logo`}
              className="tooltip-logo"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          )}
          <div className="tooltip-title">
            {node.data.company.englishName || node.data.id}
            {isSelected && <span className="text-blue-600 ml-2">(Selected)</span>}
          </div>
        </div>
        {node.data.company.companyName && node.data.company.companyName !== node.data.company.englishName && (
          <div className="tooltip-row">
            <strong>Company Name:</strong> {node.data.company.companyName}
          </div>
        )}
        {node.data.annualrevenue && (
          <div className="tooltip-row">
            <strong>Annual Revenue:</strong> ${node.data.annualrevenue.toFixed(0)}B
          </div>
        )}
        {node.data.country && (
          <div className="tooltip-row">
            <strong>Country:</strong> {node.data.country}
          </div>
        )}
        {node.data.region && (
          <div className="tooltip-row">
            <strong>Region:</strong> {node.data.region}
          </div>
        )}
        
      </div>
    )
  }
  
  console.log('BubbleChart - Input data:', data)
  const transformedData = transformData(data)
  console.log('BubbleChart - Transformed data:', transformedData)

  if (transformedData.length === 0) {
    return (
      <div className="bubble-chart-empty flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50" style={{ height, width }}>
        <div className="text-center text-gray-500">
          <div className="text-base font-medium mb-2">
            No Data Available
          </div>
          <div className="text-sm">
            Companies need Strategic Fit, Ability to Execute, and Overall Score data
          </div>
        </div>
      </div>
    )
  }

  // Use the transformed data directly (already in series format)
  const nivoData = transformedData

  // Add safety check for data format
  if (!Array.isArray(nivoData) || nivoData.length === 0) {
    return (
      <div className="bubble-chart-empty flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50" style={{ height, width }}>
        <div className="text-center text-gray-500">
          <div className="text-base font-medium mb-2">
            No Data Available
          </div>
          <div className="text-sm">
            Companies need Strategic Fit, Ability to Execute, and Overall Score data
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bubble-chart-container ${selectedNodeId ? 'has-selection' : ''}`}
      style={{ height: '100%', width: '100%' }}
      data-selected-node={selectedNodeId || ''}
    >
      {selectedNodeId && (
        <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs z-10">
          Selected: {selectedNodeId}
        </div>
      )}
      <ResponsiveScatterPlot
        data={nivoData}
        margin={margin}
        xScale={{ type: 'linear', min: xScaleMin, max: xScaleMax }}
        yScale={{ type: 'linear', min: yScaleMin, max: yScaleMax }}
        blendMode={blendMode}
        gridXValues={[0, 5, 10]}
        gridYValues={[0, 5, 10]}
        colors={(d) => {
          console.log('Colors function called with:', d)
          // Find the color for this series from our data
          const series = transformedData.find(s => s.id === d.serieId)
          const baseColor = series?.color || '#666666'

          // For highlighting, we'll rely on the nodeSize function since colors function
          // doesn't have access to individual node data in a reliable way
          if (highlightedCompany) {
            // Dim all nodes slightly when one is highlighted
            return baseColor + 'CC' // Add 80% opacity
          }

          // Return the base color with opacity
          return baseColor + '80' // Add 50% opacity
        }}
        layers={[
          'grid',
          'axes',
          'nodes',
          'markers',
          'legends',
          // Custom layer to add data attributes after nodes are rendered
          () => {
            // Use useEffect or setTimeout to add attributes after nodes are rendered
            setTimeout(() => {
              const circles = document.querySelectorAll('.bubble-chart-container circle')
              circles.forEach((circle, index) => {
                const node = transformedData.flatMap(s => s.data)[index]
                if (node && selectedNodeId === node.id) {
                  circle.setAttribute('data-selected', 'true')
                } else {
                  circle.removeAttribute('data-selected')
                }
              })
            }, 0)
            return null
          },
          // Custom layer to render logos inside circles
          ...(renderLogos ? [({ nodes, xScale, yScale }: { nodes: ScatterPlotNodeData<BubbleChartData>[]; xScale: AnyScale; yScale: AnyScale }) => {
            return (
              <g>
                {nodes.map((node) => {
                  if (node.data.logourl) {
                    const x = xScale(node.data.x)
                    const y = yScale(node.data.y)
                    const size = nodeSize || 8

                    const isSelected = highlightedCompany === node.data.id
                    const logoOpacity = highlightedCompany ? (isSelected ? 1 : 0.2) : 1 // 100% when nothing selected, 100% for selected, 20% for others

                    return (
                      <image
                        key={node.id}
                        href={node.data.logourl}
                        x={x - size * 0.6}
                        y={y - size * 0.6}
                        width={size * 1.2}
                        height={size * 1.2}
                        style={{
                          borderRadius: '50%',
                          pointerEvents: 'none',
                          opacity: logoOpacity
                        }}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="circle(50%)"
                      />
                    )
                  }
                  return null
                })}
              </g>
            )
          }] : [])
        ]}
        nodeSize={(node) => {
          const dataSize = node.data.size || 5

          console.log('NodeSize calculation:', {
            nodeId: node.data.id,
            dataSize,
            baseSize: nodeSize,
            overallScore: node.data.company?.overallScore
          })

          // Use the nodeSize prop directly as the base size, with scaling based on data
          let scaledSize = nodeSize || 8

          // Apply data-based scaling if we have valid data
          if (dataSize >= 0) {
            // Scale the base size by the data value
            scaledSize = Math.max(nodeSize * 0.5, Math.min(nodeSize * 2, nodeSize + (dataSize * (nodeSize / 5))))
          }

          // Make highlighted nodes larger
          if (highlightedCompany && node.data.id === highlightedCompany) {
            scaledSize *= 1.2 // Make highlighted nodes 50% larger
          }

          console.log('Final scaled size:', scaledSize)
          return scaledSize
        }}
        enableGridX={enableGridX}
        enableGridY={enableGridY}
        axisTop={null}
        axisRight={null}
        axisBottom={axisBottom}
        axisLeft={axisLeft}
        legends={legends}
        theme={theme}
        tooltip={customTooltip}
        onClick={(node) => {
          // Toggle selection: if clicking the same node, deselect it
          const nodeId = node.data.id
          const newSelectedId = selectedNodeId === nodeId ? null : nodeId
          setSelectedNodeId(newSelectedId)

          // Call the original onClick handler if provided
          if (onNodeClick) {
            onNodeClick(node)
          }
        }}
        animate={false}
        motionConfig="default"
        useMesh={useMesh}
      />
    </div>
  )
}

export default BubbleChart
