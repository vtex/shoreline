import type {
  ComponentPropsWithoutRef,
  ReactNode,
  MouseEventHandler,
} from 'react'
import React from 'react'
import type { TopbarOptionsState } from './use-options'
import { optionTheme } from './options.css'
import { Stack } from '../../stack'
import { Center } from '../../center'
import { IconArrowUpRight } from '@vtex/phosphor-icons'
import { cx } from '@vtex/admin-ui-core'

export function Option(props: OptionProps) {
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

  if (state.hasActiveItem) return null

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e)

    if (href) {
      state.hide()

      return
    }

    state.setActive(id)
    state.setTitle(children)
  }

  const OptionButton = () => (
    <button
      onClick={handleOnClick}
      className={cx(optionTheme, className)}
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

  return (
    <div>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer">
          <OptionButton />
        </a>
      ) : (
        <OptionButton />
      )}
    </div>
  )
}

export interface OptionProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  children: string
  state: TopbarOptionsState
  id: string
  href?: string
  icon: ReactNode
}
