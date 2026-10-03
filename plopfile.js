const { spawnSync } = require('node:child_process')
const { existsSync } = require('node:fs')
const { resolve } = require('node:path')
const { discoverThemes } = require('./tools/design-system/theme-registry.cjs')

const fileName = '{{kebabCase name}}'
const componentPath = `packages/shoreline/src/components/${fileName}`
const componentThemePath = 'packages/shoreline/src/themes/{{theme}}/components'

function formatComponentSource(path) {
  return (source) => {
    const result = spawnSync(
      process.execPath,
      [
        require.resolve('@biomejs/biome/bin/biome'),
        'format',
        '--config-path',
        __dirname,
        '--stdin-file-path',
        path,
      ],
      { input: source, encoding: 'utf8' }
    )
    if (result.error) throw result.error
    if (result.status !== 0) throw new Error(result.stderr)
    return result.stdout
  }
}

module.exports = (plop) => {
  const componentThemes = discoverThemes(plop.getDestBasePath())
  plop.setGenerator('component', {
    description: 'Custom component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
      {
        type: 'list',
        name: 'theme',
        message: 'Which theme should receive the component styles?',
        choices: componentThemes,
        default: 'sunrise',
      },
    ],
    actions: (data) => {
      data.theme ??= 'sunrise'
      if (!componentThemes.includes(data.theme)) {
        throw new Error(`Unknown component theme: ${data.theme}`)
      }
      if (!/^[A-Za-z][A-Za-z0-9 _-]*$/.test(data.name ?? '')) {
        throw new Error(
          'Use a component name containing letters, numbers, spaces, underscores or hyphens.'
        )
      }
      const actions = [
        {
          type: 'add',
          path: `${componentPath}/${fileName}.tsx`,
          templateFile: 'templates/component/component.tsx.hbs',
        },
        {
          type: 'add',
          path: `${componentPath}/${fileName}.css`,
          templateFile: 'templates/component/component.css.hbs',
        },
        {
          type: 'add',
          path: `${componentThemePath}/${fileName}.css`,
          templateFile: 'templates/component/theme.css.hbs',
        },
        {
          type: 'add',
          path: `${componentPath}/index.ts`,
          templateFile: 'templates/component/index.ts.hbs',
        },
        {
          type: 'add',
          path: `${componentPath}/stories/examples.stories.tsx`,
          templateFile: 'templates/component/stories/examples.stories.tsx.hbs',
        },
        {
          type: 'add',
          path: `${componentPath}/stories/play.stories.tsx`,
          templateFile: 'templates/component/stories/play.stories.tsx.hbs',
        },
        {
          type: 'add',
          path: `${componentPath}/stories/show.stories.tsx`,
          templateFile: 'templates/component/stories/show.stories.tsx.hbs',
        },
        {
          type: 'add',
          path: `${componentPath}/stories/tests/child-interaction.stories.tsx`,
          templateFile:
            'templates/component/stories/tests/child-interaction.stories.tsx.hbs',
        },
        {
          type: 'add',
          path: `${componentPath}/tests/${fileName}.test.tsx`,
          templateFile: 'templates/component/tests/component.test.tsx.hbs',
        },
        {
          type: 'append',
          path: `${componentThemePath}/index.css`,
          template: '@import "{{kebabCase name}}.css";',
        },
        {
          type: 'append',
          path: 'packages/shoreline/src/components/index.ts',
          pattern: '/* PLOP_INJECT_EXPORT */',
          template: `export * from './{{kebabCase name}}'`,
        },
        {
          type: 'append',
          path: 'packages/shoreline/src/index.ts',
          template:
            "export { {{pascalCase name}} } from './components'\nexport type { {{pascalCase name}}Options } from './components'\nexport type { {{pascalCase name}}Props } from './components'\n",
        },
      ]
      // Check every destination before the first write, including styles left
      // by an earlier migration. Selecting another theme never replaces React.
      for (const action of actions) {
        const destination = resolve(
          plop.getDestBasePath(),
          plop.renderString(action.path, data)
        )
        if (action.type === 'add' && existsSync(destination)) {
          throw new Error(
            `Component destination already exists: ${destination}`
          )
        }
        if (action.type === 'append' && !existsSync(destination)) {
          throw new Error(
            `Required component entrypoint is missing: ${destination}`
          )
        }
      }
      return actions.map((action) => ({
        ...action,
        template: action.template
          ? formatComponentSource(action.path)(
              plop.renderString(action.template, data)
            ).trimEnd() + (action.pattern ? '' : '\n')
          : undefined,
        transform: formatComponentSource(action.path),
      }))
    },
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
