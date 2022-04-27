function replace(source, j, componentName) {
  return j(source)
    .find(j.JSXOpeningElement, { name: { name: componentName } })
    .forEach((p) => {
      const { name, attributes, selfClosing } = p.value

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

      j(p).replaceWith(j.jsxOpeningElement(name, attrs, selfClosing))
    })
    .toSource()
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
