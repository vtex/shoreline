import type { VariantProps } from '@vtex/admin-ui-core'
import { styleVariants } from '@vtex/admin-ui-core'
import { createComponent, useElement } from '@vtex/admin-ui-react'

export const ToastContainer = createComponent<'div', ToastContainerOptions>(
  (props) => {
    const { tone = 'info', ...restProps } = props

    return useElement('div', {
      ...restProps,
      baseStyle: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: '16.125rem',
        width: 'auto',
        minHeight: '4.5rem',
        height: 'auto',
        maxHeight: '4.5rem',
        padding: '1rem',
        boxShadow: 'subtle',
        border: 'default',
        pointerEvents: 'all',
        overflow: 'hidden',
        paddingY: '$4',
        color: '$primary',
        borderRadius: '$default',
        ...variants({ tone }),
      },
    })
  }
)

const variants = styleVariants({
  tone: {
    critical: {
      bg: '$critical',
      border: '$critical',
    },
    positive: {
      bg: '$positive',
      border: '$positive',
    },
    warning: {
      bg: '$warning',
      border: '$warning',
    },
    info: { bg: '$info', border: '$info' },
  },
})

export type ToastContainerOptions = VariantProps<typeof variants>
