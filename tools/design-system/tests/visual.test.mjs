import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import {
  createManifest,
  projectsFor,
  reportCoverage,
  runOptions,
  showStories,
} from '../visual/model.mjs'
import { inputFingerprint, readManifest } from '../visual/runtime.mjs'

const index = (id = 'components-button--show') => ({
  v: 5,
  entries: {
    [id]: {
      id,
      type: 'story',
      title: 'components/button',
      name: 'Show',
      importPath:
        './packages/shoreline/src/components/button/stories/show.stories.tsx',
    },
    playground: {
      id: 'playground',
      type: 'story',
      importPath:
        './packages/shoreline/src/components/button/stories/play.stories.tsx',
    },
    docs: {
      id: 'docs',
      type: 'docs',
      importPath:
        './packages/shoreline/src/components/button/stories/show.stories.tsx',
    },
  },
})

test('visual matrix includes every discovered theme and every Show story at both viewports', () => {
  const manifest = createManifest({
    themes: ['sunrise', 'horizon', 'future'],
    indexes: { sunrise: index(), horizon: index(), future: index() },
    inputHash: 'fixture',
  })
  assert.deepEqual(manifest.themes, ['future', 'horizon', 'sunrise'])
  assert.equal(manifest.stories.length, 1)
  assert.equal(manifest.expectedTests, 6)
  const projects = projectsFor(manifest, 6106)
  assert.equal(projects.length, 6)
  assert.equal(projects[0].name, 'future-desktop')
  assert.equal(projects[1].use.baseURL, 'http://127.0.0.1:6106/future/')
  assert.deepEqual(projects[1].use.viewport, { width: 390, height: 844 })
})

test('missing, divergent, duplicated or unsafe Show stories fail before launching browsers', () => {
  assert.throws(() => showStories({ v: 5, entries: {} }), /cannot be empty/)
  assert.throws(() => showStories({ v: 4, entries: {} }), /Storybook 8/)
  assert.throws(() => showStories(index('../escape')), /Unsafe/)
  const duplicate = index()
  duplicate.entries.duplicate = duplicate.entries['components-button--show']
  assert.throws(() => showStories(duplicate), /Duplicate/)
  assert.throws(
    () =>
      createManifest({
        themes: ['sunrise', 'horizon'],
        indexes: { sunrise: index(), horizon: index('different--show') },
      }),
    /IDs differ/
  )
})

test('visual validation never updates references and rejects update in CI', () => {
  assert.equal(runOptions([], {}).updateSnapshots, 'none')
  assert.equal(runOptions(['capture'], {}).updateSnapshots, 'none')
  assert.throws(() => runOptions(['update'], {}), /outside CI/)
  assert.throws(
    () => runOptions(['update', '--update-snapshots'], { CI: 'true' }),
    /outside CI/
  )
  assert.throws(
    () => runOptions(['check', '--update-snapshots'], {}),
    /explicit update/
  )
  assert.equal(
    runOptions(['update', '--update-snapshots'], {}).updateSnapshots,
    'all'
  )
})

test('filters and alternate Chrome are diagnostic options, not ways to weaken a CI matrix', () => {
  assert.throws(
    () => runOptions(['check', '--grep', 'button'], {}),
    /diagnostic capture/
  )
  assert.throws(
    () => runOptions(['capture', '--grep'], {}),
    /diagnostic capture/
  )
  assert.throws(() => runOptions(['check', '--unknown'], {}), /Unknown/)
  assert.throws(
    () =>
      runOptions(['capture'], {
        CI: 'true',
        SHORELINE_VISUAL_CHANNEL: 'chrome',
      }),
    /Only local/
  )
  assert.equal(runOptions(['capture', '--grep', 'button'], {}).grep, 'button')
})

test('visual receipts detect omitted themes, duplicate cases and skipped tests', () => {
  const manifest = createManifest({
    themes: ['horizon', 'sunrise'],
    indexes: { horizon: index(), sunrise: index() },
  })
  const tests = projectsFor(manifest, 6106).map(({ name }) => ({
    projectName: name,
    status: 'expected',
  }))
  const report = {
    suites: [{ specs: [{ title: manifest.stories[0].id, tests }] }],
  }
  assert.deepEqual(reportCoverage(report, manifest), {
    expected: 4,
    executed: 4,
    skipped: 0,
    fullMatrix: true,
    allPassed: true,
  })
  tests[0].status = 'skipped'
  assert.equal(reportCoverage(report, manifest).skipped, 1)
  assert.equal(reportCoverage(report, manifest).allPassed, false)
  tests.pop()
  assert.equal(reportCoverage(report, manifest).fullMatrix, false)
  tests.push(tests[0])
  assert.equal(reportCoverage(report, manifest).fullMatrix, false)
})

test('changed runner, theme or assets invalidate a previously built visual matrix', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'shoreline-visual-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  execFileSync('git', ['init', '--quiet', root])
  const write = async (file, content) => {
    await mkdir(dirname(join(root, file)), { recursive: true })
    await writeFile(join(root, file), content)
  }
  const themes = ['horizon', 'sunrise']
  const indexes = Object.fromEntries(themes.map((theme) => [theme, index()]))
  for (const theme of themes) {
    await write(`packages/shoreline/src/themes/${theme}/styles.css`, ':root {}')
    await write(
      `packages/shoreline/dist/themes/${theme}/styles.css`,
      ':root {}'
    )
    await write(
      `artifacts/design-system/storybooks/${theme}/index.json`,
      JSON.stringify(indexes[theme])
    )
  }
  await write('tools/design-system/visual/stories.spec.mjs', '// renderer')
  await write('.storybook/public/font.woff2', 'fixture font')
  await write('turbo.json', '{}')
  const manifest = createManifest({
    themes,
    indexes,
    inputHash: inputFingerprint(root),
  })
  await write(
    'artifacts/design-system/storybooks/manifest.json',
    JSON.stringify(manifest)
  )
  assert.deepEqual(readManifest(root), manifest)
  for (const [file, original] of [
    ['tools/design-system/visual/stories.spec.mjs', '// renderer'],
    ['.storybook/public/font.woff2', 'fixture font'],
    ['turbo.json', '{}'],
    ['packages/shoreline/src/themes/horizon/styles.css', ':root {}'],
    ['packages/shoreline/dist/themes/horizon/styles.css', ':root {}'],
  ]) {
    await write(file, `${original} changed`)
    assert.throws(() => readManifest(root), /inputs changed/)
    await write(file, original)
    assert.deepEqual(readManifest(root), manifest)
  }
  await write(
    'artifacts/design-system/storybooks/horizon/index.json',
    JSON.stringify(index('other--show'))
  )
  assert.throws(() => readManifest(root), /IDs differ/)
})
