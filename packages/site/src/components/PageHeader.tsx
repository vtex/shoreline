import React from 'react'
import { tag } from '@vtex/admin-ui'

export function PageHeader(props: React.PropsWithChildren<{}>) {
  const { children } = props

  return (
    <tag.div
      csx={{
        paddingY: 6,
        marginBottom: 4,
        border: 'divider-bottom',
      }}
    >
      <tag.h1
        csx={{
          fontSize: '40px',
          position: 'relative',
          color: '#000000',
          fontSettings: 'medium',
          '> a > *': {
            visibility: 'hidden',
            position: 'absolute',
            left: -26,
          },
          '> a:focus > *, :hover > a > *': {
            visibility: 'visible',
          },
        }}
      >
        {children}
      </tag.h1>
    </tag.div>
  )
}
