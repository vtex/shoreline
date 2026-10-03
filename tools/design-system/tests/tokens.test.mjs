import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, symlink, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { checkTokens } from '../tokens.mjs'
import { themeSnapshot, themesRoot } from '../themes.mjs'

async function fixture(t, files) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'shoreline-tokens-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const write = async (file, content) => {
    const target = path.join(root, themesRoot, file)
    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, content)
  }
  for (const [file, content] of Object.entries(files))
    await write(file, content)
  return { root, write }
}

const rules = (report) => report.diagnostics.map((item) => item.rule)

test('token catalogs discover arbitrary themes and resolve imports, aliases and literal foundations', async (t) => {
  const { root } = await fixture(t, {
    'sunrise/tokens.css':
      '@layer sl-tokens { :root { --sl-color-base: #fff; --sl-gap: 8px; } }',
    'aurora/tokens.css':
      '@import "../sunrise/tokens.css"; @layer sl-tokens { :root { --sl-surface: var(--sl-color-base); --sl-gap: 1rem; } }',
    'aurora/components/index.css':
      '[data-sl-example] { --sl-private: 0; color: var(--sl-surface); gap: var(--sl-gap); top: var(--sl-private); }',
  })
  const report = await checkTokens({ root })
  assert.deepEqual(report.diagnostics, [])
  assert.deepEqual(
    report.themes.map((theme) => theme.name),
    ['aurora', 'sunrise']
  )
  assert.deepEqual(
    report.themes[0].tokens.map(({ name, value }) => [name, value]),
    [
      ['--sl-color-base', '#fff'],
      ['--sl-gap', '1rem'],
      ['--sl-surface', 'var(--sl-color-base)'],
    ]
  )
  assert.deepEqual(report, await checkTokens({ root }))
})

test('fallbacks may be literals or nested vars; comments, strings and URLs do not create references', async (t) => {
  const { root } = await fixture(t, {
    'sample/tokens.css': `:root {
      --sl-base: red;
      --sl-literal: var(--sl-missing, #fff);
      --sl-nested: var(--sl-first, var(--sl-second, var(--sl-base)));
      --sl-empty-fallback: var(--sl-missing,);
      --sl-string: "var(--sl-not-a-reference)";
      --sl-url: url("var(--sl-not-a-reference).png");
      --sl-url-raw: url(var(--sl-not-a-reference));
      --sl-comment: red /* var(--sl-not-a-reference) */;
      --sl-unused-fallback: var(--sl-base, var(--sl-not-used));
    }`,
    'sample/components/index.css':
      '[data-sl-example] { color: var(--external-library, var(--sl-base)); }',
  })
  assert.deepEqual((await checkTokens({ root })).diagnostics, [])
})

test('invalid names, empty values, missing aliases and cycles are precise diagnostics', async (t) => {
  const { root } = await fixture(t, {
    'sample/tokens.css': `:root {
      --wrong: red;
      --sl-Bad_Name: red;
      --sl-empty: ;
      --sl-missing-alias: var(--sl-absent);
      --sl-fallback: var(--sl-absent, var(--sl-also-absent));
      --sl-a: var(--sl-b);
      --sl-b: var(--sl-a, black);
    }`,
  })
  const report = await checkTokens({ root })
  assert.ok(rules(report).includes('token-name'))
  assert.ok(rules(report).includes('token-empty'))
  assert.equal(
    rules(report).filter((rule) => rule === 'token-reference').length,
    2
  )
  assert.equal(rules(report).filter((rule) => rule === 'token-cycle').length, 1)
  assert.ok(
    report.diagnostics.every(
      (item) => item.path === `${themesRoot}/sample/tokens.css` && item.line > 1
    )
  )
})

test('a shared component reference can resolve in one theme and fail in another', async (t) => {
  const { root } = await fixture(t, {
    'sunrise/tokens.css': ':root { --sl-base: red; }',
    'sunrise/components/index.css':
      '[data-sl-example] { color: var(--sl-added); }',
    'horizon/tokens.css':
      '@import "../sunrise/tokens.css"; :root { --sl-added: blue; }',
    'horizon/components/index.css':
      '@import "../../sunrise/components/index.css";',
  })
  assert.deepEqual(
    (await checkTokens({ root, themes: ['horizon'], componentFiles: 'all' }))
      .diagnostics,
    []
  )
  assert.deepEqual(
    (await checkTokens({ root, themes: ['sunrise'] })).diagnostics,
    []
  )
  const report = await checkTokens({
    root,
    themes: ['sunrise'],
    componentFiles: 'all',
  })
  assert.deepEqual(rules(report), ['token-reference'])
  assert.match(report.diagnostics[0].message, /sunrise.*--sl-added/)
})

test('bad imports, conditional token catalogs and malformed CSS fail explicitly', async (t) => {
  const { root } = await fixture(t, {
    'remote/tokens.css': '@import "https://example.com/tokens.css";',
    'escape/tokens.css': '@import "../../../../../../outside.css";',
    'missing/tokens.css': '@import "absent.css";',
    'cycle/tokens.css': '@import "loop.css";',
    'cycle/loop.css': '@import "tokens.css";',
    'conditional/tokens.css':
      '@media (prefers-color-scheme: dark) { :root { --sl-base: black; } }',
    'scoped/tokens.css': '.theme { --sl-base: black; }',
    'syntax/tokens.css': ':root { --sl-base:',
    'conditional-import/tokens.css': '@import "base.css" screen;',
    'conditional-import/base.css': ':root { --sl-base: red; }',
    'malformed-var/tokens.css':
      ':root { --sl-base: var(not-a-custom-property); }',
  })
  const report = await checkTokens({ root })
  for (const rule of [
    'token-import',
    'token-input',
    'token-import-cycle',
    'token-unsupported',
    'token-parse',
  ])
    assert.ok(rules(report).includes(rule), rule)
  assert.equal(
    report.themes.find((theme) => theme.name === 'conditional').tokens.length,
    0
  )
})

test('snapshots include transitive imports without freezing any theme or unrelated inputs', async (t) => {
  const { root, write } = await fixture(t, {
    'sunrise/tokens.css':
      '@import "foundations.css"; :root { --sl-base: red; }',
    'sunrise/foundations.css': ':root { --sl-space: 1rem; }',
    'horizon/tokens.css': '@import "../sunrise/tokens.css";',
    'independent/tokens.css': ':root { --sl-base: blue; }',
  })
  const first = await themeSnapshot(root, 'horizon')
  assert.equal(first.files.length, 3)
  await write('independent/tokens.css', ':root { --sl-base: green; }')
  assert.deepEqual(first, await themeSnapshot(root, 'horizon'))
  await write('sunrise/foundations.css', ':root { --sl-space: 2rem; }')
  assert.notEqual(first.sha256, (await themeSnapshot(root, 'horizon')).sha256)
  assert.equal((await themeSnapshot(root, 'sunrise')).name, 'sunrise')
  const missing = await themeSnapshot(root, 'future', { allowMissing: true })
  assert.deepEqual(missing.files, [])
  assert.equal(missing.missing, true)
  await assert.rejects(themeSnapshot(root, 'future'), /ENOENT/)
  await assert.rejects(themeSnapshot(root, '../sunrise'), /Invalid theme name/)
})

test('theme roots and imported files cannot hide symlinks, including internal symlinks', async (t) => {
  const { root, write } = await fixture(t, {
    'sample/tokens.css': '@import "linked.css";',
    'shared/tokens.css': ':root { --sl-base: red; }',
  })
  await symlink(
    '../shared/tokens.css',
    path.join(root, themesRoot, 'sample/linked.css')
  )
  await symlink('shared', path.join(root, themesRoot, 'linked-theme'))
  await assert.rejects(themeSnapshot(root, 'sample'), /symlinks/)
  await assert.rejects(
    themeSnapshot(root, 'linked-theme', { allowMissing: true }),
    /symlinks/
  )
  const report = await checkTokens({ root })
  assert.ok(
    report.diagnostics.some((item) =>
      /symlinks|Invalid theme directory/.test(item.message)
    )
  )
  await rm(path.join(root, themesRoot, 'sample/linked.css'))
  await write('sample/tokens.css', '@import "absent.css";')
  await assert.rejects(
    themeSnapshot(root, 'sample', { allowMissing: true }),
    /ENOENT/
  )
})

test('component validation is opt-in and scoped references exclude unchanged imported files', async (t) => {
  const { root } = await fixture(t, {
    'sample/tokens.css': ':root { --sl-base: red; }',
    'sample/components/index.css':
      '@import "good.css"; @import "bad.css"; @import "broken.css";',
    'sample/components/good.css': '[data-sl-good] { color: var(--sl-base); }',
    'sample/components/bad.css': '[data-sl-bad] { color: var(--sl-unknown); }',
    'sample/components/broken.css': '@import "absent.css";',
    'sample/components/unregistered.css':
      '[data-sl-new] { color: var(--sl-unknown); }',
  })
  assert.deepEqual((await checkTokens({ root })).diagnostics, [])
  const scoped = (file) =>
    checkTokens({
      root,
      componentFiles: [`${themesRoot}/sample/components/${file}`],
    })
  assert.deepEqual((await scoped('good.css')).diagnostics, [])
  assert.deepEqual(rules(await scoped('bad.css')), ['token-reference'])
  assert.deepEqual(rules(await scoped('broken.css')), ['token-import'])
  assert.deepEqual(rules(await scoped('unregistered.css')), ['token-reference'])
  const all = await checkTokens({ root, componentFiles: 'all' })
  assert.deepEqual(rules(all).sort(), ['token-input', 'token-reference'])
})

test('alias cycles in fallback branches and unsupported declaration cascade are explicit', async (t) => {
  const { root } = await fixture(t, {
    'sample/tokens.css':
      ':root { --sl-base: red; --sl-cycle: var(--sl-base, var(--sl-cycle)); --sl-important: blue !important; }',
    'outside/tokens.css': '--sl-invalid: red;',
    'layer/tokens.css': '@layer arbitrary { :root { --sl-base: red; } }',
  })
  const report = await checkTokens({ root })
  assert.equal(rules(report).filter((rule) => rule === 'token-cycle').length, 1)
  assert.equal(
    rules(report).filter((rule) => rule === 'token-unsupported').length,
    3
  )
  assert.equal(
    report.themes.find((theme) => theme.name === 'outside').tokens.length,
    0
  )
})

test('a selected theme index cannot borrow private variables from unrelated imported styles', async (t) => {
  const { root } = await fixture(t, {
    'sunrise/tokens.css': ':root { --sl-base: red; }',
    'sunrise/components/index.css':
      '[data-sl-old] { --sl-private: 1; color: var(--sl-unresolved); }',
    'horizon/tokens.css': '@import "../sunrise/tokens.css";',
    'horizon/components/index.css':
      '@import "../../sunrise/components/index.css"; [data-sl-new] { top: var(--sl-private); }',
  })
  const selected = await checkTokens({
    root,
    componentFiles: [`${themesRoot}/horizon/components/index.css`],
  })
  assert.equal(selected.diagnostics.length, 1)
  assert.match(selected.diagnostics[0].message, /horizon.*--sl-private/)
  const shared = await checkTokens({
    root,
    componentFiles: [`${themesRoot}/sunrise/components/index.css`],
  })
  assert.equal(shared.diagnostics.length, 2)
  assert.equal(
    (await checkTokens({ root, componentFiles: 'all' })).diagnostics.length,
    3
  )
})

test('unlayered token values win over sl-tokens layer independently of source order', async (t) => {
  const { root } = await fixture(t, {
    'sample/tokens.css':
      ':root { --sl-base: red; } @layer sl-tokens { :root { --sl-base: blue; --sl-layer-only: 1px; } }',
  })
  const report = await checkTokens({ root })
  assert.deepEqual(report.diagnostics, [])
  assert.equal(
    report.themes[0].tokens.find((token) => token.name === '--sl-base').value,
    'red'
  )
})

test('shared base and reset references are validated against the selected theme catalog', async (t) => {
  const { root } = await fixture(t, {
    'sunrise/tokens.css': ':root { --sl-bg-base: white; --sl-fg-base: black; }',
    'sunrise/base.css':
      'body { color: var(--sl-fg-base); background: var(--sl-bg-base); }',
    'sunrise/reset.css': 'button { color: var(--sl-fg-base); }',
    'horizon/tokens.css': ':root { --sl-bg-base: white; }',
    'horizon/base.css': '@import "../sunrise/base.css";',
    'horizon/reset.css': '@import "../sunrise/reset.css";',
  })
  assert.deepEqual((await checkTokens({ root })).diagnostics, [])
  const report = await checkTokens({ root, componentFiles: 'all' })
  assert.equal(report.diagnostics.length, 2)
  assert.ok(
    report.diagnostics.every((item) =>
      /horizon.*--sl-fg-base/.test(item.message)
    )
  )
  assert.ok(report.themes.every((item) => item.foundationDeclarations === 3))
})
