// This could be packaged as a separate module and published to npm to benefit
// the community, but for now it's just a script that we run manually
const fs = require('fs')
const prettier = require('prettier')

const prettierConfigPath = require.resolve('../.prettierrc')
const prettierConfig = require(prettierConfigPath)
const path = require('path')

/**
 * Copy a folder recursively
 *
 * @param {string} source
 * @param {string} target?
 */
function copyFolderRecursiveSync(source, target) {
  const targetFolder = path.join(target, path.basename(source))

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }

  // Copy while preserving the content from the target folder
  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source)

    files.forEach(function (file) {
      const curSource = path.join(source, file)

      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        fs.copyFileSync(curSource, path.join(targetFolder, file))
      }
    })
  }
}

/**
 * Split the generated docs into multiple files.
 * This is the typedoc-to-nextra.js entrypoint.
 */
function splitIntoMultipleFiles() {
  const cwd = process.cwd()

  const rootFile = fs.readFileSync(`${cwd}/__tmpDocs/modules.md`, 'utf8')
  const interfacesFiles = fs.readdirSync(`${cwd}/__tmpDocs/interfaces`)

  // typedoc-plugin-markdown generates a single file with all the docs separated by "___"
  const methods = rootFile.split('___')

  const components = []
  const hooks = []

  for (const method of methods) {
    try {
      const content = method.split('\n')
      const methodName = content
        // Find the line that starts with "###", which is the component/method/hook name
        .find((line) => line.startsWith('###'))
        .replace('###', '')
        .trim()

      // Means that this is a component
      const isPascalCase = /^[A-Z][a-zA-Z0-9]*$/.test(methodName)
      // Means that this is a hook, matches camelCase methods starting with "use"
      const isHook = /^use[A-Z][a-zA-Z0-9]*$/.test(methodName)
      // Check if element is a component. This is a bit hacky, but it works
      // since typedoc classifies type-declared type as type aliases under
      // the modules.md file, while it separates interface-declared types
      // under the interfaces folder
      const isTypeAlias = methodName.includes('Props')

      if (isHook && !isTypeAlias) {
        const kebabCaseName = methodName
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
          .toLowerCase()

        const folderPath = `${cwd}/__tmpDocs/hooks/${kebabCaseName}`

        fs.mkdirSync(folderPath, {
          recursive: true,
        })

        const filePath = `${folderPath}/code.mdx`

        fs.writeFileSync(filePath, method)

        prettify(filePath)

        hooks.push(methodName)

        continue
      }

      if (isPascalCase && !isHook && !isTypeAlias) {
        const kebabCaseName = methodName
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
          .toLowerCase()

        const folderPath = `${cwd}/__tmpDocs/components/${kebabCaseName}`

        fs.mkdirSync(folderPath, {
          recursive: true,
        })

        const filePath = `${folderPath}/code.mdx`

        fs.writeFileSync(filePath, method)

        prettify(filePath)

        components.push(methodName)

        const correspondingInterface = interfacesFiles.find(
          (i) => i.replace('.md', '').replace('Props', '') === methodName
        )

        if (correspondingInterface) {
          const interfaceFile = fs.readFileSync(
            `${cwd}/__tmpDocs/interfaces/${correspondingInterface}`,
            'utf8'
          )

          const interfaceFilePath = `${folderPath}/props.mdx`

          fs.writeFileSync(
            interfaceFilePath,
            interfaceFile.replace('Interface: ', '')
          )

          prettify(interfaceFilePath)
        }

        continue
      }

      if (isTypeAlias && !isHook) {
        const kebabCaseName = methodName
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
          .toLowerCase()
          .replace('-props', '')

        const folderPath = `${cwd}/__tmpDocs/components/${kebabCaseName}`

        fs.mkdirSync(folderPath, {
          recursive: true,
        })

        const filePath = `${folderPath}/props.mdx`

        fs.writeFileSync(filePath, method)

        prettify(filePath)

        continue
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Move everything under ${cwd}/__tmpDocs to packages/next-docs/pages
  const tmpDocsPath = `${cwd}/__tmpDocs`
  const pagesPath = `${cwd}/packages/next-docs/pages`
  const componentsMetaJson = `${cwd}/packages/next-docs/pages/components/_meta.json`
  const hooksMetaJson = `${cwd}/packages/next-docs/pages/hooks/_meta.json`

  copyFolderRecursiveSync(`${tmpDocsPath}/components`, pagesPath)
  copyFolderRecursiveSync(`${tmpDocsPath}/hooks`, pagesPath)

  // Update componentsMetaJson with the new paths
  // Adds the components as kebab-case on keys and PascalCase on values
  const componentsMetaUpdated = components.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()]: cur,
    }
  }, {})

  // Write the updated componentsMetaJson to disk as a simple JSON file
  fs.writeFileSync(
    componentsMetaJson,
    JSON.stringify(componentsMetaUpdated, null, 2)
  )

  // Update hooksMetaJson with the new paths
  // Adds the components as kebab-case on keys and camelCase on values
  const hooksMetaUpdated = hooks.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()]: cur,
    }
  }, {})

  // Write the updated componentsMetaJson
  fs.writeFileSync(hooksMetaJson, JSON.stringify(hooksMetaUpdated, null, 2))

  // TODO: Copy interfaces to their corresponding components folder
}

/**
 * Prettify a file using the .prettierrc config
 *
 * @param {string} filePath
 */
function prettify(filePath) {
  const prettierOptions = {
    ...prettierConfig,
    parser: 'markdown',
  }

  const file = fs.readFileSync(filePath, 'utf8')
  const formatted = prettier.format(file, prettierOptions)

  fs.writeFileSync(filePath, formatted)
}

splitIntoMultipleFiles()
