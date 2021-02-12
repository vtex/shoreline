exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
      type AdminUiConfig implements Node {
        appName: String,
      }
    `)
}

exports.sourceNodes = (
  { actions, createContentDigest },
  { appName = 'gatsby' }
) => {
  const { createNode } = actions

  const adminUiConfig = {
    appName,
  }

  createNode({
    ...adminUiConfig,
    id: `gatsby-plugin-admin-ui-config`,
    parent: null,
    children: [],
    internal: {
      type: `AdminUiConfig`,
      contentDigest: createContentDigest(adminUiConfig),
      content: JSON.stringify(adminUiConfig),
      description: `Options for gatsby-plugin-admin-ui`,
    },
  })
}
