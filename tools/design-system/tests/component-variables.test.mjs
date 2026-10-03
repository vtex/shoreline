import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import {
  checkComponentVariables,
  inlineStyleProperties,
  variableContractsPath,
} from '../component-variables.mjs'
import { checkTokens } from '../tokens.mjs'

const theme = 'packages/shoreline/src/themes/sample'
const component = 'packages/shoreline/src/components/example/example.tsx'
const css = `${theme}/components/example.css`
const cssProducer = `${theme}/components/provider.css`
const runtimeContract = {
  name: '--sl-example-index',
  reason: 'The component provides its runtime position, not a theme token.',
  providers: [{ kind: 'jsx-style', file: component, element: 'Example' }],
  consumers: [css],
}

async function fixture(t, files = {}, variables = [runtimeContract]) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'shoreline-variables-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const write = async (file, value) => {
    await mkdir(path.dirname(path.join(root, file)), { recursive: true })
    await writeFile(path.join(root, file), value)
  }
  for (const [file, value] of Object.entries({
    [`${theme}/tokens.css`]: ':root { --sl-color: red; }',
    [`${theme}/components/index.css`]: '@import "example.css";',
    [component]:
      'const Render = ({ index }) => <Example style={{ "--sl-example-index": index } as CSSProperties} />',
    [css]: '[data-sl-example] { z-index: var(--sl-example-index); }',
    [variableContractsPath]: JSON.stringify({ schemaVersion: 1, variables }),
    ...files,
  }))
    await write(file, value)
  return { root, write }
}

test('runtime contracts verify concrete JSX producers and stay out of the token catalog', async (t) => {
  const { root } = await fixture(t)
  const report = await checkTokens({ root, componentFiles: 'all' })
  assert.deepEqual(report.diagnostics, [])
  assert.deepEqual(
    report.themes[0].tokens.map((token) => token.name),
    ['--sl-color']
  )
  assert.equal(
    report.componentVariables.variables[0].name,
    runtimeContract.name
  )
  for (const input of [variableContractsPath, component, css])
    assert.ok(report.componentVariables.inputs.includes(input))
})

test('registered component variables cannot silently become global theme tokens', async (t) => {
  const { root } = await fixture(t, {
    [`${theme}/tokens.css`]: ':root { --sl-example-index: 0; }',
  })
  const report = await checkTokens({ root, componentFiles: 'all' })
  assert.equal(report.diagnostics.length, 1)
  assert.equal(report.diagnostics[0].rule, 'component-variable')
  assert.match(report.diagnostics[0].message, /global theme token/)
})

test('comments, unrelated objects and the wrong JSX element cannot impersonate a runtime producer', async (t) => {
  for (const source of [
    '// <Example style={{ "--sl-example-index": index }} />',
    'const unused = { "--sl-example-index": 1 }',
    'const Render = () => <Other style={{ "--sl-example-index": index }} />',
  ]) {
    const { root } = await fixture(t, { [component]: source })
    const report = await checkTokens({ root, componentFiles: 'all' })
    assert.ok(
      report.diagnostics.some((item) => item.rule === 'component-variable')
    )
    assert.ok(
      report.diagnostics.some((item) => item.rule === 'token-reference')
    )
  }
})

test('removing a producer or consumer invalidates its contract', async (t) => {
  const { root, write } = await fixture(t)
  await write(css, '[data-sl-example] { color: var(--sl-color); }')
  assert.match(
    (await checkComponentVariables(root)).diagnostics[0].message,
    /Consumer no longer references/
  )
  await rm(path.join(root, component))
  assert.ok(
    (await checkComponentVariables(root)).diagnostics.some(
      (item) => item.path === component
    )
  )
})

test('a runtime contract is confined to its declared consumers', async (t) => {
  const other = `${theme}/components/other.css`
  const { root } = await fixture(t, {
    [`${theme}/components/index.css`]:
      '@import "example.css"; @import "other.css";',
    [other]: '[data-sl-other] { z-index: var(--sl-example-index); }',
  })
  const report = await checkTokens({ root, componentFiles: 'all' })
  assert.equal(report.diagnostics.length, 1)
  assert.equal(report.diagnostics[0].path, other)
  assert.equal(report.diagnostics[0].rule, 'token-reference')
})

test('shared CSS variables require both a declaration and a provider loaded in the consuming theme', async (t) => {
  const { root, write } = await fixture(
    t,
    {
      [cssProducer]: '[data-sl-provider] { --sl-example-index: 1; }',
      [`${theme}/components/index.css`]:
        '@import "provider.css"; @import "example.css";',
    },
    [
      {
        ...runtimeContract,
        providers: [{ kind: 'css-declaration', file: cssProducer }],
      },
    ]
  )
  assert.deepEqual(
    (await checkTokens({ root, componentFiles: 'all' })).diagnostics,
    []
  )
  await write(`${theme}/components/index.css`, '@import "example.css";')
  const unavailable = await checkTokens({ root, componentFiles: 'all' })
  assert.deepEqual(
    unavailable.diagnostics.map((item) => item.rule),
    ['token-reference']
  )
  await write(cssProducer, '/* --sl-example-index: 1; */')
  assert.match(
    (await checkComponentVariables(root)).diagnostics[0].message,
    /Producer no longer declares/
  )
})

test('unrelated private declarations cannot authorize a component reference', async (t) => {
  const { root } = await fixture(
    t,
    {
      [cssProducer]: '[data-sl-provider] { --sl-example-index: 1; }',
      [`${theme}/components/index.css`]:
        '@import "provider.css"; @import "example.css";',
    },
    []
  )
  const report = await checkTokens({ root, componentFiles: 'all' })
  assert.equal(report.diagnostics.length, 1)
  assert.equal(report.diagnostics[0].path, css)
})

test('variable contract schemas reject ambiguous names, duplicate entries and escaped paths', async (t) => {
  for (const variables of [
    [{ ...runtimeContract, name: '--other' }],
    [{ ...runtimeContract, consumers: ['../outside.css'] }],
    [{ ...runtimeContract, providers: [{ kind: 'magic', file: component }] }],
    [
      {
        ...runtimeContract,
        providers: [{ kind: 'jsx-style', file: component }],
      },
    ],
    [{ ...runtimeContract, consumers: [css, css] }],
    [runtimeContract, runtimeContract],
  ]) {
    const { root } = await fixture(t, {}, variables)
    assert.ok((await checkComponentVariables(root)).diagnostics.length > 0)
  }
})

test('JSX style references are checked against each theme, including the style utility', async (t) => {
  const source = `import { style as asStyle } from '@vtex/shoreline-utils'
const Render = () => <Example style={asStyle({ color: 'var(--sl-color)', padding: 'var(--sl-new)' })} />`
  const { root } = await fixture(
    t,
    {
      [component]: source,
      [css]: '[data-sl-example] { color: var(--sl-color); }',
      'packages/shoreline/src/themes/other/tokens.css':
        ':root { --sl-color: blue; --sl-new: 1rem; }',
    },
    []
  )
  const report = await checkTokens({ root, componentFiles: [component] })
  assert.equal(report.diagnostics.length, 1)
  assert.equal(report.diagnostics[0].path, component)
  assert.equal(report.diagnostics[0].line, 2)
  assert.match(report.diagnostics[0].message, /sample.*--sl-new/)
})

test('inline extraction ignores arbitrary objects and supports only documented concrete forms', () => {
  const source = `const fake = { color: 'var(--sl-absent)' }
const Render = () => <Example style={{ color: 'var(--sl-color)', padding: spacing, ...rest } as CSSProperties} />`
  const report = inlineStyleProperties(component, source)
  assert.deepEqual(report.diagnostics, [])
  assert.deepEqual(
    report.properties.map(({ name, value }) => [name, value]),
    [
      ['color', 'var(--sl-color)'],
      ['padding', undefined],
    ]
  )
})

test('malformed source fails validation rather than hiding inline references', async (t) => {
  const { root } = await fixture(
    t,
    { [component]: 'const Render = () => <Example style={{' },
    []
  )
  const report = await checkTokens({ root, componentFiles: [component] })
  assert.ok(
    report.diagnostics.some((item) => item.rule === 'token-source-parse')
  )
})
