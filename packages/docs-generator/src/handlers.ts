import { paths, regexes, tokens } from './config'
import { createOrUpdateFile, prettify } from './io'
import {
  pascalCaseToKebabCase,
  removeBetweenStrings,
  removeLineContainingString,
  removeSubstring,
  toRelativeLinks,
} from './strings'
import { mkdirSync, readFileSync } from 'fs'

/**
 * Add a component to the docs
 */
export async function handleComponents(
  methodName: string,
  fileContents: string,
  interfacesFiles: string[],
  components: string[]
) {
  const kebabCaseName = pascalCaseToKebabCase(methodName)
  const folderPath = `${paths.tmp}/components/${kebabCaseName}`

  mkdirSync(folderPath, {
    recursive: true,
  })

  const filePath = `${folderPath}/code.mdx`

  const parsedFileContents = removeLineContainingString(
    fileContents,
    `**${methodName}**` + '(`props`)'
  )
    // Replace type annotations with the jsx syntax
    .replaceAll('```ts', tokens.tsxCodeBlockHeader)
    // Replace the link reference to the interface file with the props file
    .replaceAll(`(interfaces/${methodName}Props.md)`, '(props.md)')

  await createOrUpdateFile(filePath, parsedFileContents)

  prettify(filePath)

  components.push(methodName)

  const correspondingInterface = interfacesFiles.find(
    (i) => removeSubstring(i, [tokens.md, tokens.props]) === methodName
  )

  if (correspondingInterface) {
    const interfaceFile = readFileSync(
      `${paths.tmp}/interfaces/${correspondingInterface}`,
      'utf8'
    )

    const interfaceFilePath = `${folderPath}/props.mdx`

    // Cleans an interface file from unnecessary content
    let parsedInterfaceFile = removeSubstring(
      toRelativeLinks(interfaceFile)
        // Use the component kebab-case name when referencing some id on the page
        .replaceAll(`${correspondingInterface}#`, `props.md#`),
      [
        tokens.interfaceHeader,
        regexes.definedInInternal,
        regexes.definedInExternal,
      ]
    )

    // Removes the hierarchy section from the interface file
    parsedInterfaceFile = removeBetweenStrings(
      parsedInterfaceFile,
      tokens.hierarchyHeader,
      tokens.propertiesHeader
    )

    await createOrUpdateFile(interfaceFilePath, parsedInterfaceFile)

    prettify(interfaceFilePath)
  }
}

/**
 * Handles type aliases, which are interfaces that are declared as types
 * instead of interfaces. This is necessary because typedoc does not
 * generate a separate file for type aliases, so we need to create it
 * manually.
 */
export async function handleTypeAliases(
  methodName: string,
  fileContents: string
) {
  const kebabCaseName = pascalCaseToKebabCase(methodName).replace(
    '-props',
    tokens.empty
  )

  const folderPath = `${paths.tmp}/components/${kebabCaseName}`

  mkdirSync(folderPath, {
    recursive: true,
  })

  const filePath = `${folderPath}/props.mdx`

  // Replace the link reference to the interface file with the props file
  let parsedFileContents = fileContents

  // Removes the interfaces list that preceeds the type aliases
  // from the typedoc generated file. This is only necessary for
  // the first type alias, since the others are already separated
  if (fileContents.includes(tokens.typeAliasHeader)) {
    parsedFileContents = fileContents.split(tokens.typeAliasHeader)[1]
  }

  await createOrUpdateFile(filePath, parsedFileContents)

  prettify(filePath)
}

/**
 * Add a hook to the docs
 */
export async function handleHooks(
  methodName: string,
  fileContents: string,
  hooks: string[]
) {
  const kebabCaseName = pascalCaseToKebabCase(methodName)
  const folderPath = `${paths.tmp}/components/hooks/${kebabCaseName}`

  mkdirSync(folderPath, {
    recursive: true,
  })

  const filePath = `${folderPath}/code.mdx`

  await createOrUpdateFile(filePath, fileContents)
  prettify(filePath)

  hooks.push(methodName)
}
