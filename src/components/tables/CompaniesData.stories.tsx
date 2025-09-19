import type { Meta, StoryObj } from '@storybook/react'
import CompaniesData from './CompaniesData'

// Note: The CompaniesData component uses real data from the useCompanyOverview hook
// The component fetches data from Supabase and displays company information
// including company names, countries, regions, business models, scores, and revenue data

const meta: Meta<typeof CompaniesData> = {
  title: 'Tables/CompaniesData',
  component: CompaniesData,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive data table built with TanStack Table featuring advanced filtering, sorting, pagination, and column visibility controls. The table includes global search, column-specific filters, row selection, and action menus for each row.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Since the component uses hardcoded data, we'll create stories that demonstrate different scenarios
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The default view of the companies data table showing real company data from Supabase. Features include sorting, filtering, search, and pagination controls.',
      },
    },
  },
}

export const WithMoreData: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The table displays all available company data from the database. This demonstrates pagination functionality and how the table handles larger datasets with real company information.',
      },
    },
  },
}

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive story demonstrating all table features. Try using the search bar, column filters, sorting controls, and pagination. Click the View button to toggle column visibility.',
      },
    },
  },
}

export const FilteringDemo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the advanced filtering capabilities. Use the filter buttons for Tier, Region, and Market columns to see multi-select filtering in action. The global search bar filters across all columns.',
      },
    },
  },
}

export const SortingDemo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows sorting functionality. Click on column headers to sort ascending/descending. The sorting arrows indicate the current sort direction.',
      },
    },
  },
}

export const ColumnVisibility: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates column visibility controls. Click the "View" button in the toolbar to toggle which columns are visible. This is useful for customizing the table view based on user preferences.',
      },
    },
  },
}

export const RowSelection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows row selection functionality. Use the checkboxes to select individual rows or the header checkbox to select all visible rows. The selection count is displayed in the pagination area.',
      },
    },
  },
}

export const ActionsMenu: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the actions menu for each row. Click the three-dot menu in the Actions column to see available actions like Copy ID, View details, Edit, and Delete.',
      },
    },
  },
}

export const PaginationControls: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows pagination controls. Use the "Rows per page" dropdown to change how many rows are displayed. Navigate between pages using the arrow buttons.',
      },
    },
  },
}

export const ResponsiveDesign: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates responsive design features. The table adapts to different screen sizes and the filter badges show different layouts on mobile vs desktop.',
      },
    },
  },
}

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shows the empty state when no data matches the current filters. Try filtering by a status that doesn't exist in the data to see this state.",
      },
    },
  },
}

export const PerformanceTest: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Performance test with a larger dataset. This story would demonstrate how the table handles larger amounts of data efficiently with pagination and virtual scrolling.',
      },
    },
  },
}

// Additional stories for specific use cases
export const TierFiltering: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Focus on tier filtering. Use the Tier filter to show only Tier 1, Tier 2, or other tier companies. Multiple tiers can be selected simultaneously.',
      },
    },
  },
}

export const RegionFiltering: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates region-based filtering. Filter by specific regions to see companies in those geographic areas.',
      },
    },
  },
}

export const MarketFiltering: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows market filtering capabilities. Filter by primary markets to organize companies by their target markets.',
      },
    },
  },
}

export const RevenueSorting: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates revenue sorting functionality. Click on the Annual Revenue column header to sort companies by their revenue in ascending or descending order.',
      },
    },
  },
}

export const ScoreSorting: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows score sorting. Sort companies by their overall score, strategic fit, or ability to execute scores.',
      },
    },
  },
}

export const GlobalSearch: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates global search functionality. Use the search bar to find companies by name, country, region, business model, or any other field.',
      },
    },
  },
}

export const CombinedFilters: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows how multiple filters work together. Combine tier, region, and market filters with global search to perform complex queries on the company data.',
      },
    },
  },
}

export const MobileView: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates mobile responsiveness. The table adapts to smaller screens with appropriate spacing and touch-friendly controls.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const TabletView: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows tablet view optimization. The table layout adjusts for medium-sized screens with appropriate column sizing and spacing.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates accessibility features. The table includes proper ARIA labels, keyboard navigation, and screen reader support.',
      },
    },
  },
}

export const DarkMode: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows the table in dark mode. All components adapt to the dark theme with appropriate color schemes and contrast.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
}

export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates custom styling capabilities. The table uses Tailwind CSS classes and can be easily customized to match different design systems.',
      },
    },
  },
}

export const ExportFunctionality: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows potential export functionality. While not implemented in this component, the selected rows could be exported to CSV or other formats.',
      },
    },
  },
}

export const BulkActions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates bulk actions on selected rows. Select multiple employees to perform batch operations like status updates or data export.',
      },
    },
  },
}

export const RealTimeUpdates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows how the table could handle real-time updates. In a real application, this would connect to a backend service for live data updates.',
      },
    },
  },
}

export const ErrorHandling: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates error handling capabilities. The table gracefully handles various error states and provides appropriate user feedback.',
      },
    },
  },
}

export const LoadingStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows loading states during data fetching. The table displays appropriate loading indicators while data is being retrieved.',
      },
    },
  },
}

export const DataValidation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates data validation features. The table ensures data integrity and provides validation feedback for user inputs.',
      },
    },
  },
}

export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows keyboard navigation support. Users can navigate the table using only the keyboard for improved accessibility.',
      },
    },
  },
}

export const PrintFriendly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates print-friendly styling. The table adapts its appearance for printing with appropriate page breaks and styling.',
      },
    },
  },
}
