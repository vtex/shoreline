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
              maxWidth: 800,
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: 80,
              icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.445 12.7781L19.778 10.4451C21.496 8.72709 21.496 5.94109 19.778 4.22209V4.22209C18.06 2.50409 15.274 2.50409 13.555 4.22209L11.222 6.55509" stroke="#323845" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.89001 15.1101L15.11 8.89014" stroke="#323845" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.55497 11.2222L4.22197 13.5552C2.50397 15.2732 2.50397 18.0592 4.22197 19.7782V19.7782C5.93997 21.4962 8.72597 21.4962 10.445 19.7782L12.778 17.4452" stroke="#323845" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
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
