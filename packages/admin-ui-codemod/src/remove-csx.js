function removeImports(source, j, componentName) {
  // remove single imports of box
  const removeSingleStep = j(source)
    .find(j.ImportDeclaration)
    .filter((path) => {
      return (
        path.node.specifiers.length === 1 &&
        path.node.specifiers[0].imported &&
        path.node.specifiers[0].imported.name === componentName
      )
    })
    .remove()
    .toSource()

  // remove box from group import
  const test = j(removeSingleStep)
    .find(j.ImportSpecifier, { imported: { name: componentName } })
    .remove()
    .toSource()

  return test
}

// adds csx imports only when needed
function updateCsxImports(source, j) {
  const hasCsxUsage =
    j(source)
      .find(j.JSXAttribute)
      .filter((attribute) => attribute.node.name.name === 'csx')
      .size() > 0

  const alreadyImported =
    j(source)
      .find(j.ImportDeclaration)
      .find(j.Identifier, { name: 'csx' })
      .size() > 0

  // skip if not needed
  if (!hasCsxUsage || alreadyImported) return source

  if (
    j(source)
      .find(j.ImportDeclaration)
      .filter((path) => path.node.source.value === '@vtex/admin-ui-core')
      .size()
  ) {
    return attachToImport(source, j)
  }

  return addNewImport(source, j)
}

function addNewImport(source, j) {
  const newImport = j.importDeclaration(
    [j.importSpecifier(j.identifier('csx'))],
    j.stringLiteral('@vtex/admin-ui-core')
  )

  const tree = j(source)

  // Insert it at the top of the document
  tree.get().node.program.body.unshift(newImport)

  return tree.toSource()
}

function attachToImport(source, j) {
  const newImport = j.importSpecifier(j.identifier('csx'))

  return j(source)
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@vtex/admin-ui-core')
    .forEach((reactImport) =>
      // Build a new import declaration node based on the existing one
      j(reactImport).replaceWith(
        j.importDeclaration(
          [...reactImport.node.specifiers, newImport],
          reactImport.node.source
        )
      )
    )
    .toSource()
}

function replaceCsx(source, j) {
  // remove box from group import
  return j(source)
    .find(j.JSXAttribute)
    .filter((attribute) => attribute.node.name.name === 'csx')
    .forEach((attribute) =>
      j(attribute).replaceWith(
        j.jsxAttribute(
          j.jsxIdentifier('className'),
          j.jsxExpressionContainer(
            j.callExpression(j.identifier('csx'), [
              attribute.node.value.expression,
            ])
          )
        )
      )
    )
    .toSource()
}

// gets value of as attribute, defaults to div
function getAs(element) {
  const substitute = element.value.openingElement.attributes.find(
    (at) => at.name && at.name.name === 'as'
  )

  if (!substitute) return 'div'

  // with tsx parser the type is "stringLiteral"
  if (
    substitute.value.type === 'Literal' ||
    substitute.value.type === 'StringLiteral'
  )
    return substitute.value.value

  return (
    (substitute.value.expression && substitute.value.expression.name) || 'div'
  )
}

function changeToDiv(source, j, componentName) {
  return j(source)
    .find(j.JSXElement, { openingElement: { name: { name: componentName } } })
    .forEach((p) => {
      const as = getAs(p)

      // filtering out 'as' attribute
      p.value.openingElement.attributes =
        p.value.openingElement.attributes.filter(
          (at) => !at.name || at.name.name !== 'as'
        )

      // rename to div or 'as' value
      p.value.openingElement.name.name = as
      if (p.value.closingElement) p.value.closingElement.name.name = as
    })
    .toSource()
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = removeImports(source, j, 'Box')
  source = changeToDiv(source, j, 'Box')

  source = updateCsxImports(source, j)
  source = replaceCsx(source, j)

  return source
}
