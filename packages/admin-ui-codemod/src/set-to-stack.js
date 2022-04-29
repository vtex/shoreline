function replace(source, j, componentName) {
  const importStep = j(source)
    .find(j.ImportSpecifier, { imported: { name: componentName } })
    .forEach((p) => {
      p.value.imported.name = 'Stack'
    })
    .toSource()

  const usageStep = j(importStep)
    .find(j.JSXElement, { openingElement: { name: { name: componentName } } })
    .forEach((p) => {
      const { name, attributes, selfClosing } = p.value.openingElement

      const draftAttrs = attributes
        .map((attribute) => {
          if (attribute.name.name === 'orientation') {
            const newValue = transformOrientation(attribute.value.value)

            return newValue === 'column'
              ? null
              : j.jsxAttribute(
                  j.jsxIdentifier('direction'),
                  j.literal(transformOrientation(attribute.value.value))
                )
          }

          if (attribute.name.name === 'spacing') {
            return j.jsxAttribute(
              j.jsxIdentifier('space'),
              // values are not converted to new token system
              j.literal(attribute.value.value)
            )
          }

          return attribute
        })
        .filter(Boolean)

      const hasOrientation = !!attributes.find(
        (attr) => attr.name.name === 'orientation'
      )

      const attrs = hasOrientation
        ? draftAttrs
        : [
            ...draftAttrs,
            j.jsxAttribute(j.jsxIdentifier('direction'), j.literal('row')),
          ]

      // rename set to stack
      name.name = 'Stack'

      p.value.openingElement = j.jsxOpeningElement(name, attrs, selfClosing)
      if (!selfClosing) {
        p.value.closingElement = j.jsxClosingElement(j.jsxIdentifier('Stack'))
      }
    })
    .toSource()

  return usageStep
}

function transformOrientation(value) {
  if (!value) return 'column'

  return {
    vertical: 'column',
    horizontal: 'row',
  }[value]
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = replace(source, j, 'Set')

  return source
}
