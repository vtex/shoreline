import React, { Fragment } from 'react'
import type { ReactNode } from 'react'
import type { UseWatchProps, WatchState } from './use-watch'
import { useWatch } from './use-watch'

/**
 * React Component for subscribe to input changes
 * @example
 * const form = useFormState()
 *
 * <Watch name="fieldName" form={form} />
 */
export function Watch(props: WatchProps) {
  const { children, ...hookProps } = props
  const watch = useWatch(hookProps)

  return <Fragment>{children ? children(watch) : watch}</Fragment>
}

export interface WatchProps extends UseWatchProps {
  children?: (props: WatchState) => ReactNode
}
