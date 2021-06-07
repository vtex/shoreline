import React, {
  createContext,
  Fragment,
  ReactNode,
  Ref,
  useContext,
  useMemo,
} from 'react'
import { Portal } from 'reakit'
import { UseComboboxReturnValue as ComboboxState } from 'downshift'
import { forwardRef, useSystem } from '@vtex/admin-core'

import { VisuallyHidden } from '../VisuallyHidden'
import invariant from 'tiny-invariant'

const StateContext = createContext<ComboboxState<any> | null>(null)
const DataContext = createContext<ComboboxData<any> | null>(null)

function useStateContext() {
  const context = useContext(StateContext)
  invariant(context, 'state not found')
  return context
}

function useDataContext() {
  const context = useContext(DataContext)
  invariant(context, 'data not found')
  return context
}

interface ComboboxData<T> {
  label: string
  items: T[]
  render: (item: T) => any
}

interface Source<T> {
  label: string
  items: T[]
  render: (item: T) => any
}

/**
 * function that creates sources
 */
export function createSource<T>(src: Source<T>) {
  return src
}

interface ComboboxProps<T> {
  state: ComboboxState<T>
  data: ComboboxData<T>
  label: string
  children?: ReactNode
}

export function Combobox<T>(props: ComboboxProps<T>) {
  const { state, label, children, data } = props
  const labelProps = state.getLabelProps()

  return (
    <StateContext.Provider value={state}>
      <DataContext.Provider value={data}>
        <VisuallyHidden>
          <label {...labelProps}>{label}</label>
        </VisuallyHidden>
        {children}
      </DataContext.Provider>
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

  const { getComboboxProps, getInputProps } = useStateContext()
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

  const { getMenuProps, isOpen } = useStateContext()
  const { items } = useDataContext()
  const elementProps = useElementProps(Component, restProps)

  const menuProps = getMenuProps()

  return (
    <Component ref={ref} {...menuProps} {...elementProps}>
      {isOpen &&
        items.map((item, index) => (
          <Fragment key={index}>{children(item, index)}</Fragment>
        ))}
    </Component>
  )
})

Combobox.Option = forwardRef(function Option(props: any, ref: Ref<any>) {
  const { as: Component = 'li', index, item, ...restProps } = props

  const { getItemProps } = useStateContext()
  const elementProps = useElementProps(Component, restProps)

  const liProps = getItemProps({ item, index })

  return (
    <Component ref={ref} {...liProps} {...elementProps}>
      {item}
    </Component>
  )
})
