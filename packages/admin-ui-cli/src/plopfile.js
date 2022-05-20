const fileName = '{{kebabCase name}}'

const addNavigation = [
  {
    type: 'add',
    path: 'admin/routes.json',
    templateFile: 'templates/admin/routes.json.hbs',
    skipIfExists: true,
  },
  {
    type: 'append',
    path: 'admin/routes.json',
    pattern: `{`,
    template: `
  "admin.app.{{kebabCase name}}": {
    "component": "{{kebabCase name}}-page",
    "path": "/admin/app/{{kebabCase name}}" 
  },
`,
  },
]

const nameQuestion = {
  type: 'input',
  name: 'name',
  message: 'What is your page name?',
}

const referenceQuestions = [
  {
    type: 'confirm',
    name: 'hasBackButton',
    message: 'With a back button?',
  },
  {
    type: 'input',
    name: 'reference',
    message: 'Backlink reference?',
    when(data) {
      return !!data.hasBackButton
    },
  },
]

const actionQuestion = {
  type: 'checkbox',
  name: 'actions',
  message: 'With actions?',
  choices: [
    { name: 'primary', value: 'primary' },
    { name: 'secondary', value: 'secondary' },
    { name: 'tertiary', value: 'tertiary' },
  ],
  filter(data) {
    const arr = data

    console.log({ arr })

    return {
      hasActions: true,
      hasPrimaryAction: arr.includes('primary'),
      hasSecondaryAction: arr.includes('secondary'),
      hasTertiaryAction: arr.includes('tertiary'),
    }
  },
}

export default function (plop) {
  plop.setGenerator('list-page', {
    description: 'Page that lists items',
    prompts: [
      nameQuestion,
      {
        type: 'confirm',
        name: 'hasSearch',
        message: 'With search?',
      },
      ...referenceQuestions,
      actionQuestion,
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
        templateFile: 'templates/list-page.tsx.hbs',
      },
      ...addNavigation,
    ],
  })

  plop.setGenerator('form-page', {
    description: 'Page that submits a form',
    prompts: [
      nameQuestion,
      ...referenceQuestions,
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
        templateFile: 'templates/form-page.tsx.hbs',
      },
      ...addNavigation,
    ],
  })

  plop.setGenerator('wire', {
    description: 'Connects pages with the admin shell',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'messages/en.json',
        templateFile: 'templates/messages/lang.json.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'messages/en.json',
        pattern: `{`,
        template: `"admin.app.page.{{kebabCase name}}.labelId": "{{pascalCase name}}",`,
      },
      {
        type: 'add',
        path: 'messages/es.json',
        templateFile: 'templates/messages/lang.json.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'messages/es.json',
        pattern: `{`,
        template: `"admin.app.page.{{kebabCase name}}.labelId": "{{pascalCase name}}",`,
      },
      {
        type: 'add',
        path: 'messages/pt.json',
        templateFile: 'templates/messages/lang.json.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'messages/pt.json',
        pattern: `{`,
        template: `"admin.app.page.{{kebabCase name}}.labelId": "{{pascalCase name}}",`,
      },
      {
        type: 'append',
        path: 'admin/navigation.json',
        pattern: `"subSectionItems": [`,
        template: `
        {
          "labelId": "admin.app.page.{{kebabCase name}}.labelId",
          "path": "/admin/{{kebabCase name}}"
        },
    `,
      },
    ],
  })

  plop.setGenerator('blank-page', {
    description: 'Page with the blank layout',
    prompts: [nameQuestion, ...referenceQuestions, actionQuestion],
    actions: [
      {
        type: 'add',
        path: 'react/{{kebabCase name}}-page.tsx',
        templateFile: 'templates/blank-page.tsx.hbs',
      },
      ...addNavigation,
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
        templateFile: 'templates/component/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'react/components/{{kebabCase name}}/{{kebabCase name}}.style.ts',
        templateFile: 'templates/component/component.style.ts.hbs',
      },
      {
        type: 'add',
        path: 'react/components/{{kebabCase name}}/index.ts',
        templateFile: 'templates/component/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'react/components/index.ts',
        templateFile: 'templates/injectable-index.ts.hbs',
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

  plop.setGenerator('context', {
    description: 'Create a context',
    prompts: [
      {
        type: 'input',
        name: 'subject',
        message: 'Subject:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: `react/{{kebabCase subject}}-list-page.tsx`,
        templateFile: 'templates/context/context-list-page.tsx.hbs',
      },
      {
        type: 'add',
        path: `react/{{kebabCase subject}}-detail-page.tsx`,
        templateFile: 'templates/context/context-detail-page.tsx.hbs',
      },
      {
        type: 'add',
        path: `react/{{kebabCase subject}}-create-page.tsx`,
        templateFile: 'templates/context/context-create-page.tsx.hbs',
      },
      {
        type: 'add',
        path: 'admin/routes.json',
        templateFile: 'templates/admin/routes.json.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'admin/routes.json',
        pattern: `{`,
        template: `
      "admin.app.{{kebabCase subject}}-list": {
        "component": "{{kebabCase subject}}-list-page",
        "path": "/admin/app/{{kebabCase subject}}-list" 
      },
      "admin.app.{{kebabCase subject}}-detail": {
        "component": "{{kebabCase subject}}-detail-page",
        "path": "/admin/app/{{kebabCase subject}}-detail/:id" 
      },
      "admin.app.{{kebabCase subject}}-create": {
        "component": "{{kebabCase subject}}-create-page",
        "path": "/admin/app/{{kebabCase subject}}-create" 
      },
    `,
      },
      {
        type: 'add',
        path: 'messages/en.json',
        templateFile: 'templates/messages/lang.json.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'messages/en.json',
        pattern: `{`,
        template: `"admin.app.context.{{kebabCase subject}}.labelId": "{{pascalCase subject}}",`,
      },
      {
        type: 'add',
        path: 'messages/es.json',
        templateFile: 'templates/messages/lang.json.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'messages/es.json',
        pattern: `{`,
        template: `"admin.app.context.{{kebabCase subject}}.labelId": "{{pascalCase subject}}",`,
      },
      {
        type: 'add',
        path: 'messages/pt.json',
        templateFile: 'templates/messages/lang.json.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'messages/pt.json',
        pattern: `{`,
        template: `"admin.app.context.{{kebabCase subject}}.labelId": "{{pascalCase subject}}",`,
      },
      {
        type: 'append',
        path: 'admin/navigation.json',
        pattern: `"subSectionItems": [`,
        template: `
        {
          "labelId": "admin.app.context.{{kebabCase subject}}.labelId",
          "path": "/admin/{{kebabCase subject}}-list"
        },
    `,
      },
    ],
  })
}
