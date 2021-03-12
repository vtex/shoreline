import {
  Text,
  createComponent,
  Primitive,
  PrimitiveProps,
  jsxs,
} from '@vtex/admin-ui'

import { renderAst } from './renderAst'

export const TableOfContents = createComponent(Primitive, useTableOfContents)

export function useTableOfContents(
  props: TableOfContentsProps
): PrimitiveProps<'aside'> {
  const { tableOfContentsAst } = props

  return {
    element: 'aside',
    csx: {
      themeKey: 'components.toc',
    },
    children: [
      jsxs(Text, {}, 'ON THIS PAGE'),
      jsxs('nav', {}, renderAst(tableOfContentsAst)),
    ],
  }
}

interface TableOfContentsProps {
  readmeUrl: string
  sourceUrl: string
  title: string
  tableOfContentsAst: Record<string, unknown>
}
