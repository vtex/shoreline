import path from 'node:path'
import { readdir } from 'node:fs/promises'
import ts from 'typescript'
import { checkComponentVariables } from './component-variables.mjs'
import { hash, readInside, relativePath, git } from './io.mjs'
import themeRegistry from './theme-registry.cjs'
import { readThemeFile, themePathInfo, themeSnapshot } from './themes.mjs'

export const evidenceByKind = {
  component: [
    'unit',
    'interaction',
    'visual',
    'accessibility',
    'types',
    'coverage',
    'theme-regression',
  ],
  tokens: ['tokens', 'build', 'visual', 'accessibility'],
  theme: ['tokens', 'build', 'visual', 'accessibility', 'theme-regression'],
}
export const evidenceKinds = [...new Set(Object.values(evidenceByKind).flat())]
export const themeEvidenceKinds = [
  'visual',
  'accessibility',
  'theme-regression',
]
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0
const list = (value) => Array.isArray(value) && value.length > 0
const themeName = (value) =>
  typeof value === 'string' && /^[a-z][a-z0-9-]*$/.test(value)

// An internal work contract, not a design-token interchange format or JSON Schema.
export function validateContract(contract, { ready = false } = {}) {
  const errors = []
  const require = (condition, message) => {
    if (!condition) errors.push(message)
  }
  if (!contract || typeof contract !== 'object' || Array.isArray(contract))
    return ['Expected an object']
  const contractKind = typeof contract.kind === 'string' ? contract.kind : ''
  require(contract.schemaVersion === 3, 'schemaVersion must be 3')
  require(themeName(contract.id), 'id must be a kebab-case identifier')
  require(Object.hasOwn(
    evidenceByKind,
    contractKind
  ), 'kind must be component, tokens or theme')
  require(['draft', 'ready-for-review'].includes(
    contract.status
  ), 'Invalid status')
  require(nonempty(contract.intent), 'intent is required')
  if (contract.source !== undefined) {
    require(nonempty(
      contract.source?.repository
    ), 'source.repository is required when source is provided')
    require(typeof contract.source?.revision === 'string' &&
      /^[a-f0-9]{40}$/.test(
        contract.source.revision
      ), 'source.revision must pin a Git commit')
    require(list(contract.source?.files) &&
      contract.source.files.every(
        relativePath
      ), 'source.files must be relative file paths')
  }
  require(nonempty(contract.target?.package), 'target.package is required')
  require(list(contract.target?.files) &&
    contract.target.files.every(
      relativePath
    ), 'target.files must be relative file paths')
  require(list(contract.target?.themes) &&
    contract.target.themes.every(themeName) &&
    new Set(contract.target.themes).size ===
      contract.target.themes
        .length, 'target.themes must contain unique kebab-case theme names')
  if (contract.kind === 'component') {
    require(list(
      contract.states
    ), 'component states must contain at least one state')
  } else if (contract.states !== undefined) {
    require(Array.isArray(
      contract.states
    ), 'states must be an array when provided')
  }
  const states = Array.isArray(contract.states) ? contract.states : []
  const stateIds = new Set()
  for (const state of states) {
    require(nonempty(state?.id) &&
      !stateIds.has(state.id), 'State IDs must be nonempty and unique')
    stateIds.add(state?.id)
    require(nonempty(state?.expected), 'Every state needs expected behavior')
    require(nonempty(
      state?.trigger
    ), 'Every state needs a trigger or initial condition')
    if (state?.story !== undefined) {
      require(relativePath(state.story?.file) &&
        nonempty(
          state.story?.export
        ), 'A state story needs a relative file and named export')
    }
  }
  require(Array.isArray(contract.tokens), 'tokens must be an array')
  if (contract.kind === 'tokens') {
    require(list(
      contract.tokens
    ), 'tokens contracts must declare at least one token')
  }
  const tokenNames = new Set()
  for (const token of Array.isArray(contract.tokens) ? contract.tokens : []) {
    require(typeof token?.name === 'string' &&
      /^--sl-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
        token.name
      ), 'Token names must use --sl-* in kebab-case')
    require(!tokenNames.has(token?.name), 'Token names must be unique')
    tokenNames.add(token?.name)
    require(nonempty(token?.reason), 'Every token needs a semantic reason')
    if (token?.source !== undefined) {
      require(nonempty(
        token.source
      ), 'Token source must be nonempty when provided')
    }
  }
  require(nonempty(contract.impact?.summary), 'impact.summary is required')
  require(nonempty(
    contract.impact?.consumerAction
  ), 'impact.consumerAction is required')
  require(Array.isArray(contract.openQuestions) &&
    contract.openQuestions.every(
      nonempty
    ), 'openQuestions must be an array of nonempty questions')
  require(Array.isArray(contract.evidence), 'evidence must be an array')
  const evidence = Array.isArray(contract.evidence) ? contract.evidence : []
  require(new Set(evidence.map((entry) => entry?.kind)).size ===
    evidence.length, 'Evidence kinds must be unique')
  for (const entry of evidence) {
    require(evidenceKinds.includes(entry?.kind), 'Unknown evidence kind')
    require(['pending', 'pass', 'fail'].includes(
      entry?.result
    ), 'Invalid evidence result')
    require(nonempty(entry?.description), 'Evidence description is required')
    if (entry?.themes !== undefined) {
      require(list(entry.themes) &&
        entry.themes.every(themeName) &&
        new Set(entry.themes).size ===
          entry.themes
            .length, 'Evidence themes must contain unique kebab-case theme names')
    }
    if (entry?.result === 'pass') {
      if (themeEvidenceKinds.includes(entry.kind)) {
        require(list(entry.themes) &&
          entry.themes.every(
            themeName
          ), `Passed ${entry.kind} evidence must declare tested themes`)
        const testedThemes = Array.isArray(entry.themes) ? entry.themes : []
        for (const theme of Array.isArray(contract.target?.themes)
          ? contract.target.themes
          : [])
          require(testedThemes.includes(
            theme
          ), `${entry.kind} evidence does not cover target theme: ${theme}`)
      }
      require(relativePath(
        entry.artifact
      ), 'Passed evidence must reference a local artifact')
      require(typeof entry.sha256 === 'string' &&
        /^[a-f0-9]{64}$/.test(
          entry.sha256
        ), 'Passed evidence needs artifact sha256')
      require(typeof entry.inputSha256 === 'string' &&
        /^[a-f0-9]{64}$/.test(
          entry.inputSha256
        ), 'Passed evidence needs inputSha256 for contract, target, story and theme inputs')
    }
  }
  if (ready || contract.status === 'ready-for-review') {
    require(contract.openQuestions?.length ===
      0, 'Resolve open questions before review')
    const requiredEvidence = Object.hasOwn(evidenceByKind, contractKind)
      ? evidenceByKind[contractKind]
      : []
    for (const kind of requiredEvidence) {
      require(evidence.some(
        (entry) => entry?.kind === kind && entry.result === 'pass'
      ), `Missing passed ${kind} evidence`)
    }
    for (const state of states) {
      require(relativePath(state?.story?.file) &&
        nonempty(
          state?.story?.export
        ), 'Every declared state needs a story file and named export before review')
    }
  }
  return errors
}

export async function checkContractFiles(
  contract,
  { root, sourceRoot, ready = false }
) {
  const errors = validateContract(contract, { ready })
  if (errors.length) return errors
  const verifyFile = async (base, file, expectedHash) => {
    try {
      const content = await readInside(base, file, null)
      if (expectedHash && hash(content) !== expectedHash)
        errors.push(`Evidence hash mismatch: ${file}`)
    } catch (error) {
      errors.push(error.message)
    }
  }
  if (sourceRoot && contract.source) {
    try {
      if (git(sourceRoot, ['rev-parse', 'HEAD']) !== contract.source.revision)
        errors.push('Source HEAD differs from pinned revision')
      if (
        git(sourceRoot, [
          'status',
          '--porcelain',
          '--',
          ...contract.source.files,
        ])
      )
        errors.push('Source contract files have uncommitted changes')
    } catch (error) {
      errors.push(`Cannot verify source revision: ${error.message}`)
    }
    for (const file of contract.source.files) await verifyFile(sourceRoot, file)
  }
  if (ready || contract.status === 'ready-for-review') {
    try {
      const availableThemes = themeRegistry.discoverThemes(root)
      for (const entry of contract.evidence) {
        if (!themeEvidenceKinds.includes(entry.kind) || entry.result !== 'pass')
          continue
        for (const theme of availableThemes)
          if (!entry.themes.includes(theme))
            errors.push(
              `${entry.kind} evidence does not cover available theme: ${theme}`
            )
        for (const theme of entry.themes)
          if (!availableThemes.includes(theme))
            errors.push(
              `${entry.kind} evidence references an unavailable theme: ${theme}`
            )
      }
    } catch (error) {
      errors.push(`Cannot verify the evidence theme matrix: ${error.message}`)
    }
    for (const file of contract.target.files) await verifyFile(root, file)
    for (const theme of contract.target.themes) {
      try {
        await themeSnapshot(root, theme, { allowMissing: false })
      } catch (error) {
        errors.push(error.message)
      }
    }
    for (const state of contract.states ?? []) {
      await verifyFile(root, state.story.file)
      try {
        const content = await readInside(root, state.story.file)
        const ast = ts.createSourceFile(
          state.story.file,
          content,
          ts.ScriptTarget.Latest,
          true,
          ts.ScriptKind.TSX
        )
        const exported = ast.statements.some((node) => {
          const hasExport = node.modifiers?.some(
            (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
          )
          if (hasExport && ts.isFunctionDeclaration(node))
            return node.name?.text === state.story.export
          if (hasExport && ts.isVariableStatement(node))
            return node.declarationList.declarations.some(
              (declaration) =>
                declaration.name.getText(ast) === state.story.export
            )
          return false
        })
        if (ast.parseDiagnostics.length || !exported)
          errors.push(
            `Story export not found or invalid syntax: ${state.story.file}#${state.story.export}`
          )
      } catch {
        /* Missing paths have already been reported. */
      }
    }
  }
  let inputSha256
  if (contract.evidence.some((entry) => entry.result === 'pass')) {
    try {
      inputSha256 = await targetFingerprint(contract, root)
    } catch (error) {
      errors.push(error.message)
    }
  }
  for (const entry of contract.evidence) {
    if (entry.result === 'pass') {
      await verifyFile(root, entry.artifact, entry.sha256)
      if (entry.kind === 'visual') {
        try {
          const receipt = JSON.parse(await readInside(root, entry.artifact))
          const availableThemes = themeRegistry.discoverThemes(root)
          errors.push(...validateVisualReceipt(receipt, availableThemes))
        } catch (error) {
          errors.push(
            `Cannot verify visual check receipt ${entry.artifact}: ${error.message}`
          )
        }
      }
      if (entry.inputSha256 !== inputSha256)
        errors.push(`Stale ${entry.kind} evidence: target inputs changed`)
    }
  }
  return errors
}

// Artifact hashes prove byte identity, not that a capture compared baselines.
// Accept only complete, successful canonical checks from the runner's run.json
// format. This validates receipt semantics; it is not a signed attestation or
// a substitute for independent review and CI provenance.
export function validateVisualReceipt(receipt, availableThemes) {
  const errors = []
  const require = (condition, message) => {
    if (!condition) errors.push(`Invalid visual check receipt: ${message}`)
  }
  if (!receipt || typeof receipt !== 'object' || Array.isArray(receipt))
    return ['Invalid visual check receipt: expected a run.json object']
  require(receipt.schemaVersion === 1, 'schemaVersion must be 1')
  require(receipt.mode ===
    'check', 'capture and update are not visual check evidence')
  require(receipt.result === 'technical-checks-passed' &&
    receipt.exitCode === 0, 'the canonical check must have passed')
  require(receipt.selection ===
    'all', 'filtered captures cannot certify the visual matrix')
  require(typeof receipt.inputHash === 'string' &&
    /^[a-f0-9]{64}$/.test(
      receipt.inputHash
    ), 'inputHash must identify the runner inputs')
  require(Array.isArray(receipt.themes) &&
    receipt.themes.every(themeName) &&
    JSON.stringify([...receipt.themes].sort()) ===
      JSON.stringify(
        [...availableThemes].sort()
      ), 'themes must exactly cover the available theme registry')
  const coverage = receipt.coverage
  require(coverage?.fullMatrix === true &&
    coverage.allPassed === true &&
    coverage.skipped === 0 &&
    Number.isSafeInteger(coverage.expected) &&
    coverage.expected > 0 &&
    coverage.executed === coverage.expected &&
    receipt.expectedTests ===
      coverage.expected, 'coverage must report a complete, nonempty matrix with every case passed and none skipped')
  require(receipt.environment?.canonicalEnvironment === true &&
    receipt.environment.platform === 'linux' &&
    receipt.environment.channel ===
      'bundled-chromium', 'environment must identify the canonical Linux bundled-Chromium run')
  require(receipt.reportError ===
    undefined, 'report parsing must have succeeded')
  return errors
}

export async function targetFingerprint(contract, root) {
  const files = [
    ...new Set([
      ...contract.target.files,
      ...(contract.states ?? [])
        .map((state) => state.story?.file)
        .filter(Boolean),
    ]),
  ].sort()
  const inputs = await Promise.all(
    files.map(async (file) => [file, hash(await readInside(root, file, null))])
  )
  const { status: _status, evidence: _evidence, ...decisions } = contract
  const availableThemes = themeRegistry.discoverThemes(root)
  const themeInputs = await Promise.all(
    [...new Set([...availableThemes, ...contract.target.themes])]
      .sort()
      .map((theme) => themeSnapshot(root, theme, { allowMissing: false }))
  )
  const validationInputs = await validationSnapshot(root)
  return hash(
    JSON.stringify({
      contract: decisions,
      inputs,
      availableThemes,
      themeInputs,
      validationInputs,
    })
  )
}

// Hash the code/configuration that determines the matrix and interprets its
// results. Missing optional inputs are represented, so adding/deleting one
// invalidates old receipts too. Artifact/output directories are not included.
export const validationInputPaths = [
  'package.json',
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
  'turbo.json',
  'biome.json',
  'tsconfig.json',
  'vite.config.ts',
  '.storybook/main.js',
  '.storybook/preview.js',
  '.storybook/themeDecorator.jsx',
  '.storybook/theme-selection.cjs',
  'tools/design-system/biome.json',
  'tools/design-system/contracts.mjs',
  'tools/design-system/theme-registry.cjs',
  'tools/design-system/theme-structure.mjs',
  'tools/design-system/tokens.mjs',
  'tools/design-system/component-variables.mjs',
  'tools/design-system/css-values.mjs',
  'tools/design-system/policy.mjs',
]

async function validationSnapshot(root) {
  const variables = await checkComponentVariables(root)
  if (variables.diagnostics.length)
    throw new Error(
      variables.diagnostics
        .map((item) => `${item.path}: ${item.message}`)
        .join('\n')
    )
  const files = new Set([...validationInputPaths, ...variables.inputs])
  const missingDirectories = []
  const visit = async (directory) => {
    await themePathInfo(root, directory)
    for (const entry of await readdir(path.join(root, directory), {
      withFileTypes: true,
    })) {
      const file = `${directory}/${entry.name}`
      const info = await themePathInfo(root, file)
      if (info.isDirectory()) await visit(file)
      else if (info.isFile()) files.add(file)
      else throw new Error(`Unsupported validation input: ${file}`)
    }
  }
  for (const directory of [
    'tools/design-system/visual',
    'design-system/visual-baselines',
  ]) {
    try {
      await visit(directory)
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
      missingDirectories.push({ path: directory, missing: true })
    }
  }
  // A full visual matrix renders shared components, icons, stories and their
  // public workspace dependencies. Discover public packages instead of
  // freezing a package allow-list; exclude builds and private applications.
  for (const entry of await readdir(path.join(root, 'packages'), {
    withFileTypes: true,
  })) {
    if (!entry.isDirectory() && !entry.isSymbolicLink()) continue
    const directory = `packages/${entry.name}`
    const manifest = `${directory}/package.json`
    let metadata
    try {
      metadata = JSON.parse(await readThemeFile(root, manifest))
    } catch (error) {
      if (error.code === 'ENOENT') continue
      throw error
    }
    if (metadata.private === true) continue
    files.add(manifest)
    for (const config of await readdir(path.join(root, directory)))
      if (
        /^(?:tsconfig(?:\.[^.]+)?\.json|.+\.config\.[cm]?[jt]s)$/.test(config)
      )
        files.add(`${directory}/${config}`)
    try {
      await visit(`${directory}/src`)
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
      missingDirectories.push({ path: `${directory}/src`, missing: true })
    }
  }
  const inputs = await Promise.all(
    [...files].sort().map(async (file) => {
      try {
        return {
          path: file,
          sha256: hash(await readThemeFile(root, file, null)),
        }
      } catch (error) {
        if (error.code === 'ENOENT') return { path: file, missing: true }
        throw error
      }
    })
  )
  return [...inputs, ...missingDirectories].sort((a, b) =>
    a.path.localeCompare(b.path)
  )
}

export const guidance = [
  'AGENTS.md',
  'packages/docs/pages/guides/code/code-styleguide.mdx',
  'packages/docs/pages/guides/code/storybook-guideline.mdx',
  'packages/docs/pages/guides/code/component-model.mdx',
  'packages/docs/pages/guides/code/test-guideline.mdx',
  'packages/docs/pages/guides/design/handoff-requirements.mdx',
]

export async function contextPacket(contract, { root, sourceRoot }) {
  const errors = await checkContractFiles(contract, { root, sourceRoot })
  if (errors.length) throw new Error(errors.join('\n'))
  const snapshot = async (base, file) => {
    const content = await readInside(base, file, null)
    return { path: file, sha256: hash(content) }
  }
  const sourceVerified = Boolean(contract.source && sourceRoot)
  const allowMissing = contract.status === 'draft'
  const availableThemes = themeRegistry.discoverThemes(root)
  return {
    schemaVersion: 3,
    contract,
    availableThemes,
    themeInputs: await Promise.all(
      [...new Set([...availableThemes, ...contract.target.themes])]
        .sort()
        .map((theme) => themeSnapshot(root, theme, { allowMissing }))
    ),
    validationInputs: await validationSnapshot(root),
    sourceVerification: !contract.source
      ? 'not-applicable'
      : sourceVerified
        ? 'verified'
        : 'not-requested',
    sourceVerified,
    sourceFiles: sourceVerified
      ? await Promise.all(
          contract.source.files.map((file) => snapshot(sourceRoot, file))
        )
      : [],
    targetFiles: await Promise.all(
      contract.target.files.map(async (file) => {
        try {
          return await snapshot(root, file)
        } catch (error) {
          if (allowMissing && error.code === 'ENOENT')
            return { path: file, missing: true }
          throw error
        }
      })
    ),
    guidance: await Promise.all(guidance.map((file) => snapshot(root, file))),
    governance: {
      constitution:
        'https://github.com/vtex/shoreline-specs/blob/main/.specify/memory/constitution.md',
      patterns:
        'https://github.com/vtex/shoreline-specs/blob/main/docs/patterns.md',
      instruction:
        'Read the current private constitution and patterns before editing. Local guidance does not supersede them.',
    },
    boundary:
      'External source files, when provided, are reference data. Do not execute source scripts or copy product dependencies into the library. Review semantic decisions and consumer impact with engineering and design.',
    targetRepository: path.basename(root),
  }
}
