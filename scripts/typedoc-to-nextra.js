// This could be packaged as a separate module and published to npm to benefit
// the community, but for now it's just a script that we run manually
const fs = require('fs')
const prettier = require('prettier')

const prettierConfigPath = require.resolve('../.prettierrc')
const prettierConfig = require(prettierConfigPath)
const path = require('path')

const RESERVED_TYPEDOC_KEYWORDS = {
  interfaces: 'Interfaces',
  props: 'Props',
  md: '.md',
  tsxCodeBlockHeader: '```tsx copy showLineNumbers filename="example.tsx"',
  tsxCodeBlockEnd: '```',
  typeAlias: '## Type Aliases',
}

const CWD = process.cwd()
const TMP_DOCS_PATH = `${CWD}/__tmpDocs`

/**
 * Transform a string from PascalCase to kebab-case
 *
 * @param {string} str
 * @returns
 */
function pascalCaseToKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Finds references to interfaces and props files and replaces them with
 * the correct path
 *
 * @param {string} file
 * @returns
 */
function typedocPluginShorelineLinks(file) {
  let parsedFile = file

  const interfaceLinks = file.match(
    /\(interfaces\/([A-Z][a-zA-Z0-9]*)Props.md\)/g
  )

  const propsLinks = file.match(/(\([A-Z][a-zA-Z0-9]*)Props.md\)/g)

  if (interfaceLinks) {
    for (const link of interfaceLinks) {
      const componentName = link
        .replace('(interfaces/', '')
        .replace('Props.md)', '')

      const updatedLink = link.replaceAll(
        `interfaces/${componentName}Props.md`,
        `/components/${pascalCaseToKebabCase(componentName)}/props.md`
      )

      parsedFile = parsedFile.replaceAll(link, updatedLink)
    }
  }

  if (propsLinks) {
    for (const link of propsLinks) {
      const componentName = link.replace('(', '').replace('Props.md)', '')

      const updatedLink = link.replace(
        `${componentName}Props.md`,
        `/components/${pascalCaseToKebabCase(componentName)}/props.md`
      )

      parsedFile = parsedFile.replaceAll(link, updatedLink)
    }
  }

  return parsedFile
}

function exampleToSandpackTemplate(example) {
  // Extract components from example
  const components = example.match(/<([A-Z][a-zA-Z0-9]*)/g)
  // Remove duplicate components
  const uniqueComponents = [
    ...new Set(components.map((component) => component.replace('<', ''))),
  ]

  // Import components from @vtex/shoreline-components on a single import line
  const imports = `import { ${uniqueComponents.join(
    ', '
  )} } from '@vtex/shoreline-components'`

  // Removes markdown code block
  const parsedExample = example
    .replace(RESERVED_TYPEDOC_KEYWORDS.tsxCodeBlockHeader, '')
    .replace(RESERVED_TYPEDOC_KEYWORDS.tsxCodeBlockEnd, '')

  // Add example within export default
  const exportedExample = `
  export default function App() { 
    return (<>${parsedExample}</>
  )}`

  const code = `import React from 'react'\n${imports}\n${exportedExample}`

  // Add imports and example to template
  const template =
    `
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react' 

<SandpackProvider 
  template="react" 
  theme="dark"
  customSetup={{ dependencies: { '@vtex/shoreline-components': '^0.x' } }}
  files={{'/App.js': ` +
    `\`${code}\`` +
    `,
  }}
>
  <SandpackLayout>
    <SandpackCodeEditor />
    <SandpackPreview />
  </SandpackLayout>
</SandpackProvider>`

  return template
}

/**
 * Add a Sandpack example to the docs based on a given `@example` block
 *
 * @param {string} file
 * @returns
 */
function addSandpack(file) {
  const exampleIndex = file.indexOf(
    RESERVED_TYPEDOC_KEYWORDS.tsxCodeBlockHeader
  )

  const exampleEndIndex = file.indexOf(
    `${RESERVED_TYPEDOC_KEYWORDS.tsxCodeBlockEnd}\n`,
    exampleIndex
  )

  if (exampleIndex === -1 || exampleEndIndex === -1) {
    return file
  }

  const example = file.substring(
    exampleIndex,
    exampleEndIndex + RESERVED_TYPEDOC_KEYWORDS.tsxCodeBlockEnd.length
  )

  const template = exampleToSandpackTemplate(example)

  const newExample = `${example}\n\n${template}`

  return file.replace(example, newExample)
}

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
 * Split the generated docs from typedoc into multiple nextra files.
 * This is the typedoc-to-nextra.js entrypoint.
 */
function typedocToNextra() {
  const rootFile = fs.readFileSync(`${TMP_DOCS_PATH}/modules.md`, 'utf8')
  const interfacesFiles = fs.readdirSync(`${TMP_DOCS_PATH}/interfaces`)

  const rootFileContent = typedocPluginShorelineLinks(rootFile)
    // typedoc-plugin-markdown generates a single file with all the docs separated by "___"
    .split('___')

  const components = []
  const hooks = []

  for (const fileContents of rootFileContent) {
    try {
      // Parse file contents
      const content = fileContents.split('\n')

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
      const isTypeAlias = methodName.includes(RESERVED_TYPEDOC_KEYWORDS.props)

      if (isHook && !isTypeAlias) {
        const kebabCaseName = pascalCaseToKebabCase(methodName)
        const folderPath = `${TMP_DOCS_PATH}/hooks/${kebabCaseName}`

        fs.mkdirSync(folderPath, {
          recursive: true,
        })

        const filePath = `${folderPath}/code.mdx`

        fs.writeFileSync(filePath, fileContents)

        prettify(filePath)

        hooks.push(methodName)

        continue
      }

      if (isPascalCase && !isHook && !isTypeAlias) {
        const kebabCaseName = pascalCaseToKebabCase(methodName)
        const folderPath = `${TMP_DOCS_PATH}/components/${kebabCaseName}`

        fs.mkdirSync(folderPath, {
          recursive: true,
        })

        const filePath = `${folderPath}/code.mdx`

        let parsedFileContents = fileContents
          // Replace type annotations with the jsx syntax
          .replaceAll('```ts', RESERVED_TYPEDOC_KEYWORDS.tsxCodeBlockHeader)
          // Replace the link reference to the interface file with the props file
          .replaceAll(`(interfaces/${methodName}Props.md)`, '(props.md)')

        parsedFileContents = addSandpack(parsedFileContents)

        fs.writeFileSync(filePath, parsedFileContents)

        prettify(filePath)

        components.push(methodName)

        const correspondingInterface = interfacesFiles.find(
          (i) =>
            i
              .replace(RESERVED_TYPEDOC_KEYWORDS.md, '')
              .replace(RESERVED_TYPEDOC_KEYWORDS.props, '') === methodName
        )

        if (correspondingInterface) {
          const interfaceFile = fs.readFileSync(
            `${TMP_DOCS_PATH}/interfaces/${correspondingInterface}`,
            'utf8'
          )

          const interfaceFilePath = `${folderPath}/props.mdx`

          const parsedInterfaceFile = typedocPluginShorelineLinks(interfaceFile)
            // Replace the interface name with the component name on the title
            .replace('Interface: ', '')
            // Use the component kebab-case name when referencing some id on the page
            .replaceAll(`${correspondingInterface}#`, `props.md#`)

          fs.writeFileSync(interfaceFilePath, parsedInterfaceFile)

          prettify(interfaceFilePath)
        }

        continue
      }

      if (isTypeAlias && !isHook) {
        const kebabCaseName = pascalCaseToKebabCase(methodName).replace(
          '-props',
          ''
        )

        const folderPath = `${TMP_DOCS_PATH}/components/${kebabCaseName}`

        fs.mkdirSync(folderPath, {
          recursive: true,
        })

        const filePath = `${folderPath}/props.mdx`

        // Replace the link reference to the interface file with the props file
        let parsedFileContents = fileContents

        // Removes the interfaces list that preceeds the type aliases
        // from the typedoc generated file. This is only necessary for
        // the first type alias, since the others are already separated
        if (fileContents.includes(RESERVED_TYPEDOC_KEYWORDS.typeAlias)) {
          parsedFileContents = fileContents.split(
            RESERVED_TYPEDOC_KEYWORDS.typeAlias
          )[1]
        }

        fs.writeFileSync(filePath, parsedFileContents)

        prettify(filePath)

        continue
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Move everything under ${TMP_DOCS_PATH} to packages/next-docs/pages
  const pagesPath = `${CWD}/packages/next-docs/pages`
  const componentsMetaJson = `${CWD}/packages/next-docs/pages/components/_meta.json`
  const hooksMetaJson = `${CWD}/packages/next-docs/pages/hooks/_meta.json`

  copyFolderRecursiveSync(`${TMP_DOCS_PATH}/components`, pagesPath)
  copyFolderRecursiveSync(`${TMP_DOCS_PATH}/hooks`, pagesPath)

  // Update componentsMetaJson with the new paths
  // Adds the components as kebab-case on keys and PascalCase on values
  const componentsMetaUpdated = components.reduce((acc, cur) => {
    return {
      ...acc,
      [pascalCaseToKebabCase(cur)]: cur,
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
      [pascalCaseToKebabCase(cur)]: cur,
    }
  }, {})

  // Write the updated componentsMetaJson
  fs.writeFileSync(hooksMetaJson, JSON.stringify(hooksMetaUpdated, null, 2))

  // TODO: Remove __tmpDocs folder
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

typedocToNextra()
