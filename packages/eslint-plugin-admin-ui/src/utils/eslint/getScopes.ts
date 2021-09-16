import type { Rule, Scope } from 'eslint'

export const getScopes = (context: Rule.RuleContext) => {
  const scopes: Scope.Scope[] = []

  let scope: Scope.Scope | null = context.getScope()

  while (scope) {
    scopes.push(scope)
    scope = scope.upper
  }

  return scopes
}
