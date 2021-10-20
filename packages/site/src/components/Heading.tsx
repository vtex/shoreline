import React from 'react'
import type { HeadingProps } from '@vtex/admin-ui'
import { Heading as BaseHeading } from '@vtex/admin-ui'

type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
type Props = HeadingProps & { as?: HeadingTags }

function Heading(props: Props) {
  const { children, as = 'h1', ...headingProps } = props
  const fontSize = {
    h1: '2.8rem',
    h2: '1.8rem',
    h3: '1.5rem',
    h4: '1.2rem',
    h5: '1.125rem',
    h6: '1rem',
  }[as]

  const slugDistance = {
    h1: -28,
    h2: -18,
    h3: -15,
    h4: -12,
    h5: -12,
    h6: -10,
  }[as]

  const paddingTop = {
    h1: 0,
    h2: '3rem',
    h3: 4,
    h4: 3,
    h5: 2,
    h6: 2,
  }[as]

  const marginBottom = {
    h1: 8,
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
  }[as]

  const fontSettings = {
    h1: 'thin',
    h2: 'medium',
    h3: 'medium',
    h4: 'medium',
    h5: 'medium',
    h6: 'medium',
  }[as]

  return (
    <BaseHeading
      as={as}
      csx={{
        fontSize,
        fontSettings,
        paddingTop,
        marginBottom,
        position: 'relative',
        color: 'base',
        '> a > *': {
          fontSize,
          visibility: 'hidden',
          position: 'absolute',
          left: slugDistance,
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
