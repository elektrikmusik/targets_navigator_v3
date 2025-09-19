import type { Meta, StoryObj } from '@storybook/react'
import { BubbleChart, type BubbleChartProps } from './BubbleChart'
import { useCompanyOverview } from '../../hooks/useCompanyOverview'

// Wrapper component for stories that need real data
const BubbleChartWithData = (args: BubbleChartProps) => {
  const { data, loading, error } = useCompanyOverview()

  if (loading) {
    return (
      <div
        className="bubble-chart-empty flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50"
        style={{ height: args.height || 400, width: args.width || 600 }}
      >
        <div className="text-center text-gray-500">
          <div className="text-base font-medium">Loading companies data...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="bubble-chart-empty flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50"
        style={{ height: args.height || 400, width: args.width || 600 }}
      >
        <div className="text-center text-red-500">
          <div className="text-base font-medium">
            Error loading data: {error}
          </div>
        </div>
      </div>
    )
  }

  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : []
  console.log('BubbleChartWithData - Safe data:', safeData)

  return <BubbleChart {...args} data={safeData} />
}

const meta: Meta<typeof BubbleChart> = {
  title: 'Charts/BubbleChart',
  component: BubbleChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A bubble chart component using Nivo ScatterPlot to visualize companies data with Strategic Fit (X-axis), Ability to Execute (Y-axis), and Overall Score (bubble size). Based on [Nivo ScatterPlot](https://nivo.rocks/scatterplot/).',
      },
    },
  },
  argTypes: {
    data: {
      description: 'Array of company overview data',
      control: false,
    },
    height: {
      description: 'Height of the chart',
      control: { type: 'number', min: 200, max: 800, step: 50 },
    },
    width: {
      description: 'Width of the chart',
      control: { type: 'number', min: 400, max: 1000, step: 50 },
    },
    margin: {
      description: 'Chart margins',
      control: {
        type: 'object',
        value: { top: 50, right: 50, bottom: 50, left: 50 },
      },
    },
    enableGridX: {
      description: 'Enable horizontal grid lines',
      control: 'boolean',
    },
    enableGridY: {
      description: 'Enable vertical grid lines',
      control: 'boolean',
    },
    // Axis configuration
    axisBottom: {
      description: 'Bottom axis configuration',
      control: {
        type: 'object',
        value: {
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Strategic Fit',
          legendPosition: 'middle',
          legendOffset: 46,
        },
      },
    },
    axisLeft: {
      description: 'Left axis configuration',
      control: {
        type: 'object',
        value: {
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Ability to Execute',
          legendPosition: 'middle',
          legendOffset: -72,
        },
      },
    },
    // Legend configuration
    legends: {
      description: 'Legend configuration',
      control: {
        type: 'object',
        value: [
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
                  itemOpacity: 1,
                },
              },
            ],
          },
        ],
      },
    },
    // Node configuration
    nodeSize: {
      description:
        'Base size multiplier for nodes (actual size scales with overallScore)',
      control: { type: 'number', min: 4, max: 100, step: 1 },
    },
    // Animation and motion
    animate: {
      description: 'Enable animations',
      control: 'boolean',
    },
    motionConfig: {
      description: 'Animation configuration',
      control: {
        type: 'select',
        options: ['gentle', 'wobbly', 'stiff', 'slow', 'molasses', 'default'],
      },
    },
    // Interactivity
    onNodeClick: {
      description: 'Callback function when a node is clicked',
      action: 'nodeClicked',
    },
    // Advanced features
    useMesh: {
      description: 'Enable voronoi mesh for better interaction',
      control: 'boolean',
    },
    // Scale configuration
    xScaleMin: {
      description: 'Minimum value for X scale',
      control: { type: 'number', min: 0, max: 10, step: 0.5 },
    },
    xScaleMax: {
      description: 'Maximum value for X scale',
      control: { type: 'number', min: 0, max: 10, step: 0.5 },
    },
    yScaleMin: {
      description: 'Minimum value for Y scale',
      control: { type: 'number', min: 0, max: 10, step: 0.5 },
    },
    yScaleMax: {
      description: 'Maximum value for Y scale',
      control: { type: 'number', min: 0, max: 10, step: 0.5 },
    },
    // Blend mode
    blendMode: {
      description: 'Blend mode for overlapping nodes',
      control: {
        type: 'select',
        options: [
          'normal',
          'multiply',
          'screen',
          'overlay',
          'darken',
          'lighten',
          'color-dodge',
          'color-burn',
          'hard-light',
          'soft-light',
          'difference',
          'exclusion',
        ],
      },
    },
    // Theme configuration
    theme: {
      description: 'Chart theme configuration',
      control: {
        type: 'object',
        value: {
          background: 'transparent',
          text: {
            fontSize: 11,
            fill: '#333333',
            outlineWidth: 0,
            outlineColor: 'transparent',
          },
        },
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BubbleChart>

// Default story with real data
export const Default: Story = {
  render: args => <BubbleChartWithData {...args} />,
  args: {
    height: 900,
    width: 900,
    enableGridX: true,
    enableGridY: true,
    nodeSize: 50,
    animate: false,
    motionConfig: 'default',
    useMesh: false,
    xScaleMin: 0,
    xScaleMax: 10,
    yScaleMin: 0,
    yScaleMax: 10,
    blendMode: 'normal',
  },
}
