const {
  removeLegacyImports,
  replaceUnsuportedResponsiveObjects,
  updateComponentImports,
} = require('./utils')

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  const formerResponsiveAttributes = [
    'align',
    'basis',
    'direction',
    'grow',
    'shrink',
    'justify',
    'wrap',
    'order',
  ]

  source = removeLegacyImports(file.source, j, 'Flex')

  source = replaceUnsuportedResponsiveObjects({
    source,
    j,
    componentName: 'Flex',
    possibleAttributes: formerResponsiveAttributes,
  })
  source = updateComponentImports({
    source,
    j,
    componentName: 'Flex',
    importSpecifier: j.importSpecifier(j.identifier('Flex')),
    importSource: '@vtex/shoreline',
  })
  source = updateComponentImports({
    source,
    j,
    componentName: 'FlexLegacy',
    importSpecifier: j.importSpecifier(
      j.identifier('Flex'),
      j.identifier('FlexLegacy')
    ),
    importSource: '@vtex/admin-ui',
  })

  return source
}
