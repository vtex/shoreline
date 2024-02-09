const { removeLegacyImports, updateComponentImports } = require('./utils')

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = removeLegacyImports(file.source, j, 'Skeleton')

  source = updateComponentImports({
    source,
    j,
    componentName: 'Skeleton',
    importSpecifier: j.importSpecifier(j.identifier('Skeleton')),
    importSource: '@vtex/shoreline',
  })

  return source
}
