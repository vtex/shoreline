import type * as ESTree from 'estree'

type ImportNode =
  | ESTree.ImportSpecifier
  | ESTree.ImportDefaultSpecifier
  | ESTree.ImportNamespaceSpecifier

export const isImportSpecifierNode = (
  node: ImportNode
): node is ESTree.ImportSpecifier => {
  return node.type === 'ImportSpecifier'
}
