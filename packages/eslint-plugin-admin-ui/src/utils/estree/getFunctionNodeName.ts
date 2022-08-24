import type { Rule } from 'eslint'
import type { Node } from 'estree'

export const getFunctionNodeName = (node: Node) => {
  if (node.type === 'FunctionDeclaration') {
    return node.id?.name ?? ''
  }

  const { parent } = node as Rule.Node

  if (parent.type === 'VariableDeclarator' && parent.id.type === 'Identifier') {
    return parent.id.name
  }

  return ''
}
