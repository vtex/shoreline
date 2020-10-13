module.exports = {
  siteMetadata: {
    title: 'AdminUI',
    author: '@vtex',
    siteUrl: process.env.URL || 'https://admin-ui.surge.sh',
    description: 'VTEX admin component library',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'AdminUI',
        short_name: 'AdminUI',
        start_url: '/',
        background_color: '#2953B2',
        theme_color: '#2953B2',
        display: 'minimal-ui',
        // icon: 'src/images/icon.svg',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'documentation',
        path: `${__dirname}/../documentation`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
          'gatsby-remark-code-modifiers',
          'gatsby-remark-title',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: 80,
              icon: '<span>#</span>',
            },
          },
        ],
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'navigation',
        path: `${__dirname}/../documentation`,
      },
    },
    'gatsby-plugin-meta-redirect',
    'gatsby-plugin-netlify',
  ],
}
