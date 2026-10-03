import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  cp,
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from 'node:fs/promises'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const require = createRequire(join(root, 'package.json'))
const plopRequire = createRequire(require.resolve('plop/package.json'))
const cssRequire = createRequire(join(root, 'packages/css/package.json'))
const { bundle } = cssRequire('lightningcss')
const { parse } = require('postcss')
const { default: nodePlop } = await import(
  pathToFileURL(plopRequire.resolve('node-plop')).href
)

async function snapshot(directory) {
  const files = {}
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      files[entry.name] = await snapshot(join(directory, entry.name))
    } else {
      files[entry.name] = await readFile(join(directory, entry.name), 'utf8')
    }
  }
  return files
}

async function createFixture(context, extraTheme) {
  const directory = await mkdtemp(join(tmpdir(), 'shoreline-scaffold-'))
  context.after(() => rm(directory, { recursive: true, force: true }))
  const source = join(directory, 'packages/shoreline/src')
  await mkdir(join(source, 'components'), { recursive: true })
  await writeFile(
    join(source, 'components/index.ts'),
    '/* PLOP_INJECT_EXPORT */\n'
  )
  await writeFile(join(source, 'index.ts'), '// Existing public exports.\n')
  // Exercise the real theme import graph without changing the source checkout.
  await cp(
    join(root, 'packages/shoreline/src/foundations'),
    join(source, 'foundations'),
    { recursive: true }
  )
  for (const theme of ['sunrise', 'horizon']) {
    await cp(
      join(root, `packages/shoreline/src/themes/${theme}`),
      join(source, `themes/${theme}`),
      { recursive: true }
    )
  }
  if (extraTheme) {
    await cp(
      join(root, 'packages/shoreline/src/themes/sunrise'),
      join(source, `themes/${extraTheme}`),
      { recursive: true }
    )
  }
  const plop = await nodePlop(join(root, 'plopfile.js'), {
    destBasePath: directory,
  })
  return { directory, source, generator: plop.getGenerator('component') }
}

test('component generation discovers another authored theme without changing a whitelist', async (context) => {
  const { source, generator } = await createFixture(context, 'dusk')
  const result = await generator.runActions({
    name: 'ThemeFixture',
    theme: 'dusk',
  })
  assert.deepEqual(result.failures, [])
  const stylesheet = await readFile(
    join(source, 'themes/dusk/components/theme-fixture.css'),
    'utf8'
  )
  assert.match(stylesheet, /data-sl-theme-fixture/)
  const index = await readFile(
    join(source, 'themes/dusk/components/index.css'),
    'utf8'
  )
  assert.match(index, /theme-fixture.css/)
})

test('component scaffold targets the current package and exports its public API', async (context) => {
  const { source, generator } = await createFixture(context)
  const result = await generator.runActions({ name: 'ComponentFixture' })
  assert.deepEqual(result.failures, [])
  assert.equal(result.changes.length, 12)

  const base = join(source, 'components/component-fixture')
  const read = (file) => readFile(join(base, file), 'utf8')
  const component = await read('component-fixture.tsx')
  assert.match(component, /forwardRef</)
  assert.match(component, /function ComponentFixture\(props, ref\)/)
  assert.match(component, /data-sl-component-fixture/)
  assert.match(component, /\{children\}/)
  assert.match(component, /export interface ComponentFixtureOptions/)
  assert.match(component, /export type ComponentFixtureProps/)
  assert.match(component, /@status experimental/)
  assert.match(component, /@example/)
  assert.match(component, /@default undefined/)
  assert.doesNotMatch(component, /import\s+['"].*\.css['"]/)
  assert.match(
    await read('component-fixture.css'),
    /@import "\.\.\/\.\.\/themes\/sunrise\/components\/component-fixture.css"\s+layer\(sl-components\)/
  )
  const theme = join(source, 'themes/sunrise')
  assert.match(
    await readFile(join(theme, 'components/component-fixture.css'), 'utf8'),
    /var\(--sl-fg-base\)/
  )
  assert.match(
    await readFile(join(theme, 'components/index.css'), 'utf8'),
    /@import "component-fixture.css";/
  )
  assert.match(
    await readFile(join(source, 'components/index.ts'), 'utf8'),
    /export \* from '\.\/component-fixture'/
  )
  const publicBarrel = await readFile(join(source, 'index.ts'), 'utf8')
  assert.match(publicBarrel, /Existing public exports/)
  assert.match(
    publicBarrel,
    /export \{ ComponentFixture \} from '\.\/components'/
  )
  assert.match(publicBarrel, /ComponentFixtureOptions/)
  assert.match(publicBarrel, /ComponentFixtureProps/)

  const play = await read('stories/play.stories.tsx')
  assert.match(play, /export const Play:/)
  assert.match(play, /argTypes:/)
  assert.match(play, /args:/)
  assert.match(play, /play: async/)
  assert.match(play, /disableSnapshot: true/)
  const show = await read('stories/show.stories.tsx')
  assert.match(show, /export const Show:/)
  assert.match(show, /disableSnapshot: false/)
  assert.match(show, /Composed content/)
  assert.match(show, /Empty content/)
  assert.doesNotMatch(play + show, /import\s+['"].*\.css['"]/)
  assert.match(
    await read('stories/examples.stories.tsx'),
    /disableSnapshot: true/
  )
  const interaction = await read('stories/tests/child-interaction.stories.tsx')
  assert.match(interaction, /userEvent\.click/)
  assert.match(interaction, /toHaveFocus/)
  assert.match(interaction, /disableSnapshot: true/)
  const unit = await read('tests/component-fixture.test.tsx')
  assert.match(unit, /createRef<HTMLDivElement>/)
  assert.match(unit, /rerender\(/)
  assert.match(unit, /unmount\(/)

  const biome = spawnSync(
    process.execPath,
    [
      require.resolve('@biomejs/biome/bin/biome'),
      'check',
      '--config-path',
      root,
      '--vcs-enabled=false',
      base,
      join(source, 'index.ts'),
      join(source, 'components/index.ts'),
      join(theme, 'components/index.css'),
      join(theme, 'components/component-fixture.css'),
    ],
    { cwd: root, encoding: 'utf8' }
  )
  assert.ifError(biome.error)
  assert.equal(biome.status, 0, biome.stdout + biome.stderr)
})

for (const selectedTheme of ['sunrise', 'horizon']) {
  test(`${selectedTheme} generated styles reach published CSS and preview entrypoints with one layer owner`, async (context) => {
    const { source, generator } = await createFixture(context)
    const sunriseBefore = await snapshot(join(source, 'themes/sunrise'))
    const result = await generator.runActions({
      name: 'ComponentFixture',
      theme: selectedTheme,
    })
    assert.deepEqual(result.failures, [])
    if (selectedTheme === 'horizon') {
      assert.deepEqual(
        await snapshot(join(source, 'themes/sunrise')),
        sunriseBefore
      )
    }
    const theme = join(source, `themes/${selectedTheme}`)
    const bundleFile = (filename) =>
      bundle({ filename, minify: false }).code.toString()
    const components = bundleFile(join(theme, 'components/index.css'))
    // Match build-css.ts's public entrypoints and its components layer wrapper.
    const outputs = {
      fullLayered: bundleFile(join(theme, 'styles.css')),
      fullUnlayered: bundleFile(join(theme, 'styles-unlayered.css')),
      componentsLayered: `@layer sl-components {\n${components}\n}`,
      componentsUnlayered: components,
      preview: bundleFile(
        join(source, 'components/component-fixture/component-fixture.css')
      ),
    }
    const snapshots = {}
    for (const [entrypoint, css] of Object.entries(outputs)) {
      const matches = []
      parse(css).walkRules('[data-sl-component-fixture]', (rule) => {
        const layers = []
        for (let parent = rule.parent; parent; parent = parent.parent) {
          if (parent.type === 'atrule' && parent.name === 'layer') {
            layers.unshift(parent.params)
          }
        }
        matches.push({
          layers,
          declarations: rule.nodes
            .filter((node) => node.type === 'decl')
            .map((node) => `${node.prop}: ${node.value}`),
        })
      })
      snapshots[entrypoint] = matches
    }
    const layered = {
      layers: ['sl-components'],
      declarations: ['color: var(--sl-fg-base)'],
    }
    const unlayered = { ...layered, layers: [] }
    assert.deepEqual(snapshots, {
      fullLayered: [layered],
      fullUnlayered: [unlayered],
      componentsLayered: [layered],
      componentsUnlayered: [unlayered],
      preview: [layered],
    })
  })
}

test('generating an existing component fails without replacing files or duplicating exports', async (context) => {
  const { source, generator } = await createFixture(context)
  const initial = await generator.runActions({ name: 'PilotCard' })
  assert.deepEqual(initial.failures, [])
  const path = join(source, 'components/pilot-card/pilot-card.tsx')
  const edited = `${await readFile(path, 'utf8')}\n// Consumer work.\n`
  await writeFile(path, edited)
  const before = await readFile(join(source, 'index.ts'), 'utf8')
  const themeIndex = join(source, 'themes/sunrise/components/index.css')
  const cssBefore = await readFile(themeIndex, 'utf8')

  await assert.rejects(
    generator.runActions({ name: 'PilotCard', theme: 'horizon' }),
    /already exists/
  )
  assert.equal(await readFile(path, 'utf8'), edited)
  assert.equal(await readFile(join(source, 'index.ts'), 'utf8'), before)
  assert.equal(await readFile(themeIndex, 'utf8'), cssBefore)
})

test('generator rejects an invalid theme or unsafe name before changing files', async (context) => {
  const { source, generator } = await createFixture(context)
  const before = await snapshot(source)
  for (const theme of [
    '../sunrise',
    'unknown',
    '',
    'unknown-theme',
    'horizon/components',
  ]) {
    await assert.rejects(
      generator.runActions({ name: 'PilotCard', theme }),
      /Unknown component theme/
    )
  }
  await assert.rejects(
    generator.runActions({ name: '../PilotCard', theme: 'horizon' }),
    /component name/
  )
  assert.deepEqual(await snapshot(source), before)
})

test('a pre-existing theme stylesheet prevents all scaffold writes', async (context) => {
  const { source, generator } = await createFixture(context)
  const css = join(source, 'themes/horizon/components/pilot-card.css')
  await writeFile(css, '/* Existing authored design. */\n')
  const before = await snapshot(source)
  await assert.rejects(
    generator.runActions({ name: 'PilotCard', theme: 'horizon' }),
    /already exists/
  )
  assert.deepEqual(await snapshot(source), before)
})

test('CLI positional arguments select Horizon without a prompt', async (context) => {
  const { directory, source } = await createFixture(context)
  const result = spawnSync(
    process.execPath,
    [
      require.resolve('plop/bin/plop.js'),
      '--plopfile',
      join(root, 'plopfile.js'),
      '--dest',
      directory,
      'component',
      'CliFixture',
      'horizon',
    ],
    { cwd: root, encoding: 'utf8', timeout: 30000 }
  )
  assert.ifError(result.error)
  assert.equal(result.status, 0, result.stdout + result.stderr)
  assert.match(
    await readFile(
      join(source, 'themes/horizon/components/cli-fixture.css'),
      'utf8'
    ),
    /data-sl-cli-fixture/
  )
})
