import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'

/**
 * PageContent component
 * @example
 * <Page>
 *  <PageContent />
 * </Page>
 */
export const PageContent = jsx('div')({
  width: '100%',
  paddingX: 4,
})

export type PageContentProps = ComponentPropsWithRef<typeof PageContent>
