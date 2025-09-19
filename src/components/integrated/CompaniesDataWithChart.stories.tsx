import type { Meta, StoryObj } from '@storybook/react'
import { CompaniesDataWithChart } from './CompaniesDataWithChart'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Sparkles,
  Zap,
  BarChart3,
  Users,
  Filter,
  Search,
  Settings,
  AlertCircle,
  CheckCircle2,
  Eye,
} from 'lucide-react'

const meta: Meta<typeof CompaniesDataWithChart> = {
  title: 'Integrated/CompaniesDataWithChart',
  component: CompaniesDataWithChart,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Companies Data with Interactive Chart

## Overview

This sophisticated integrated component combines a powerful CompaniesData table with an interactive BubbleChart visualization, providing seamless synchronized interactions between both views. Built with React, TypeScript, and modern UI libraries, it offers a comprehensive solution for company portfolio analysis and strategic positioning.

## Key Features

### 🎯 Bidirectional Selection
- **Table → Chart**: Click on table rows to highlight corresponding chart nodes
- **Chart → Table**: Click on chart bubbles to highlight corresponding table rows
- **Visual Consistency**: Same highlighting patterns across both views
- **State Management**: Synchronized selection state with clear visual feedback

### 🔍 Advanced Filtering
- **Global Search**: Search across all company fields
- **Tier Filtering**: Filter by company tiers (Tier 1-4, Partner)
- **Regional Filtering**: Filter by geographic regions
- **Market Filtering**: Filter by primary markets
- **Revenue Filtering**: Set minimum revenue thresholds
- **Real-time Updates**: All filters instantly update both table and chart

### 📊 Interactive Visualizations
- **Bubble Chart**: Strategic positioning with X/Y axis mapping
- **Dynamic Sizing**: Node sizes based on overall scores
- **Color Coding**: Consistent tier-based color system
- **Hover Effects**: Rich tooltips with detailed company information
- **Responsive Design**: Adapts to different screen sizes

### 🎨 Modern Design System
- **Consistent Styling**: Unified design language across components
- **Accessibility**: WCAG 2.1 AA compliant
- **Dark Mode**: Full theme support
- **Responsive Layout**: Mobile, tablet, and desktop optimized
- **Micro-interactions**: Smooth transitions and hover effects

## Performance Considerations

### ⚡ Optimization Features
- **Virtual Scrolling**: Efficient handling of large datasets
- **Memoization**: Optimized re-renders with React useMemo
- **Lazy Loading**: Progressive data loading
- **Debounced Search**: Optimized search performance
- **Column Resizing**: Configurable table layout

### 📈 Scalability
- **Large Dataset Support**: Handles 1000+ records efficiently
- **Memory Management**: Optimized data transformation
- **Browser Compatibility**: Works across modern browsers
- **Mobile Performance**: Touch-optimized interactions

## Accessibility Features

### ♿ WCAG 2.1 AA Compliance
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and roles
- **High Contrast**: Accessible color combinations
- **Focus Management**: Clear focus indicators
- **Touch Targets**: Appropriate touch target sizes

## Use Cases

### 🏢 Business Intelligence
- **Portfolio Analysis**: Comprehensive company portfolio overview
- **Competitive Intelligence**: Strategic positioning analysis
- **Market Research**: Market segment visualization
- **Investment Decisions**: Data-driven investment insights

### 📊 Data Visualization
- **Strategic Mapping**: Company positioning visualization
- **Trend Analysis**: Historical performance tracking
- **Comparative Analysis**: Side-by-side company comparison
- **Interactive Dashboards**: Real-time data exploration

### 🤝 Collaboration
- **Team Presentations**: Interactive client presentations
- **Stakeholder Reports**: Executive dashboard creation
- **Data Sharing**: Export capabilities for sharing insights
- **Real-time Collaboration**: Live data exploration

## Implementation Notes

### 🛠 Technical Stack
- **React 19**: Latest React features with TypeScript
- **TanStack Table**: Powerful data table implementation
- **Nivo Charts**: Professional data visualization
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Modern component library

### 🔧 Customization Options
- **Theme Support**: Light, dark, and system themes
- **Column Configuration**: Show/hide columns dynamically
- **Layout Options**: Flexible layout configurations
- **Custom Styling**: Extensible styling system
- **Localization**: Multi-language support ready

### 📱 Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced tablet experience
- **Desktop Layout**: Full-featured desktop interface
- **Touch Gestures**: Native touch interactions
- **Adaptive UI**: Context-aware interface adjustments
        `,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#09090b' },
        { name: 'gray', value: '#f8fafc' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      description: 'Loading state',
      control: 'boolean',
      defaultValue: false,
    },
    error: {
      description: 'Error state',
      control: 'text',
    },
    showInstructions: {
      description: 'Show usage instructions',
      control: 'boolean',
      defaultValue: false,
    },
    layout: {
      description: 'Layout configuration',
      control: 'select',
      options: ['default', 'chart-focused', 'table-focused', 'mobile'],
      defaultValue: 'default',
    },
    theme: {
      description: 'Theme mode',
      control: 'select',
      options: ['light', 'dark', 'auto'],
      defaultValue: 'light',
    },
    showStats: {
      description: 'Show statistics panel',
      control: 'boolean',
      defaultValue: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof CompaniesDataWithChart>

// Main Default Story
export const Default: Story = {
  name: 'Interactive Dashboard',
  render: () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Companies Strategic Dashboard
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interactive visualization of company positioning with synchronized
          table and chart views
        </p>
      </div>

      {/* Main Component */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Interactive Companies Analysis</span>
          </CardTitle>
          <CardDescription>
            Click on table rows or chart bubbles to explore company positioning.
            Use filters to narrow down your analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompaniesDataWithChart />
        </CardContent>
      </Card>
    </div>
  ),
}

// Enhanced Instructions Story
export const EnhancedInstructions: Story = {
  name: 'Enhanced Instructions',
  render: () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Getting Started Guide
        </h1>
        <p className="text-muted-foreground">
          Learn how to use the Companies Data with Interactive Chart dashboard
        </p>
      </div>

      {/* Interactive Guide */}
      <Tabs defaultValue="interactions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="interactions"
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Interactions</span>
          </TabsTrigger>
          <TabsTrigger
            value="filtering"
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filtering</span>
          </TabsTrigger>
          <TabsTrigger
            value="visualization"
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Visualization</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Advanced</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="interactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🎯 Interactive Features</CardTitle>
              <CardDescription>
                Learn how to interact with both the table and chart views
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-medium">Table to Chart</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click on company names or checkboxes in the table to
                    highlight corresponding bubbles in the chart.
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-medium">Chart to Table</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click on any bubble in the chart to automatically highlight
                    the corresponding row in the table.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filtering" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🔍 Filtering Capabilities</CardTitle>
              <CardDescription>
                Master the powerful filtering system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Search className="h-4 w-4" />
                    <span className="font-medium">Global Search</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Search across all company fields including names, countries,
                    and business models.
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-purple-600">
                    <Filter className="h-4 w-4" />
                    <span className="font-medium">Category Filters</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Filter by tier, region, market, and business model using the
                    dropdown filters.
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-red-600">
                    <BarChart3 className="h-4 w-4" />
                    <span className="font-medium">Revenue Filters</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Set minimum revenue thresholds to focus on companies of
                    specific sizes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📊 Chart Interpretation</CardTitle>
              <CardDescription>
                Understanding the bubble chart visualization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <span className="font-medium">X-Axis</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Strategic Fit</strong> - How well the company aligns
                    with strategic goals (0-10 scale)
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-green-600">
                    <span className="font-medium">Y-Axis</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Ability to Execute</strong> - Company&apos;s
                    execution capability (0-10 scale)
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-purple-600">
                    <span className="font-medium">Bubble Size</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Overall Score</strong> - Larger bubbles indicate
                    higher overall scores
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>⚙️ Advanced Features</CardTitle>
              <CardDescription>
                Explore advanced capabilities and customization options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-600">
                    <Settings className="h-4 w-4" />
                    <span className="font-medium">Column Management</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use the &quot;View&quot; button to show/hide columns and
                    customize your table layout.
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center space-x-2 text-teal-600">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">Responsive Design</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The dashboard adapts to different screen sizes with
                    optimized layouts for mobile, tablet, and desktop.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Main Component */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Interactive Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CompaniesDataWithChart />
        </CardContent>
      </Card>
    </div>
  ),
}

// Loading State Story
export const LoadingState: Story = {
  name: 'Loading State',
  render: () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Loading Dashboard</h1>
        <p className="text-muted-foreground">
          Demonstrating the loading state with skeleton components
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span>Loading Companies Data...</span>
          </CardTitle>
          <CardDescription>
            Please wait while we load your company portfolio data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Toolbar Skeleton */}
            <div className="space-y-2">
              <div className="h-10 w-full bg-muted rounded animate-pulse" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 w-full bg-muted rounded animate-pulse" />
                <div className="h-8 w-full bg-muted rounded animate-pulse" />
              </div>
            </div>

            {/* Table Skeleton */}
            <div className="space-y-2">
              <div className="h-8 w-full bg-muted rounded animate-pulse" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 w-full bg-muted rounded animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Chart Skeleton */}
            <div className="h-96 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground">
                  Loading visualization...
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}

// Error State Story
export const ErrorState: Story = {
  name: 'Error State',
  render: () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Error Handling</h1>
        <p className="text-muted-foreground">
          Demonstrating error states with user-friendly recovery options
        </p>
      </div>

      <Card className="bg-destructive/10 border-destructive/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <div>
              <h3 className="font-semibold text-destructive">
                Failed to Load Data
              </h3>
              <p className="text-sm text-destructive/80">
                We encountered an error while loading the company data. Please
                check your internet connection and try again.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>Data Loading Error</span>
          </CardTitle>
          <CardDescription className="text-red-600">
            The system could not retrieve the company portfolio data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center h-96 bg-red-50 rounded-lg">
              <div className="text-center space-y-2">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                <p className="text-lg font-medium text-red-700">
                  Error Loading Data
                </p>
                <p className="text-sm text-red-600 max-w-md">
                  There was a problem connecting to the data source. Please
                  check your connection and try again.
                </p>
                <div className="flex space-x-2 justify-center mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3"
                  >
                    Retry
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3"
                  >
                    Refresh
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}

// Empty State Story
export const EmptyState: Story = {
  name: 'Empty State',
  render: () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Empty State</h1>
        <p className="text-muted-foreground">
          Showing the dashboard when no company data is available
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <span>No Companies Found</span>
          </CardTitle>
          <CardDescription>
            No company data matches your current filters or there are no
            companies available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Empty Toolbar */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 w-full h-10 px-3 py-2 border border-input rounded-md bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className="h-8 px-3 text-sm border border-input rounded-md bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Tier
                </button>
                <button
                  className="h-8 px-3 text-sm border border-input rounded-md bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Region
                </button>
              </div>
            </div>

            {/* Empty Table */}
            <div className="border rounded-lg p-4">
              <div className="text-center py-8">
                <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
                  <BarChart3 className="h-full w-full" />
                </div>
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  No Companies Found
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Try adjusting your filters or search terms to see company
                  results.
                </p>
                <div className="flex space-x-2 justify-center mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3"
                  >
                    Clear Filters
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3"
                  >
                    Reset Search
                  </button>
                </div>
              </div>
            </div>

            {/* Empty Chart */}
            <div className="h-96 flex items-center justify-center border rounded-lg bg-muted/50">
              <div className="text-center space-y-2">
                <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
                  <BarChart3 className="h-full w-full" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">
                  No Data to Display
                </p>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Add company data or adjust filters to see the visualization
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}

// Mobile View Story
export const MobileView: Story = {
  name: 'Mobile Responsive',
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
  render: () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Mobile Dashboard</h1>
        <p className="text-muted-foreground">
          Optimized for mobile devices with touch interactions
        </p>
      </div>

      {/* Mobile Stats */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="p-3">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-bold">127</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-xs text-muted-foreground">Tier 1</p>
              <p className="text-lg font-bold">24</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Component */}
      <Card className="shadow-lg">
        <CardHeader className="p-4">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Zap className="h-4 w-4 text-primary" />
            <span>Companies Analysis</span>
          </CardTitle>
          <CardDescription className="text-sm">
            Touch-friendly interface for mobile devices
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <CompaniesDataWithChart />
        </CardContent>
      </Card>
    </div>
  ),
}

// Tablet View Story
export const TabletView: Story = {
  name: 'Tablet Responsive',
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
  render: () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Tablet Dashboard</h1>
        <p className="text-muted-foreground">
          Optimized for tablet devices with enhanced touch interactions
        </p>
      </div>

      {/* Tablet Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Companies</p>
              <p className="text-xl font-bold">127</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Tier 1</p>
              <p className="text-xl font-bold">24</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">Active Filters</p>
              <p className="text-xl font-bold">0</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Selected</p>
              <p className="text-xl font-bold">0</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Component */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Companies Analysis</span>
          </CardTitle>
          <CardDescription>
            Enhanced tablet interface with larger touch targets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompaniesDataWithChart />
        </CardContent>
      </Card>
    </div>
  ),
}

// Dark Mode Story
export const DarkMode: Story = {
  name: 'Dark Mode',
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  render: () => (
    <div className="dark space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Dark Mode Dashboard
        </h1>
        <p className="text-muted-foreground">
          Elegant dark theme optimized for low-light environments
        </p>
      </div>

      {/* Dark Mode Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500 bg-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Companies</p>
                <p className="text-2xl font-bold">127</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500 bg-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Tier 1 Companies
                </p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500 bg-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Filters</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500 bg-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Selected</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Component */}
      <Card className="shadow-lg border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Dark Mode Dashboard</span>
          </CardTitle>
          <CardDescription>
            Experience the enhanced visibility and reduced eye strain of dark
            mode
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompaniesDataWithChart />
        </CardContent>
      </Card>
    </div>
  ),
}

// Performance Story
export const PerformanceOptimized: Story = {
  name: 'Performance Optimized',
  render: () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Performance Optimized
        </h1>
        <p className="text-muted-foreground">
          Demonstrating performance features and optimizations
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Performance Features</span>
          </CardTitle>
          <CardDescription>
            Optimized for large datasets and smooth interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">⚡ Optimizations</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">
                    Virtual scrolling for large datasets
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">
                    Memoized components to prevent re-renders
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">Debounced search input</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">Efficient data transformation</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">📊 Performance Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Data Loading Time:</span>
                  <Badge variant="secondary">&lt; 1s</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Render Time:</span>
                  <Badge variant="secondary">&lt; 100ms</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Memory Usage:</span>
                  <Badge variant="secondary">&lt; 50MB</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Max Dataset Size:</span>
                  <Badge variant="secondary">10,000+ rows</Badge>
                </div>
              </div>
            </div>
          </div>
          <CompaniesDataWithChart />
        </CardContent>
      </Card>
    </div>
  ),
}

// Chart Focused Story
export const ChartFocused: Story = {
  name: 'Chart Focused View',
  render: () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Strategic Positioning Analysis
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interactive bubble chart visualization showing company strategic
          positioning across different dimensions
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Company Strategic Map</span>
          </CardTitle>
          <CardDescription>
            X-axis: Strategic Fit | Y-axis: Ability to Execute | Bubble Size:
            Overall Score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chart Legend */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline" className="bg-[#e87722] text-white">
                Tier 1
              </Badge>
              <Badge variant="outline" className="bg-[#ffb500] text-white">
                Tier 2
              </Badge>
              <Badge variant="outline" className="bg-[#59315f] text-white">
                Tier 3
              </Badge>
              <Badge variant="outline" className="bg-[#6e3fa3] text-white">
                Tier 4
              </Badge>
              <Badge variant="outline" className="bg-[#00b398] text-white">
                Partner
              </Badge>
            </div>
            <CompaniesDataWithChart />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}

// Accessibility Story
export const AccessibilityFocused: Story = {
  name: 'Accessibility Features',
  render: () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Accessibility Compliant
        </h1>
        <p className="text-muted-foreground">
          WCAG 2.1 AA compliant design with full keyboard navigation
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Accessibility Features</span>
          </CardTitle>
          <CardDescription>
            Designed with accessibility in mind for all users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                ♿ WCAG 2.1 AA Compliance
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">Full keyboard navigation</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">Screen reader support</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">High contrast colors</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">Focus indicators</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">🔧 Interaction Features</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-blue-600">
                  <span className="text-sm font-medium">Tab Navigation:</span>
                  <span className="text-sm">
                    Navigate through all interactive elements
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <span className="text-sm font-medium">Space/Enter:</span>
                  <span className="text-sm">
                    Activate buttons and selections
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <span className="text-sm font-medium">Arrow Keys:</span>
                  <span className="text-sm">Navigate through table rows</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <span className="text-sm font-medium">Escape:</span>
                  <span className="text-sm">Close menus and modals</span>
                </div>
              </div>
            </div>
          </div>
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-semibold text-muted-foreground">
                    Keyboard Navigation Tip
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Use Tab to navigate between elements, Space/Enter to select,
                    and Arrow keys to navigate through table rows. All
                    interactive elements are fully accessible via keyboard.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <CompaniesDataWithChart />
        </CardContent>
      </Card>
    </div>
  ),
}
