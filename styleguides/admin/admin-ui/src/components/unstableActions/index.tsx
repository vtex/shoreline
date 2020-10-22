import React, { forwardRef, Ref } from 'react'
import { Box as ReakitBox } from 'reakit/Box'
import { createElement } from '@vtex/admin-ui-system'

import { SetProps, useSet } from '../unstableSet'
import { unstableButton as Button, ButtonProps } from '../unstableButton'
import { ActionsProvider, useActionsContext } from './context'

type ActionsProps = SetProps & Pick<ButtonProps, 'size' | 'palette'>

export function Actions(props: ActionsProps) {
  const { size, palette, children, ...draftSetProps } = props
  const { setProps, currentOrientation } = useSet(draftSetProps)

  return createElement({
    component: ReakitBox,
    htmlProps: setProps,
    element: 'div',
    children: (
      <ActionsProvider
        value={{ size, palette, orientation: currentOrientation }}
      >
        {children}
      </ActionsProvider>
    ),
  })
}

type ActionProps = Omit<ButtonProps, 'variant' | 'palette' | 'size'>

Actions.Primary = forwardRef(function PrimaryAction(
  props: ActionProps,
  ref: Ref<HTMLButtonElement>
) {
  const { size, palette, orientation } = useActionsContext()

  return (
    <Button
      ref={ref}
      variant="filled"
      palette={palette}
      size={size}
      styleOverrides={{ order: orientation === 'vertical' ? 1 : 3 }}
      {...props}
    />
  )
})

Actions.Secondary = forwardRef(function SecondaryAction(
  props: ActionProps,
  ref: Ref<HTMLButtonElement>
) {
  const { size, palette } = useActionsContext()

  return (
    <Button
      ref={ref}
      variant="subtle"
      palette={palette}
      size={size}
      styleOverrides={{ order: 2 }}
      {...props}
    />
  )
})

Actions.Tertiary = forwardRef(function TertiaryAction(
  props: ActionProps,
  ref: Ref<HTMLButtonElement>
) {
  const { size, palette, orientation } = useActionsContext()

  return (
    <Button
      ref={ref}
      variant="text"
      palette={palette}
      size={size}
      styleOverrides={{ order: orientation === 'vertical' ? 3 : 1 }}
      {...props}
    />
  )
})
