import type TypeDoc from 'typedoc'

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
