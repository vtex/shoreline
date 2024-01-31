/* eslint-disable no-await-in-loop */
import { createOrUpdateFile, prettify } from '../io'
import type { FunctionParser, ProjectParser } from 'typedoc-json-parser'
import { isComponent, toKebabCase, acronyms, getPart } from '../strings'
import { getTemplate } from '../templates'
import type { ComponentDocumentationPaths } from '../config'
import { existsSync, readFileSync } from 'fs'

/**
 * Tokens used to replace content from the component template.
 */
const TOKENS = {
  CODE_BLOCKS: {
    TS_START: '```ts',
    END: '```',
  },
  TAGS: {
    DEFAULT: 'default',
    EXAMPLE: 'example',
    PLAYGROUND: 'playground',
  },
}

/**
 * Generate the component documentation using the component template.
 * Searches for the component props in the interfaces and type aliases
 * reflections generated by typedoc. It writes the generated documentation.
 *
 * @param project The project parser
 * @param func The function parser of the component
 * @param paths The paths of the component documentation
 */
async function generateComponent(
  project: ProjectParser,
  func: FunctionParser,
  paths: ComponentDocumentationPaths
) {
  const { docPath, filename } = paths
  const componentProps = generateComponentProps(project, func)

  // Use component template
  const componentTemplate = getTemplate('component.mdx')

  // Generate component documentation
  const component = componentTemplate({
    sourceUrl: func.source?.url,
    name: 'API Reference',
    description: func.signatures[0].comment.description,
    example: generateComponentPlayground(func),
    parameters: func.signatures[0].parameters.map((param) => {
      return {
        paramName: param.name,
        paramType: `\`${param.type}\``,
      }
    }),
    props: componentProps,
  })

  const kebabCaseComponentName = toKebabCase(func.name)

  let filePath = `${docPath}/${kebabCaseComponentName}/${filename}`

  const parentComponent = isSubComponent(project.functions, func.name)

  if (parentComponent) {
    filePath = `${docPath}/${toKebabCase(
      parentComponent
    )}/${kebabCaseComponentName}/${filename}`
  }

  await createOrUpdateFile(filePath, component)
  await prettify(filePath)
}

/**
 * Generates the _meta.json file for Nextra.
 * To learn more about the _meta.json file, check out the Nextra docs.
 *
 * @link https://nextra.site/docs/guide/organize-files#_metajson
 * @param project The project ProjectParser
 */
async function generateRootMetaJSON(
  project: ProjectParser,
  paths: ComponentDocumentationPaths
) {
  const metaTemplate = getTemplate('meta.json')

  if (!paths?.docPath) {
    return
  }

  const components = project.functions.reduce<ArrayFile>((result, func) => {
    if (isComponent(func.name)) {
      // Do not add subcomponents to the root _meta.json
      const parentComponent = isSubComponent(project.functions, func.name)

      if (!parentComponent) {
        const key = func.name
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
          .toLowerCase()

        result.push({ key, value: func.name })
      }
    }

    return result
  }, [])

  const meta = metaTemplate({
    components,
  })

  await createOrUpdateFile(`${paths.docPath}/_meta.json`, meta)
}

/**
 * Generates the _meta.json file for Nextra for React components.
 * To learn more about the _meta.json file, check out the Nextra docs.
 *
 * @link https://nextra.site/docs/guide/organize-files#_metajson
 * @param project The project parser
 * @todo Update to add subcomponents to _meta.json (if any)
 */
async function generateComponentMetaJSON(
  functions: FunctionParser[],
  func: FunctionParser,
  paths: ComponentDocumentationPaths
) {
  if (!paths?.docPath) {
    return
  }

  const metaTemplate = getTemplate('componentMeta.json')

  let metaPath = `${paths.docPath}/${toKebabCase(func.name)}/_meta.json`
  const parentComponent = isSubComponent(functions, func.name)

  if (parentComponent) {
    metaPath = `${paths.docPath}/${toKebabCase(parentComponent)}/${toKebabCase(
      func.name
    )}/_meta.json`
  }

  const subComponents = getSubComponents(functions, func.name)
  const name = paths.filename.replace(/\.[^/.]+$/, '')
  const capitalizedName = name
    .split('-')
    .map((word) => {
      if (acronyms[word]) {
        return acronyms[word]
      }

      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')

  const hasSubComponents = subComponents && subComponents.length > 0

  // Creates a _meta.json file in case it doesn't exist
  if (!existsSync(metaPath)) {
    const meta = metaTemplate({
      name,
      capitalizedName,
      subComponents: hasSubComponents ? subComponents : false,
    })

    await createOrUpdateFile(metaPath, meta)
    await prettify(metaPath, {
      parser: 'json',
    })

    return
  }

  // Updates the _meta.json while preserving existing data inserted manually.
  // Check if meta has filename and if it's correct.
  const metaFile = JSON.parse(readFileSync(metaPath, 'utf8'))
  const metaFilenameValue = metaFile[name]

  if (metaFilenameValue !== capitalizedName) {
    // Update meta with correct filename
    metaFile[name] = capitalizedName
  }

  if (hasSubComponents) {
    // Update meta with subcomponents
    for (const component of subComponents) {
      if (component) {
        metaFile[component.key] = component.value
      }
    }
  }

  await createOrUpdateFile(metaPath, JSON.stringify(metaFile))
  await prettify(metaPath, {
    parser: 'json',
  })
}

/**
 * Generates the index page for the components documentation.
 *
 * @param project The project parser
 * @param paths The paths of the components documentation
 */
async function generateComponentsIdxPage(
  project: ProjectParser,
  paths: ComponentDocumentationPaths
) {
  const componentsIdxTemplate = getTemplate('componentsIndex.mdx')

  if (!paths?.docPath) {
    return
  }

  const components = project.functions.reduce<ArrayFile>((result, func) => {
    if (isComponent(func.name)) {
      // Do not add subcomponents to the components index page.
      const parentComponent = isSubComponent(project.functions, func.name)

      if (!parentComponent) {
        const path = `/components/${toKebabCase(func.name)}`

        result.push({ path, name: func.name })
      }
    }

    return result
  }, [])

  const idxPage = componentsIdxTemplate({
    components,
  })

  await createOrUpdateFile(`${paths.docPath}/index.mdx`, idxPage)
}

/**
 * This is the entry point of the components documentation generation.
 *
 * @param project The project parser
 * @param paths The paths of the components documentation
 */
export async function generateComponents(
  project: ProjectParser,
  paths: ComponentDocumentationPaths
) {
  for (const func of project.functions) {
    if (isComponent(func.name)) {
      await Promise.all([
        generateComponent(project, func, paths),
        generateComponentMetaJSON(project.functions, func, paths),
      ])
    }
  }

  await Promise.all([
    generateComponentsIdxPage(project, paths),
    generateRootMetaJSON(project, paths),
  ])
}

/**
 * Parses the component props from the interfaces and type aliases reflections generated by TypeDoc.
 *
 * @param project The project parser
 * @param func The function parser of the component
 */
function generateComponentProps(project: ProjectParser, func: FunctionParser) {
  const componentProps: ComponentProps[] = []

  const props = project.interfaces.find((i) => {
    return i.name === `${func.name}Props`
  })

  if (props) {
    props.properties.forEach((prop) => {
      componentProps.push({
        propName: prop.name,
        propOptional: prop.optional,
        propDescription: prop.comment?.description ?? '',
        propType: (() => {
          return `\`${prop.type
            .toString()
            .replaceAll(TOKENS.CODE_BLOCKS.TS_START, '')
            .replaceAll(TOKENS.CODE_BLOCKS.END, '')}\``
        })(),
        propDefaultValue: (() => {
          const defaultValue =
            prop.comment.blockTags.find((tag) => {
              return tag.name === TOKENS.TAGS.DEFAULT
            })?.text ?? ''

          if (!defaultValue) {
            return undefined
          }

          return defaultValue
            .replace(TOKENS.CODE_BLOCKS.TS_START, '`')
            .replace(TOKENS.CODE_BLOCKS.END, '`')
        })(),
      })
    })
  } else {
    const types = project.typeAliases.find((t) => {
      return t.name === `${func.name}Props`
    })

    if (types) {
      componentProps.push({
        propName: types.name,
        propOptional: false,
        propDescription: types.comment?.description ?? '',
        propType: (() => {
          return `\`${types.type
            .toString()
            .replaceAll(TOKENS.CODE_BLOCKS.TS_START, '')
            .replaceAll(TOKENS.CODE_BLOCKS.END, '')}\``
        })(),
        propDefaultValue: undefined,
      })
    }
  }

  return componentProps
}

/**
 * Handles the component playground generation.
 *
 * @param func Function parser of the component
 */
function generateComponentPlayground(func: FunctionParser) {
  if (!process.env.STORYBOOK_URL) {
    const codeBlock = func.signatures[0].comment.blockTags.find(
      (tag) => tag.name === TOKENS.TAGS.EXAMPLE
    )?.text

    if (!codeBlock) {
      return false
    }

    return codeBlock.replace(TOKENS.CODE_BLOCKS.TS_START, '```jsx')
  }

  const playgroundTag = func.signatures[0].comment.blockTags.find(
    (tag) => tag.name === TOKENS.TAGS.PLAYGROUND
  )?.text

  if (typeof playgroundTag === 'undefined') {
    const codeBlock = func.signatures[0].comment.blockTags.find(
      (tag) => tag.name === TOKENS.TAGS.EXAMPLE
    )?.text

    if (!codeBlock) {
      return false
    }

    return codeBlock.replace(TOKENS.CODE_BLOCKS.TS_START, '```jsx')
  }

  const storybookFeatures = '&full=1&shortcuts=false&singleStory=true'

  const playgroundUrl = `${
    process.env.STORYBOOK_URL
  }?path=/story/components-${toKebabCase(func.name)}--play${storybookFeatures}`

  const iframeStyles = {
    width: '100%',
    height: 600,
    border: 0,
    borderRadius: 4,
  }

  return `<iframe src="${playgroundUrl}" 
    style={${JSON.stringify(iframeStyles)}}></iframe>`
}

/**
 * Checks whether a function is a subcomponent or not.
 *
 * @param functions Functions of the package
 * @param componentName Current function name
 */
function isSubComponent(functions: FunctionParser[], componentName?: string) {
  if (!componentName) {
    return false
  }

  const firstPart = getPart(componentName)

  if (!firstPart) {
    return false
  }

  const parentComponent = functions.find(
    (func) => func.name === firstPart
  )?.name

  if (
    !parentComponent ||
    firstPart !== parentComponent ||
    parentComponent === componentName
  ) {
    return false
  }

  return parentComponent
}

/**
 * Grabs the subcomponents from a component.
 *
 * @param functions Functions of the package
 * @param componentName Current function name
 */
function getSubComponents(functions: FunctionParser[], componentName?: string) {
  if (!componentName) {
    return false
  }

  const subComponents = functions
    .map((func) => {
      const firstPart = getPart(func.name)

      if (func.name !== componentName && firstPart === componentName) {
        return {
          key: toKebabCase(func.name),
          value: func.name,
        }
      }

      return false
    })
    .filter(Boolean)

  return subComponents
}

/**
 * Component props interface of the component handlebar template,
 * organized in the same order as the template.
 */
interface ComponentProps {
  /**
   * The name of the prop
   */
  propName: string
  /**
   * Whether the prop is optional or not
   */
  propOptional: boolean
  /**
   * The description of the prop
   */
  propDescription: string
  /**
   * The type of the prop
   */
  propType: string
  /**
   * The default value of the prop. This comes from the `@default` TypeDoc tag
   */
  propDefaultValue?: string
}

/**
 * A file interface for Nextra
 */
type ArrayFile = Array<Record<string, string>>
