import type { Rule } from 'eslint'

import { isImportSpecifierNode } from '../utils/estree/isImportSpecifierNode'

export const recommendAdminUiUsage: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        'Avoid using Styleguide when Admin UI already fits your needs',
      category: 'Best Practices',
      recommended: true,
      url: 'https://admin-ui.vercel.app/',
    },
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (typeof node.source.value !== 'string') return

        const value = node.source.value
        const isStyleguideImport =
          value.includes('styleguide') && value?.includes('vtex')

        if (isStyleguideImport) {
          node.specifiers.filter(isImportSpecifierNode).find((specifier) => {
            if (specifier.imported.name === 'Button') {
              context.report({
                node,
                message: 'Try using the Button from @vtex/admin-ui instead.',
              })
            }
          })
        }
      },
    }
  },
}
