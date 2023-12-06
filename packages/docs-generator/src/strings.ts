import { regexes, tokens } from './config'

/**
 * Removes all occurrences of a substring from a string
 */
export function removeSubstring(
  str: string,
  substring: string | RegExp | Array<string | RegExp>
) {
  if (typeof substring === 'string' || substring instanceof RegExp) {
    return str.replaceAll(substring, tokens.empty)
  }

  if (Array.isArray(substring)) {
    let parsedString = str

    for (const sub of substring) {
      if (sub instanceof RegExp) {
        parsedString = parsedString.replace(sub, tokens.empty)
      } else {
        parsedString = parsedString.replaceAll(sub, tokens.empty)
      }
    }

    return parsedString
  }

  return ''
}

/**
 * Transforms a string from PascalCase to kebab-case
 */
export function pascalCaseToKebabCase(str: string) {
  return str.replace(regexes.pascalCase, '$1-$2').toLowerCase()
}

/**
 * Finds references to interfaces and props files and replaces them with
 * the specified path
 */
export function toRelativeLinks(file: string) {
  let parsedFile = file

  const interfaceLinks = file.match(regexes.interfacesLinks)
  const propsLinks = file.match(regexes.propsLinks)

  if (interfaceLinks) {
    for (const link of interfaceLinks) {
      const componentName = removeSubstring(link, ['interfaces/', 'Props.md'])

      const updatedLink = link.replaceAll(
        `interfaces/${componentName}Props.md`,
        `/components/${pascalCaseToKebabCase(componentName)}/props.md`
      )

      parsedFile = parsedFile.replaceAll(link, updatedLink)
    }
  }

  if (propsLinks) {
    for (const link of propsLinks) {
      const componentName = removeSubstring(link, ['Props.md'])

      const updatedLink = link.replace(
        `${componentName}Props.md`,
        `/components/${pascalCaseToKebabCase(componentName)}/props.md`
      )

      parsedFile = parsedFile.replaceAll(link, updatedLink)
    }
  }

  return parsedFile
}

/**
 * Removes everything between two strings while preserving the last string.
 * This function is useful for removing sections of file that are not necessary.
 */
export function removeBetweenStrings(
  fileContents: string,
  startString: string,
  endString: string
) {
  const startIndex = fileContents.indexOf(startString)
  const endIndex = fileContents.indexOf(endString)

  if (startIndex === -1 || endIndex === -1) {
    return fileContents
  }

  return fileContents.slice(0, startIndex) + fileContents.slice(endIndex)
}

/**
 * Removes a line from a string if it contains the specified substring
 */
export function removeLineContainingString(
  fileContent: string,
  searchString: string
) {
  const lines = fileContent.split('\n')
  const filteredLines = lines.filter((line) => !line.includes(searchString))

  return filteredLines.join('\n')
}

/**
 * Cleans the generated typedoc file from unnecessary content
 */
export function cleanFile(fileContent: string): string[] {
  const step1 = toRelativeLinks(fileContent)
  const step2 = removeSubstring(step1, [
    regexes.definedInInternal,
    regexes.definedInExternal,
    regexes.returnsHeader,
    regexes.functionsHeader,
    tokens.functionsHeader,
    tokens.exoticComponentNote,
  ])

  // typedoc-plugin-markdown generates a single file with all the docs separated by "___"
  const step3 = step2.split(tokens.separator)

  return step3
}
