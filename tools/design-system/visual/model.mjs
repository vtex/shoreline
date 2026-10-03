import { createHash } from 'node:crypto'

export const viewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

export const buildsDirectory = 'artifacts/design-system/storybooks'
export const manifestPath = `${buildsDirectory}/manifest.json`
export const sha256 = (value) =>
  createHash('sha256').update(value).digest('hex')

export function showStories(index) {
  if (index?.v !== 5 || !index.entries || Array.isArray(index.entries)) {
    throw new Error('Expected the Storybook 8 index.json format (v5 entries)')
  }
  const stories = Object.values(index.entries)
    .filter(
      (entry) =>
        entry.type === 'story' &&
        /(?:^|\/)(?:[^/]*\.)?show\.stories\.[cm]?[jt]sx?$/.test(
          entry.importPath
        )
    )
    .map(({ id, title, name, importPath }) => {
      if (!/^[a-z0-9][a-z0-9_-]*$/.test(id)) {
        throw new Error(`Unsafe or missing story ID: ${id}`)
      }
      return { id, title, name, importPath }
    })
    .sort((left, right) => left.id.localeCompare(right.id))
  if (stories.length === 0) {
    throw new Error('No Show stories found; visual coverage cannot be empty')
  }
  if (new Set(stories.map(({ id }) => id)).size !== stories.length) {
    throw new Error('Duplicate Show story IDs in index.json')
  }
  return stories
}

export function createManifest({ themes, indexes, inputHash, generatedAt }) {
  if (
    !Array.isArray(themes) ||
    themes.length === 0 ||
    new Set(themes).size !== themes.length ||
    themes.some((theme) => !/^[a-z][a-z0-9-]*$/.test(theme))
  ) {
    throw new Error('Expected a nonempty list of distinct theme names')
  }
  const orderedThemes = [...themes].sort()
  const stories = showStories(indexes[orderedThemes[0]])
  const expectedIds = stories.map(({ id }) => id)
  for (const theme of orderedThemes) {
    const actualIds = showStories(indexes[theme]).map(({ id }) => id)
    if (JSON.stringify(actualIds) !== JSON.stringify(expectedIds)) {
      throw new Error(
        `Show story IDs differ for ${theme}; every theme must cover the same stories`
      )
    }
  }
  return {
    schemaVersion: 1,
    generatedAt: generatedAt ?? new Date().toISOString(),
    inputHash,
    themes: orderedThemes,
    viewports,
    stories,
    builds: orderedThemes.map((theme) => ({
      theme,
      directory: `${buildsDirectory}/${theme}`,
      indexHash: sha256(JSON.stringify(indexes[theme])),
    })),
    expectedTests: orderedThemes.length * viewports.length * stories.length,
  }
}

export function runOptions(args, env = process.env) {
  const [mode = 'check', ...flags] = args
  if (!['check', 'capture', 'update'].includes(mode)) {
    throw new Error('Expected visual mode: check, capture, or update')
  }
  const update = flags.includes('--update-snapshots')
  const grepIndex = flags.indexOf('--grep')
  const grep = grepIndex >= 0 ? flags[grepIndex + 1] : undefined
  const known = new Set([
    ...(update ? ['--update-snapshots'] : []),
    ...(grepIndex >= 0 ? ['--grep', grep] : []),
  ])
  if (flags.some((flag) => !known.has(flag))) {
    throw new Error('Unknown visual option')
  }
  if (mode === 'update' && (!update || env.CI)) {
    throw new Error(
      'Baseline candidates require update --update-snapshots outside CI and human review'
    )
  }
  if (mode !== 'update' && update) {
    throw new Error('--update-snapshots is only valid in explicit update mode')
  }
  if (grepIndex >= 0 && (mode !== 'capture' || !grep)) {
    throw new Error(
      '--grep is only allowed for a diagnostic capture with a pattern'
    )
  }
  const channel = env.SHORELINE_VISUAL_CHANNEL || undefined
  if (channel && (channel !== 'chrome' || env.CI)) {
    throw new Error('Only local SHORELINE_VISUAL_CHANNEL=chrome is supported')
  }
  return { mode, grep, channel, updateSnapshots: update ? 'all' : 'none' }
}

export function projectsFor(manifest, port) {
  return manifest.themes.flatMap((theme) =>
    manifest.viewports.map(({ name, width, height }) => ({
      name: `${theme}-${name}`,
      metadata: { theme, viewport: name },
      use: {
        baseURL: `http://127.0.0.1:${port}/${theme}/`,
        viewport: { width, height },
      },
    }))
  )
}

export function reportCoverage(report, manifest) {
  const cases = []
  const visit = (suite) => {
    for (const spec of suite.specs ?? []) {
      for (const result of spec.tests ?? []) {
        cases.push({
          key: `${result.projectName}::${spec.title}`,
          status: result.status,
        })
      }
    }
    for (const child of suite.suites ?? []) visit(child)
  }
  for (const suite of report.suites ?? []) visit(suite)
  const expected = projectsFor(manifest, 6106).flatMap((project) =>
    manifest.stories.map((story) => `${project.name}::${story.id}`)
  )
  const actual = cases.map(({ key }) => key).sort()
  return {
    expected: expected.length,
    executed: cases.length,
    skipped: cases.filter(({ status }) => status === 'skipped').length,
    fullMatrix: JSON.stringify(expected.sort()) === JSON.stringify(actual),
    allPassed:
      cases.length > 0 && cases.every(({ status }) => status === 'expected'),
  }
}
