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

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = remove(source, j, 'Alert', ['icon', 'fluid', 'sticky'])

  return source
}
