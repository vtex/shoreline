import type { Rule } from 'eslint'
import type * as ESTree from 'estree-jsx'
import { getVariable } from '../utils/eslint/getVariable'
import { isIdentifierWithProps } from '../utils/estree/isIdentifierWithProps'
import { isObjectExpressionWithProps } from '../utils/estree/isObjectExpressionWithProps'
import type { JSXNodeParentExtension } from '../utils/estree/JSXNodeParentExtension'
import { isImportSpecifierNode } from '../utils/estree/isImportSpecifierNode'
import { isPresent } from '../utils/logic/isPresent'

export const preferFlex: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'Prefer Flex component when you can',
      category: 'Best Practices',
    },
    schema: [],
  },

  create(context) {
    const { scopeManager } = context.getSourceCode()

    let importNode: ESTree.ImportSpecifier | undefined

    return {
      ImportDeclaration(node) {
        if (node.source.value === '@vtex/admin-ui') {
          importNode = node.specifiers
            .filter(isImportSpecifierNode)
            .find((specifier) => {
              return specifier.imported.name === 'Box'
            })
        }
      },

      JSXAttribute(node: JSXNodeParentExtension) {
        if (!importNode) return

        const scopes = context
          .getAncestors()
          .map((node) => scopeManager.acquire(node))
          .filter(isPresent)

        const hasShadowingBoxDeclaration = scopes.some((scope) =>
          scope.set.get(importNode!.local.name)
        )

        if (hasShadowingBoxDeclaration) return

        const nodeJsx = node as ESTree.JSXAttribute & JSXNodeParentExtension

        if (
          nodeJsx.name.name === 'csx' &&
          nodeJsx.value?.type === 'JSXExpressionContainer' &&
          nodeJsx.parent.type === 'JSXOpeningElement' &&
          nodeJsx.parent.name.type === 'JSXIdentifier' &&
          nodeJsx.parent.name.name === importNode.local.name
        ) {
          const { expression } = nodeJsx.value

          if (
            isObjectExpressionWithProps({ display: 'flex' }, expression) ||
            (expression.type === 'Identifier' &&
              isIdentifierWithProps(
                { display: 'flex' },
                getVariable(context, expression.name)
              ))
          ) {
            context.report({
              node: nodeJsx.parent as any,
              message: 'Prefer use the Flex component instead.',
            })
          }
        }
      },
    }
  },
}
