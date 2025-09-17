import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public', '../src/components/charts'],
  viteFinal: async (config) => {
    // Ensure static files are served
    if (config.server) {
      config.server.fs = {
        ...config.server.fs,
        allow: ['..']
      }
    }
    return config
  },
}
export default config
