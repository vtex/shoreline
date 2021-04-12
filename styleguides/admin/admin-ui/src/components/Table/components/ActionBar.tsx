import React, { ReactElement, PropsWithoutRef } from 'react'
import { useToolbarState, ToolbarProps } from '../../Toolbar'
import { ButtonProps } from '../../Button'
import { Set, SetProps } from '../../Set'
import { SearchProps } from '../../Search'

export function TableActionBar(props: TableToolbarProps) {
  const { spacing = 3, csx = {}, children, ...setProps } = props

  const toolbarState = useToolbarState({ loop: true })

  const buttonProps: ActionBarButtonProps = {
    variant: 'adaptative-dark',
    size: 'small',
  }

  const searchProps: ActionBarSearchProps = {
    height: 'small',
  }

  const toolbarProps = {
    csx: { padding: 0 },
    state: toolbarState,
  }

  return (
    <Set spacing={spacing} csx={{ paddingY: '4', ...csx }} {...setProps}>
      {children({ buttonProps, toolbarProps, searchProps })}
    </Set>
  )
}

export interface TableToolbarProps extends PropsWithoutRef<SetProps> {
  children: (childrenProps: TableActionbarProps) => ReactElement
}

export interface TableActionbarProps {
  buttonProps: ActionBarButtonProps
  toolbarProps: ActionBarToolbarProps
  searchProps: ActionBarSearchProps
}

export type ActionBarButtonProps = Pick<ButtonProps, 'variant' | 'size'>

export type ActionBarToolbarProps = Pick<ToolbarProps, 'state' | 'csx'>

export type ActionBarSearchProps = Pick<SearchProps, 'height'>
