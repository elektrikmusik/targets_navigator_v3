import type { Meta, StoryObj } from '@storybook/react'
import { RadarChart } from './RadarChart'
import type { CompanyOverview } from '../../db/schema'

// Mock data for stories
const mockCompanies: CompanyOverview[] = [
  {
    key: 1,
    englishName: 'TechCorp',
    companyName: 'Tech Corporation',
    finance_score: 8.5,
    industry_score: 7.2,
    manufacturing_score: 6.8,
    H2Score: 9.1,
    IPActivityScore: 8.7,
    OwnershipScore: 7.9,
    Tier: 'Tier 1',
    country: 'USA',
    ceres_region: 'North America',
    primaryMarket: 'Technology',
    businessModel: 'B2B',
    overallScore: 8.0,
    strategicFit: 8.5,
    abilityToExecute: 7.5,
    annual_revenue: 15.2,
    logoUrl: 'https://example.com/techcorp.png',
  },
  {
    key: 2,
    englishName: 'ManufactureCo',
    companyName: 'Manufacturing Company',
    finance_score: 6.8,
    industry_score: 9.2,
    manufacturing_score: 9.5,
    H2Score: 7.1,
    IPActivityScore: 6.5,
    OwnershipScore: 8.2,
    Tier: 'Tier 2',
    country: 'Germany',
    ceres_region: 'Europe',
    primaryMarket: 'Manufacturing',
    businessModel: 'B2B',
    overallScore: 7.8,
    strategicFit: 7.2,
    abilityToExecute: 8.4,
    annual_revenue: 12.7,
    logoUrl: 'https://example.com/manufactureco.png',
  },
  {
    key: 3,
    englishName: 'GreenEnergy',
    companyName: 'Green Energy Solutions',
    finance_score: 7.2,
    industry_score: 8.5,
    manufacturing_score: 7.8,
    H2Score: 9.8,
    IPActivityScore: 8.9,
    OwnershipScore: 7.1,
    Tier: 'Tier 1',
    country: 'Sweden',
    ceres_region: 'Europe',
    primaryMarket: 'Energy',
    businessModel: 'B2B',
    overallScore: 8.2,
    strategicFit: 8.8,
    abilityToExecute: 7.6,
    annual_revenue: 9.5,
    logoUrl: 'https://example.com/greenenergy.png',
  },
]

const meta: Meta<typeof RadarChart> = {
  title: 'Charts/RadarChart',
  component: RadarChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A radar chart component built with Nivo that visualizes company scores across multiple dimensions including finance, industry, manufacturing, H2, IP activity, and ownership scores.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'number' },
    width: { control: 'number' },
    maxValue: { control: 'number' },
    curve: {
      control: 'select',
      options: ['linearClosed', 'catmullRomClosed'],
    },
    enableDots: { control: 'boolean' },
    fillOpacity: { control: 'number', min: 0, max: 1, step: 0.1 },
    animate: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: mockCompanies,
    selectedCompanyIds: new Set(['TechCorp', 'ManufactureCo']),
    height: 400,
    width: 500,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default radar chart showing two selected companies with their scores across six dimensions.',
      },
    },
  },
}

export const SingleCompany: Story = {
  args: {
    data: mockCompanies,
    selectedCompanyIds: new Set(['TechCorp']),
    height: 400,
    width: 500,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Radar chart showing a single selected company. Useful for detailed analysis of one company's strengths and weaknesses.",
      },
    },
  },
}

export const ThreeCompanies: Story = {
  args: {
    data: mockCompanies,
    selectedCompanyIds: new Set(['TechCorp', 'ManufactureCo', 'GreenEnergy']),
    height: 400,
    width: 500,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Radar chart comparing three companies. This demonstrates how the chart handles multiple series and helps in comparative analysis.',
      },
    },
  },
}

export const NoSelection: Story = {
  args: {
    data: mockCompanies,
    selectedCompanyIds: new Set(),
    height: 400,
    width: 500,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Radar chart with no companies selected. Shows the empty state message prompting users to select companies from the table.',
      },
    },
  },
}

export const CustomMaxValue: Story = {
  args: {
    data: mockCompanies,
    selectedCompanyIds: new Set(['TechCorp', 'ManufactureCo']),
    height: 400,
    width: 500,
    maxValue: 12,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Radar chart with custom maximum value (12 instead of default 10). Useful when scores might exceed the typical range.',
      },
    },
  },
}

export const LinearCurve: Story = {
  args: {
    data: mockCompanies,
    selectedCompanyIds: new Set(['TechCorp', 'ManufactureCo']),
    height: 400,
    width: 500,
    curve: 'linearClosed',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Radar chart using linear curves instead of the default catmull-rom curves. Provides a different visual style for the data.',
      },
    },
  },
}

export const NoDots: Story = {
  args: {
    data: mockCompanies,
    selectedCompanyIds: new Set(['TechCorp', 'ManufactureCo']),
    height: 400,
    width: 500,
    enableDots: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Radar chart without dots on the data points. Provides a cleaner look for some use cases.',
      },
    },
  },
}

export const HighOpacity: Story = {
  args: {
    data: mockCompanies,
    selectedCompanyIds: new Set(['TechCorp', 'ManufactureCo']),
    height: 400,
    width: 500,
    fillOpacity: 0.5,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Radar chart with higher fill opacity (0.5 instead of default 0.1). Makes the filled areas more prominent.',
      },
    },
  },
}

export const NoAnimation: Story = {
  args: {
    data: mockCompanies,
    selectedCompanyIds: new Set(['TechCorp', 'ManufactureCo']),
    height: 400,
    width: 500,
    animate: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Radar chart with animations disabled. Useful for static presentations or when performance is a concern.',
      },
    },
  },
}

export const CustomColors: Story = {
  args: {
    data: mockCompanies,
    selectedCompanyIds: new Set(['TechCorp', 'ManufactureCo', 'GreenEnergy']),
    height: 400,
    width: 500,
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Radar chart with custom color scheme. Demonstrates how to customize the colors for different visual styles.',
      },
    },
  },
}
