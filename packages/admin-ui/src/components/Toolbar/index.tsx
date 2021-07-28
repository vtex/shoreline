import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'

import type { SetProps } from '../Set'
import { Set } from '../Set'
import {
  ReakitToolbar,
  ToolbarItem,
  ToolbarState,
  useToolbarState,
} from './components'
import { ToolbarContext } from './context'

const _Toolbar = forwardRef(function Toolbar(
  props: ToolbarProps,
  ref: Ref<HTMLDivElement>
) {
  const { children, spacing = 3, state, csx = {}, ...rest } = props

  return (
    <ReakitToolbar {...state}>
      <ToolbarContext.Provider value={state}>
        <Set spacing={spacing} csx={csx} {...rest} ref={ref}>
          {children}
        </Set>
      </ToolbarContext.Provider>
    </ReakitToolbar>
  )
})

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
 *  <Toolbar.Item>
 *   {(itemProps) => <Button {...itemProps}>Item 1</Button>}
 *  </Toolbar.Item>
 *  <Toolbar.Item>
 *   {(itemProps) => <Button {...itemProps}>Item 2</Button>}
 *  </Toolbar.Item>
 *  <Toolbar.Item>
 *   {(itemProps) => (
 *     <MenuDisclosure state={menuState}>
 *       <Button variant="adaptative-dark" {...itemProps}>
 *         Item 3
 *       </Button>
 *     </MenuDisclosure>
 *   )}
 *  </Toolbar.Item>
 *  <Toolbar.Item>
 *   {(itemProps) => (
 *     <ModalDisclosure state={modalState}>
 *       <Button variant="adaptative-dark" {...itemProps}>
 *         Item 4
 *       </Button>
 *     </ModalDisclosure>
 *   )}
 *  </Toolbar.Item>
 *  <StatelessMenu aria-label="actions" state={menuState}>
 *   <StatelessMenu.Item icon={<IconImport />}>Download</StatelessMenu.Item>
 *   <StatelessMenu.Item icon={<IconLink />}>Link to</StatelessMenu.Item>
 *  </StatelessMenu>
 *  <StatelessModal
 *    aria-label="Seneca's modal"
 *    state={modalState}
 *    size="small"
 *  >
 *   <StatelessModal.Header title="Item 6" />
 *   <StatelessModal.Content>
 *    <Text>
 *      True happiness is to enjoy the present, without anxious dependence
 *      upon the future, not to amuse ourselves with either hopes or fears
 *      but to rest satisfied with what we have, which is sufficient, for he
 *      that is so wants nothing. The greatest blessings of mankind are
 *      within us and within our reach. A wise man is content with his lot,
 *      whatever it may be, without wishing for what he has not.
 *    </Text>
 *   </StatelessModal.Content>
 *  </StatelessModal>
 * </Toolbar>
 * ```
 */
export const Toolbar = Object.assign(_Toolbar, {
  /**
   * Toolbar.Item wraps elements and supply its accessibility
   * props via render props to the targeted element.
   *
   * @example
   * ```jsx
   * import { Toolbar, useToolbarState } from `@vtex/admin-ui`
   *
   * const state = useToolbarState()
   *
   * <Toolbar state={state}>
   *  <Toolbar.Item>
   *   {(itemProps) => <Button {...itemProps}>Item 1</Button>}
   *  </Toolbar.Item>
   *  <Toolbar.Item>
   *   {(itemProps) => <Button {...itemProps}>Item 2</Button>}
   *  </Toolbar.Item>
   *  <Toolbar.Item>
   *   {(itemProps) => (
   *     <MenuDisclosure state={menuState}>
   *       <Button variant="adaptative-dark" {...itemProps}>
   *         Item 3
   *       </Button>
   *     </MenuDisclosure>
   *   )}
   *  </Toolbar.Item>
   *  <Toolbar.Item>
   *   {(itemProps) => (
   *     <ModalDisclosure state={modalState}>
   *       <Button variant="adaptative-dark" {...itemProps}>
   *         Item 4
   *       </Button>
   *     </ModalDisclosure>
   *   )}
   *  </Toolbar.Item>
   *  <StatelessMenu aria-label="actions" state={menuState}>
   *   <StatelessMenu.Item icon={<IconImport />}>Download</StatelessMenu.Item>
   *   <StatelessMenu.Item icon={<IconLink />}>Link to</StatelessMenu.Item>
   *  </StatelessMenu>
   *  <StatelessModal
   *    aria-label="Seneca's modal"
   *    state={modalState}
   *    size="small"
   *  >
   *   <StatelessModal.Header title="Item 6" />
   *   <StatelessModal.Content>
   *    <Text>
   *      True happiness is to enjoy the present, without anxious dependence
   *      upon the future, not to amuse ourselves with either hopes or fears
   *      but to rest satisfied with what we have, which is sufficient, for he
   *      that is so wants nothing. The greatest blessings of mankind are
   *      within us and within our reach. A wise man is content with his lot,
   *      whatever it may be, without wishing for what he has not.
   *    </Text>
   *   </StatelessModal.Content>
   *  </StatelessModal>
   * </Toolbar>
   * ```
   */
  Item: ToolbarItem,
})

export interface ToolbarProps extends SetProps {
  /**
   * children component
   */
  children: ReactNode
  /**
   * Allows accessible navigation
   */
  state: ToolbarState
  /**
   * Set spacing prop
   */
  spacing?: number | undefined
}

export { useToolbarState, ToolbarState }
