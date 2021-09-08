import React, { useCallback } from 'react'
import { tag } from '@vtex/admin-ui-react'

import { Toast } from './Toast'
import { useFlipList } from '../hooks/useFlipList'
import type { InternalToast } from '../types'

export function ToastQueue(props: ToastQueueProps) {
  const { toasts, dequeue } = props
  const { itemRef, remove } = useFlipList()

  const onClear = useCallback(
    (dedupeKey: string, id: string) => {
      remove(id, () => {
        dequeue(dedupeKey)
      })
    },
    [remove, dequeue]
  )

  return (
    <tag.div
      csx={{
        position: 'fixed',
        zIndex: '999',
        pointerEvents: 'none',
        paddingX: 2,
        bottom: '3rem',
        right: '2rem',
        textAlign: 'center',
        marginLeft: 'auto',
        width: '23.375rem',
        listStyle: 'none',
        '> *:not(:last-child)': {
          marginBottom: '0.75rem',
        },
      }}
    >
      {toasts.map(({ id, ...rest }) => (
        <tag.div key={id} csx={{ paddingBottom: 2 }}>
          <Toast ref={itemRef(id)} id={id} onClear={onClear} {...rest} />
        </tag.div>
      ))}
    </tag.div>
  )
}

export interface ToastQueueProps {
  toasts: InternalToast[]
  dequeue: (key: string) => void
}
