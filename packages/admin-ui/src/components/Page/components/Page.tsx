import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'

/**
 * Page component
 * @example
 * <Page>
 *  <PageContent />
 * </Page>
 */
export const Page = jsx.div({
  display: 'block',
  width: '100%',
})

export type PageProps = ComponentPropsWithRef<typeof Page>
