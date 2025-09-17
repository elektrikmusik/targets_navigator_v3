import { createFileRoute } from '@tanstack/react-router'

function Profile() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                Manu Arora
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                manu@aceternity.com
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                Full Stack Developer
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Avatar</h3>
          <div className="flex items-center space-x-4">
            <img
              src="https://assets.aceternity.com/manu.png"
              className="h-20 w-20 rounded-full"
              alt="Profile"
            />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click to change avatar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/profile')({
  component: Profile,
})
