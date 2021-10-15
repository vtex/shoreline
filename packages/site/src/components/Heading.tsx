import React from 'react'
import type { HeadingProps } from '@vtex/admin-ui'
import { Heading as BaseHeading } from '@vtex/admin-ui'

type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
type Props = HeadingProps & { as?: HeadingTags }

function Heading(props: Props) {
  const { children, as = 'h1', ...headingProps } = props
  const fontSize = {
    h1: '32px',
    h2: '24px',
    h3: '18px',
    h4: '16px',
    h5: '1.1em',
    h6: '1em',
  }[as]

  const marginTop = {
    h1: 6,
    h2: 8,
    h3: 4,
    h4: 3,
    h5: 2,
    h6: 2,
  }[as]

  return (
    <BaseHeading
      csx={{
        fontSize,
        position: 'relative',
        color: 'base',
        fontSettings: 'medium',
        marginTop,
        '> a > *': {
          visibility: 'hidden',
          position: 'absolute',
          left: -26,
        },
        '> a:focus > *, :hover > a > *': {
          visibility: 'visible',
        },
      }}
      {...headingProps}
    >
      {children}
    </BaseHeading>
  )
}

export default Heading
