const {
  removeLegacyImports,
  replaceUnsuportedResponsiveObjects,
  updateComponentImports,
} = require('./utils')

function replaceDirectionProp(source, j, componentName) {
  return j(source)
    .find(j.JSXElement, { openingElement: { name: { name: componentName } } })
    .forEach((p) => {
      const { name, attributes, selfClosing } = p.value.openingElement

      const draftAttrs = attributes.map((attribute) => {
        if (!attribute || !attribute.name) return attribute
        if (attribute.name.name === 'direction') {
          const newValue = attribute.value.value !== 'column'

          return j.jsxAttribute(
            j.jsxIdentifier('horizontal'),
            j.jsxExpressionContainer(j.booleanLiteral(newValue))
          )
        }

        return attribute
      })

      p.value.openingElement = j.jsxOpeningElement(
        name,
        draftAttrs,
        selfClosing
      )
    })
    .toSource()
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file
  const formerResponsiveAttributes = ['fluid', 'direction', 'space', 'align']

  // removes old stack imports from adminui
  source = removeLegacyImports(file.source, j, 'Stack')

  // changes unsupported stacks to StackLegacy
  source = replaceUnsuportedResponsiveObjects({
    source,
    j,
    componentName: 'Stack',
    possibleAttributes: formerResponsiveAttributes,
  })

  // changes direction prop to horizontal boolean
  source = replaceDirectionProp(source, j, 'Stack')

  // adds shoreline import in files using stack
  source = updateComponentImports({
    source,
    j,
    componentName: 'Stack',
    importSpecifier: j.importSpecifier(j.identifier('Stack')),
    importSource: '@vtex/shoreline',
  })
  // re-adds adminui in files using StackLegacy
  source = updateComponentImports({
    source,
    j,
    componentName: 'StackLegacy',
    importSpecifier: j.importSpecifier(
      j.identifier('Stack'),
      j.identifier('StackLegacy')
    ),
    importSource: '@vtex/admin-ui',
  })

  return source
}
