export default function (plop) {
  plop.setGenerator('init', {
    description: 'Init Racooon',
    prompts: [
      {
        type: 'input',
        name: 'appName',
        message: 'What is your app name?',
      },
      {
        type: 'list',
        name: 'section',
        message: 'Which section should it appear on the sidebar?',
        choices: [
          { name: 'main', value: 'main' },
          { name: 'orders', value: 'orders' },
          { name: 'products', value: 'products' },
          { name: 'promotions', value: 'promotions' },
          { name: 'storeFront', value: 'storeFront' },
          { name: 'shipping', value: 'shipping' },
          { name: 'marketplace', value: 'marketplace' },
          { name: 'storeSettings', value: 'storeSettings' },
        ],
      },
      {
        type: 'input',
        name: 'subSection',
        message: 'What is the subSection?',
      },
    ],
    actions: [
      getAction('admin/navigation.json'),
      getAction('messages/en.json'),
      getAction('messages/es.json'),
      getAction('messages/pt.json'),
      getAction('pages/_app.tsx'),
      getAction('pages/_document.tsx'),
      getAction('pages/index.tsx'),
      getAction('public/favicon.ico'),
      getAction('.eslintrc.json'),
      getAction('.gitignore.json'),
      getAction('.vtexignore'),
      getAction('manifest.json'),
      getAction('next.config.js'),
      getAction('package.json'),
      getAction('README.md'),
      getAction('tsconfig.json'),
    ],
  })
}

function getAction(filename) {
  return {
    type: 'add',
    path: `admin-{{kebabCase appName}}/${filename}`,
    templateFile: `templates/default/${filename}.hbs`,
  }
}
