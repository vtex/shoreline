import type { ReactNode } from 'react'
import { LocaleProvider } from '@vtex/shoreline'

import { MockRuntimeProvider } from '../../../test-utils'

/**
 * Storybook decorator: LocaleProvider + mock AI runtime (stream + local attachments).
 */
export function ComposerStoryDecorator(props: {
  locale?: string
  children: ReactNode
}) {
  const { locale = 'en-US', children } = props

  return (
    <LocaleProvider locale={locale}>
      <MockRuntimeProvider>{children}</MockRuntimeProvider>
    </LocaleProvider>
  )
}
