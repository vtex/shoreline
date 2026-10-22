import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  defaultTheme,
  type ThemeName,
  themeEntries,
  themeExports,
  themeStyleEntries,
  themes,
} from '../themes'

/**
 * Theme contract
 *
 * Themes are complete, standalone token files that share the component
 * stylesheets. This test keeps them compatible:
 *
 * 1. every theme directory is registered and ships every entry file;
 * 2. every token declared by the default theme is declared by every theme,
 *    and the additions of a theme are the documented ones;
 * 3. every `var(--sl-*)` consumed by the component stylesheets resolves in
 *    every theme (to a token, a local declaration or a runtime variable);
 * 4. `package.json` exposes the same public entries for every theme.
 */

const themesRoot = path.resolve(__dirname, '..')
const packageRoot = path.resolve(themesRoot, '../..')
const componentsRoot = path.resolve(packageRoot, 'src/components')

/**
 * Token names a theme adds on top of the default theme. Adding a token to a
 * theme means adding it here too, which keeps the vocabulary an explicit
 * decision. The default theme has no additions by definition.
 */
const expectedAdditions: Record<ThemeName, readonly string[]> = {
  sunrise: [],
  horizon: [
    '--sl-radius-4',
    '--sl-font-weight-bold',
    '--sl-shadow-3',
    '--sl-shadow-4',
    '--sl-shadow-5',
    '--sl-overlay-bg',
  ],
}

/**
 * Custom properties written by components at runtime (through `style`), not
 * by any stylesheet. Each one must still be set somewhere in `src/components`.
 */
const runtimeVariables = [
  '--sl-toast-index',
  '--sl-table-grid-template-columns',
]

/**
 * References in the shared component stylesheets that no theme declares.
 * Known debt: fixing them changes rendered output and needs its own visual
 * review (spec 002-horizon-theme, NG-005). Remove an entry once it is fixed;
 * the test fails if an entry is no longer undefined.
 */
const knownUndefinedReferences = [
  '--sl-base',
  '--sl-color-fg-base',
  '--sl-text-body-spacing',
  '--sl-modal-header-padding-small',
  '--sl-modal-header-padding-medium',
  '--sl-modal-header-padding-large',
]

/**
 * Horizon identity: values taken from the AI Workspace reference
 * (vtex/admin-platform `ai-workspace/shell/app/theme.css`).
 */
const horizonValues: Record<string, string> = {
  '--sl-radius-1': '0.5rem',
  '--sl-radius-2': '0.75rem',
  '--sl-radius-3': '1rem',
  '--sl-radius-4': '1.5rem',
  '--sl-color-gray-1': '#f5f8fc',
  '--sl-color-gray-11': '#0a1524',
  '--sl-color-gray-12': '#040e1b',
  '--sl-color-blue-10': '#1e4ee5',
  '--sl-fg-base-soft': 'var(--sl-color-gray-8)',
  '--sl-fg-muted': 'var(--sl-color-gray-10)',
  '--sl-shadow-2': '0 1px 3px 0 rgb(0 0 0 / 0.08)',
  '--sl-font-weight-bold': '700',
  '--sl-overlay-bg': 'rgba(0, 0, 0, 0.6)',
}

function stripComments(css: string) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '')
}

function readCss(file: string) {
  return stripComments(readFileSync(file, 'utf8'))
}

function listCssFiles(dir: string): string[] {
  if (!existsSync(dir)) return []

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name)

    if (entry.isDirectory()) return listCssFiles(file)

    return entry.name.endsWith('.css') ? [file] : []
  })
}

/**
 * Resolves the local `@import` graph of a stylesheet and returns the files in
 * import order (the file itself last), without duplicates.
 */
function resolveImports(file: string, seen = new Set<string>()): string[] {
  if (seen.has(file)) return []

  seen.add(file)

  if (!existsSync(file)) {
    throw new Error(`Imported stylesheet does not exist: ${file}`)
  }

  const css = readCss(file)
  const imports = [
    ...css.matchAll(/@import\s+(?:url\()?["']([^"']+)["']\)?[^;]*;/g),
  ].map((match) => path.resolve(path.dirname(file), match[1]))

  return [
    ...imports.flatMap((imported) => resolveImports(imported, seen)),
    file,
  ]
}

function parseImports(file: string) {
  return [...readCss(file).matchAll(/@import\s+["']([^"']+)["']([^;]*);/g)].map(
    (match) => ({ target: match[1], modifier: match[2].trim() })
  )
}

/**
 * Collects the `--sl-*` declarations of a token stylesheet and its imports.
 * Token files may only contain `:root` rules, so every declaration is global.
 */
function collectTokens(tokensFile: string) {
  const tokens = new Map<string, string>()

  for (const file of resolveImports(tokensFile)) {
    const css = readCss(file).replace(/@import[^;]*;/g, '')
    const selectors = [...css.matchAll(/([^{};]+)\{/g)].map((match) =>
      match[1].trim()
    )

    expect(
      selectors,
      `${path.relative(packageRoot, file)} must only contain :root rules`
    ).toSatisfy((list: string[]) => list.every((s) => s === ':root'))

    expect(
      css,
      `${path.relative(packageRoot, file)} must not use @layer`
    ).not.toMatch(/@layer/)

    for (const match of css.matchAll(/(--sl-[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
      tokens.set(match[1], match[2].replace(/\s+/g, ' ').trim())
    }
  }

  return tokens
}

function themeDir(theme: string) {
  return path.join(themesRoot, theme)
}

function componentStylesheets(theme: ThemeName) {
  return [
    ...new Set([
      ...listCssFiles(path.join(themeDir(defaultTheme), 'components')),
      ...listCssFiles(path.join(themeDir(theme), 'components')),
    ]),
  ]
}

/**
 * Returns the `var(--sl-*)` references of the component stylesheets of a theme
 * that neither the theme tokens nor the stylesheets themselves declare.
 */
function unresolvedReferences(theme: ThemeName, tokens: Map<string, string>) {
  const files = componentStylesheets(theme)
  const declared = new Set<string>(tokens.keys())
  const references = new Map<string, Set<string>>()

  for (const file of files) {
    const css = readCss(file)

    for (const match of css.matchAll(/(--sl-[a-z0-9-]+)\s*:/gi)) {
      declared.add(match[1])
    }

    for (const match of css.matchAll(/var\(\s*(--sl-[a-z0-9-]+)/gi)) {
      const consumers = references.get(match[1]) ?? new Set<string>()
      consumers.add(path.relative(packageRoot, file))
      references.set(match[1], consumers)
    }
  }

  for (const variable of runtimeVariables) declared.add(variable)

  return [...references]
    .filter(([name]) => !declared.has(name))
    .map(([name, consumers]) => ({ name, consumers: [...consumers].sort() }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

const tokensByTheme = new Map<ThemeName, Map<string, string>>(
  themes.map((theme) => [
    theme,
    existsSync(path.join(themeDir(theme), 'tokens.css'))
      ? collectTokens(path.join(themeDir(theme), 'tokens.css'))
      : new Map<string, string>(),
  ])
)

describe('theme registry', () => {
  it('registers every theme directory exactly once', () => {
    const directories = readdirSync(themesRoot, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          existsSync(path.join(themesRoot, entry.name, 'tokens.css'))
      )
      .map((entry) => entry.name)
      .sort()

    expect(new Set(themes).size).toBe(themes.length)
    expect(directories).toEqual([...themes].sort())
    expect(themes).toContain(defaultTheme)
  })

  it.each(themes)('ships every entry file for the %s theme', (theme) => {
    const entries = [
      ...themeEntries.map(({ input }) => input),
      ...themeStyleEntries,
    ]

    for (const entry of entries) {
      const file = path.join(themeDir(theme), entry)

      expect(existsSync(file), `${theme}/${entry} is missing`).toBe(true)
      expect(statSync(file).size, `${theme}/${entry} is empty`).toBeGreaterThan(
        0
      )
    }
  })

  it.each(themes)(
    'imports the entries of the %s theme with the canonical layers',
    (theme) => {
      const layered = parseImports(path.join(themeDir(theme), 'styles.css'))
      const unlayered = parseImports(
        path.join(themeDir(theme), 'styles-unlayered.css')
      )

      expect(layered).toEqual(
        themeEntries.map(({ input, layer }) => ({
          target: input,
          modifier: `layer(${layer})`,
        }))
      )
      expect(unlayered).toEqual(
        themeEntries.map(({ input }) => ({ target: input, modifier: '' }))
      )
    }
  )

  it.each(themes)('reuses the shared foundations in the %s theme', (theme) => {
    for (const entry of ['reset', 'base']) {
      const files = resolveImports(path.join(themeDir(theme), `${entry}.css`))

      expect(files.map((file) => path.relative(packageRoot, file))).toContain(
        `src/foundations/${entry}.css`
      )
    }
  })
})

describe('token contract', () => {
  const defaultTokens = tokensByTheme.get(defaultTheme) as Map<string, string>

  it(`declares tokens in the ${defaultTheme} theme`, () => {
    expect(defaultTokens.size).toBeGreaterThan(200)
  })

  it.each(themes)(
    '%s declares every token of the default theme and only the documented additions',
    (theme) => {
      const tokens = tokensByTheme.get(theme) as Map<string, string>
      const missing = [...defaultTokens.keys()].filter(
        (name) => !tokens.has(name)
      )
      const additions = [...tokens.keys()].filter(
        (name) => !defaultTokens.has(name)
      )

      expect(missing, `${theme} is missing tokens`).toEqual([])
      expect(additions.sort()).toEqual([...expectedAdditions[theme]].sort())
    }
  )

  it.each(themes)(
    '%s declares every token referenced by the component stylesheets',
    (theme) => {
      const unresolved = unresolvedReferences(
        theme,
        tokensByTheme.get(theme) as Map<string, string>
      )
      const unknown = unresolved.filter(
        ({ name }) => !knownUndefinedReferences.includes(name)
      )

      expect(unknown, `${theme} leaves references unresolved`).toEqual([])
    }
  )

  it('keeps the known undefined references list accurate', () => {
    const stillUndefined = new Set(
      themes.flatMap((theme) =>
        unresolvedReferences(
          theme,
          tokensByTheme.get(theme) as Map<string, string>
        ).map(({ name }) => name)
      )
    )

    for (const name of knownUndefinedReferences) {
      expect(
        stillUndefined.has(name),
        `${name} is defined now; remove it from knownUndefinedReferences`
      ).toBe(true)
    }
  })

  it('sets every runtime variable from a component', () => {
    const sources = readdirSync(componentsRoot, { recursive: true })
      .map(String)
      .filter(
        (file) => /\.tsx?$/.test(file) && !/\.(test|stories)\./.test(file)
      )
      .map((file) => readFileSync(path.join(componentsRoot, file), 'utf8'))
      .join('\n')

    for (const variable of runtimeVariables) {
      expect(sources, `${variable} is not set by any component`).toContain(
        variable
      )
    }
  })

  it('uses the AI Workspace reference values in horizon', () => {
    const tokens = tokensByTheme.get('horizon') as Map<string, string>

    for (const [name, value] of Object.entries(horizonValues)) {
      expect(tokens.get(name), name).toBe(value)
    }
  })
})

describe('component overrides', () => {
  it.each(themes)(
    'registers every %s component stylesheet in components/index.css',
    (theme) => {
      const dir = path.join(themeDir(theme), 'components')
      const index = path.join(dir, 'index.css')
      const imported = parseImports(index).map(({ target }) =>
        path.resolve(dir, target)
      )

      for (const file of listCssFiles(dir)) {
        if (file === index) continue

        expect(
          imported,
          `${path.relative(packageRoot, file)} is not imported by ${theme}/components/index.css`
        ).toContain(file)
      }
    }
  )

  it.each(themes.filter((theme) => theme !== defaultTheme))(
    '%s imports the shared component styles before its overrides',
    (theme) => {
      const [first] = parseImports(
        path.join(themeDir(theme), 'components/index.css')
      )

      expect(first?.target).toBe(`../../${defaultTheme}/components/index.css`)
      expect(first?.modifier).toBe('')
    }
  )

  it.each(themes)(
    '%s component stylesheets use tokens instead of literal colors',
    (theme) => {
      for (const file of componentStylesheets(theme)) {
        const css = readCss(file)
        const name = path.relative(packageRoot, file)

        expect(css, `${name} contains a literal color`).not.toMatch(
          /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(/i
        )
        expect(css, `${name} must not use @layer`).not.toMatch(/@layer/)
      }
    }
  )
})

describe('package exports', () => {
  const manifest = JSON.parse(
    readFileSync(path.join(packageRoot, 'package.json'), 'utf8')
  ) as { exports: Record<string, unknown> }

  it.each(themes)('exposes the public entries of the %s theme', (theme) => {
    for (const [name, target] of Object.entries(themeExports(theme))) {
      expect(manifest.exports[name], name).toBe(target)
    }
  })

  it(`points the css entries at the ${defaultTheme} theme`, () => {
    const dist = `./dist/themes/${defaultTheme}`

    expect(manifest.exports['./css']).toBe(`${dist}/styles.css`)
    expect(manifest.exports['./css/unlayered']).toBe(
      `${dist}/styles-unlayered.css`
    )

    for (const { output } of themeEntries) {
      expect(manifest.exports[`./css/${output}`]).toBe(`${dist}/${output}.css`)
      expect(manifest.exports[`./css/${output}/unlayered`]).toBe(
        `${dist}/${output}-unlayered.css`
      )
    }
  })

  it('does not export themes that are not registered', () => {
    const exported = Object.keys(manifest.exports)
      .filter((name) => name.startsWith('./themes/'))
      .map((name) => name.split('/')[2])

    for (const theme of exported) {
      expect(themes, `${theme} is exported but not registered`).toContain(theme)
    }
  })
})
