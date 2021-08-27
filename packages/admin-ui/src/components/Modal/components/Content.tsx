import type { ReactNode, Ref } from 'react'
import React, { useMemo, forwardRef } from 'react'
import { tag } from '@vtex/admin-ui-react'
import { get } from '@vtex/onda-util'
import type { StyleObject } from '@vtex/onda-core'

import { useModalContext } from '../context'
import { getScrollAreaSize } from '../util'
import type { SystemComponent } from '../../../types'

export const ModalContent = forwardRef(function ModalContent(
  props: ModalContentProps,
  ref: Ref<HTMLDivElement>
) {
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

  return (
    <tag.section
      ref={ref}
      csx={{
        paddingTop: 4,
        paddingX: 6,
        paddingBottom: 6,
        ...get(scrollbarSizeStyles, scrollSize, {}),
        ...csx,
      }}
      {...contentProps}
    />
  )
})

export interface ModalContentProps extends SystemComponent {
  children?: ReactNode
}
