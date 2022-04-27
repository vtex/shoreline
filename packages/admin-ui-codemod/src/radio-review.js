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
        if (attribute.name.name === 'orientation') {
          return j.jsxAttribute(
            j.jsxIdentifier('direction'),
            j.literal(transformDirection(attribute.value.value))
          )
        }

        return attribute
      })

      j(p).replaceWith(j.jsxOpeningElement(name, newAttributes, selfClosing))
    })
    .toSource()
}

function transformDirection(value) {
  if (!value) return 'column'

  return {
    vertical: 'column',
    horizontal: 'row',
  }[value]
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = replace(source, j, 'RadioGroup')
  source = remove(source, j, 'Radio', ['state', 'size'])
  source = remove(source, j, 'RadioGroup', ['size'])

  return source
}
