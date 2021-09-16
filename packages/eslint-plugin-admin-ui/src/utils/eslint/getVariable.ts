import type { Rule } from 'eslint'
import type * as ESTree from 'estree-jsx'
import { getScopes } from './getScopes'
import type { JSXNodeParentExtension } from '../estree/JSXNodeParentExtension'

export const getVariable = (
  context: Rule.RuleContext,
  variableName: string
) => {
  for (const scope of getScopes(context)) {
    const variable = scope.set.get(variableName)

    if (variable) {
      const identifier = variable.identifiers.find(
        (identifier) => identifier.name === variableName
      ) as ESTree.Identifier & JSXNodeParentExtension

      return identifier
    }
  }

  return undefined
}
