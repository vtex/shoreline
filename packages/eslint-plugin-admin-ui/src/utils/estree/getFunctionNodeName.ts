import { Rule } from 'eslint'
import * as ESTree from 'estree'

export const getFunctionNodeName = (node: ESTree.Function) => {
  if (node.type === 'FunctionDeclaration') {
    return node.id?.name ?? ''
  }

  const { parent } = node as Rule.Node

  if (parent.type === 'VariableDeclarator' && parent.id.type === 'Identifier') {
    return parent.id.name
  }

  return ''
}
