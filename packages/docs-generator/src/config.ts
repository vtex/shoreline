import type TypeDoc from 'typedoc'

/**
 * The default typedoc config
 */
export const defaultTypedocConfig: Partial<TypeDoc.Configuration.TypeDocOptions> =
  {
    excludeExternals: true,
    externalPattern: ['**/node_modules/**'],
    commentStyle: 'all',
    plugin: ['typedoc-plugin-mdn-links'],
  }
