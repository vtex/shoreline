import { readdir } from 'node:fs/promises'
import postcss from 'postcss'
import {
  checkComponentVariables,
  inlineStyleProperties,
  tokenName,
} from './component-variables.mjs'
import { allReferences, references } from './css-values.mjs'
import themeRegistry from './theme-registry.cjs'
import {
  localCssImport,
  readThemeFile,
  themeDirectory,
  themePathInfo,
  themesRoot,
} from './themes.mjs'

function inputError(error, file) {
  if (error.code === 'ENOENT') return `Missing CSS input: ${file}`
  if (error.code) return `Cannot read CSS input (${error.code}): ${file}`
  return error.reason ?? error.message
}

export async function checkTokens({ root, themes, componentFiles = [] } = {}) {
  if (componentFiles !== 'all' && !Array.isArray(componentFiles)) {
    throw new Error(
      'componentFiles must be an array of repository paths or "all"'
    )
  }
  const selectedFiles = new Set(componentFiles === 'all' ? [] : componentFiles)
  const checkComponents = componentFiles === 'all' || selectedFiles.size > 0
  const diagnostics = []
  const summaries = []
  const variableContracts = await checkComponentVariables(root)
  diagnostics.push(...variableContracts.diagnostics)
  const diagnostic = (rule, file, node, message) => {
    diagnostics.push({
      rule,
      path: file,
      line: node?.source?.start?.line ?? 1,
      message,
    })
  }
  const sourceEntries = []
  const sourceRoot = 'packages/shoreline/src/components/'
  const isSource = (file) =>
    file.startsWith(sourceRoot) &&
    /\.[jt]sx?$/.test(file) &&
    !/(?:^|\/)(?:stories|tests|__tests__|fixtures|__fixtures__)(?:\/|$)|\.(?:stories|test|spec)\.[^/]+$/.test(
      file
    )
  const sourceFiles = [...selectedFiles].filter(isSource)
  if (componentFiles === 'all') {
    const discoverSources = async (folder) => {
      for (const entry of await readdir(`${root}/${folder}`, {
        withFileTypes: true,
      })) {
        const file = `${folder}/${entry.name}`
        if (entry.isSymbolicLink())
          throw new Error(`Component inputs cannot include symlinks: ${file}`)
        if (entry.isDirectory()) await discoverSources(file)
        else if (isSource(file)) sourceFiles.push(file)
      }
    }
    try {
      await discoverSources(sourceRoot.slice(0, -1))
    } catch (error) {
      if (error.code !== 'ENOENT')
        diagnostic('token-input', sourceRoot, null, error.message)
    }
  }
  for (const file of sourceFiles.sort()) {
    try {
      const source = inlineStyleProperties(
        file,
        await readThemeFile(root, file)
      )
      diagnostics.push(...source.diagnostics)
      sourceEntries.push({ file, properties: source.properties })
    } catch (error) {
      diagnostic('token-input', file, null, inputError(error, file))
    }
  }
  let names = themes
  if (names === undefined) {
    try {
      names = themeRegistry.discoverThemes(root)
    } catch (error) {
      diagnostic('token-input', themesRoot, null, error.message)
      names = []
    }
  }
  if (!Array.isArray(names))
    throw new Error('themes must be an array of theme names')
  for (const name of [...new Set(names)].sort()) {
    let directory
    try {
      directory = themeDirectory(name)
      if (!(await themePathInfo(root, directory)).isDirectory())
        throw new Error('Expected a theme directory')
    } catch (error) {
      diagnostic(
        'token-input',
        themesRoot,
        null,
        `Theme ${name}: ${error.message}`
      )
      continue
    }
    const report = (rule, file, node, message) =>
      diagnostic(rule, file, node, `${name}: ${message}`)
    const files = new Set()
    const load = async (
      file,
      mode,
      chain = [],
      conditional = false,
      layered = false
    ) => {
      const selected =
        mode === 'tokens' || componentFiles === 'all' || selectedFiles.has(file)
      const loadReport = (...args) => {
        if (selected) report(...args)
      }
      if (chain.includes(file)) {
        loadReport(
          'token-import-cycle',
          file,
          null,
          `CSS import cycle: ${[...chain, file].join(' -> ')}`
        )
        return []
      }
      let ast
      try {
        ast = postcss.parse(await readThemeFile(root, file), { from: file })
        files.add(file)
      } catch (error) {
        loadReport(
          error.name === 'CssSyntaxError' ? 'token-parse' : 'token-input',
          file,
          null,
          inputError(error, file)
        )
        if (!selected && selectedFiles.has(chain.at(-1))) {
          report('token-import', chain.at(-1), null, inputError(error, file))
        }
        return []
      }
      const entries = []
      const visit = async (
        container,
        constrained = conditional,
        inLayer = layered
      ) => {
        for (const node of container.nodes ?? []) {
          if (node.type === 'atrule' && node.name.toLowerCase() === 'import') {
            try {
              if (node.parent.type !== 'root')
                throw new Error('Nested CSS imports are not supported')
              const dependency = localCssImport(node.params, file)
              const isConditional = Boolean(
                dependency.modifier &&
                  !/^layer(?:\([a-zA-Z0-9_.-]+\))?$/.test(dependency.modifier)
              )
              if (mode === 'tokens' && isConditional) {
                loadReport(
                  'token-unsupported',
                  file,
                  node,
                  'Conditional token imports cannot be flattened into a single catalog'
                )
              }
              const unsupportedLayer =
                mode === 'tokens' &&
                dependency.modifier &&
                !isConditional &&
                dependency.modifier !== 'layer(sl-tokens)'
              if (unsupportedLayer)
                loadReport(
                  'token-unsupported',
                  file,
                  node,
                  'Token import layers must use layer(sl-tokens)'
                )
              const importedLayer = dependency.modifier === 'layer(sl-tokens)'
              const nestedImportLayer =
                mode === 'tokens' && importedLayer && inLayer
              if (nestedImportLayer)
                loadReport(
                  'token-unsupported',
                  file,
                  node,
                  'Nested token layers are not supported'
                )
              entries.push(
                ...(await load(
                  dependency.file,
                  mode,
                  [...chain, file],
                  constrained ||
                    isConditional ||
                    unsupportedLayer ||
                    nestedImportLayer,
                  inLayer || importedLayer
                ))
              )
            } catch (error) {
              loadReport('token-import', file, node, error.message)
            }
          } else if (node.type === 'decl') {
            const outsideRoot =
              mode === 'tokens' &&
              (node.parent.type !== 'rule' || node.parent.selector !== ':root')
            if (outsideRoot)
              loadReport(
                'token-unsupported',
                file,
                node,
                'Token declarations must be inside :root'
              )
            entries.push({
              file,
              node,
              conditional: constrained || outsideRoot,
              selected,
              layered: inLayer,
            })
          } else if (node.nodes) {
            const unsupported =
              mode === 'tokens' &&
              ((node.type === 'atrule' &&
                (node.name.toLowerCase() !== 'layer' ||
                  node.params !== 'sl-tokens')) ||
                (node.type === 'rule' && node.selector !== ':root'))
            if (unsupported)
              loadReport(
                'token-unsupported',
                file,
                node,
                'The catalog supports unconditional :root declarations and @layer sl-tokens wrappers only'
              )
            const wrapsLayer =
              node.type === 'atrule' && node.name.toLowerCase() === 'layer'
            const nestedLayer = mode === 'tokens' && wrapsLayer && inLayer
            if (nestedLayer)
              loadReport(
                'token-unsupported',
                file,
                node,
                'Nested token layers are not supported'
              )
            await visit(
              node,
              constrained || unsupported || nestedLayer,
              inLayer || wrapsLayer
            )
          }
        }
      }
      await visit(ast)
      return entries
    }
    const catalog = new Map()
    const tokenEntries = await load(`${directory}/tokens.css`, 'tokens')
    for (const entry of tokenEntries) {
      const { file, node, conditional } = entry
      if (!node.prop.startsWith('--')) {
        report(
          'token-declaration',
          file,
          node,
          'Token files must contain custom property declarations only'
        )
        continue
      }
      if (!tokenName.test(node.prop))
        report(
          'token-name',
          file,
          node,
          `Expected a --sl- token in kebab-case: ${node.prop}`
        )
      if (!node.value.replace(/\/\*[\s\S]*?\*\//g, '').trim())
        report(
          'token-empty',
          file,
          node,
          `Token ${node.prop} has an empty value`
        )
      if (node.important)
        report(
          'token-unsupported',
          file,
          node,
          '!important token declarations need cascade evaluation and are not supported'
        )
      // Only one named layer is accepted. Unlayered normal declarations beat
      // layered normal declarations regardless of import/source order.
      const previous = catalog.get(node.prop)
      if (!conditional && (!entry.layered || !previous || previous.layered))
        catalog.set(node.prop, entry)
    }
    const parsed = new Map()
    const parseRefs = (entry) => {
      try {
        return references(entry.node.value)
      } catch (error) {
        report('token-unsupported', entry.file, entry.node, error.message)
        return []
      }
    }
    for (const variable of variableContracts.variables) {
      const entry = catalog.get(variable.name)
      if (entry)
        report(
          'component-variable',
          entry.file,
          entry.node,
          `Component variable ${variable.name} must not also be declared as a global theme token`
        )
    }
    for (const [token, entry] of catalog) parsed.set(token, parseRefs(entry))
    const reportedCycles = new Set()
    const complete = new Set()
    const checkCycle = (token, chain = []) => {
      const repeated = chain.indexOf(token)
      if (repeated >= 0) {
        const members = [...new Set(chain.slice(repeated))].sort()
        const key = members.join('|')
        if (!reportedCycles.has(key)) {
          reportedCycles.add(key)
          const entry = catalog.get(token)
          report(
            'token-cycle',
            entry.file,
            entry.node,
            `Cyclic token aliases: ${[...chain.slice(repeated), token].join(' -> ')}`
          )
        }
        return
      }
      if (complete.has(token)) return
      for (const reference of allReferences(parsed.get(token) ?? [])) {
        if (catalog.has(reference)) checkCycle(reference, [...chain, token])
      }
      complete.add(token)
    }
    for (const token of [...catalog.keys()].sort()) checkCycle(token)
    const missingReferences = (refs, known, entry, component = false) => {
      for (const ref of refs) {
        if (component && !ref.name.startsWith('--sl-')) {
          if (ref.fallback) missingReferences(ref.fallback, known, entry, true)
          continue
        }
        if (!tokenName.test(ref.name))
          report(
            'token-name',
            entry.file,
            entry.node,
            `Expected a --sl- variable reference: ${ref.name}`
          )
        if (!known.has(ref.name)) {
          if (ref.fallback === null)
            report(
              'token-reference',
              entry.file,
              entry.node,
              `Unresolved variable ${ref.name} in ${entry.node.prop}`
            )
          else missingReferences(ref.fallback, known, entry, component)
        }
      }
    }
    for (const [token, entry] of catalog)
      missingReferences(parsed.get(token), catalog, entry)
    // Private variables are file-local. Cross-component/runtime producers need
    // an explicit, verified variable contract; they never enter the global
    // token catalog. Selector inheritance still requires browser coverage.
    let componentEntries = []
    if (checkComponents)
      try {
        await themePathInfo(root, `${directory}/components`)
        componentEntries = await load(
          `${directory}/components/index.css`,
          'components'
        )
        for (const file of selectedFiles) {
          if (
            file.startsWith(`${directory}/components/`) &&
            file.endsWith('.css') &&
            !files.has(file)
          ) {
            componentEntries.push(...(await load(file, 'components')))
          }
        }
      } catch (error) {
        if (error.code !== 'ENOENT')
          report('token-input', `${directory}/components`, null, error.message)
      }
    const foundationEntries = []
    if (checkComponents)
      for (const foundation of ['base.css', 'reset.css']) {
        const file = `${directory}/${foundation}`
        try {
          await themePathInfo(root, file)
          foundationEntries.push(...(await load(file, 'foundations')))
        } catch (error) {
          // Tokens-only fixtures/catalogs need not be complete themes. The
          // separate theme integrity check owns required public entry points.
          if (error.code !== 'ENOENT')
            report('token-input', file, null, error.message)
        }
      }
    const styleEntries = [...componentEntries, ...foundationEntries]
    const localVariables = new Map()
    for (const { file, node } of styleEntries) {
      if (node.prop.startsWith('--')) {
        if (!localVariables.has(file)) localVariables.set(file, new Set())
        localVariables.get(file).add(node.prop)
      }
    }
    const knownFor = (file) => {
      const known = new Set([
        ...catalog.keys(),
        ...(localVariables.get(file) ?? []),
      ])
      for (const variable of variableContracts.variables) {
        if (
          variable.consumers.includes(file) &&
          variable.providers.every(
            (provider) =>
              provider.kind === 'jsx-style' ||
              localVariables.get(provider.file)?.has(variable.name)
          )
        )
          known.add(variable.name)
      }
      return known
    }
    for (const entry of styleEntries) {
      if (!entry.selected) continue
      missingReferences(parseRefs(entry), knownFor(entry.file), entry, true)
    }
    for (const { file, properties } of sourceEntries) {
      const component = file.slice(sourceRoot.length).split('/')[0]
      const known = new Set(catalog.keys())
      for (const [cssFile, variables] of localVariables)
        if (cssFile.endsWith(`/components/${component}.css`))
          for (const variable of variables) known.add(variable)
      for (const property of properties)
        if (property.name.startsWith('--sl-')) known.add(property.name)
      for (const property of properties) {
        if (property.value === undefined) continue
        const entry = {
          file,
          node: {
            prop: property.name,
            value: property.value,
            source: { start: { line: property.line } },
          },
        }
        missingReferences(parseRefs(entry), known, entry, true)
      }
    }
    summaries.push({
      name,
      files: [...files].sort(),
      tokens: [...catalog]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([token, { node, file }]) => ({
          name: token,
          value: node.value,
          path: file,
          line: node.source.start.line,
        })),
      componentDeclarations: componentEntries.filter((entry) => entry.selected)
        .length,
      foundationDeclarations: foundationEntries.filter(
        (entry) => entry.selected
      ).length,
    })
  }
  const unique = new Map(
    diagnostics.map((item) => [JSON.stringify(item), item])
  )
  return {
    themes: summaries,
    componentVariables: {
      inputs: variableContracts.inputs,
      variables: variableContracts.variables.map((variable) => ({
        name: variable.name,
        providers: variable.providers,
        consumers: variable.consumers,
        reason: variable.reason,
      })),
    },
    diagnostics: [...unique.values()].sort(
      (a, b) =>
        a.path.localeCompare(b.path) ||
        a.line - b.line ||
        a.rule.localeCompare(b.rule) ||
        a.message.localeCompare(b.message)
    ),
  }
}
