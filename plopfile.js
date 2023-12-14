const fileName = '{{kebabCase name}}'

module.exports = function (plop) {
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
        path: `packages/components/src/${fileName}/${fileName}.tsx`,
        templateFile: 'templates/component/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'packages/components/src/{{kebabCase name}}/{{kebabCase name}}.css',
        templateFile: 'templates/component/component.css.hbs',
      },
      {
        type: 'add',
        path: 'packages/components/src/{{kebabCase name}}/index.ts',
        templateFile: 'templates/component/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'packages/components/src/{{kebabCase name}}/stories/{{kebabCase name}}.stories.tsx',
        templateFile: 'templates/component/stories/component.stories.tsx.hbs',
      },
      {
        type: 'add',
        path: 'packages/components/src/{{kebabCase name}}/tests/{{kebabCase name}}.test.tsx',
        templateFile: 'templates/component/tests/component.test.tsx.hbs',
      },
      {
        type: 'append',
        path: 'packages/components/src/index.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
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
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export * from './{{kebabCase name}}'`,
      },
      {
        type: 'append',
        path: 'packages/icons/src/icons.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
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
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export * from './{{kebabCase name}}-{{lowerCase variant}}'`,
      },
    ],
  })
}
