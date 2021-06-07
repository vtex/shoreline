import React, {
  createContext,
  Fragment,
  ReactNode,
  Ref,
  useContext,
} from 'react'
import { ComboboxState } from './useComboboxState'
import { forwardRef, useSystem } from '@vtex/admin-core'

import { VisuallyHidden } from '../VisuallyHidden'
import invariant from 'tiny-invariant'

const StateContext = createContext<ComboboxState<any> | null>(null)

function useStateContext() {
  const context = useContext(StateContext)
  invariant(context, 'state not found')
  return context
}

interface ComboboxProps<T> {
  state: ComboboxState<T>
  label: string
  children?: ReactNode
}

export function Combobox<T>(props: ComboboxProps<T>) {
  const { state, label, children } = props
  const labelProps = state.combobox.getLabelProps()

  return (
    <StateContext.Provider value={state}>
      <VisuallyHidden>
        <label {...labelProps}>{label}</label>
      </VisuallyHidden>
      {children}
    </StateContext.Provider>
  )
}

function useElementProps(type: any, props: any) {
  const { cx, cn } = useSystem()
  const { className, csx, ...elementProps } = props

  return typeof type === 'string'
    ? {
        className: cx(className, cn(csx)),
        ...elementProps,
      }
    : props
}

Combobox.Input = forwardRef(function Input(props: any, ref: Ref<any>) {
  const { as: Component = 'input', ...restProps } = props

  const {
    combobox: { getComboboxProps, getInputProps },
  } = useStateContext()
  const elementProps = useElementProps(Component, restProps)

  const comboboxProps = getComboboxProps()
  const inputProps = getInputProps()

  return (
    <div {...comboboxProps}>
      <Component ref={ref} {...inputProps} {...elementProps} />
    </div>
  )
})

Combobox.Menu = forwardRef(function Menu(props: any, ref: Ref<any>) {
  const { as: Component = 'ul', children, ...restProps } = props

  const {
    combobox: { getMenuProps, isOpen, highlightedIndex },
    collection: { value },
  } = useStateContext()
  const elementProps = useElementProps(Component, restProps)

  const menuProps = getMenuProps()

  return (
    <Component ref={ref} {...menuProps} {...elementProps}>
      {isOpen &&
        value.map((item, index) => {
          const isHighlighted = highlightedIndex === index
          return (
            <Fragment key={index}>
              {children(item, index, isHighlighted)}
            </Fragment>
          )
        })}
    </Component>
  )
})

Combobox.Option = forwardRef(function Option(props: any, ref: Ref<any>) {
  const { as: Component = 'li', index, item, ...restProps } = props

  const {
    combobox: { getItemProps },
    source: { render },
  } = useStateContext()
  const elementProps = useElementProps(Component, restProps)

  const liProps = getItemProps({ item, index })

  return (
    <Component ref={ref} {...liProps} {...elementProps}>
      {render(item)}
    </Component>
  )
})
