import React from 'react'
import { cx, css } from 'emotion'
import { useColor } from '@vtex/admin-ui'
import { useBox, BoxHTMLProps, BoxOptions } from 'reakit'
import { createHook, createComponent, useCreateElement } from 'reakit-system'
import { Link } from 'gatsby'

export type AnchorOptions = BoxOptions
export type AnchorHTMLProps = BoxHTMLProps &
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
export type AnchorProps = AnchorOptions & AnchorHTMLProps

export const useAnchor = createHook<AnchorOptions, AnchorHTMLProps>({
  name: 'Anchor',
  compose: useBox,
  useProps(_, htmlProps) {
    const color = useColor('primary.base')
    const anchor = css`
      color: ${color};
      font-weight: 500;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    `

    return { ...htmlProps, className: cx(anchor, htmlProps.className) }
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

export default Anchor
