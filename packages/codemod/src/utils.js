function removeLegacyImports(source, j, componentName) {
  // remove single imports
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

  // remove from group import
  const test = j(removeSingleStep)
    .find(j.ImportSpecifier, { imported: { name: componentName } })
    .remove()
    .toSource()

  return test
}

function replaceUnsuportedResponsiveObjects({
  source,
  j,
  componentName,
  possibleAttributes = [],
}) {
  return j(source)
    .find(j.JSXElement, { openingElement: { name: { name: componentName } } })
    .forEach((p) => {
      const { name, attributes, selfClosing } = p.value.openingElement

      // check if atributes in list have a responsive object
      const hasResponsiveProp =
        j(p)
          .find(j.JSXAttribute)
          .filter((attribute) => {
            return possibleAttributes.includes(attribute.node.name.name)
          })
          .find(j.ObjectProperty, { key: { name: 'desktop' } })
          .size() > 0

      if (hasResponsiveProp) {
        // change component name to NameLegacy
        name.name = `${componentName}Legacy`
        p.value.openingElement = j.jsxOpeningElement(
          name,
          attributes,
          selfClosing
        )
        if (!selfClosing) {
          p.value.closingElement = j.jsxClosingElement(
            j.jsxIdentifier(`${componentName}Legacy`)
          )
        }
      }
    })
    .toSource()
}

// format: import { importSpecifier } from importSource
// adds new import to document
function addNewImport(source, j, importSpecifier, importSource) {
  const newImport = j.importDeclaration(
    [importSpecifier],
    j.stringLiteral(importSource)
  )

  const tree = j(source)

  // Insert it at the top of the document
  tree.get().node.program.body.unshift(newImport)

  return tree.toSource()
}

// format: import { newImport, ... } from importSource
// attaches to existing import
function attachToImport(source, j, newImport, importSource) {
  return j(source)
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === importSource)
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

// adds a certain component imports only when it is used in file
function updateComponentImports({
  source,
  j,
  componentName,
  importSpecifier,
  importSource,
}) {
  const hasUsage =
    j(source)
      .find(j.JSXOpeningElement, { name: { name: componentName } })
      .size() > 0

  const alreadyImported =
    j(source)
      .find(j.ImportDeclaration)
      .find(j.Identifier, { name: componentName })
      .size() > 0

  // skip if not needed
  if (!hasUsage || alreadyImported) return source

  if (
    j(source)
      .find(j.ImportDeclaration)
      .filter((path) => path.node.source.value === importSource)
      .size()
  ) {
    return attachToImport(source, j, importSpecifier, importSource)
  }

  return addNewImport(source, j, importSpecifier, importSource)
}

module.exports = {
  attachToImport,
  addNewImport,
  removeLegacyImports,
  replaceUnsuportedResponsiveObjects,
  updateComponentImports,
}
