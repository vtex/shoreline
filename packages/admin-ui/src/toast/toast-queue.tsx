import React, { useCallback } from 'react'

import { Stack } from '../stack'
import { Toast } from './toast'
import { useAnimatedList } from './use-animated-list'
import type { InternalToast } from './types'
import * as style from './toast.style'

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
    <Stack space="$2xl" csx={style.toastQueue}>
      {toasts.map(({ id, ...rest }) => (
        <Toast ref={itemRef(id)} key={id} id={id} onClear={onClear} {...rest} />
      ))}
    </Stack>
  )
}

export interface ToastQueueProps {
  toasts: InternalToast[]
  dequeue: (key: string) => void
}
