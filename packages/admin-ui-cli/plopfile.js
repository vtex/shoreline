const fileName = '{{kebabCase name}}'

module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: `src/components/${fileName}/${fileName}.tsx`,
        templateFile: 'src/templates/component/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.style.ts',
        templateFile: 'src/templates/component/component.style.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/index.ts',
        templateFile: 'src/templates/component/index.ts.hbs',
      },
      {
        // Adds an index.js file if it does not already exist
        type: 'add',
        path: 'src/components/index.ts',
        templateFile: 'src/templates/injectable-index.ts.hbs',
        // If index.js already exists in this location, skip this action
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'src/components/index.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export * from './{{kebabCase name}}'`,
      },
    ],
  })

  plop.setGenerator('page', {
    description: 'Create a page',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your page name?',
      },
      {
        type: 'confirm',
        name: 'hasSearch',
        message: 'It has a search?',
      },
      {
        type: 'confirm',
        name: 'hasFilter',
        message: 'It has filters?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/pages/{{kebabCase name}}-page.tsx',
        // Handlebars template used to generate content of new file
        templateFile: 'src/templates/page.hbs',
      },
    ],
  })
}
