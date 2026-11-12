import type { ReactNode } from 'react'
import { LocaleProvider } from '@vtex/shoreline'

import type { StreamTransport } from '../../../runtime/types'
import { MockRuntimeProvider } from '../../../test-utils'

export function MessagesStoryDecorator(props: {
  locale?: string
  /** Replaces the default mock transport (keep the reference stable). */
  transport?: StreamTransport
  children: ReactNode
}) {
  const { locale = 'en-US', transport, children } = props

  return (
    <LocaleProvider locale={locale}>
      <MockRuntimeProvider transport={transport}>
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
