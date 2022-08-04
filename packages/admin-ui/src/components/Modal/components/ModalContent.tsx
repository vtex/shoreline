import type { ComponentPropsWithRef } from 'react'
import { useMemo } from 'react'
import { useElement, createComponent } from '@vtex/admin-ui-react'
import { get } from '@vtex/admin-ui-util'

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
export const ModalContent = createComponent<'section'>((props) => {
  const { hasHeader, hasFooter, size } = useModalContext()

  const scrollSize = useMemo(
    () => getScrollAreaSize(hasHeader, hasFooter, size),
    [hasHeader, hasFooter, size]
  )

  const scrollbarSizeStyles = {
    '-with-small-scroll-area': {
      height: 'calc(100% - 3.5rem)',
    },
    '-with-regular-scroll-area': {
      height: 'calc(100% - 3.5rem)',
    },
    '-with-large-scroll-area': {
      height: 'calc(100% - 5rem)',
    },
    '-with-larger-scroll-area': {
      height: 'calc(100% - 7rem)',
    },
    '-with-extra-large-scroll-area': {
      height: 'calc(100% - 10rem)',
    },
  }

  return useElement('section', {
    ...props,
    baseStyle: {
      paddingTop: '$4',
      paddingX: '$6',
      paddingBottom: '$6',
      scrollbarWidth: 'thin',
      scrollbarColor: 'base',
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-thumb': {
        bg: '$secondary',
        borderRadius: '6px',
        border: '2px solid',
        color: '$primary',
      },
      overflowY: 'auto',
      ...get(scrollbarSizeStyles, scrollSize, {}),
    },
  })
})

export type ModelContentProps = ComponentPropsWithRef<typeof ModalContent>
