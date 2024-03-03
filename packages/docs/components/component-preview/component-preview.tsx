'use client'

import React, { Suspense, useMemo } from 'react'
import { Spinner } from '@vtex/shoreline-components'
import Frame from 'react-frame-component'
import codes from '../../__examples__'

interface Props {
  name: string
}

export function ComponentPreview(props: Props) {
  const { name } = props

  const code = useMemo(() => {
    return codes[name].code
  }, [name])

  const Preview = useMemo(() => {
    const Comp = codes[name].component

    if (!Comp) {
      return <div>not found</div>
    }

    return <Comp />
  }, [name])

  return (
    <div>
      <Frame
        style={{
          width: '100%',
        }}
        head={
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@vtex/shoreline-theme-sunrise/dist/sunrise.css"
          />
        }
      >
        <Suspense fallback={<Spinner description="Loading component" />}>
          {Preview}
        </Suspense>
      </Frame>
      <div
        dangerouslySetInnerHTML={{
          __html: code,
        }}
      />
    </div>
  )
}
