import postcss from 'postcss'
import registry from './theme-registry.cjs'
import { readInside } from './io.mjs'
import { localCssImport, readThemeFile, themeDirectory } from './themes.mjs'

export async function checkThemes({ root }) {
  const diagnostics = []
  const report = (rule, path, message) =>
    diagnostics.push({ rule, path, line: 1, message })
  let themes
  let manifest
  try {
    themes = registry.discoverThemes(root)
    manifest = JSON.parse(
      await readInside(root, 'packages/shoreline/package.json')
    )
  } catch (error) {
    report('theme-input', registry.themesPath, error.message)
    return { themes: [], diagnostics }
  }
  for (const theme of themes) {
    const directory = themeDirectory(theme)
    const graph = new Map()
    const visit = async (file, stack = []) => {
      if (stack.includes(file))
        throw new Error(`CSS import cycle: ${[...stack, file].join(' -> ')}`)
      if (graph.has(file)) return
      const ast = postcss.parse(await readThemeFile(root, file), { from: file })
      const imports = []
      ast.walkAtRules('import', (node) => {
        if (node.parent.type !== 'root') {
          throw new Error('CSS imports must be top-level statements')
        }
        imports.push(localCssImport(node.params, file))
      })
      graph.set(file, { ast, imports })
      for (const dependency of imports)
        await visit(dependency.file, [...stack, file])
    }
    for (const file of [
      ...registry.entries.map(({ input }) => input),
      ...registry.fullEntries,
    ]) {
      try {
        await visit(`${directory}/${file}`)
      } catch (error) {
        report('theme-input', `${directory}/${file}`, error.message)
      }
    }
    for (const [name, target] of Object.entries(registry.themeExports(theme))) {
      if (manifest.exports?.[name] !== target)
        report(
          'theme-export',
          'packages/shoreline/package.json',
          `Expected ${name} -> ${target}`
        )
    }
    const checkedSplitFiles = new Set()
    const checkSplitLayers = (file) => {
      if (checkedSplitFiles.has(file)) return
      checkedSplitFiles.add(file)
      const parsed = graph.get(file)
      if (!parsed) return
      parsed.ast.walkAtRules('layer', () =>
        report(
          'theme-layers',
          file,
          'Split entries and their dependencies must be unlayered; the public build owns the layer.'
        )
      )
      for (const dependency of parsed.imports) {
        if (dependency.modifier)
          report(
            'theme-layers',
            file,
            'Split CSS imports must be unconditional and unlayered.'
          )
        checkSplitLayers(dependency.file)
      }
    }
    for (const { input } of registry.entries)
      checkSplitLayers(`${directory}/${input}`)
    for (const [entrypoint, layered] of [
      ['styles.css', true],
      ['styles-unlayered.css', false],
    ]) {
      const file = `${directory}/${entrypoint}`
      const parsed = graph.get(file)
      if (!parsed) continue
      const expected = new Map(
        registry.entries.map(({ input, layer }) => [
          `${directory}/${input}`,
          layered ? `layer(${layer})` : '',
        ])
      )
      if (
        parsed.imports.length !== expected.size ||
        parsed.imports.some(
          ({ file, modifier }) =>
            !expected.has(file) || expected.get(file) !== modifier
        ) ||
        new Set(parsed.imports.map(({ file }) => file)).size !== expected.size
      )
        report(
          'theme-layers',
          file,
          'The complete entrypoint must import tokens, reset, base and components exactly once with their intended layers.'
        )
      for (const node of parsed.ast.nodes) {
        if (
          node.type === 'comment' ||
          (node.type === 'atrule' && node.name === 'import')
        )
          continue
        if (
          layered &&
          node.type === 'atrule' &&
          node.name === 'layer' &&
          !node.nodes &&
          node.params.replace(/\s/g, '') ===
            'sl-reset,sl-base,sl-tokens,sl-components'
        )
          continue
        report(
          'theme-layers',
          file,
          'Put rules in the dedicated theme entries; only imports and the canonical layer order belong in the complete entrypoint.'
        )
      }
    }
    for (const entry of ['reset', 'base']) {
      const visited = new Set()
      const importsShared = (file) => {
        if (file === `packages/shoreline/src/foundations/${entry}.css`)
          return true
        if (visited.has(file)) return false
        visited.add(file)
        return (
          graph.get(file)?.imports.some(({ file }) => importsShared(file)) ??
          false
        )
      }
      if (!importsShared(`${directory}/${entry}.css`))
        report(
          'theme-foundation',
          `${directory}/${entry}.css`,
          `Reuse the shared foundations/${entry}.css through a local import; put deliberate additions after it.`
        )
    }
  }
  for (const name of Object.keys(manifest.exports ?? {})) {
    if (name.startsWith('./themes/') && !themes.includes(name.split('/')[2]))
      report(
        'theme-export',
        'packages/shoreline/package.json',
        `Export references an unavailable theme: ${name}`
      )
  }
  return { themes, diagnostics }
}
