const {
  removeLegacyImports,
  replaceUnsuportedResponsiveObjects,
  updateComponentImports,
  renameProp,
} = require('./utils')

function stringifyExpression(value) {
  if (value.type === 'StringLiteral' || value.type === 'NumericLiteral')
    return `"${value.value}"`
  if (value.type === 'Identifier') return value.name

  const { expression } = value

  if (expression.type === 'ConditionalExpression') {
    return `\${${stringifyExpression(expression.test)} ? ${stringifyExpression(
      expression.consequent
    )} : ${stringifyExpression(expression.alternate)}}`
  }

  if (expression.type === 'Identifier') {
    return `\${${expression.name}}`
  }

  return expression.toString()
}

function attValueToTemplateString(value) {
  if (value.type === 'StringLiteral' || value.type === 'NumericLiteral')
    return value.value

  return stringifyExpression(value)
}

function buildGap(j, columnGap, rowGap) {
  const stringifiedColumnGap = columnGap
    ? attValueToTemplateString(columnGap.value)
    : '0rem'

  const stringifiedRowGap = rowGap
    ? attValueToTemplateString(rowGap.value)
    : '0rem'

  // if both the values are simple strings
  if (
    (!columnGap || columnGap.value.type === 'StringLiteral') &&
    (!rowGap || rowGap.value.type === 'StringLiteral')
  ) {
    // return simple format "row column"
    return j.stringLiteral(`${stringifiedRowGap} ${stringifiedColumnGap}`)
  }

  // if some of the values is an expression it gets transformed into template literal
  // {`${rowExp} ${columnExp}`}
  return j.jsxExpressionContainer(
    j.templateLiteral(
      [
        j.templateElement(
          {
            raw: `${stringifiedRowGap} ${stringifiedColumnGap}`,
            cooked: `${stringifiedRowGap} ${stringifiedColumnGap}`,
          },
          true
        ),
      ],
      []
    )
  )
}

function replaceGapProp(source, j, componentName) {
  return j(source)
    .find(j.JSXElement, { openingElement: { name: { name: componentName } } })
    .forEach((p) => {
      const { name, attributes, selfClosing } = p.value.openingElement

      const columnGap = attributes.find(
        (att) => att.name && att.name.name === 'columnGap'
      )

      const rowGap = attributes.find(
        (att) => att.name && att.name.name === 'rowGap'
      )

      // if the old props arent present just return component as is
      if (!columnGap && !rowGap) {
        return p
      }

      // build gap value base on rowGap and columnGap
      const suggestedGap = buildGap(j, columnGap, rowGap)
      let hasGap = false

      const draftAttrs = attributes
        .map((attribute) => {
          if (!attribute || !attribute.name) return attribute
          // filtering out stale props
          if (
            attribute.name.name === 'columnGap' ||
            attribute.name.name === 'rowGap'
          ) {
            return false
          }

          if (attribute.name.name === 'gap') {
            // if there is already a gap attribute we wont replace it
            hasGap = true
          }

          return attribute
        })
        .filter(Boolean)

      if (!hasGap) {
        draftAttrs.push(j.jsxAttribute(j.jsxIdentifier('gap'), suggestedGap))
      }

      p.value.openingElement = j.jsxOpeningElement(
        name,
        draftAttrs,
        selfClosing
      )
    })
    .toSource()
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  const formerResponsiveAttributes = [
    'gap',
    'rowGap',
    'columnGap',
    'templateAreas',
    'templateRows',
    'templateColumns',
  ]

  source = removeLegacyImports(file.source, j, 'Grid')

  source = replaceUnsuportedResponsiveObjects({
    source,
    j,
    componentName: 'Grid',
    possibleAttributes: formerResponsiveAttributes,
  })

  source = renameProp(source, j, 'Grid', 'templateAreas', 'areas')
  source = renameProp(source, j, 'Grid', 'templateRows', 'rows')
  source = renameProp(source, j, 'Grid', 'templateColumns', 'columns')

  source = replaceGapProp(source, j, 'Grid')

  source = updateComponentImports({
    source,
    j,
    componentName: 'Grid',
    importSpecifier: j.importSpecifier(j.identifier('Grid')),
    importSource: '@vtex/shoreline',
  })
  source = updateComponentImports({
    source,
    j,
    componentName: 'GridLegacy',
    importSpecifier: j.importSpecifier(
      j.identifier('Grid'),
      j.identifier('GridLegacy')
    ),
    importSource: '@vtex/admin-ui',
  })

  return source
}
