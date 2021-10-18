/* eslint-disable import/no-nodejs-modules */
/* eslint-disable camelcase */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { resolve, relative, dirname } = require('path')

const { repository } = require('./package.json')

function getAdjacentPaths(arr, index) {
  return {
    nextPagePath: arr[index + 1] ? arr[index + 1] : null,
    prevPagePath: arr[index - 1] ? arr[index - 1] : null,
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions
  const layout = resolve(`src/components/MDXLayout.tsx`)

  return graphql(`
    {
      allMdx {
        edges {
          node {
            fileAbsolutePath
            tableOfContents
            frontmatter {
              path
              redirect_from
            }
          }
        }
      }
      allNavigationYaml {
        edges {
          node {
            section
            paths
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const flatArray = []

    result.data.allNavigationYaml.edges.forEach(async ({ node }) => {
      node.paths.forEach((path) => flatArray.push(path))
    })

    return result.data.allMdx.edges.forEach(async ({ node }) => {
      const { frontmatter, fileAbsolutePath, tableOfContents } = node
      const { path, redirect_from } = frontmatter

      const currentIndexInFlatArray = flatArray.findIndex((el) => el === path)
      const { nextPagePath, prevPagePath } = getAdjacentPaths(
        flatArray,
        currentIndexInFlatArray
      )

      const root = `${__dirname}/../..`
      const repo = `${repository.replace(/(\/tree.+|\/)$/, '')}/tree/master/`
      const sourceUrl = `${repo}${relative(root, dirname(fileAbsolutePath))}`
      const readmeUrl = `${repo}${relative(root, fileAbsolutePath)}`

      createPage({
        path,
        component: layout,
        context: {
          sourceUrl,
          readmeUrl,
          tableOfContents,
          nextPagePath,
          prevPagePath,
        },
      })

      if (redirect_from) {
        const redirects = Array.isArray(redirect_from)
          ? redirect_from
          : [redirect_from]

        redirects.forEach((redirectPath) => {
          createRedirect({
            fromPath: redirectPath,
            exactPath: true,
            toPath: path,
            isPermanent: true,
            redirectInBrowser: true,
            force: true,
          })
        })
      }
    })
  })
}
