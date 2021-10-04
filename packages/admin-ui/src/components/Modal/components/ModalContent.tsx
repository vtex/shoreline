import type { ComponentPropsWithRef } from 'react'
import { useMemo } from 'react'
import { jsx } from '@vtex/admin-ui-react'
import { get } from '@vtex/admin-ui-util'
import type { StyleObject } from '@vtex/admin-ui-core'

import { useModalContext } from './ModalContext'
import { getScrollAreaSize } from '../util'

/**
 * Content of the modal
 * Renders a section element
 * @example
 * ```jsx
 * import { Modal } from `@vtex/admin-ui`
 *
 * <Modal>
 *  <ModalContent>
 *    <Button>Cancel</Button>
 *  </ModalContent>
 * </Modal>
 * ```
 */
export const ModalContent = jsx('section')(
  {
    paddingTop: 4,
    paddingX: 6,
    paddingBottom: 6,
  },
  {
    useOptions(_, props) {
      const { csx, ...contentProps } = props

      const { hasHeader, hasFooter, size } = useModalContext()

      const scrollSize = useMemo(
        () => getScrollAreaSize(hasHeader, hasFooter, size),
        [hasHeader, hasFooter, size]
      )

      const scrollbarStyles: StyleObject = {
        scrollbarWidth: 'thin',
        scrollbarColor: 'light.primary',
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: 'mid.tertiary',
          borderRadius: '6px',
          border: '2px solid',
          color: 'light.primary',
        },
        overflowY: 'auto',
      }

      const scrollbarSizeStyles = {
        '-with-small-scroll-area': {
          ...scrollbarStyles,
          height: 'calc(100% - 3.5rem)',
        },
        '-with-regular-scroll-area': {
          ...scrollbarStyles,
          height: 'calc(100% - 3.5rem)',
        },
        '-with-large-scroll-area': {
          ...scrollbarStyles,
          height: 'calc(100% - 5rem)',
        },
        '-with-larger-scroll-area': {
          ...scrollbarStyles,
          height: 'calc(100% - 7rem)',
        },
        '-with-extra-large-scroll-area': {
          ...scrollbarStyles,
          height: 'calc(100% - 10rem)',
        },
      }

      return {
        ...contentProps,
        csx: {
          ...get(scrollbarSizeStyles, scrollSize, {}),
          ...csx,
        },
      }
    },
  }
)

export type ModelContentProps = ComponentPropsWithRef<typeof ModalContent>
