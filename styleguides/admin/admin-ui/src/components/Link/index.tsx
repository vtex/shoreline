// import { Box as ReakitBox } from 'reakit'
// import { ReactNode, forwardRef, Ref } from 'react'
// import { SpaceStyleProps, TextPattern } from '@vtex/admin-ui-theme'

// import { createElement } from '../../system'
// import { useComponent } from '../../hooks/useComponent'
// import { Overridable } from '../../types'

// export const Link = forwardRef(function Link(
//   props: LinkProps,
//   ref: Ref<HTMLAnchorElement>
// ) {
//   const {
//     element = 'a',
//     variant = 'primary',
//     to,
//     themeKey,
//     ...htmlProps
//   } = props

//   const linkProps = useComponent({
//     props: {
//       text: 'body',
//       ...htmlProps,
//       // variant,
//       href: `${to}`,
//       themeKey: `components.link.${variant}`,
//     },
//   })

//   return createElement({
//     ref,
//     element,
//     component: ReakitBox,
//     htmlProps: linkProps,
//   })
// })

// export interface LinkProps extends Overridable, TextPattern, SpaceStyleProps {
//   element?: 'a' | 'span'
//   children?: ReactNode
//   to?: string
//   variant?: 'primary' | 'underlined'
//   themeKey?: string
// }

import React, { ReactNode } from 'react'
// import { Link as ThemeUiLink } from 'theme-ui'

import { Overridable } from '../../types'
// import { Box } from '../Box'

export function Link(props: LinkProps) {
  const {
    variant = 'primary',
    children,
    to,
    // styleOverrides = {},
    ...linkProps
  } = props

  return (
    <a
      // style={styleOverrides}
      href={to}
      themeKey={`components.link.${variant}`}
      {...linkProps}
    >
      {children}
    </a>
  )
}

export interface LinkProps extends Overridable {
  to?: string
  variant?: 'primary' | 'underlined'
  children?: ReactNode
  themeKey?: string
}
