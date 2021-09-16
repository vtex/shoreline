import type * as ESTree from 'estree-jsx'

export const isObjectExpressionWithProps = (
  props: Record<ESTree.Identifier['name'], ESTree.SimpleLiteral['value']>,
  expression?: ESTree.Expression | ESTree.JSXEmptyExpression | null
) => {
  return (
    expression?.type === 'ObjectExpression' &&
    Object.entries(props).every(([propName, propValue]) =>
      expression.properties.some(
        (property) =>
          property.type === 'Property' &&
          property.key.type === 'Identifier' &&
          property.key.name === propName &&
          property.value.type === 'Literal' &&
          property.value.value === propValue
      )
    )
  )
}
