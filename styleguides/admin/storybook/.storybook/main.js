module.exports = {
  stories: [
    '../../core/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../../admin-ui/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../../primitives/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../../formik/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
      },
    },
    '@storybook/addon-a11y',
  ],
}
