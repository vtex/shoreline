import React from 'react'
import { Heading as BaseHeading, HeadingProps } from '@vtex/admin-ui'

function Heading(props: HeadingProps) {
  const { children, element = 'h1', ...headingProps } = props
  const fontSize = {
    h1: '2.0em',
    h2: '1.5em',
    h3: '1.25em',
    h4: '1.15em',
    h5: '1.1em',
    h6: '1em',
  }[element]

  const marginTop = {
    h1: 6,
    h2: 5,
    h3: 4,
    h4: 3,
    h5: 2,
    h6: 2,
  }[element]

  return (
    <BaseHeading
      csx={{
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
