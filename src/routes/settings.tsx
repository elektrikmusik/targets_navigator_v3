import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Appearance</h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="theme-select"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Theme
              </label>
              <select
                id="theme-select"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                aria-label="Select theme"
              >
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="language-select"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Language
              </label>
              <select
                id="language-select"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                aria-label="Select language"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label
                  htmlFor="email-notifications"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email notifications
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive notifications via email
                </p>
              </div>
              <input
                id="email-notifications"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                aria-label="Enable email notifications"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label
                  htmlFor="push-notifications"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Push notifications
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive push notifications
                </p>
              </div>
              <input
                id="push-notifications"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                aria-label="Enable push notifications"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/settings')({
  component: Settings,
})
