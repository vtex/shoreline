module.exports = {
  siteMetadata: {
    title: 'AdminUI',
    author: '@vtex',
    siteUrl: process.env.URL || 'https://admin-ui.surge.sh',
    description: 'VTEX admin component library',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
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
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'documentation',
        path: `${__dirname}/documentation`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: 40,
              icon: `<span>#</span>`,
            },
          },
        ],
      },
    },
    'gatsby-plugin-typescript',
    '@vtex/gatsby-plugin-admin-ui',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'navigation',
        path: `${__dirname}/documentation`,
      },
    },
    'gatsby-plugin-meta-redirect',
    'gatsby-plugin-netlify',
  ],
}
