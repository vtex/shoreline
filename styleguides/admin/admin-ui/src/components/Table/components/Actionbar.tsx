import React, { ReactElement, PropsWithoutRef } from 'react'
import {
  Toolbar,
  useToolbarState,
  ToolbarProps,
  ToolbarState,
} from '../../Toolbar'
import { Button, ButtonProps } from '../../Button'
import { Set, SetProps } from '../../Set'

export function TableToolbarButton(props: ButtonProps) {
  const { variant = 'adaptative-dark', size = 'small', ...buttonProps } = props

  return (
    <Toolbar.Item>
      {(itemProps) => (
        <Button variant={variant} size={size} {...itemProps} {...buttonProps} />
      )}
    </Toolbar.Item>
  )
}

export function TableActionbar(props: TableToolbarProps) {
  const { spacing = 3, csx = {}, children, ...setProps } = props

  const toolbarState: ToolbarState = useToolbarState({ loop: true })

  function getButtonProps(): GetButtonPropsReturn {
    return { variant: 'adaptative-dark', size: 'small' }
  }

  function getToolbarProps(): GetToolbarPropsReturn {
    return { csx: { padding: 0 }, state: toolbarState }
  }

  return (
    <Set spacing={spacing} csx={{ paddingY: '4', ...csx }} {...setProps}>
      {children({ getToolbarProps, getButtonProps })}
    </Set>
  )
}

export interface TableToolbarProps extends PropsWithoutRef<SetProps> {
  children: (childrenProps: TableActionbarProps) => ReactElement
}

export interface TableActionbarProps {
  getButtonProps: () => GetButtonPropsReturn
  getToolbarProps: () => GetToolbarPropsReturn
}

export type GetButtonPropsReturn = Pick<ButtonProps, 'variant' | 'size'>

export type GetToolbarPropsReturn = Pick<ToolbarProps, 'state' | 'csx'>
