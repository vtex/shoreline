import postcss from 'postcss'
import ts from 'typescript'
import { allReferences, references } from './css-values.mjs'
import { relativePath } from './io.mjs'
import { readThemeFile } from './themes.mjs'

export const variableContractsPath = 'design-system/component-variables.json'
export const tokenName = /^--sl-[a-z0-9]+(?:-[a-z0-9]+)*$/
const componentsRoot = 'packages/shoreline/src/components/'

function unwrap(input) {
  let node = input
  while (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isTypeAssertionExpression(node) ||
    ts.isSatisfiesExpression(node)
  )
    node = node.expression
  return node
}

function literal(input) {
  const node = unwrap(input)
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)
    ? node.text
    : undefined
}

// Inspect only direct JSX style objects and the repository's style({...})
// helper. This proves a syntactic producer/use, not forwarding, inheritance,
// execution, value validity or coverage of every runtime state.
export function inlineStyleProperties(file, text) {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
  const properties = []
  const diagnostics = source.parseDiagnostics.map((item) => ({
    rule: 'token-source-parse',
    path: file,
    line: source.getLineAndCharacterOfPosition(item.start ?? 0).line + 1,
    message: ts.flattenDiagnosticMessageText(item.messageText, ' '),
  }))
  if (diagnostics.length) return { properties, diagnostics }
  const helpers = new Set()
  for (const statement of source.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      literal(statement.moduleSpecifier) !== '@vtex/shoreline-utils'
    )
      continue
    const bindings = statement.importClause?.namedBindings
    if (bindings && ts.isNamedImports(bindings))
      for (const binding of bindings.elements)
        if ((binding.propertyName?.text ?? binding.name.text) === 'style')
          helpers.add(binding.name.text)
  }
  const visit = (node) => {
    if (
      ts.isJsxAttribute(node) &&
      node.name.getText(source) === 'style' &&
      node.initializer &&
      ts.isJsxExpression(node.initializer) &&
      node.initializer.expression
    ) {
      let expression = unwrap(node.initializer.expression)
      if (
        ts.isCallExpression(expression) &&
        ts.isIdentifier(expression.expression) &&
        helpers.has(expression.expression.text) &&
        expression.arguments[0]
      )
        expression = unwrap(expression.arguments[0])
      if (ts.isObjectLiteralExpression(expression)) {
        for (const property of expression.properties) {
          if (!ts.isPropertyAssignment(property)) continue
          const name = ts.isIdentifier(property.name)
            ? property.name.text
            : literal(property.name)
          if (name === undefined) continue
          const line =
            source.getLineAndCharacterOfPosition(property.getStart(source))
              .line + 1
          properties.push({
            name,
            value: literal(property.initializer),
            line,
            element: node.parent.parent.tagName.getText(source),
          })
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return { properties, diagnostics }
}

function cssPath(file) {
  return (
    relativePath(file) &&
    /^packages\/shoreline\/src\/(?:themes\/[^/]+\/components\/|components\/).+\.css$/.test(
      file
    )
  )
}

function keysAre(value, allowed) {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).every((key) => allowed.includes(key))
  )
}

export async function checkComponentVariables(root) {
  const diagnostics = []
  const variables = []
  const inputs = new Set()
  const report = (message, file = variableContractsPath, line = 1) =>
    diagnostics.push({ rule: 'component-variable', path: file, line, message })
  let contract
  try {
    contract = JSON.parse(await readThemeFile(root, variableContractsPath))
    inputs.add(variableContractsPath)
  } catch (error) {
    if (error.code === 'ENOENT') return { variables, diagnostics, inputs: [] }
    report(error.message)
    return { variables, diagnostics, inputs: [...inputs] }
  }
  if (
    !keysAre(contract, ['schemaVersion', 'variables']) ||
    contract.schemaVersion !== 1 ||
    !Array.isArray(contract.variables)
  ) {
    report('Expected schemaVersion 1 and a variables array')
    return { variables, diagnostics, inputs: [...inputs] }
  }
  const names = new Set()
  const sources = new Map()
  const read = async (file) => {
    if (!sources.has(file)) {
      sources.set(file, await readThemeFile(root, file))
      inputs.add(file)
    }
    return sources.get(file)
  }
  for (const variable of contract.variables) {
    if (
      !keysAre(variable, ['name', 'reason', 'providers', 'consumers']) ||
      typeof variable.name !== 'string' ||
      !tokenName.test(variable.name) ||
      typeof variable.reason !== 'string' ||
      !variable.reason.trim() ||
      !Array.isArray(variable.providers) ||
      !variable.providers.length ||
      !Array.isArray(variable.consumers) ||
      !variable.consumers.length ||
      !variable.consumers.every(cssPath) ||
      new Set(variable.consumers).size !== variable.consumers.length
    ) {
      report(
        'Every variable needs a --sl- name, reason, providers and unique CSS consumer paths'
      )
      continue
    }
    if (names.has(variable.name)) {
      report(`Duplicate variable contract: ${variable.name}`)
      continue
    }
    names.add(variable.name)
    let valid = true
    const providers = new Set()
    for (const provider of variable.providers) {
      if (
        !keysAre(provider, ['kind', 'file', 'element']) ||
        (provider.kind !== 'css-declaration' &&
          provider.kind !== 'jsx-style') ||
        !relativePath(provider.file) ||
        (provider.kind === 'css-declaration' &&
          (!cssPath(provider.file) || provider.element !== undefined)) ||
        (provider.kind === 'jsx-style' &&
          (!provider.file.startsWith(componentsRoot) ||
            !/\.[jt]sx$/.test(provider.file) ||
            typeof provider.element !== 'string' ||
            !provider.element.trim()))
      ) {
        report(`Invalid provider for ${variable.name}`)
        valid = false
        continue
      }
      const key = JSON.stringify(provider)
      if (providers.has(key)) {
        report(`Duplicate provider for ${variable.name}`)
        valid = false
        continue
      }
      providers.add(key)
      try {
        const text = await read(provider.file)
        let found = false
        if (provider.kind === 'css-declaration') {
          postcss.parse(text, { from: provider.file }).walkDecls((node) => {
            if (node.prop === variable.name) found = true
          })
        } else {
          const source = inlineStyleProperties(provider.file, text)
          diagnostics.push(...source.diagnostics)
          found = source.properties.some(
            (property) =>
              property.name === variable.name &&
              property.element === provider.element
          )
        }
        if (!found)
          throw new Error(
            `Producer no longer declares ${variable.name} as ${provider.kind}${provider.element ? ` on ${provider.element}` : ''}`
          )
      } catch (error) {
        report(error.message, provider.file, error.line ?? 1)
        valid = false
      }
    }
    for (const file of variable.consumers) {
      try {
        // Parse consumers as well: stale/deleted paths cannot silently grant
        // permission to a future replacement file.
        let found = false
        postcss.parse(await read(file), { from: file }).walkDecls((node) => {
          if (allReferences(references(node.value)).includes(variable.name))
            found = true
        })
        if (!found)
          throw new Error(`Consumer no longer references ${variable.name}`)
      } catch (error) {
        report(error.message, file, error.line ?? 1)
        valid = false
      }
    }
    if (valid) variables.push(variable)
  }
  return { variables, diagnostics, inputs: [...inputs].sort() }
}
