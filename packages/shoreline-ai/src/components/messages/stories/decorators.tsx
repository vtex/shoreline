import type { ReactNode } from 'react'
import { LocaleProvider } from '@vtex/shoreline'

import { MockRuntimeProvider } from '../../../test-utils'

export function MessagesStoryDecorator(props: {
  locale?: string
  children: ReactNode
}) {
  const { locale = 'en-US', children } = props

  return (
    <LocaleProvider locale={locale}>
      <MockRuntimeProvider>
        <div
          style={{
            height: 'calc(100vh - 2rem)',
            minHeight: 480,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>
      </MockRuntimeProvider>
    </LocaleProvider>
  )
}
