const fileName = '{{kebabCase name}}'

/**
 * Detect a CLI override of the form `--package <name>` (and the legacy
 * `--cwd packages/<name>`) so `pnpm gen:component MyComp --package shoreline-ai`
 * routes the generated files into `packages/shoreline-ai/src/components/...`
 * instead of the default `packages/components/src/...`.
 *
 * Spec ref: `tasks.md` T007 — "wire the existing root `pnpm gen:component`
 * plop generator to accept `--cwd packages/shoreline-ai` so component
 * scaffolding lands in the new package".
 */
function resolveTargetPackage() {
  const argv = process.argv.slice(2)
  const findFlag = (flag) => {
    const inlineIdx = argv.findIndex((arg) => arg === flag)
    if (inlineIdx >= 0 && argv[inlineIdx + 1]) {
      return argv[inlineIdx + 1]
    }
    const eqArg = argv.find((arg) => arg.startsWith(`${flag}=`))
    return eqArg ? eqArg.split('=')[1] : null
  }

  const pkg = findFlag('--package')
  if (pkg) return pkg

  const cwd = findFlag('--cwd')
  if (cwd) {
    const m = cwd.match(/^packages\/([^/]+)/)
    if (m) return m[1]
  }
  return null
}

const TARGET_PACKAGE = resolveTargetPackage()

const COMPONENT_BASE =
  TARGET_PACKAGE === 'shoreline-ai'
    ? 'packages/shoreline-ai/src/components'
    : 'packages/components/src'

const COMPONENT_INDEX = `${COMPONENT_BASE}/index.ts`

module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Custom component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: `${COMPONENT_BASE}/${fileName}/${fileName}.tsx`,
        templateFile: 'templates/component/component.tsx.hbs',
      },
      {
        type: 'add',
        path: `${COMPONENT_BASE}/${fileName}/${fileName}.css`,
        templateFile: 'templates/component/component.css.hbs',
      },
      {
        type: 'add',
        path: `${COMPONENT_BASE}/${fileName}/index.ts`,
        templateFile: 'templates/component/index.ts.hbs',
      },
      {
        type: 'add',
        path: `${COMPONENT_BASE}/${fileName}/stories/${fileName}.stories.tsx`,
        templateFile: 'templates/component/stories/component.stories.tsx.hbs',
      },
      {
        type: 'add',
        path: `${COMPONENT_BASE}/${fileName}/tests/${fileName}.test.tsx`,
        templateFile: 'templates/component/tests/component.test.tsx.hbs',
      },
      {
        type: 'append',
        path: COMPONENT_INDEX,
        pattern: '/* PLOP_INJECT_EXPORT */',
        template: `export * from './{{kebabCase name}}'`,
      },
    ],
  })

  plop.setGenerator('icon', {
    description: 'Custom icon',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your icon name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: `packages/icons/src/${fileName}/${fileName}.tsx`,
        templateFile: 'templates/icon/icon.tsx.hbs',
      },
      {
        type: 'add',
        path: `packages/icons/src/${fileName}/index.ts`,
        templateFile: 'templates/icon/index.ts.hbs',
      },
      {
        type: 'append',
        path: `packages/icons/src/${fileName}/index.ts`,
        pattern: '/* PLOP_INJECT_EXPORT */',
        template: `export * from './{{kebabCase name}}'`,
      },
      {
        type: 'append',
        path: 'packages/icons/src/icons.ts',
        pattern: '/* PLOP_INJECT_EXPORT */',
        template: `export * from './{{kebabCase name}}'`,
      },
    ],
  })

  plop.setGenerator('icon-variant', {
    description: 'Custom icon',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your icon name?',
      },
      {
        type: 'list',
        name: 'variant',
        message: 'Choose an icon variant',
        choices: ['Small', 'Fill'],
      },
    ],
    actions: [
      {
        type: 'add',
        path: `packages/icons/src/${fileName}/${fileName}-{{lowerCase variant}}.tsx`,
        templateFile: 'templates/icon/icon-variant.tsx.hbs',
      },
      {
        type: 'append',
        path: `packages/icons/src/${fileName}/index.ts`,
        pattern: '/* PLOP_INJECT_EXPORT */',
        template: `export * from './{{kebabCase name}}-{{lowerCase variant}}'`,
      },
    ],
  })
}
