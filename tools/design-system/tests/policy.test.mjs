import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, symlink, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { checkPolicy } from '../policy.mjs'

const COMPONENT = 'packages/shoreline/src/components/button/button.tsx'
const CSS = 'packages/shoreline/src/components/button/button.css'
const THEME = 'packages/shoreline/src/themes/sunrise'

async function fixture(t, contents) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'shoreline-policy-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  for (const [file, value] of Object.entries(contents)) {
    await mkdir(path.dirname(path.join(root, file)), { recursive: true })
    await writeFile(path.join(root, file), value)
  }
  return root
}

function rules(diagnostics) {
  return diagnostics.map((diagnostic) => diagnostic.rule)
}

test('finds deep sibling imports at every nesting depth and import form', async (t) => {
  const nested = 'packages/shoreline/src/components/button/internal/nested.ts'
  const root = await fixture(t, {
    [nested]: `import { x } from '../../input/internal/x'
export { y } from '../../input/input'
import type { InputProps } from '../../input/input'
const dynamic = import('../../input/internal/x')
const commonjs = require('../../input/internal/x')
import legacy = require('../../input/internal/x')
import { absolute } from '@vtex/shoreline/src/components/input/internal/x'
`,
  })
  const result = await checkPolicy({ root, files: [nested] })
  assert.equal(result.length, 7)
  assert.ok(
    result.every((diagnostic) => diagnostic.rule === 'component-deep-import')
  )
  assert.deepEqual(
    result.map((diagnostic) => diagnostic.line),
    [1, 2, 3, 4, 5, 6, 7]
  )
})

test('allows sibling barrels, same-component internals and comments', async (t) => {
  const root = await fixture(t, {
    [COMPONENT]: `import { Input } from '../input'
import { InputProps } from '../input/index'
export { InputOptions } from '../input/index.ts'
import { local } from './internal/local'
import { nested } from '../button/internal/nested'
// import { fake } from '../input/internal/fake'
const message = "require('../input/input')"
export const Example = () => <button className="fixed" style={{ color: 'var(--sl-color-text)', padding: 0, opacity: 0.5 }} />
`,
  })
  assert.deepEqual(await checkPolicy({ root, files: [COMPONENT] }), [])
})

test('forbids runtime application dependencies while allowing type-only imports', async (t) => {
  const root = await fixture(t, {
    [COMPONENT]: `import Link from 'next/link'
export { atom } from 'jotai'
const swr = import('swr/infinite')
const ui = require('@vtex/agentic-ui')
import type { NextConfig } from 'next'
import { type NextConfig as Configuration } from 'next'
export type { NextConfig as Config } from 'next'
import { addon } from 'next-addon'
`,
  })
  assert.deepEqual(
    rules(await checkPolicy({ root, files: [COMPONENT] })),
    Array(4).fill('component-app-dependency')
  )
})

test('ignores locally bound require functions', async (t) => {
  const root = await fixture(t, {
    [COMPONENT]: `const require = (message: string) => message
const result = require('next/link')`,
  })
  assert.deepEqual(await checkPolicy({ root, files: [COMPONENT] }), [])
})

test('reports literal inline styles and computed className but allows forwarding', async (t) => {
  const root = await fixture(t, {
    [COMPONENT]: `const Bad = () => <button className={active ? 'on' : 'off'} style={{ color: 'red', padding: 16, borderRadius: -2, width: 'var(--sl-width, 2rem)', '--foreign': '1px' }} />
const Good = (props) => <button className={props.className} style={{ color: 'currentColor', padding: 'var(--sl-space-2)', width: 0 }} />
const Direct = ({ className, style }) => <button className={className} style={style} />`,
  })
  const result = await checkPolicy({ root, files: [COMPONENT] })
  assert.equal(
    rules(result).filter((rule) => rule === 'component-inline-literal').length,
    5
  )
  assert.equal(
    rules(result).filter((rule) => rule === 'component-dynamic-classname')
      .length,
    1
  )
  assert.equal(
    rules(result).filter((rule) => rule === 'css-variable').length,
    1
  )
  assert.ok(result.every((diagnostic) => diagnostic.line === 1))
})

test('handles parenthesized style objects and interpolated class strings', async (t) => {
  const source =
    'const Bad = () => <button className={`button ${variant}`} style={({ padding: 3 } as CSSProperties)} />'
  const root = await fixture(t, { [COMPONENT]: source })
  assert.deepEqual(rules(await checkPolicy({ root, files: [COMPONENT] })), [
    'component-dynamic-classname',
    'component-inline-literal',
  ])
})

test('parses CSS declarations and inspects nested fallbacks without matching comments, content or URLs', async (t) => {
  const root = await fixture(t, {
    [CSS]: `/* color: #ff0000; padding: 19px; !important */
@layer sl-components {
  [data-sl-button] {
    color: var(--sl-color, rgb(1, 2, 3));
    padding: calc(var(--sl-space) + 2rem);
    border-radius: var(--sl-radius, var(--foreign-radius));
    --outside: var(--sl-space);
    display: flex !important;
    content: "#ff0000 19px var(--fake)";
    background-image: url("data:image/svg+xml,<svg fill='#aabbcc' width='32px'/>");
    margin: 0px 0rem -0em;
    padding-top: var(/* 32px */ --sl-space);
  }
}`,
  })
  const result = await checkPolicy({ root, files: [CSS] })
  assert.deepEqual(
    result.map(({ rule, line }) => [rule, line]),
    [
      ['css-literal', 4],
      ['css-literal', 5],
      ['css-variable', 6],
      ['css-variable', 7],
      ['css-important', 8],
    ]
  )
})

test('reports all scoped literal syntax including fallback hex and signed units', async (t) => {
  const root = await fixture(t, {
    [CSS]:
      '@layer sl-components { a { color: var(--sl-color, #abcdef); background: hsl(0 0% 0%); margin: -.5em; width: 1e2px; height: 20vh; top: 3vw; } }',
  })
  assert.deepEqual(
    rules(await checkPolicy({ root, files: [CSS] })),
    Array(6).fill('css-literal')
  )
})

test('modern color functions, named CSS colors and absolute/font/viewport/container lengths require tokens', async (t) => {
  const root = await fixture(t, {
    [CSS]: `@layer sl-components { a {
      color: rebeccapurple;
      border-color: /* inherited literal */ red;
      background: oklch(80% 0.1 20);
      outline-color: color(display-p3 1 0 0);
      box-shadow: 0 0 lab(50% 30 40);
      margin: 12pt;
      padding: 1ch;
      width: 80dvw;
      height: 20cqh;
      font-size: 1cap;
      line-height: 1rlh;
      content: "red oklch(80% 0.1 20) 1ch";
      background-image: url("red-1ch.svg");
      color: currentColor;
      border-color: transparent;
      margin: 0pt;
    } }`,
  })
  const diagnostics = await checkPolicy({ root, files: [CSS] })
  assert.deepEqual(rules(diagnostics), Array(11).fill('css-literal'))
  assert.deepEqual(
    diagnostics.map((item) => item.line),
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  )
})

test('checks layers on declarations rather than accepting an unrelated layer declaration', async (t) => {
  const root = await fixture(t, {
    [CSS]: `@layer sl-components;
[data-sl-button] { color: var(--sl-text); }
@layer sl-tokens { [data-sl-button] { padding: var(--sl-space); } }
@layer sl-components { @media (min-width: 1px) { [data-sl-button] { color: var(--sl-text); } } }`,
  })
  const result = await checkPolicy({ root, files: [CSS] })
  assert.deepEqual(
    result.map(({ rule, line }) => [rule, line]),
    [
      ['css-layer', 2],
      ['css-layer', 3],
    ]
  )
})

test('accepts legacy theme styles only with a verified layered import chain', async (t) => {
  const themeFile = `${THEME}/components/button.css`
  const root = await fixture(t, {
    [`${THEME}/styles.css`]:
      '@import "components/index.css" layer(sl-components);',
    [`${THEME}/components/index.css`]: '@import "button.css";',
    [themeFile]: '[data-sl-button] { color: var(--sl-text); }',
  })
  assert.deepEqual(await checkPolicy({ root, files: [themeFile] }), [])
  await writeFile(
    path.join(root, `${THEME}/components/index.css`),
    '/* @import "button.css"; */'
  )
  assert.deepEqual(rules(await checkPolicy({ root, files: [themeFile] })), [
    'css-layer',
  ])
})

test('does not hang on CSS import cycles or accept unlayered theme imports', async (t) => {
  const themeFile = `${THEME}/components/button.css`
  const root = await fixture(t, {
    [`${THEME}/styles.css`]: '@import "components/index.css";',
    [`${THEME}/components/index.css`]:
      '@import "../styles.css"; @import "button.css";',
    [themeFile]: '[data-sl-button] { color: var(--sl-text); }',
  })
  assert.deepEqual(rules(await checkPolicy({ root, files: [themeFile] })), [
    'css-layer',
  ])
})

test('fails closed on syntax errors and missing targeted files', async (t) => {
  const root = await fixture(t, {
    [COMPONENT]: 'export const = ;',
    [CSS]: 'button { color: red;',
  })
  const result = await checkPolicy({
    root,
    files: [COMPONENT, CSS, COMPONENT.replace('button.tsx', 'missing.tsx')],
  })
  assert.equal(result.filter(({ rule }) => rule === 'policy-input').length, 1)
  assert.ok(result.filter(({ rule }) => rule === 'policy-parse').length >= 2)
})

test('checks only explicit runtime component files and returns deterministic diagnostics', async (t) => {
  const root = await fixture(t, {
    [COMPONENT]: "import Link from 'next/link'",
    [CSS]: 'a { color: #000; }',
  })
  const ignored = [
    'packages/docs/pages/index.tsx',
    'packages/shoreline/src/components/button/stories/show.stories.tsx',
    'packages/shoreline/src/components/button/tests/button.test.tsx',
    'packages/shoreline/src/components/button/button.spec.tsx',
    'packages/shoreline/src/themes/sunrise/tokens.css',
  ]
  assert.deepEqual(await checkPolicy({ root, files: ignored }), [])
  assert.equal((await checkPolicy({ root, files: [COMPONENT] })).length, 1)
  const first = await checkPolicy({ root, files: [CSS, COMPONENT, CSS] })
  assert.deepEqual(first, await checkPolicy({ root, files: [COMPONENT, CSS] }))
  assert.ok(
    first.every(
      (item) => Object.keys(item).sort().join(',') === 'line,message,path,rule'
    )
  )
})

test('rejects parent traversal, absolute inputs, and symlinks outside root', async (t) => {
  const root = await fixture(t, {})
  const outside = await fixture(t, {
    'external.tsx': "import Link from 'next/link'",
  })
  await mkdir(path.dirname(path.join(root, COMPONENT)), { recursive: true })
  await symlink(path.join(outside, 'external.tsx'), path.join(root, COMPONENT))
  const result = await checkPolicy({
    root,
    files: [COMPONENT, '../external.tsx', path.join(outside, 'external.tsx')],
  })
  assert.deepEqual(rules(result), Array(3).fill('policy-input'))
})
