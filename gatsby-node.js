/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions
  
    const template = require.resolve(`./src/templates/markdown-page.tsx`)
  
    return graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              id
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `).then(result => {

      if (result.errors) {
        return Promise.reject(result.errors)
      }
  
      return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.slug,
          component: template,
          context: {
            id: node.id
          },
        })
      })
    })
  }

exports.onCreateWebpackConfig = ({ stage, getConfig, actions }) => {
  // Silence 'conflicting order' warning for CSS modules.
  // This is only an issue with regular CSS being imported.

  if (stage === 'build-javascript' || stage === 'develop') {
    const config = getConfig()
    // Get the mini-css-extract-plugin
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    )
    // Set the option here to true.
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
    // Update the config.
    actions.replaceWebpackConfig(config)
  }
}