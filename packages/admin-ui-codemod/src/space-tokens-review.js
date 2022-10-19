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
}

function replaceConditional(j, key, value) {
  const transform = getContextualSpaceTransform(key.name)

  if (typeof value.consequent.value === 'string') {
    value.consequent = j.stringLiteral(transform(value.consequent.value))
  }

  if (typeof value.alternate.value === 'string') {
    value.alternate = j.stringLiteral(transform(value.alternate.value))
  }
}

function replace(source, j) {
  return j(source)
    .find(j.ObjectExpression)
    .forEach((p) => {
      const csxProps = p.value.properties

      csxProps.forEach(({ key, value }) => {
        if (key && key.name in spacingProps) {
          if (value.type === 'ConditionalExpression') {
            replaceConditional(j, key, value)
          }

          if (typeof value.value !== 'string') {
            return
          }

          const transform = getContextualSpaceTransform(key.name)

          value.value = transform(value.value)
        }
      })
    })
    .toSource({ quote: 'single' })
}

const formatValue = (prop) => {
  return prop.replace('$', '')
}

function getContextualSpaceTransform(cssKey) {
  const spaceType = spacingProps[cssKey]

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

  return source
}
