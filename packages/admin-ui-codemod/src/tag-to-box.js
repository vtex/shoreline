function replaceImports(source, j, componentName) {
  return j(source)
    .find(j.ImportSpecifier, { imported: { name: componentName } })
    .forEach((p) => {
      p.value.imported.name = 'Box'
    })
    .toSource()
}

function replaceJsx(source, j, componentName) {
  return j(source)
    .find(j.JSXElement, {
      openingElement: {
        name: {
          object: {
            name: componentName,
          },
        },
      },
    })
    .forEach((p) => {
      const {
        name: {
          property: { name: elementName },
        },
        attributes,
        selfClosing,
      } = p.value.openingElement

      const hasAsProp = !!attributes.find((attr) => attr.name.name === 'as')
      const isElementDiv = elementName === 'div'
      const showPreserveAs = hasAsProp | isElementDiv

      const attrs = showPreserveAs
        ? attributes
        : [
            j.jsxAttribute(j.jsxIdentifier('as'), j.literal(elementName)),
            ...attributes,
          ]

      p.value.openingElement = j.jsxOpeningElement(
        j.jsxIdentifier('Box'),
        attrs,
        selfClosing
      )

      if (!selfClosing) {
        p.value.closingElement = j.jsxClosingElement(j.jsxIdentifier('Box'))
      }
    })
    .toSource()
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = replaceImports(source, j, 'tag')
  source = replaceJsx(source, j, 'tag')

  return source
}
