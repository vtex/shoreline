import type TypeDoc from 'typedoc'

export const defaultTypedocConfig: Partial<TypeDoc.Configuration.TypeDocOptions> =
  {
    excludeExternals: true,
    externalPattern: ['**/node_modules/**'],
    commentStyle: 'all',
    out: '__tmpDocs',
    plugin: ['typedoc-plugin-mdn-links'],
  }
