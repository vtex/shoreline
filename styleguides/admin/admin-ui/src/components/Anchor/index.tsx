import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref } from 'react'
import { useClassName } from '@vtex/admin-ui-system'

import { jsxs } from '../../system'
import { OmitNotAllowedProps, Overridable } from '../../types'

/**
 * Component to add links within an admin page
 */
export const Anchor = forwardRef(function Anchor(
  props: AnchorProps,
  ref: Ref<HTMLAnchorElement>
) {
  const anchorProps = useAnchor(props)

  return jsxs({
    ref,
    element: 'a',
    component: ReakitBox,
    props: anchorProps as Record<string, unknown>,
  })
})

function useAnchor(props: AnchorProps) {
  const { styleOverrides, ...htmlProps } = props
  const className = useClassName({
    themeKey: 'components.anchor',
    ...styleOverrides,
  })

  return { className, ...htmlProps }
}

export interface AnchorProps
  extends Overridable,
    OmitNotAllowedProps<
      React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >
    > {
  /**
   * anchor children
   */
  children?: ReactNode
}
