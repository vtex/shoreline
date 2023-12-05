const fs = require('fs')
const prettier = require('prettier')

function splitIntoMultipleFiles() {
  const cwd = process.cwd()

  const rootFile = fs.readFileSync(`${cwd}/__tmpDocs/modules.md`, 'utf8')
  // typedoc-plugin-markdown generates a single file with all the docs separated by "___"
  const files = rootFile.split('___')

  for (const file of files) {
    try {
      const content = file.split('\n')
      const componentName = content
        // Find the line that starts with "###", which is the component/method/hook name
        .find((line) => line.startsWith('###'))
        .replace('###', '')
        .trim()

      // Means that this is a component
      const isPascalCase = /^[A-Z][a-zA-Z0-9]*$/.test(componentName)

      // Means that this is a hook, matches camelCase methods starting with "use"
      const isHook = /^use[A-Z][a-zA-Z0-9]*$/.test(componentName)

      if (isHook) {
        const kebabCaseName = componentName
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
          .toLowerCase()

        const folderPath = `${cwd}/__tmpDocs/hooks/${kebabCaseName}`
        fs.mkdirSync(folderPath, {
          recursive: true,
        })

        const filePath = `${folderPath}/code.mdx`
        fs.writeFileSync(filePath, file)
        prettify(filePath)

        continue
      }

      if (isPascalCase) {
        const kebabCaseName = componentName
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
          .toLowerCase()

        const folderPath = `${cwd}/__tmpDocs/components/${kebabCaseName}`
        fs.mkdirSync(folderPath, {
          recursive: true,
        })

        const filePath = `${folderPath}/code.mdx`
        fs.writeFileSync(filePath, file)

        prettify(filePath)

        continue
      }

      const filePath = `${cwd}/__tmpDocs/${componentName}.md`
      fs.writeFileSync(filePath, file)
      prettify(filePath)
    } catch (error) {
      console.error(error)
    }
  }
}

function prettify(filePath) {
  const prettierConfigPath = require.resolve('../.prettierrc')
  const prettierConfig = require(prettierConfigPath)
  const prettierOptions = {
    ...prettierConfig,
    parser: 'markdown',
  }

  const file = fs.readFileSync(filePath, 'utf8')
  const formatted = prettier.format(file, prettierOptions)
  fs.writeFileSync(filePath, formatted)
}

splitIntoMultipleFiles()
