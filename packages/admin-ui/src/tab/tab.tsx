import { Tab as AriakitTab } from 'ariakit'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import type { TabState } from './tab-state'
import { tabTheme } from './tab.css'

export const Tab = forwardRef(function Tab(
  props: TabProps,
  ref: Ref<HTMLButtonElement>
) {
  const { className = '', state, children, ...buttonProps } = props

  return (
    <AriakitTab
      state={state}
      ref={ref}
      className={cx(tabTheme, className)}
      {...buttonProps}
    >
      {children}
    </AriakitTab>
  )
})

export interface TabProps extends ComponentPropsWithoutRef<'button'> {
  state?: TabState
}
