import React, {
  Children,
  cloneElement,
  ReactNode,
  forwardRef,
  Ref,
} from 'react'
import { isElement } from 'react-is'
import { Set, SetProps } from '../Set'
import { ReakitToolbar, ReakitToolbarItem, ToolbarState } from './components'

/**
 * Toolbar enables accessible navigation.
 *
 * @example
 * ```jsx
 * import { Toolbar, useToolbarState } from `@vtex/admin-ui`
 *
 * const state = useToolbarState()
 *
 * <Toolbar state={state}>
 *  <Button>Item 1</Button>
 *  <Button>Item 2</Button>
 *  <Button>Item 3</Button>
 * </Toolbar>
 * ```
 */
export const Toolbar = forwardRef(function Toolbar(
  props: ToolbarProps,
  ref: Ref<HTMLDivElement>
) {
  const { children, state, ...rest } = props

  return (
    <ReakitToolbar {...state}>
      <Set spacing={3} {...rest} ref={ref}>
        {Children.map(children, (child, index) => {
          if (isElement(child)) {
            return (
              <ReakitToolbarItem {...state} key={index}>
                {(itemProps) => cloneElement(child, { ...itemProps })}
              </ReakitToolbarItem>
            )
          }

          return null
        })}
      </Set>
    </ReakitToolbar>
  )
})

export interface ToolbarProps extends SetProps {
  /**
   * `children`
   */
  children: ReactNode
  /**
   * Allows accessible navigation
   */
  state: ToolbarState
}
