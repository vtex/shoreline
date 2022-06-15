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
  return j(source)
    .find(j.JSXOpeningElement, { name: { name: componentName } })
    .forEach((p) => {
      const { name, attributes, selfClosing } = p.value

      const newAttributes = attributes.map((attribute) => {
        if (attribute.name.name === 'tone') {
          return j.jsxAttribute(
            j.jsxIdentifier('variant'),
            j.literal(attribute.value.value)
          )
        }

        return attribute
      })

      j(p).replaceWith(j.jsxOpeningElement(name, newAttributes, selfClosing))
    })
    .toSource()
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = remove(source, j, 'Alert', ['icon', 'fluid', 'sticky', 'visible'])
  source = replace(source, j, 'Alert')

  return source
}
