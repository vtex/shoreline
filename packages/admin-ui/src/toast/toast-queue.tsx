import React, { useCallback } from 'react'

import { Box } from '../box'
import { Toast } from './toast'
import { useAnimatedList } from './use-animated-list'
import type { InternalToast } from './types'

export function ToastQueue(props: ToastQueueProps) {
  const { toasts, dequeue } = props
  const { itemRef, remove } = useAnimatedList()

  const onClear = useCallback(
    (dedupeKey: string, id: string) => {
      remove(id, () => {
        dequeue(dedupeKey)
      })
    },
    [remove, dequeue]
  )

  return (
    <Box
      csx={{
        position: 'fixed',
        zIndex: '999',
        pointerEvents: 'none',
        paddingX: 2,
        bottom: '3rem',
        right: '0%',
        textAlign: 'center',
        marginLeft: 'auto',
        width: '100%',
        listStyle: 'none',
        '> *:not(:last-child)': {
          marginBottom: '0.75rem',
        },
        '@tablet': {
          right: '2rem',
          width: '23.375rem',
        },
      }}
    >
      {toasts.map(({ id, ...rest }) => (
        <Box key={id} csx={{ paddingBottom: 2 }}>
          <Toast ref={itemRef(id)} id={id} onClear={onClear} {...rest} />
        </Box>
      ))}
    </Box>
  )
}

export interface ToastQueueProps {
  toasts: InternalToast[]
  dequeue: (key: string) => void
}
