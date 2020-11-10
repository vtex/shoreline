import React from 'react'
import { cn } from '@vtex/admin-ui'
import { useBox, BoxHTMLProps, BoxOptions } from 'reakit'
import { createHook, createComponent, useCreateElement } from 'reakit-system'
import { Link } from 'gatsby'

export const useAnchor = createHook<AnchorOptions, AnchorHTMLProps>({
  name: 'Anchor',
  compose: useBox,
  useProps(_, htmlProps) {
    return {
      ...htmlProps,
      className: cn({
        color: 'primary.base',
        textDecoration: 'none',
        ':hover': { textDecoration: 'underline' },
      }),
    }
  },
})

const Anchor = createComponent({
  as: 'a',
  useHook: useAnchor,
  useCreateElement(type, { href, ...props }, children) {
    return useCreateElement(
      href && /^\/(?!\/)/.test(href) ? Link : type,
      { href, ...props },
      children
    )
  },
})

export type AnchorOptions = BoxOptions
export type AnchorHTMLProps = BoxHTMLProps &
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
export type AnchorProps = AnchorOptions & AnchorHTMLProps

export default Anchor
