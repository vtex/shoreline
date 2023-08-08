import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { useSandpack, useSandpackNavigation } from '@codesandbox/sandpack-react'
import {
  IconArrowCounterClockwise,
  IconCopySimple,
  Stack,
  cx,
  get,
} from '@vtex/admin-ui'
import { useCopyCode } from './use-copy-code'
import { headerButtonStyle, headerStyle } from './playground.css'

interface HeaderProps extends ComponentPropsWithoutRef<'header'> {
  toggleFullscreen: () => void
}

export function Header(props: HeaderProps) {
  const { children } = props

  return (
    <header className={headerStyle}>
      <Stack direction="row">{children}</Stack>
    </header>
  )
}

export function HeaderButton(props: ComponentPropsWithoutRef<'button'>) {
  const { className = '', children, ...restProps } = props

  return (
    <button className={cx(headerButtonStyle, className)} {...restProps}>
      <Stack direction="row" space="$space-1">
        {children}
      </Stack>
    </button>
  )
}

export function CopyCodeButton(props: ComponentPropsWithoutRef<'button'>) {
  const { sandpack } = useSandpack()
  const { files, activeFile } = sandpack

  const { label, handleCopyCode } = useCopyCode()

  return (
    <HeaderButton
      onClick={() => {
        handleCopyCode(get(files, `${activeFile}.code`, ''))
      }}
      {...props}
    >
      <IconCopySimple width={14} height={14} />
      <p>{label}</p>
    </HeaderButton>
  )
}

export function RefreshButton() {
  const { refresh } = useSandpackNavigation()

  return (
    <HeaderButton onClick={refresh}>
      <IconArrowCounterClockwise width={14} height={14} />
    </HeaderButton>
  )
}
