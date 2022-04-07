function replace(source, j, componentName) {
  return j(source)
    .find(j.JSXOpeningElement, { name: { name: componentName } })
    .forEach((p) => {
      const { name, attributes, selfClosing } = p.value

      const newAttributes = attributes.map((attribute) => {
        if (attribute.name.name === 'size') {
          return j.jsxAttribute(
            j.jsxIdentifier('size'),
            j.literal(transformSize(attribute.value.value))
          )
        }

        if (attribute.name.name === 'variant') {
          return j.jsxAttribute(
            j.jsxIdentifier('variant'),
            j.literal(transformVariant(attribute.value.value))
          )
        }

        return attribute
      })

      j(p).replaceWith(j.jsxOpeningElement(name, newAttributes, selfClosing))
    })
    .toSource()
}

function transformSize(value) {
  if (!value) return 'normal'

  return {
    small: 'normal',
    regular: 'normal',
  }[value]
}

function transformVariant(value) {
  if (!value) return 'primary'

  return {
    'adaptative-dark': 'neutralTertiary',
    'adaptative-light': 'neutralTertiary',
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    danger: 'critical',
    'danger-secondary': 'criticalSecondary',
    'danger-tertiary': 'criticalTertiary',
  }[value]
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = replace(source, j, 'Button')

  return source
}
