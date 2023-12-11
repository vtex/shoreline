/* eslint-disable no-await-in-loop */

import { existsSync, readFileSync, writeFile, writeFileSync } from 'fs'
import { ProjectParser } from './json-parser'
import { format } from 'prettier'
import Handlebars from 'handlebars'

export async function parseJSONDocs() {
  const data = JSON.parse(readFileSync('./documentation.json', 'utf8'))
  const project = new ProjectParser({ data })

  for (const func of project.functions) {
    const componentProps: Array<{
      propName: string
      propOptional: boolean
      propDescription: string
      propType: string
      propDefaultValue?: string
    }> = []

    const props = project.interfaces.find((i) => {
      return i.name === `${func.name}Props`
    })

    if (props) {
      props.properties.forEach((prop) => {
        componentProps.push({
          propName: prop.name,
          propOptional: prop.optional,
          propDescription: prop.comment?.description ?? '',
          propType: `\`${prop.type
            .toString()
            .replaceAll('```ts', '')
            .replaceAll('```', '')}\``,
          propDefaultValue: (() => {
            const defaultValue =
              prop.comment.blockTags.find((tag) => {
                return tag.name === 'default'
              })?.text ?? ''

            if (!defaultValue) {
              return undefined
            }

            return defaultValue.replace('```ts', '`').replace('```', '`')
          })(),
        })
      })
    } else {
      const types = project.typeAliases.find((t) => {
        return t.name === `${func.name}Props`
      })

      if (types) {
        // TODO: Process type aliases
      }
    }

    // Check if function name is pascal case
    const isComponent = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/.test(func.name)

    if (isComponent) {
      // Use component template
      const componentTemplate = Handlebars.compile(
        readFileSync('./src/templates/component.mdx.hbs', 'utf8')
      )

      // Generate component
      const component = componentTemplate({
        sourceUrl: func.source?.url,
        name: func.name,
        description: func.signatures[0].comment.description,
        example: (() => {
          const codeBlock = func.signatures[0].comment.blockTags.find(
            (tag) => tag.name === 'example'
          )?.text

          if (!codeBlock) {
            return false
          }

          return codeBlock.replace('```ts', '').replace('```', '')
        })(),
        parameters: func.signatures[0].parameters.map((param) => {
          return {
            paramName: param.name,
            paramType: `\`${param.type}\``,
          }
        }),
        props: componentProps,
      })

      const kebabCaseComponentName = func.name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase()

      await createOrUpdateFile(
        `../next-docs/pages/components/${kebabCaseComponentName}/code.mdx`,
        component
      )
    }
  }

  // Update _meta.json
  const metaTemplate = Handlebars.compile(
    readFileSync('./src/templates/_meta.json.hbs', 'utf8')
  )

  const meta = metaTemplate({
    components: project.functions.map((func) => {
      return {
        key: func.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
        value: func.name,
      }
    }),
  })

  await createOrUpdateFile(`../next-docs/pages/components/_meta.json`, meta)
}

/**
 * Prettify a file using the .prettierrc config
 */
export async function prettify(filePath: string) {
  const prettierOptions = {
    parser: 'markdown',
  }

  const file = readFileSync(filePath, 'utf8')
  const formatted = format(file, prettierOptions)

  await createOrUpdateFile(filePath, formatted)
}

/**
 * Create or update a file
 */
export async function createOrUpdateFile(filePath: string, content: string) {
  if (!existsSync(filePath)) {
    // Create file with content on filePath
    await new Promise((res, reject) => {
      writeFile(filePath, content, (err) => {
        if (err) {
          console.error('Error writing to file:', err)
          reject(err)
        }

        res(true)
      })
    })
  } else {
    writeFileSync(filePath, content)
  }

  await prettify(filePath)
}
