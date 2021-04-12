import React, { PropsWithoutRef } from 'react'
import { ToolbarProps } from '../../Toolbar'
import { ButtonProps } from '../../Button'
import { Set, SetProps } from '../../Set'
import { SearchProps } from '../../Search'

export function TableActionBar(props: PropsWithoutRef<SetProps>) {
  const { spacing = 3, csx = {}, ...setProps } = props

  return <Set spacing={spacing} csx={{ paddingY: '4', ...csx }} {...setProps} />
}

export interface TableActionbarProps {
  buttonProps: ActionBarButtonProps
  toolbarProps: ActionBarToolbarProps
  searchProps: ActionBarSearchProps
}

export type ActionBarButtonProps = Pick<ButtonProps, 'variant' | 'size'>

export type ActionBarToolbarProps = Pick<ToolbarProps, 'state' | 'csx'>

export type ActionBarSearchProps = Pick<SearchProps, 'height'>
