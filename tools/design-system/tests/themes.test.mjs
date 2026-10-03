import assert from 'node:assert/strict'
import { appendFile, cp, mkdtemp, readFile, rm } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { checkPolicy } from '../policy.mjs'
import { checkTokens } from '../tokens.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const require = createRequire(join(root, 'package.json'))
const cssRequire = createRequire(join(root, 'packages/css/package.json'))
const { bundle } = cssRequire('lightningcss')
const { parse } = require('postcss')
const themes = join(root, 'packages/shoreline/src/themes')

function bundled(theme, entry) {
  return bundle({
    filename: join(themes, theme, entry),
    minify: false,
  }).code.toString()
}

function tokens(css) {
  const values = new Map()
  parse(css).walkRules(':root', (rule) => {
    rule.walkDecls(/^--sl-/, (declaration) => {
      values.set(declaration.prop, declaration.value)
    })
  })
  return values
}

test('Horizon inherits all Sunrise tokens and only the selected source foundations', () => {
  const sunrise = tokens(bundled('sunrise', 'tokens.css'))
  const workspace = tokens(bundled('horizon', 'tokens.css'))
  const foundations = tokens(bundled('horizon', 'tokens-foundations.css'))
  const newTokens = [...workspace.keys()]
    .filter((name) => !sunrise.has(name))
    .sort()
  assert.deepEqual(newTokens, [
    '--sl-font-weight-bold',
    '--sl-overlay-bg',
    '--sl-radius-4',
    '--sl-shadow-3',
    '--sl-shadow-4',
    '--sl-shadow-5',
  ])

  for (const [name, value] of sunrise) {
    assert.equal(workspace.get(name), foundations.get(name) ?? value, name)
  }
  for (const [name, value] of foundations) {
    assert.match(
      name,
      /^--sl-(radius-|color-(gray|blue)-|bg-muted|fg-muted|fg-base-(soft|disabled)$|font-weight-bold$|shadow-|overlay-bg$)/
    )
    assert.equal(workspace.get(name), value, name)
  }
  assert.equal(workspace.get('--sl-radius-1'), '.5rem')
  assert.equal(workspace.get('--sl-radius-4'), '1.5rem')
  assert.equal(workspace.get('--sl-color-gray-1'), '#f5f8fc')
  assert.equal(workspace.get('--sl-color-blue-10'), '#1e4ee5')
  assert.equal(workspace.get('--sl-fg-base-disabled'), 'var(--sl-color-gray-5)')
  assert.equal(workspace.get('--sl-font-weight-bold'), '700')
  assert.equal(workspace.get('--sl-overlay-bg'), '#0009')
  assert.equal(workspace.get('--sl-z-4'), '300')
  assert.equal(workspace.has('--sl-z-canvas-panel'), false)
  assert.equal(workspace.has('--sl-sidebar-bg'), false)
  assert.equal(workspace.has('--sl-composer-min-width'), false)
  assert.equal(workspace.has('--sl-bg-strong-disabled'), false)

  // Global defaults come from theme-independent foundations. Horizon's
  // component index can add reviewed rules after its inherited Sunrise inputs.
  for (const entry of ['base.css', 'reset.css']) {
    assert.equal(bundled('horizon', entry), bundled('sunrise', entry))
  }
  const inheritedSelectors = new Set()
  parse(bundled('horizon', 'components/index.css')).walkRules((rule) => {
    inheritedSelectors.add(rule.selector)
  })
  parse(bundled('sunrise', 'components/index.css')).walkRules((rule) => {
    assert.ok(inheritedSelectors.has(rule.selector), rule.selector)
  })
})

test('shared foundations stay independent of theme inputs and token values', async () => {
  for (const entry of ['base.css', 'reset.css']) {
    const css = parse(
      await readFile(
        join(root, 'packages/shoreline/src/foundations', entry),
        'utf8'
      )
    )
    css.walkAtRules('import', (rule) => {
      assert.doesNotMatch(rule.params, /themes\//)
    })
    css.walkAtRules('layer', () => {
      assert.fail('Theme entrypoints own cascade layers')
    })
    css.walkDecls(/^--sl-/, () => {
      assert.fail(
        'Theme token values do not belong in shared reset/base sources'
      )
    })
  }
})

test('a foundation change reaches both complete themes once in its intended layer', async (t) => {
  const fixture = await mkdtemp(join(tmpdir(), 'shoreline-foundations-'))
  t.after(() => rm(fixture, { recursive: true, force: true }))
  await cp(themes, join(fixture, 'themes'), { recursive: true })
  await cp(
    join(root, 'packages/shoreline/src/foundations'),
    join(fixture, 'foundations'),
    { recursive: true }
  )
  for (const [entry, layer] of [
    ['base.css', 'sl-base'],
    ['reset.css', 'sl-reset'],
  ]) {
    const selector = `[data-foundation-probe="${layer}"]`
    await appendFile(
      join(fixture, 'foundations', entry),
      `\n${selector} { display: block; }\n`
    )
    for (const theme of ['sunrise', 'horizon']) {
      for (const isLayered of [true, false]) {
        const css = bundle({
          filename: join(
            fixture,
            'themes',
            theme,
            isLayered ? 'styles.css' : 'styles-unlayered.css'
          ),
        }).code.toString()
        const matches = []
        parse(css).walkRules(selector, (rule) => matches.push(rule))
        assert.equal(matches.length, 1, `${theme}/${entry}: exactly one source`)
        const layers = []
        for (let parent = matches[0].parent; parent; parent = parent.parent) {
          if (parent.type === 'atrule' && parent.name === 'layer') {
            layers.unshift(parent.params)
          }
        }
        assert.deepEqual(layers, isLayered ? [layer] : [])
      }
    }
  }
})

test('Horizon entrypoints keep tokens and components inside one intended layer', () => {
  const layered = bundled('horizon', 'styles.css')
  const unlayered = bundled('horizon', 'styles-unlayered.css')
  assert.deepEqual(tokens(layered), tokens(unlayered))

  for (const [css, isLayered] of [
    [layered, true],
    [unlayered, false],
  ]) {
    let rootTokens = 0
    let componentRules = 0
    parse(css).walkRules((rule) => {
      const layers = []
      for (let parent = rule.parent; parent; parent = parent.parent) {
        if (parent.type === 'atrule' && parent.name === 'layer') {
          layers.unshift(parent.params)
        }
      }
      if (rule.selector === ':root') {
        assert.deepEqual(layers, isLayered ? ['sl-tokens'] : [])
        rootTokens += 1
      } else if (rule.selector.includes('[data-sl-')) {
        assert.deepEqual(layers, isLayered ? ['sl-components'] : [])
        componentRules += 1
      }
    })
    assert.ok(rootTokens > 0)
    assert.ok(componentRules > 0)
    if (!isLayered) assert.doesNotMatch(css, /@layer/)
  }
})

test('modal, table, empty-state and radio styles resolve their tokens in every theme', async () => {
  const files = ['modal', 'table', 'empty-state', 'radio'].map(
    (name) => `packages/shoreline/src/themes/sunrise/components/${name}.css`
  )
  const report = await checkTokens({ root, componentFiles: files })
  assert.deepEqual(report.diagnostics, [])
  assert.deepEqual(await checkPolicy({ root, files }), [])
})

test('CSS exports retain Sunrise defaults and expose the same ten Horizon entrypoints', async () => {
  const { exports: exportsMap } = JSON.parse(
    await readFile(join(root, 'packages/shoreline/package.json'), 'utf8')
  )
  const entrypoints = {
    '': 'styles.css',
    '/unlayered': 'styles-unlayered.css',
    '/tokens': 'tokens.css',
    '/tokens/unlayered': 'tokens-unlayered.css',
    '/reset': 'reset.css',
    '/reset/unlayered': 'reset-unlayered.css',
    '/base': 'base.css',
    '/base/unlayered': 'base-unlayered.css',
    '/components': 'components.css',
    '/components/unlayered': 'components-unlayered.css',
  }
  for (const [entry, filename] of Object.entries(entrypoints)) {
    assert.equal(
      exportsMap[`./css${entry}`],
      `./dist/themes/sunrise/${filename}`
    )
    for (const theme of ['sunrise', 'horizon']) {
      assert.equal(
        exportsMap[`./themes/${theme}${entry}`],
        `./dist/themes/${theme}/${filename}`
      )
    }
  }
})
