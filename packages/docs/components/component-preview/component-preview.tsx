'use client'

import React, { Suspense, useMemo } from 'react'
import { Spinner } from '@vtex/shoreline-components'
import Frame from 'react-frame-component'

interface Props {
  name: string
}

const examples = {
  'button-demo': React.lazy(() => import('../../examples/button-demo')),
}

export function ComponentPreview(props: Props) {
  const { name } = props
  const Preview = useMemo(() => {
    const Comp = examples[name]

    if (!Comp) {
      return <div>not found</div>
    }

    return <Comp />
  }, [name])

  return (
    <div>
      <Frame
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
    </div>
  )
}
