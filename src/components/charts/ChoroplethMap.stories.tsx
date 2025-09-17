import type { Meta, StoryObj } from '@storybook/react'
import { ChoroplethMap } from './ChoroplethMap'

const meta: Meta<typeof ChoroplethMap> = {
  title: 'Charts/ChoroplethMap',
  component: ChoroplethMap,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "A responsive choropleth map component using Nivo's ChoroplethCanvas. Perfect for visualizing geographical data with color-coded regions.",
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'number', min: 400, max: 1200, step: 50 },
      description: 'Width of the map container',
    },
    height: {
      control: { type: 'number', min: 300, max: 800, step: 50 },
      description: 'Height of the map container',
    },
    colors: {
      control: { type: 'select' },
      options: [
        'nivo',
        'BrBG',
        'PRGn',
        'PiYG',
        'PuOr',
        'RdBu',
        'RdGy',
        'RdYlBu',
        'RdYlGn',
        'spectral',
        'blues',
        'greens',
        'greys',
        'oranges',
        'purples',
        'reds',
        'BuGn',
        'BuPu',
        'GnBu',
        'OrRd',
        'PuBuGn',
        'PuBu',
        'PuRd',
        'RdPu',
        'YlGnBu',
        'YlGn',
        'YlOrBr',
        'YlOrRd',
      ],
      description: 'Color scheme for the map',
    },
    domain: {
      control: { type: 'object' },
      description: 'Value domain for color mapping [min, max]',
    },
    unknownColor: {
      control: { type: 'color' },
      description: 'Color for countries without data',
    },
    enableGraticule: {
      control: { type: 'boolean' },
      description: 'Show graticule lines on the map',
    },
    graticuleLineColor: {
      control: { type: 'color' },
      description: 'Color of graticule lines',
    },
    borderWidth: {
      control: { type: 'number', min: 0, max: 2, step: 0.1 },
      description: 'Width of country borders',
    },
    borderColor: {
      control: { type: 'color' },
      description: 'Color of country borders',
    },
    mode: {
      control: { type: 'select' },
      options: ['canvas', 'svg'],
      description:
        'Rendering mode - canvas for performance, svg for interactivity',
    },
    fittingMode: {
      control: { type: 'select' },
      options: ['centered', 'north-focused', 'equatorial'],
      description: 'Map fitting mode',
    },
    excludeAntarctica: {
      control: { type: 'boolean' },
      description: 'Exclude Antarctica from the map',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mode: 'canvas',
    width: 800,
    height: 600,
    colors: 'nivo',
    domain: [0, 1000000],
    unknownColor: '#666666',
    enableGraticule: true,
    graticuleLineColor: '#dddddd',
    borderWidth: 0.5,
    borderColor: '#152538',
    fittingMode: 'centered',
    excludeAntarctica: true,
  },
}

export const DarkTheme: Story = {
  args: {
    mode: 'canvas',
    width: 800,
    height: 600,
    colors: 'greys',
    domain: [0, 1000000],
    unknownColor: '#333333',
    enableGraticule: true,
    graticuleLineColor: '#444444',
    borderWidth: 1,
    borderColor: '#ffffff',
    fittingMode: 'centered',
    excludeAntarctica: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const CustomDomain: Story = {
  args: {
    width: 800,
    height: 600,
    colors: 'spectral',
    domain: [0, 5000000],
    unknownColor: '#cccccc',
    enableGraticule: false,
    borderWidth: 0.8,
    borderColor: '#000000',
    mode: 'canvas',
    fittingMode: 'centered',
    excludeAntarctica: true,
  },
}

export const NoGraticule: Story = {
  args: {
    width: 800,
    height: 600,
    colors: 'PuBu',
    domain: [0, 1000000],
    unknownColor: '#999999',
    enableGraticule: false,
    borderWidth: 1,
    borderColor: '#333333',
    mode: 'canvas',
    fittingMode: 'centered',
    excludeAntarctica: true,
  },
}

export const LargeSize: Story = {
  args: {
    width: 1200,
    height: 800,
    colors: 'YlOrRd',
    domain: [0, 1000000],
    unknownColor: '#666666',
    enableGraticule: true,
    graticuleLineColor: '#dddddd',
    borderWidth: 0.5,
    borderColor: '#152538',
    mode: 'canvas',
    fittingMode: 'centered',
    excludeAntarctica: true,
  },
}

export const SmallSize: Story = {
  args: {
    width: 400,
    height: 300,
    colors: 'BuGn',
    domain: [0, 1000000],
    unknownColor: '#666666',
    enableGraticule: false,
    borderWidth: 0.3,
    borderColor: '#152538',
    mode: 'canvas',
    fittingMode: 'centered',
    excludeAntarctica: true,
  },
}
