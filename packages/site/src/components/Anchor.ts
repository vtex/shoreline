import type React from 'react'
import { useSystem } from '@vtex/admin-ui'
import type { BoxHTMLProps, BoxOptions } from 'reakit'
import { useBox } from 'reakit'
import { createHook, createComponent, useCreateElement } from 'reakit-system'
import { Link } from 'gatsby'

export const useAnchor = createHook<AnchorOptions, AnchorHTMLProps>({
  name: 'Anchor',
  compose: useBox,
  useProps(_, htmlProps) {
    const { cn } = useSystem()

    return {
      ...htmlProps,
      className: cn({
        color: 'blue',
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
