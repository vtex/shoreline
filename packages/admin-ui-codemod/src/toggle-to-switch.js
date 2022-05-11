function remove(source, j, componentName, props) {
  return j(source)
    .find(j.JSXOpeningElement, { name: { name: componentName } })
    .forEach((p) => {
      const { name, attributes, selfClosing } = p.value

      const newAttributes = attributes.filter((attribute) => {
        return !props.includes(attribute.name.name)
      })

      j(p).replaceWith(j.jsxOpeningElement(name, newAttributes, selfClosing))
    })
    .toSource()
}

function replace(source, j, componentName) {
  const importStep = j(source)
    .find(j.ImportSpecifier, { imported: { name: componentName } })
    .forEach((p) => {
      p.value.imported.name = 'Switch'
    })
    .toSource()

  const usageStep = j(importStep)
    .find(j.JSXElement, { openingElement: { name: { name: componentName } } })
    .forEach((p) => {
      const { name, attributes, selfClosing } = p.value.openingElement

      // rename Toggle to Switch
      name.name = 'Switch'

      const updatedAttributes = [
        ...attributes,
        j.jsxAttribute(j.jsxIdentifier('label'), j.literal('')),
      ]

      p.value.openingElement = j.jsxOpeningElement(
        name,
        updatedAttributes,
        selfClosing
      )

      if (!selfClosing) {
        p.value.closingElement = j.jsxClosingElement(j.jsxIdentifier('Switch'))
      }
    })
    .toSource()

  return usageStep
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = replace(source, j, 'Toggle')
  source = remove(source, j, 'Switch', ['size'])

  return source
}
