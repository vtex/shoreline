import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref } from 'react'

import { createElement } from '../../system'
import { useComponent } from '../../hooks/useComponent'
import { Overridable } from '../../types'

/**
 * Component to add links within an admin page
 */
export const Anchor = forwardRef(function Anchor(
  props: AnchorProps,
  ref: Ref<HTMLAnchorElement>
) {
  const anchorProps = useComponent({
    props,
    themeKey: 'components.anchor',
  })

  return createElement<any>({
    ref,
    element: 'a',
    component: ReakitBox,
    htmlProps: anchorProps,
  })
})

export interface AnchorProps
  extends Overridable,
    Omit<
      React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >,
      'className' | 'style'
    > {
  /**
   * anchor children
   */
  children?: ReactNode
}
