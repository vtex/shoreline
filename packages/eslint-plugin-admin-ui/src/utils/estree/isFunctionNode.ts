import type * as ESTree from 'estree'

export const isFunctionNode = (node: ESTree.Node): node is ESTree.Function => {
  return (
    node.type === 'ArrowFunctionExpression' ||
    node.type === 'FunctionExpression' ||
    node.type === 'FunctionDeclaration'
  )
}
