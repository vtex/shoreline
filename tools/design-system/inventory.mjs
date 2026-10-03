import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { lstat, readdir, readFile, realpath } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import postcss from 'postcss'
import ts from 'typescript'

const execute = promisify(execFile)
const ignoredDirectories = new Set([
  '.git',
  '.next',
  '.pnpm-store',
  '.turbo',
  '.cache',
  '.output',
  '.vercel',
  '.aws',
  '.azure',
  '.config',
  '.docker',
  '.kube',
  '.ssh',
  '.gnupg',
  '.vtex',
  '.codex',
  '.agents',
  'node_modules',
  'dist',
  'build',
  'coverage',
  'storybook-static',
  'storybook-static-horizon',
  'generated',
  '__examples__',
  '__props__',
  'reports',
  'artifacts',
  'test-results',
  'playwright-report',
])
const relevantExtensions = new Set([
  '.ts',
  '.tsx',
  '.mts',
  '.cts',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css',
  '.json',
  '.yaml',
  '.yml',
  '.md',
  '.mdx',
  '.hbs',
])
const scriptExtension = /\.(?:[cm]?[jt]s|[jt]sx)$/
const testName = /\.(?:test|spec)\.[cm]?[jt]sx?$/
const storyName = /\.stories\.[jt]sx?$/
const compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
const hash = (content) => createHash('sha256').update(content).digest('hex')
const relativePath = (root, file) =>
  path.relative(root, file).split(path.sep).join('/')

/**
 * Read both repositories without executing repository code. Names discovered in
 * the source are candidates for review, never automatically accepted design decisions.
 * Fingerprints include relevant untracked files and exclude generated output,
 * dependencies, symlinks and credential files. No absolute paths or timestamps
 * are emitted, so identical input trees produce byte-identical JSON.
 */
export async function inventory({ root, sourceRoot } = {}) {
  const target = await scan(root, 'target')
  const source =
    sourceRoot === undefined ? null : await scan(sourceRoot, 'source')
  return {
    schemaVersion: 1,
    kind: 'shoreline-design-system-inventory',
    target,
    source,
    limitations: [
      'Source candidates and matching names do not establish API or visual equivalence.',
      'Direct play callbacks and local callback references are counted statically; imported callbacks are not resolved and tests are not run.',
      'Unresolved CSS custom properties can be supplied by a consumer or another stylesheet.',
      'Fingerprints cover relevant source/configuration/documentation files, not binaries or ignored artifacts.',
    ],
  }
}

async function scan(inputRoot, role) {
  if (typeof inputRoot !== 'string' || inputRoot.length === 0) {
    throw new Error(`${role} root must be a directory`)
  }
  const root = path.resolve(inputRoot)
  const rootStat = await lstat(root).catch(() => null)
  if (!rootStat?.isDirectory() || rootStat.isSymbolicLink()) {
    throw new Error(`${role} root must be a directory, not a symlink`)
  }
  const files = await collectFiles(root)
  const packages = []
  const diagnostics = []
  const scripts = []
  const declarations = []
  const references = []
  const overrides = []
  const fingerprint = createHash('sha256')
  for (const file of files) {
    const contents = await readFile(path.join(root, file))
    fingerprint.update(`${file}\0${hash(contents)}\n`)
    const text = contents.toString('utf8')
    if (path.posix.basename(file) === 'package.json') {
      try {
        const pkg = JSON.parse(text)
        packages.push({
          path: file,
          name: typeof pkg.name === 'string' ? pkg.name : null,
          version: typeof pkg.version === 'string' ? pkg.version : null,
          private: pkg.private === true,
          scripts: sortObject(pkg.scripts),
          dependencies: sortObject(pkg.dependencies),
          devDependencies: sortObject(pkg.devDependencies),
          peerDependencies: sortObject(pkg.peerDependencies),
        })
      } catch {
        diagnostics.push({ file, code: 'INVALID_PACKAGE_JSON' })
      }
    }
    if (scriptExtension.test(file))
      scripts.push(analyzeScript(file, text, diagnostics))
    if (file.endsWith('.css'))
      analyzeCss(file, text, {
        declarations,
        references,
        overrides,
        diagnostics,
      })
  }

  const testFiles = files.filter((file) => testName.test(file))
  const storyFiles = files.filter((file) => storyName.test(file))
  const storySummary = summarizeStories(storyFiles, scripts)
  const tokenNames = new Set(declarations.map((item) => item.name))
  const candidateDirectories = new Map()
  for (const script of scripts) {
    if (
      !/\.[jt]sx$/.test(script.file) ||
      testName.test(script.file) ||
      storyName.test(script.file)
    )
      continue
    const directory = path.posix.dirname(script.file)
    const candidate = candidateDirectories.get(directory) ?? {
      path: directory,
      files: [],
      exportedNames: [],
    }
    candidate.files.push(script.file)
    candidate.exportedNames.push(...script.exportedNames)
    candidateDirectories.set(directory, candidate)
  }
  const familyRoot = 'packages/shoreline/src/components/'
  const familyNames = [
    ...new Set(
      files
        .filter((file) => file.startsWith(familyRoot))
        .map((file) => file.slice(familyRoot.length).split('/')[0])
    ),
  ]
    .filter(
      (name) => !['stories', 'utils'].includes(name) && !name.includes('.')
    )
    .sort(compare)
  const families = familyNames.map((name) => {
    const directory = `${familyRoot}${name}`
    const hasPrefix = (file) => file.startsWith(`${directory}/`)
    return {
      name,
      path: directory,
      fileCount: files.filter(hasPrefix).length,
      tests: testFiles.filter(hasPrefix),
      stories: summarizeStories(
        storyFiles.filter(hasPrefix),
        scripts.filter((script) => hasPrefix(script.file))
      ),
    }
  })
  return {
    git: await gitState(root),
    fingerprint: {
      algorithm: 'sha256',
      value: fingerprint.digest('hex'),
      fileCount: files.length,
    },
    packages,
    counts: {
      files: files.length,
      scriptFiles: scripts.length,
      cssFiles: files.filter((file) => file.endsWith('.css')).length,
      componentFamilies: families.length,
      testFiles: testFiles.length,
      storyFiles: storyFiles.length,
      actualPlayFunctions: storySummary.actualPlayFunctions.length,
    },
    families,
    stories: storySummary,
    tests: { files: testFiles },
    tokens: {
      declarations,
      references,
      declaredNames: [...tokenNames].sort(compare),
      unresolvedNames: [
        ...new Set(
          references
            .filter((item) => !tokenNames.has(item.name))
            .map((item) => item.name)
        ),
      ].sort(compare),
    },
    shorelineImports: scripts.flatMap((script) => script.imports),
    overrides,
    candidateDirectories: [...candidateDirectories.values()]
      .sort((a, b) => compare(a.path, b.path))
      .map((item) => ({
        ...item,
        exportedNames: [...new Set(item.exportedNames)].sort(compare),
      })),
    diagnostics,
  }
}

async function collectFiles(root) {
  const files = []
  async function walk(directory) {
    const entries = (await readdir(directory, { withFileTypes: true })).sort(
      (a, b) => compare(a.name, b.name)
    )
    for (const entry of entries) {
      if (entry.isSymbolicLink() || isCredentialName(entry.name)) continue
      const file = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        if (!ignoredDirectories.has(entry.name)) await walk(file)
      } else if (
        entry.isFile() &&
        relevantExtensions.has(path.extname(entry.name))
      ) {
        files.push(relativePath(root, file))
      }
    }
  }
  await walk(root)
  return files.sort(compare)
}

function isCredentialName(name) {
  return /^(?:\.env(?:\.|$)|\.?credentials?(?:\.|$)|\.?secrets?(?:\.|$)|id_(?:rsa|ed25519)(?:\.|$)|\.npmrc$|\.netrc$)/i.test(
    name
  )
}

async function gitState(root) {
  try {
    const options = { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }
    const { stdout: topLevel } = await execute(
      'git',
      ['rev-parse', '--show-toplevel'],
      options
    )
    if ((await realpath(topLevel.trim())) !== (await realpath(root))) {
      return {
        available: false,
        reason: 'root-is-not-a-repository-root',
        commit: null,
        dirty: null,
      }
    }
    let commit = null
    try {
      commit = (
        await execute('git', ['rev-parse', '--verify', 'HEAD'], options)
      ).stdout.trim()
    } catch {
      // An initialized repository may have no commits yet.
    }
    const { stdout: status } = await execute(
      'git',
      ['status', '--porcelain=v1', '-z', '--untracked-files=all'],
      options
    )
    return { available: true, commit, dirty: status.length > 0 }
  } catch {
    return {
      available: false,
      reason: 'git-unavailable-or-not-a-repository',
      commit: null,
      dirty: null,
    }
  }
}

function sortObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value).sort(([a], [b]) => compare(a, b))
  )
}

function analyzeScript(file, text, diagnostics) {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
  for (const diagnostic of source.parseDiagnostics) {
    diagnostics.push({
      file,
      code: `TS${diagnostic.code}`,
      line:
        source.getLineAndCharacterOfPosition(diagnostic.start ?? 0).line + 1,
    })
  }
  const imports = []
  const playFunctions = []
  const exportedNames = []
  const line = (node) =>
    source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1
  const propertyName = (node) =>
    node && (ts.isIdentifier(node) || ts.isStringLiteral(node))
      ? node.text
      : null
  const registerImport = (node, moduleName, names, kind) => {
    if (
      moduleName !== '@vtex/shoreline' &&
      !moduleName.startsWith('@vtex/shoreline/')
    )
      return
    imports.push({
      file,
      line: line(node),
      module: moduleName,
      names: [...names].sort(compare),
      kind,
    })
  }
  const localFunctions = new Set()
  const isFunction = (node) =>
    node &&
    (ts.isArrowFunction(node) ||
      ts.isFunctionExpression(node) ||
      ts.isFunctionDeclaration(node))
  // Resolve direct local callback references without following imports or
  // executing arbitrary expressions from a source repository.
  for (const statement of source.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name)
      localFunctions.add(statement.name.text)
    if (ts.isVariableStatement(statement)) {
      for (const decl of statement.declarationList.declarations) {
        if (ts.isIdentifier(decl.name) && isFunction(decl.initializer))
          localFunctions.add(decl.name.text)
      }
    }
  }
  function visit(node) {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const clause = node.importClause
      const bindings = clause?.namedBindings
      const names = []
      if (clause?.name) names.push('default')
      if (bindings && ts.isNamespaceImport(bindings)) names.push('*')
      if (bindings && ts.isNamedImports(bindings))
        names.push(
          ...bindings.elements.map(
            (item) => (item.propertyName ?? item.name).text
          )
        )
      registerImport(node, node.moduleSpecifier.text, names, 'import')
    }
    if (
      ts.isExportDeclaration(node) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      registerImport(
        node,
        node.moduleSpecifier.text,
        node.exportClause && ts.isNamedExports(node.exportClause)
          ? node.exportClause.elements.map(
              (item) => (item.propertyName ?? item.name).text
            )
          : ['*'],
        're-export'
      )
    }
    if (
      ts.isCallExpression(node) &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      if (
        node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === 'require')
      ) {
        registerImport(
          node,
          node.arguments[0].text,
          [],
          node.expression.kind === ts.SyntaxKind.ImportKeyword
            ? 'dynamic-import'
            : 'require'
        )
      }
    }
    if (storyName.test(file)) {
      if (
        ts.isPropertyAssignment(node) &&
        propertyName(node.name) === 'play' &&
        (isFunction(node.initializer) ||
          (ts.isIdentifier(node.initializer) &&
            localFunctions.has(node.initializer.text)))
      ) {
        playFunctions.push({ file, line: line(node) })
      }
      if (ts.isMethodDeclaration(node) && propertyName(node.name) === 'play')
        playFunctions.push({ file, line: line(node) })
      if (
        ts.isBinaryExpression(node) &&
        node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        ts.isPropertyAccessExpression(node.left) &&
        node.left.name.text === 'play' &&
        (isFunction(node.right) ||
          (ts.isIdentifier(node.right) && localFunctions.has(node.right.text)))
      ) {
        playFunctions.push({ file, line: line(node) })
      }
    }
    if (
      ts.canHaveModifiers(node) &&
      ts
        .getModifiers(node)
        ?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      if (
        ts.isFunctionDeclaration(node) &&
        node.name &&
        /^[A-Z]/.test(node.name.text)
      )
        exportedNames.push(node.name.text)
      if (ts.isVariableStatement(node)) {
        for (const declaration of node.declarationList.declarations) {
          if (
            ts.isIdentifier(declaration.name) &&
            /^[A-Z]/.test(declaration.name.text)
          )
            exportedNames.push(declaration.name.text)
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return { file, imports, playFunctions, exportedNames }
}

function summarizeStories(files, scripts) {
  const byKind = { examples: [], play: [], show: [], other: [] }
  for (const file of files) {
    const match = path.posix
      .basename(file)
      .match(/(?:^|\.)(examples|play|show)\.stories\.[jt]sx?$/)
    byKind[match?.[1] ?? 'other'].push(file)
  }
  return {
    files,
    byKind,
    actualPlayFunctions: scripts.flatMap((script) => script.playFunctions),
  }
}

function analyzeCss(file, text, result) {
  let stylesheet
  try {
    stylesheet = postcss.parse(text, { from: file })
  } catch (error) {
    result.diagnostics.push({
      file,
      code: 'INVALID_CSS',
      line: error.line ?? null,
    })
    return
  }
  stylesheet.walkDecls((declaration) => {
    const line = declaration.source.start.line
    if (declaration.prop.startsWith('--')) {
      result.declarations.push({
        name: declaration.prop,
        value: declaration.value,
        file,
        line,
      })
    }
    for (const name of customPropertyReferences(declaration.value))
      result.references.push({ name, file, line })
  })
  stylesheet.walkRules((rule) => {
    const attributes = [
      ...new Set(
        [...rule.selector.matchAll(/\[\s*(data-sl-[\w-]+)/g)].map(
          (match) => match[1]
        )
      ),
    ].sort(compare)
    if (attributes.length)
      result.overrides.push({
        file,
        line: rule.source.start.line,
        selector: rule.selector,
        attributes,
      })
  })
}

// CSS strings and comments are not variable references. Preserve whitespace
// while masking them so var(--token, var(--fallback)) can be scanned safely.
function customPropertyReferences(value) {
  const masked = value.replace(
    /\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,
    ' '
  )
  return [...masked.matchAll(/\bvar\(\s*(--[\w-]+)/g)].map((match) => match[1])
}
