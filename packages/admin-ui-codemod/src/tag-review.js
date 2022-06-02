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

      const newAttributes = attributes
        .map((attribute) => {
          if (attribute.name.name === 'palette') {
            return j.jsxAttribute(
              j.jsxIdentifier('variant'),
              j.literal(attribute.value.value)
            )
          }

          return attribute
        })
        .filter(Boolean)

      j(p).replaceWith(j.jsxOpeningElement(name, newAttributes, selfClosing))
    })
    .toSource()
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = remove(source, j, 'Tag', ['size', 'handleDelete'])
  source = replace(source, j, 'Tag')

  return source
}
