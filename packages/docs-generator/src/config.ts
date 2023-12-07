import { cwd as cwdir } from 'process'
import type TypeDoc from 'typedoc'

const cwd = cwdir()

/**
 * Regex patterns used to parse the generated docs
 */
const regexPatterns = {
  camelCase: '[A-Z][a-zA-Z0-9]*',
}

/**
 * Tokens from TypeDoc used to parse the generated docs
 */
export const typedocTokens = {
  interfaces: 'Interfaces',
  interfaceHeader: 'Interface: ',
  typeAliasHeader: '## Type Aliases',
  functionsHeader: '## Functions',
  hierarchyHeader: '## Hierarchy',
  propertiesHeader: '## Properties',
  props: 'Props',
  md: '.md',
  propsMd: 'Props.md',
  tsCodeBlockHeader: '```ts',
  codeBlockEnd: '```',
  separator: '___',
  methodDocStart: '###',
  exoticComponentNote: '**NOTE**: Exotic components are not callable.',
}

/**
 * Tokens used to replace certain parts of the generated docs, likely
 * tokens from the typedocTokens constant
 */
export const tokens = {
  tsxCodeBlockHeader: '```jsx copy showLineNumbers',
  empty: '',
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
    `(interfaces/(${regexPatterns.camelCase})${typedocTokens.propsMd})`,
    'g'
  ),
  propsLinks: new RegExp(
    `((${regexPatterns.camelCase})${typedocTokens.propsMd})`,
    'g'
  ),
  componentDeclaration: new RegExp(`<(${regexPatterns.camelCase})`, 'g'),
}

export const paths = {
  cwd,
  tmp: `${cwd}/__tmpDocs`,
}

export const defaultTypedocConfig: Partial<TypeDoc.Configuration.TypeDocOptions> =
  {
    excludeExternals: true,
    externalPattern: ['**/node_modules/**'],
    commentStyle: 'all',
    out: '__tmpDocs',
    plugin: ['typedoc-plugin-markdown', 'typedoc-plugin-mdn-links'],
    // @ts-expect-error - since these options come from typedoc-plugin-markdown options, which are not typed
    hideInPageTOC: true,
    hideBreadcrumbs: true,
  }
