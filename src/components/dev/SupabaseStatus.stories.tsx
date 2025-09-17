import type { Meta, StoryObj } from '@storybook/react'
import { SupabaseStatus } from './SupabaseStatus'

const meta: Meta<typeof SupabaseStatus> = {
  title: 'Dev/SupabaseStatus',
  component: SupabaseStatus,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A status indicator component that shows the connection status to Supabase. Displays different visual states based on environment variables and connection status. Click the component to test the connection.',
      },
    },
  },
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the component',
    },
  },
  decorators: [
    Story => (
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Click to test connection
          </div>
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The default SupabaseStatus component. It will automatically test the connection on mount and show the appropriate status.',
      },
    },
  },
}

export const WithCustomClassName: Story = {
  args: {
    className: 'border-2 border-blue-500 p-4 rounded-lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with custom styling applied.',
      },
    },
  },
}

export const DarkTheme: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Shows the component in dark theme.',
      },
    },
    backgrounds: { default: 'dark' },
  },
  decorators: [
    Story => (
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">Click to test connection</div>
          <Story />
        </div>
      </div>
    ),
  ],
}

export const MultipleStates: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Shows multiple SupabaseStatus components to demonstrate different states. The actual state will depend on your environment configuration.',
      },
    },
  },
  decorators: [
    Story => (
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Multiple SupabaseStatus components showing different possible
            states:
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-500">Default:</div>
            <Story />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-500">Custom:</div>
            <SupabaseStatus className="border-2 border-green-500 p-2 rounded-lg" />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-500">Large:</div>
            <SupabaseStatus className="p-4 scale-150" />
          </div>
        </div>
      </div>
    ),
  ],
}
