import type { Rule } from 'eslint'
import type * as ESTree from 'estree'

import { isPresent } from '../utils/logic/isPresent'
import { isImportSpecifierNode } from '../utils/estree/isImportSpecifierNode'
import { isComponentName } from '../utils/react/isComponentName'
import { getFunctionNodeName } from '../utils/estree/getFunctionNodeName'
import { isFunctionNode } from '../utils/estree/isFunctionNode'

export const createTagComponentOutsideRenderPhase: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        'Avoid create custom components inside render phase of some component',
      category: 'Best Practices',
    },
    schema: [],
  },

  create(context) {
    const { scopeManager } = context.getSourceCode()

    let tagImportNode: ESTree.ImportSpecifier | undefined

    return {
      ImportDeclaration(node) {
        if (node.source.value === '@vtex/admin-ui') {
          tagImportNode = node.specifiers
            .filter(isImportSpecifierNode)
            .find((specifier) => {
              return specifier.imported.name === 'tag'
            })
        }
      },

      ':function CallExpression': function (
        node: ESTree.CallExpression & Rule.Node
      ) {
        if (!tagImportNode) return

        const ancestors = context.getAncestors()

        const functionNode = ancestors.reverse().find(isFunctionNode)!
        const functionName = getFunctionNodeName(functionNode)

        if (!isComponentName(functionName)) return

        const scopes = ancestors
          .map((node) => scopeManager.acquire(node))
          .filter(isPresent)

        const hasShadowingTagDeclaration = scopes.some((scope) =>
          scope.set.get(tagImportNode!.local.name)
        )

        if (hasShadowingTagDeclaration) return

        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === tagImportNode.local.name
        ) {
          context.report({
            node,
            message:
              'Do not create custom components inside render phase of some component',
          })
        }
      },
    }
  },
}
