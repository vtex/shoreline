import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const storybookDir = dirname(fileURLToPath(import.meta.url))
const shorelineAiCssSrc = join(
  storybookDir,
  '../packages/shoreline-ai/src/styles/index.css'
)

module.exports = {
  stories: ['../packages/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['./public'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
      },
    },
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-storysource'),
    getAbsolutePath('@storybook/addon-interactions'),
    '@chromatic-com/storybook',
  ],
  typescript: {
    check: false,
    reactDocgen: false,
  },
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {
    autodocs: false,
  },
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@vtex/shoreline-ai/css': shorelineAiCssSrc,
        },
      },
    }
  },
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}
