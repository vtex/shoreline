import type * as ESTree from 'estree-jsx'
import { isObjectExpressionWithProps } from './isObjectExpressionWithProps'
import type { JSXNodeParentExtension } from './JSXNodeParentExtension'

export const isIdentifierWithProps = (
  props: Record<ESTree.Identifier['name'], ESTree.SimpleLiteral['value']>,
  identifier?: ESTree.Identifier & JSXNodeParentExtension
) => {
  return (
    identifier?.parent.type === 'VariableDeclarator' &&
    isObjectExpressionWithProps(props, identifier.parent.init)
  )
}
