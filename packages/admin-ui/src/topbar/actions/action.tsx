import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React from 'react'
import type { ActionsState } from './use-action-state'
import { actionTheme } from './actions.css'
import { Stack } from '../../stack'
import { Center } from '../../center'
import { IconArrowUpRight } from '@vtex/phosphor-icons'
import { cx } from '@vtex/admin-ui-core'

export function Action(props: ActionProps) {
  const { state, href } = props

  if (state.hasActiveItem) return null

  return (
    <div>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer">
          <ActionButton {...props} />
        </a>
      ) : (
        <ActionButton {...props} />
      )}
    </div>
  )
}

function ActionButton(props: ActionProps) {
  const {
    state,
    onClick,
    id,
    href = '',
    children,
    className = '',
    icon,
    ...buttonProps
  } = props

  return (
    <button
      onClick={(e) => {
        onClick?.(e)
        state.handleAction(id, children, href)
      }}
      className={cx(actionTheme, className)}
      {...buttonProps}
    >
      <Stack direction="row" space="$space-5">
        <Center>{icon}</Center>
        <Stack direction="row" space="$space-1">
          <div>{children}</div>
          {href && <IconArrowUpRight width={16} height={16} />}
        </Stack>
      </Stack>
    </button>
  )
}

export interface ActionProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  children: string
  state: ActionsState
  id: string
  href?: string
  icon: ReactNode
}
