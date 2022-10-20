const spacingProps = {
  margin: 'space',
  padding: 'space',

  gridColumnGap: 'hspace',
  marginRight: 'hspace',
  marginLeft: 'hspace',
  marginX: 'hspace',
  paddingRight: 'hspace',
  paddingLeft: 'hspace',
  paddingX: 'hspace',
  scrollPaddingRight: 'hspace',
  scrollPaddingLeft: 'hspace',
  scrollPaddingX: 'hspace',
  right: 'hspace',
  left: 'hspace',

  gridRowGap: 'vspace',
  marginTop: 'vspace',
  marginBottom: 'vspace',
  marginY: 'vspace',
  paddingTop: 'vspace',
  paddingBottom: 'vspace',
  paddingY: 'vspace',
  scrollPaddingTop: 'vspace',
  scrollPaddingBottom: 'vspace',
  scrollPaddingY: 'vspace',
  top: 'vspace',
  bottom: 'vspace',

  hSpace: 'hspace',
  vSpace: 'vspace',
  space: 'hspace', // columns have prop space for paddingLeft
}

const legacyTokens = {
  0: '$space-0',
  1: '$space-1',
  2: '$space-2',
  3: '$space-3',
  4: '$space-4',
  5: '$space-5',
  6: '$space-6',
  7: '$space-7',
  8: '$space-8',
  '2px': '$space-05',
}

function replaceConditional(j, key, value) {
  const transform = getContextualSpaceTransform(key.name)

  if (typeof value.consequent.value === 'string' || typeof value.consequent.value === 'number') {
    value.consequent = j.stringLiteral(transform(value.consequent.value))
  }

  if (typeof value.alternate.value === 'string' || typeof value.alternate.value === 'number') {
    value.alternate = j.stringLiteral(transform(value.alternate.value))
  }
}

function replaceNegative(j, key, callExp) {
  const tokenVal = callExp.arguments[0].value

  if (callExp.callee.name !== 'negative' || (typeof tokenVal !== 'string' && typeof tokenVal !== 'number')) {
    return
  }

  const transform = getContextualSpaceTransform(key.name)

  callExp.arguments[0] = j.stringLiteral(transform(tokenVal))
}

function transformValue(j, propKey, value) {
  // case {padding: true ? '$xs' : '$l'}
  if (value.type === 'ConditionalExpression') {
    replaceConditional(j, propKey, value)
  }

  // case {padding: negative('$l')}
  if (value.type === 'CallExpression') {
    replaceNegative(j, propKey, value)
  }

  // case {paddingY: { mobile: '$l', tablet: '$m' } }
  if (value.type === 'ObjectExpression') {
    // recursive call for each object entry
    value.properties.forEach((responsiveExpression) => {
      if (responsiveExpression.value.type !== 'ObjectExpression') {
        // using parent key for context, that is the actual css prop
        transformValue(j, propKey, responsiveExpression.value)
      }
    })
  }

  // if (typeof value.value === 'integer') {

  // }

  if (typeof value.value !== 'string' && typeof value.value !== 'number') {
    return
  }

  const transform = getContextualSpaceTransform(propKey.name)

  value.value = transform(value.value.toString())
}

function replace(source, j) {
  return j(source)
    .find(j.ObjectExpression)
    .forEach((p) => {
      const csxProps = p.value.properties

      csxProps.forEach(({ key, value }) => {
        if (key && key.name in spacingProps) {
          // changes token value for many value types
          transformValue(j, key, value)
        }
      })
    })
    .toSource({ quote: 'single' })
}

function replaceAttributes(source, j, componentName) {
  return j(source)
    .find(j.JSXOpeningElement, { name: { name: componentName } })
    .forEach((JSX) => {
      const { attributes } = JSX.value

      // stack is an exception
      const directionContextualKey =
        componentName === 'Stack' ? getStackDirection(attributes) : ''

      attributes.forEach((attribute) => {
        if (attribute?.name?.name in spacingProps) {
          const value = extractExpression(attribute.value)

          const contextualKey = directionContextualKey || attribute.name

          transformValue(j, contextualKey, value)
        }
      })
    })
    .toSource({})
}

const formatValue = (prop) => {
  return prop.toString().replace('$', '')
}

function extractExpression(jsxAttribute) {
  if (jsxAttribute.type !== 'JSXExpressionContainer') {
    return jsxAttribute
  }

  return jsxAttribute.expression
}

function getStackDirection(stackAttributes) {
  const defaultValue = 'vSpace'
  const directionAtt = stackAttributes.find(
    (att) => att.name?.name === 'direction'
  )

  return {
    name: directionAtt?.value?.value === 'row' ? 'hSpace' : defaultValue,
  }
}

function getContextualSpaceTransform(cssContextKey) {
  const spaceType = spacingProps[cssContextKey]

  return {
    space: transformToSpace,
    hspace: transformToHspace,
    vspace: transformToVspace,
  }[spaceType]
}

function transformToSpace(rawValue) {
  const value = formatValue(rawValue)

  return (
    {
      ...legacyTokens,
      xs: '$space-1 $space-2',
      s: '$space-2 $space-3',
      m: '$space-3 $space-4',
      l: '$space-4 $space-5',
      xl: '$space-6 $space-7',
      '2xl': '$space-10 $space-12',
      'narrow.s': '$space-1 $space-3',
      'narrow.m': '$space-3 $space-5',
      'narrow.l': '$space-4 $space-7',
    }[value] || rawValue
  )
}

function transformToHspace(rawValue) {
  const value = formatValue(rawValue)

  return (
    {
      ...legacyTokens,
      xs: '$space-05',
      s: '$space-1',
      m: '$space-2',
      l: '$space-3',
      xl: '$space-5',
      '2xl': '$space-7',
      '3xl': '$space-10',
    }[value] || rawValue
  )
}

function transformToVspace(rawValue) {
  const value = formatValue(rawValue)

  return (
    {
      ...legacyTokens,
      xs: '$space-0',
      s: '$space-05',
      m: '$space-1',
      l: '$space-2',
      xl: '$space-4',
      '2xl': '$space-6',
      '3xl': '$space-12',
    }[value] || rawValue
  )
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = replace(source, j)
  source = replaceAttributes(source, j, 'Inline')
  source = replaceAttributes(source, j, 'Bleed')
  source = replaceAttributes(source, j, 'Columns')
  source = replaceAttributes(source, j, 'Stack') // special case

  return source
}
