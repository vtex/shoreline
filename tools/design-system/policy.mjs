import { readFile, realpath } from 'node:fs/promises'
import path from 'node:path'
import postcss from 'postcss'
import ts from 'typescript'

const COMPONENTS = 'packages/shoreline/src/components/'
const SOURCE_EXTENSION = /\.(?:[cm]?[jt]sx?)$/
const SUPPORT_FILE =
  /(?:^|\/)(?:stories|tests|__tests__|fixtures|__fixtures__)(?:\/|$)|\.(?:stories|test|spec)\.[^/]+$/
const APP_PACKAGES = ['next', 'jotai', 'swr', '@vtex/agentic-ui']
const LENGTH_PROPERTIES =
  /^(?:width|height|minWidth|maxWidth|minHeight|maxHeight|top|right|bottom|left|inset|gap|rowGap|columnGap|padding.*|margin.*|border.*Width|border.*Radius|fontSize|lineHeight|letterSpacing|wordSpacing|textIndent|outlineWidth|outlineOffset|flexBasis)$/
const COLOR_PROPERTIES = /(?:color|fill|stroke|background)$/i
const CSS_KEYWORDS = new Set([
  'inherit',
  'initial',
  'unset',
  'revert',
  'revert-layer',
  'transparent',
  'currentcolor',
  'none',
])

/**
 * A deliberately bounded policy check, not a compliance certificate.
 * Does not resolve tsconfig aliases, computed imports, indirect styles or JSX
 * spreads, nor prove ref forwarding, semantic HTML, token existence or a11y.
 * Theme layer checks verify one existing layered import path from styles.css;
 * they cannot guarantee that consumers use that entry point.
 */
export const RULES = Object.freeze({
  'policy-input': 'Input must be a readable file inside the repository.',
  'policy-parse': 'Target source and CSS must parse successfully.',
  'component-deep-import': 'Import sibling components through their barrel.',
  'component-app-dependency':
    'Keep application dependencies outside components.',
  'component-inline-literal':
    'Replace literal inline colors and sizes with tokens.',
  'component-dynamic-classname':
    'Express style variants through data attributes.',
  'css-literal': 'Replace literal colors and nonzero lengths with tokens.',
  'css-important': 'Avoid !important in component styles.',
  'css-variable': 'Component custom properties must use the --sl- prefix.',
  'css-layer': 'Component declarations must belong to sl-components.',
})

function componentName(file) {
  if (!file.startsWith(COMPONENTS)) return undefined
  return file.slice(COMPONENTS.length).split('/')[0]
}

function isTarget(file) {
  if (SUPPORT_FILE.test(file)) return false
  if (file.startsWith(COMPONENTS)) {
    return SOURCE_EXTENSION.test(file) || file.endsWith('.css')
  }
  return /^packages\/shoreline\/src\/themes\/[^/]+\/components\/.+\.css$/.test(
    file
  )
}

function inside(root, file) {
  const relative = path.relative(root, file)
  return (
    relative !== '..' &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  )
}

function unwrap(node) {
  let expression = node
  while (
    ts.isParenthesizedExpression(expression) ||
    ts.isAsExpression(expression) ||
    ts.isTypeAssertionExpression(expression) ||
    ts.isSatisfiesExpression(expression)
  ) {
    expression = expression.expression
  }
  return expression
}

function staticString(node) {
  if (!node) return undefined
  const expression = unwrap(node)
  return ts.isStringLiteral(expression) ||
    ts.isNoSubstitutionTemplateLiteral(expression)
    ? expression.text
    : undefined
}

function staticNumber(input) {
  const node = unwrap(input)
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (
    ts.isPrefixUnaryExpression(node) &&
    (node.operator === ts.SyntaxKind.MinusToken ||
      node.operator === ts.SyntaxKind.PlusToken) &&
    ts.isNumericLiteral(node.operand)
  ) {
    return (
      Number(node.operand.text) *
      (node.operator === ts.SyntaxKind.MinusToken ? -1 : 1)
    )
  }
  return undefined
}

// Tokenize CSS values without mistaking comments, quoted content, or URLs for
// colors/dimensions. This is intentionally not a full CSS value/type validator.
function valueTokens(value) {
  const tokens = []
  let index = 0
  while (index < value.length) {
    const rest = value.slice(index)
    if (rest.startsWith('/*')) {
      const end = value.indexOf('*/', index + 2)
      index = end < 0 ? value.length : end + 2
      continue
    }
    if (value[index] === '"' || value[index] === "'") {
      const quote = value[index++]
      while (index < value.length) {
        if (value[index] === '\\') index += 2
        else if (value[index++] === quote) break
      }
      continue
    }
    const word = rest.match(/^(?:--)?[a-zA-Z_][\w-]*/)
    if (word) {
      const name = word[0]
      index += name.length
      if (name.toLowerCase() === 'url' && value[index] === '(') {
        let depth = 1
        index++
        while (index < value.length && depth > 0) {
          if (value[index] === '\\') index += 2
          else {
            if (value[index] === '(') depth++
            if (value[index] === ')') depth--
            index++
          }
        }
      } else {
        tokens.push({
          kind: value[index] === '(' ? 'function' : 'word',
          value: name,
        })
      }
      continue
    }
    const hex = rest.match(/^#[a-f\d]{3,8}(?![\w-])/i)
    if (hex && [4, 5, 7, 9].includes(hex[0].length)) {
      tokens.push({ kind: 'color', value: hex[0] })
      index += hex[0].length
      continue
    }
    const dimension = rest.match(
      /^[+-]?(?:\d*\.\d+|\d+\.?\d*)(?:e[+-]?\d+)?(?:px|cm|mm|q|in|pt|pc|r?em|r?ex|r?ch|r?cap|r?ic|r?lh|[sld]?v(?:h|w|i|b|min|max)|cq(?:w|h|i|b|min|max))(?![\w-])/i
    )
    if (dimension) {
      tokens.push({ kind: 'dimension', value: dimension[0] })
      index += dimension[0].length
      continue
    }
    index++
  }
  return tokens
}

function hasLiteral(tokens) {
  return tokens.some(
    (token) =>
      token.kind === 'color' ||
      (token.kind === 'function' &&
        /^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)$/i.test(token.value)) ||
      (token.kind === 'dimension' && Number.parseFloat(token.value) !== 0)
  )
}

function hasNamedColor(property, tokens) {
  // A single color keyword in a color-valued property is a literal unless it
  // is an inherited/current/transparent CSS keyword. This intentionally does
  // not infer color names inside every shorthand or arbitrary function.
  return (
    COLOR_PROPERTIES.test(property) &&
    tokens.length === 1 &&
    tokens[0].kind === 'word' &&
    /^[a-z]+$/i.test(tokens[0].value) &&
    !CSS_KEYWORDS.has(tokens[0].value.toLowerCase())
  )
}

function externalVariables(tokens) {
  return tokens
    .filter(
      (token, index) =>
        tokens[index - 1]?.kind === 'function' &&
        tokens[index - 1].value.toLowerCase() === 'var' &&
        token.value.startsWith('--') &&
        !token.value.startsWith('--sl-')
    )
    .map((token) => token.value)
}

function isTypeOnly(node) {
  if (ts.isImportDeclaration(node)) {
    const clause = node.importClause
    if (clause?.isTypeOnly) return true
    return Boolean(
      clause &&
        !clause.name &&
        clause.namedBindings &&
        ts.isNamedImports(clause.namedBindings) &&
        clause.namedBindings.elements.length &&
        clause.namedBindings.elements.every((element) => element.isTypeOnly)
    )
  }
  if (ts.isExportDeclaration(node)) {
    if (node.isTypeOnly) return true
    return Boolean(
      node.exportClause &&
        ts.isNamedExports(node.exportClause) &&
        node.exportClause.elements.length &&
        node.exportClause.elements.every((element) => element.isTypeOnly)
    )
  }
  return Boolean(node.isTypeOnly)
}

function checkSource(file, text, report) {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
  const at = (rule, node, message) =>
    report(
      rule,
      source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
      message
    )
  if (source.parseDiagnostics.length) {
    for (const diagnostic of source.parseDiagnostics) {
      report(
        'policy-parse',
        source.getLineAndCharacterOfPosition(diagnostic.start ?? 0).line + 1,
        ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ')
      )
    }
    return
  }

  // A locally bound require is not necessarily CommonJS. Conservatively skip
  // bare require calls throughout such files rather than report false imports.
  let localRequire = false
  const collectBindings = (node) => {
    if (
      (ts.isVariableDeclaration(node) ||
        ts.isParameter(node) ||
        ts.isBindingElement(node) ||
        ts.isFunctionDeclaration(node) ||
        ts.isImportClause(node) ||
        ts.isImportSpecifier(node) ||
        ts.isNamespaceImport(node)) &&
      node.name &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'require'
    )
      localRequire = true
    ts.forEachChild(node, collectBindings)
  }
  collectBindings(source)

  const checkImport = (node, specifier, typeOnly = false) => {
    const imported = staticString(specifier)
    if (imported === undefined) return
    if (
      !typeOnly &&
      APP_PACKAGES.some(
        (name) => imported === name || imported.startsWith(`${name}/`)
      )
    ) {
      at(
        'component-app-dependency',
        node,
        `Application dependency "${imported}" must stay in the consumer.`
      )
    }
    let target
    if (imported.startsWith('.'))
      target = path.posix.normalize(
        path.posix.join(path.posix.dirname(file), imported)
      )
    else if (imported.startsWith('@vtex/shoreline/src/components/'))
      target = imported.replace('@vtex/shoreline/', 'packages/shoreline/')
    if (!target?.startsWith(COMPONENTS)) return
    const parts = target.slice(COMPONENTS.length).split('/')
    if (
      parts[0] !== componentName(file) &&
      parts.length > 1 &&
      !(parts.length === 2 && /^index(?:\.[cm]?[jt]sx?)?$/.test(parts[1]))
    ) {
      at(
        'component-deep-import',
        node,
        `Import "${imported}" through the ${parts[0]} component barrel.`
      )
    }
  }

  const visit = (node) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      checkImport(node, node.moduleSpecifier, isTypeOnly(node))
    } else if (
      ts.isImportEqualsDeclaration(node) &&
      ts.isExternalModuleReference(node.moduleReference)
    ) {
      checkImport(node, node.moduleReference.expression, isTypeOnly(node))
    } else if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (!localRequire &&
          ts.isIdentifier(node.expression) &&
          node.expression.text === 'require'))
    ) {
      checkImport(node, node.arguments[0])
    }
    if (ts.isJsxAttribute(node) && node.initializer) {
      const name = node.name.getText(source)
      const expression = ts.isJsxExpression(node.initializer)
        ? node.initializer.expression && unwrap(node.initializer.expression)
        : node.initializer
      if (
        expression &&
        name === 'className' &&
        staticString(expression) === undefined &&
        !ts.isIdentifier(expression) &&
        !ts.isPropertyAccessExpression(expression)
      ) {
        at(
          'component-dynamic-classname',
          node,
          'Computed className styling needs data attributes; direct className forwarding is allowed.'
        )
      }
      if (
        expression &&
        name === 'style' &&
        ts.isObjectLiteralExpression(expression)
      ) {
        for (const property of expression.properties) {
          if (!ts.isPropertyAssignment(property)) continue
          const propertyName = ts.isIdentifier(property.name)
            ? property.name.text
            : staticString(property.name)
          if (propertyName === undefined) continue
          const value = staticString(property.initializer)
          const tokens = value === undefined ? [] : valueTokens(value)
          const numeric = staticNumber(property.initializer)
          if (
            hasLiteral(tokens) ||
            hasNamedColor(propertyName, tokens) ||
            (numeric !== undefined &&
              numeric !== 0 &&
              LENGTH_PROPERTIES.test(propertyName))
          ) {
            at(
              'component-inline-literal',
              property,
              `Inline "${propertyName}" contains a literal color or size; consume a --sl- token.`
            )
          }
          if (
            (propertyName.startsWith('--') &&
              !propertyName.startsWith('--sl-')) ||
            externalVariables(tokens).length
          ) {
            at(
              'css-variable',
              property,
              'Inline custom properties must use the --sl- prefix.'
            )
          }
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
}

function parseImport(params) {
  const match = params.match(/^\s*(?:url\(\s*)?(['"])([^'"]+)\1\s*\)?\s*(.*)$/i)
  if (!match) return undefined
  return {
    file: match[2],
    layered: /(?:^|\s)layer\(\s*sl-components\s*\)/.test(match[3]),
  }
}

async function hasThemeLayer(root, file) {
  const theme = file.match(
    /^(packages\/shoreline\/src\/themes\/[^/]+)\/components\//
  )?.[1]
  if (!theme) return false
  const visited = new Set()
  const search = async (current, layered) => {
    const key = `${current}:${layered}`
    if (visited.has(key)) return false
    visited.add(key)
    if (current === file) return layered
    if (!current.startsWith(`${theme}/`)) return false
    let css
    try {
      const absolute = await realpath(path.join(root, current))
      if (!inside(root, absolute)) return false
      css = postcss.parse(await readFile(absolute, 'utf8'), { from: current })
    } catch {
      return false
    }
    const imports = []
    css.walkAtRules('import', (node) => {
      if (node.parent.type === 'root') imports.push(parseImport(node.params))
    })
    for (const imported of imports.filter(Boolean)) {
      if (/^(?:[a-z]+:|\/)/i.test(imported.file)) continue
      const target = path.posix.normalize(
        path.posix.join(path.posix.dirname(current), imported.file)
      )
      if (await search(target, layered || imported.layered)) return true
    }
    return false
  }
  return search(`${theme}/styles.css`, false)
}

async function checkCss(root, file, text, report) {
  let css
  try {
    css = postcss.parse(text, { from: file })
  } catch (error) {
    report('policy-parse', error.line ?? 1, error.reason ?? error.message)
    return
  }
  const themeLayer = await hasThemeLayer(root, file)
  css.walkDecls((declaration) => {
    const line = declaration.source?.start?.line ?? 1
    const tokens = valueTokens(declaration.value)
    if (hasLiteral(tokens) || hasNamedColor(declaration.prop, tokens))
      report(
        'css-literal',
        line,
        `"${declaration.prop}" contains a literal color or nonzero size, including token fallbacks.`
      )
    if (declaration.important)
      report(
        'css-important',
        line,
        `Remove !important from "${declaration.prop}".`
      )
    if (
      (declaration.prop.startsWith('--') &&
        !declaration.prop.startsWith('--sl-')) ||
      externalVariables(tokens).length
    ) {
      report(
        'css-variable',
        line,
        `"${declaration.prop}" declares or consumes a custom property without the --sl- prefix.`
      )
    }
    let ancestor = declaration.parent
    let layered = themeLayer
    while (ancestor) {
      if (
        ancestor.type === 'atrule' &&
        ancestor.name === 'layer' &&
        ancestor.params.trim() === 'sl-components'
      )
        layered = true
      ancestor = ancestor.parent
    }
    if (!layered)
      report(
        'css-layer',
        line,
        `"${declaration.prop}" is outside @layer sl-components and has no verified layered theme import.`
      )
  })
}

/** Check only explicit target files; no files are modified. */
export async function checkPolicy({ root, files }) {
  const diagnostics = []
  const repository = await realpath(root)
  for (const input of [...new Set(files)].sort()) {
    const file = input.replaceAll('\\', '/')
    const report = (rule, line, message) =>
      diagnostics.push({ rule, path: file, line, message })
    if (path.isAbsolute(file) || file.split('/').includes('..')) {
      report(
        'policy-input',
        1,
        'Expected a repository-relative path without parent traversal.'
      )
      continue
    }
    if (!isTarget(file)) continue
    let text
    try {
      const absolute = await realpath(path.join(repository, file))
      if (!inside(repository, absolute))
        throw new Error('File resolves outside the repository.')
      text = await readFile(absolute, 'utf8')
    } catch (error) {
      report('policy-input', 1, `Cannot read target file: ${error.message}`)
      continue
    }
    if (file.endsWith('.css')) await checkCss(repository, file, text, report)
    else checkSource(file, text, report)
  }
  return diagnostics.sort(
    (left, right) =>
      left.path.localeCompare(right.path) ||
      left.line - right.line ||
      left.rule.localeCompare(right.rule)
  )
}
