const fileName = '{{kebabCase name}}'

module.exports = (plop) => {
  plop.setGenerator('list-page', {
    description: 'Page that lists items',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?',
      },
      {
        type: 'confirm',
        name: 'hasSearch',
        message: 'With search?',
      },
      {
        type: 'confirm',
        name: 'hasBackButton',
        message: 'With a back button?',
      },
      {
        type: 'confirm',
        name: 'hasActions',
        message: 'With actions?',
      },
      {
        type: 'confirm',
        name: 'hasFilter',
        message: 'With filter?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'react/{{kebabCase name}}-page.tsx',
        templateFile: 'src/templates/list-page.tsx.hbs',
      },
    ],
  })

  plop.setGenerator('form-page', {
    description: 'Page that submits a form',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?',
      },
      {
        type: 'confirm',
        name: 'hasBackButton',
        message: 'With a back button?',
      },
      {
        type: 'confirm',
        name: 'hasResetButton',
        message: 'With reset button?',
      },
      {
        type: 'confirm',
        name: 'hasValidation',
        message: 'With validation?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'react/{{kebabCase name}}-page.tsx',
        templateFile: 'src/templates/form-page.tsx.hbs',
      },
    ],
  })

  plop.setGenerator('blank-page', {
    description: 'Page with the blank layout',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?',
      },
      {
        type: 'confirm',
        name: 'hasBackButton',
        message: 'With a back button?',
      },
      {
        type: 'confirm',
        name: 'hasActions',
        message: 'With actions?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'react/{{kebabCase name}}-page.tsx',
        templateFile: 'src/templates/blank-page.tsx.hbs',
      },
    ],
  })

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
        path: `react/components/${fileName}/${fileName}.tsx`,
        templateFile: 'src/templates/component/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'react/components/{{kebabCase name}}/{{kebabCase name}}.style.ts',
        templateFile: 'src/templates/component/component.style.ts.hbs',
      },
      {
        type: 'add',
        path: 'react/components/{{kebabCase name}}/index.ts',
        templateFile: 'src/templates/component/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'react/components/index.ts',
        templateFile: 'src/templates/injectable-index.ts.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'react/components/index.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export * from './{{kebabCase name}}'`,
      },
    ],
  })
}
