import React from 'react'
import { Heading as BaseHeading, HeadingProps } from '@vtex/admin-ui'

function Heading(props: HeadingProps) {
  const { children, element = 'h1', ...headingProps } = props
  const fontSize = {
    h1: '2.5em',
    h2: '2.0em',
    h3: '1.5em',
    h4: '1.25em',
    h5: '1.15em',
    h6: '1em',
  }[element]

  const marginTop = {
    h1: 0,
    h2: 64,
    h3: 8,
    h4: 6,
    h5: 2,
    h6: 2,
  }[element]

  return (
    <BaseHeading
      styleOverrides={{
        fontSize,
        position: 'relative',
        color: 'dark.primary',
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
