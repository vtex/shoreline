/* eslint-disable */
const borderRadiusProps = {
  borderRadius: 'borderRadius',
  borderTopRightRadius: 'borderRadius',
  borderTopLeftRadius: 'borderRadius',
  borderBottomRightRadius: 'borderRadius',
  borderBottomLeftRadius: 'borderRadius',
  borderEndEndRadius: 'borderRadius',
  borderEndStartRadius: 'borderRadius',
  borderStartEndRadius: 'borderRadius',
  borderStartStartRadius: 'borderRadius',
}

function replaceConditional(j, value) {

  if (isStringOrNumber(value.consequent.value)) {
    value.consequent = j.stringLiteral(transform(value.consequent.value))
  }

  if (isStringOrNumber(value.alternate.value)) {
    value.alternate = j.stringLiteral(transform(value.alternate.value))
  }
}

function transformValue(j, value) {
  // case {padding: true ? '$xs' : '$l'}
  if (value.type === 'ConditionalExpression') {
    replaceConditional(j, value)
    return
  }

  // case {paddingY: { mobile: '$l', tablet: '$m' } }
  if (value.type === 'ObjectExpression') {
    // recursive call for each object entry
    value.properties.forEach((responsiveExpression) => {
      if (responsiveExpression.value.type !== 'ObjectExpression') {
        transformValue(j, responsiveExpression.value)
      }
    })
    return
  }

  const transformedValue = transform(value.value)

  value.value = transformedValue
}

function replace(source, j) {
  return j(source)
    .find(j.ObjectExpression)
    .forEach((p) => {
      const csxProps = p.value.properties

      csxProps.forEach(({ key, value }) => {
        if (key && key.name in borderRadiusProps) {
          // changes token value for many value types
          transformValue(j, value)
        }
      })
    })
    .toSource({ quote: 'single' })
}

function isStringOrNumber(value) {
  return typeof value === 'string' || typeof value === 'number'
}

const formatValue = (prop) => {
  return prop.toString().replace('$', '')
}

function transform(rawValue) {
  const value = formatValue(rawValue)

  return (
    {
    default: '$border-radius-base',
    flat: '$border-radius-none',
    pill: '100px',
    circle: '$border-radius-pill',
    }[value] || rawValue
  )
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = replace(source, j)

  return source
}
