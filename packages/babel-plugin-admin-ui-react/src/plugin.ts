import type * as BabelCore from '@babel/core'
import type { Binding } from '@babel/traverse'

type PluginState = BabelCore.PluginPass & {
  jsxImportNode?: BabelCore.types.ImportSpecifier
  jsxBinding?: Binding
}

export function adminUiPlugin({
  types: t,
}: typeof BabelCore): BabelCore.PluginObj<PluginState> {
  return {
    post() {
      delete this.jsxImportNode
      delete this.jsxBinding
    },
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value === '@vtex/admin-ui-react') {
          this.jsxImportNode = path.node.specifiers.find(
            (specifier): specifier is BabelCore.types.ImportSpecifier => {
              return (
                specifier.type === 'ImportSpecifier' &&
                specifier.imported.type === 'Identifier' &&
                specifier.local.name === 'jsx'
              )
            }
          )

          this.jsxBinding = this.file.path.scope.getOwnBinding('jsx')
        }
      },

      CallExpression(path) {
        if (!this.jsxImportNode || !this.jsxBinding) return

        const { node, parentPath } = path

        const isJsxImported = (identifier: BabelCore.types.Expression) => {
          return this.jsxBinding!.referencePaths.some((referencePath) => {
            return referencePath.node === identifier
          })
        }

        if (
          node.callee.type === 'CallExpression' &&
          node.callee.callee.type === 'Identifier' &&
          isJsxImported(node.callee.callee) &&
          parentPath.node.type === 'VariableDeclarator' &&
          parentPath.node.id.type === 'Identifier' &&
          parentPath.parent.type === 'VariableDeclaration'
        ) {
          path.replaceWith(
            t.callExpression(
              t.memberExpression(
                t.identifier('Object'),
                t.identifier('assign')
              ),
              [
                node,
                t.objectExpression([
                  t.objectProperty(
                    t.identifier('displayName'),
                    t.stringLiteral(parentPath.node.id.name)
                  ),
                ]),
              ]
            )
          )
        }
      },
    },
  }
}
