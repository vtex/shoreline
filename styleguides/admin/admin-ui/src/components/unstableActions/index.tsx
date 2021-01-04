import React, { forwardRef, Ref } from 'react'
import { Box as ReakitBox } from 'reakit/Box'

import { jsxs } from '../../system'
import { SetProps, useSet } from '../Set'
import { Button, ButtonProps } from '../Button'
import { ActionsProvider, useActionsContext } from './context'

type ActionsProps = SetProps & Pick<ButtonProps, 'size'>

export function Actions(props: ActionsProps) {
  const { size, children, ...draftSetProps } = props
  const { setProps, currentOrientation } = useSet(draftSetProps)

  return jsxs({
    component: ReakitBox,
    props: setProps,
    element: 'div',
    children: (
      <ActionsProvider value={{ size, orientation: currentOrientation }}>
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
  const { size, orientation } = useActionsContext()

  return (
    <Button
      ref={ref}
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
  const { size } = useActionsContext()

  return (
    <Button
      ref={ref}
      variant="secondary"
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
  const { size, orientation } = useActionsContext()

  return (
    <Button
      ref={ref}
      variant="tertiary"
      size={size}
      styleOverrides={{ order: orientation === 'vertical' ? 3 : 1 }}
      {...props}
    />
  )
})
