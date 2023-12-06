import { cwd as cwdir } from 'process'

const cwd = cwdir()

/**
 * Regex patterns used to parse the generated docs
 */
const regexPatterns = {
  camelCase: '[A-Z][a-zA-Z0-9]*',
}

/**
 * Tokens used to parse the generated docs
 */
export const tokens = {
  interfaces: 'Interfaces',
  interfaceHeader: 'Interface: ',
  typeAliasHeader: '## Type Aliases',
  functionsHeader: '## Functions',
  hierarchyHeader: '## Hierarchy',
  propertiesHeader: '## Properties',
  props: 'Props',
  md: '.md',
  propsMd: 'Props.md',
  tsxCodeBlockHeader: '```tsx copy showLineNumbers filename="example.tsx"',
  tsxCodeBlockEnd: '```',
  separator: '___',
  methodDocStart: '###',
  empty: '',
  exoticComponentNote: '**NOTE**: Exotic components are not callable.',
}

/**
 * Regexes used to parse the generated docs
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
 */
export const regexes = {
  camelCase: new RegExp(`^${regexPatterns.camelCase}$`),
  pascalCase: /([a-z0-9])([A-Z])/g,
  definedInInternal: /#### Defined in\n\n\[[^\]]+\]\([^)]+\)/g,
  definedInExternal: /#### Defined in\n\nnode_modules\/[^:]+:[0-9]+/g,
  /**
   * The first components of the generated docs are preceeded by a Functions
   * header. This function removes this header from the first component documented
   * along with everything that preceeds it.
   */
  functionsHeader: /[\s\S]*?(?=## Functions)/,
  returnsHeader: /#### Returns\n\n((?:(?!\n\n.+)[\s\S])*)/g,
  interfacesLinks: new RegExp(
    `(interfaces/(${regexPatterns.camelCase})${tokens.propsMd})`,
    'g'
  ),
  propsLinks: new RegExp(
    `((${regexPatterns.camelCase})${tokens.propsMd})`,
    'g'
  ),
  componentDeclaration: new RegExp(`<(${regexPatterns.camelCase})`, 'g'),
}

export const paths = {
  cwd,
  tmp: `${cwd}/__tmpDocs`,
}
