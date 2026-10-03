#!/usr/bin/env node
import { mkdir, writeFile, readdir } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { fileURLToPath } from 'node:url'
import { inventory } from './inventory.mjs'
import { checkPolicy } from './policy.mjs'
import {
  checkContractFiles,
  contextPacket,
  targetFingerprint,
  validateContract,
} from './contracts.mjs'
import { changedFiles, contractsIn, readInside } from './io.mjs'
import { checkTokens } from './tokens.mjs'
import { checkThemes } from './theme-structure.mjs'
import { createDraft, writeDraft } from './init.mjs'

const help = `Shoreline design-system tools (Node >=20, pnpm 9.4.0)

pnpm ds inventory [--source REFERENCE_REPO] [--out artifacts/design-system/inventory.json]
pnpm ds init component|tokens ID --theme NAME [--out CONTRACT.json]
pnpm ds init theme NAME [--out CONTRACT.json]
pnpm ds tokens [--theme NAME] [--components] [--out FILE]
pnpm ds themes [--out FILE]
pnpm ds check --base origin/main [--lint]
pnpm ds check --all
pnpm ds check --files packages/shoreline/src/components/button/button.tsx
pnpm ds contract design-system/contracts/components/button.json [--source ../aiw-styleguide] [--ready]
pnpm ds context design-system/contracts/components/button.json [--source REFERENCE_REPO] [--out FILE]
pnpm ds fingerprint design-system/contracts/components/button.json

init writes a draft contract, never overwrites files, and does not generate production code.
check validates all registered contracts, all theme token graphs, and policies/references on selected files.
tokens --components audits theme component styles, shared foundations and concrete JSX styles.
--base includes committed changes since merge-base, working tree, and untracked files.
--all diagnoses existing debt. No automatic suppression or baseline acceptance.
Draft contracts describe intended work. --ready requires evidence appropriate to the contract kind.
Exit codes: 0 checks passed, 1 findings, 2 invalid input/execution failure.
No command publishes, merges, accepts visual baselines, or runs source scripts.
`

async function allFiles(root, directory) {
  const result = []
  for (const entry of await readdir(path.join(root, directory), {
    withFileTypes: true,
  })) {
    const file = `${directory}/${entry.name}`
    if (entry.isDirectory()) result.push(...(await allFiles(root, file)))
    else if (entry.isFile()) result.push(file)
  }
  return result.sort()
}

function themeSummary(themes) {
  return themes.map(({ name, tokens, files, componentDeclarations }) => ({
    name,
    tokenCount: tokens.length,
    files,
    componentDeclarations,
  }))
}

export async function main(args = process.argv.slice(2)) {
  const { values, positionals } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      root: { type: 'string' },
      source: { type: 'string' },
      theme: { type: 'string', multiple: true },
      components: { type: 'boolean' },
      out: { type: 'string' },
      base: { type: 'string' },
      all: { type: 'boolean' },
      ready: { type: 'boolean' },
      files: { type: 'string', multiple: true },
      help: { type: 'boolean' },
      lint: { type: 'boolean' },
    },
  })
  if (values.help || positionals.length === 0) {
    process.stdout.write(help)
    return 0
  }
  const root = path.resolve(values.root ?? '.')
  const sourceRoot = values.source ? path.resolve(values.source) : undefined
  const [command, contractPath] = positionals
  if (
    positionals.length >
    (command === 'init'
      ? 3
      : ['contract', 'context', 'fingerprint'].includes(command)
        ? 2
        : 1)
  )
    throw new Error('Unexpected positional argument')
  let result
  let status = 0
  if (command === 'init') {
    const contract = createDraft(contractPath, positionals[2], values.theme)
    const group = {
      component: 'components',
      tokens: 'tokens',
      theme: 'themes',
    }[contract.kind]
    const file =
      values.out ?? `design-system/contracts/${group}/${contract.id}.json`
    await writeDraft(root, file, contract)
    process.stdout.write(`${file}\n`)
    return 0
  }
  if (command === 'inventory') {
    result = await inventory({ root, sourceRoot })
  } else if (command === 'themes') {
    result = await checkThemes({ root })
    status = result.diagnostics.length ? 1 : 0
  } else if (command === 'tokens') {
    result = await checkTokens({
      root,
      themes: values.theme,
      componentFiles: values.components ? 'all' : [],
    })
    result.themes = themeSummary(result.themes)
    status = result.diagnostics.length ? 1 : 0
  } else if (
    command === 'contract' ||
    command === 'context' ||
    command === 'fingerprint'
  ) {
    if (!contractPath) throw new Error('A contract file is required')
    const contract = JSON.parse(await readInside(root, contractPath))
    if (command === 'fingerprint') {
      const errors = validateContract(contract)
      if (errors.length) throw new Error(errors.join('\n'))
      result = { inputSha256: await targetFingerprint(contract, root) }
    } else if (command === 'context') {
      result = await contextPacket(contract, { root, sourceRoot })
    } else {
      const errors = await checkContractFiles(contract, {
        root,
        sourceRoot,
        ready: values.ready,
      })
      result = {
        contract: contractPath,
        status: contract.status,
        sourceVerificationRequested: Boolean(sourceRoot),
        sourceVerified:
          Boolean(contract.source && sourceRoot) && errors.length === 0,
        sourceVerification: !contract.source
          ? 'not-applicable'
          : !sourceRoot
            ? 'not-requested'
            : errors.length
              ? 'failed'
              : 'verified',
        errors,
      }
      status = errors.length ? 1 : 0
    }
  } else if (command === 'check') {
    const modes = [
      Boolean(values.all),
      Boolean(values.base),
      Boolean(values.files?.length),
    ].filter(Boolean)
    if (modes.length !== 1)
      throw new Error(
        'Select exactly one of --base REF, --all, or --files PATH'
      )
    const files = values.all
      ? await allFiles(root, 'packages/shoreline/src')
      : values.base
        ? changedFiles(root, values.base)
        : values.files
    // Check every input before handing it to parsers. Never follow an escaping symlink.
    for (const file of files) await readInside(root, file)
    const diagnostics = await checkPolicy({ root, files })
    const tokens = await checkTokens({
      root,
      componentFiles: files,
    })
    diagnostics.push(...tokens.diagnostics)
    const themeStructure = await checkThemes({ root })
    diagnostics.push(...themeStructure.diagnostics)
    const contracts = []
    for (const file of await contractsIn(root)) {
      const contract = JSON.parse(await readInside(root, file))
      const errors = await checkContractFiles(contract, { root })
      contracts.push({ file, status: contract.status, errors })
    }
    let biome = { executed: false }
    const lintFiles = files.filter((file) =>
      /^packages\/shoreline\/src\/(components|themes|foundations)\/.+\.(tsx?|css)$/.test(
        file
      )
    )
    if (values.lint && lintFiles.length) {
      const execution = spawnSync(
        process.execPath,
        [
          path.join(root, 'node_modules/@biomejs/biome/bin/biome'),
          'check',
          '--config-path',
          path.join(root, 'tools/design-system/biome.json'),
          ...lintFiles,
        ],
        { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
      )
      if (execution.error || execution.status === null)
        throw new Error(
          `Biome execution failed: ${execution.error?.message ?? execution.signal}`
        )
      biome = {
        executed: true,
        exitCode: execution.status,
        stdout: execution.stdout,
        stderr: execution.stderr,
      }
    }
    result = {
      filesChecked: files.length,
      diagnostics,
      contracts,
      themes: themeSummary(tokens.themes),
      biome,
      sourceVerified: false,
      changedFilesComparedWithGit: Boolean(values.base),
    }
    status =
      diagnostics.length || contracts.some((entry) => entry.errors.length)
        ? 1
        : 0
    if (biome.executed && biome.exitCode !== 0) status = 1
  } else throw new Error(`Unknown command: ${command}`)
  const output = `${JSON.stringify(result, null, 2)}\n`
  if (values.out) {
    const outputPath = path.resolve(values.out)
    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, output)
    process.stdout.write(`${values.out}\n`)
  } else process.stdout.write(output)
  return status
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main()
    .then((code) => {
      process.exitCode = code
    })
    .catch((error) => {
      process.stderr.write(`${error.message}\n`)
      process.exitCode = 2
    })
}
