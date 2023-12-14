import type { ComponentType, ElementType, ReactElement, Ref } from 'react'
import React, { forwardRef } from 'react'

import { kebabCase, pascalCase } from './string-case'
import type { AnyObject } from './utility-types'
import { Compose } from './compose'

export function slComponent<P extends AnyObject = {}>(
  root: Root,
  props: ShorelineComponentProps<P>
) {
  const {
    name,
    useProps = (props) => props,
    useComposition = useSimpleComposition,
  } = props

  const dataAttr = `data-sl-${kebabCase(name)}`
  const stylingProps = {
    [dataAttr]: 'true',
  }

  const Component = forwardRef<
    any,
    P & {
      asChild?: boolean
    }
  >(function Component(ownProps, ref) {
    const elementProps = useProps(ownProps as any)

    return useComposition({ ...elementProps, ...stylingProps }, root, ref)
  })

  Object.assign(Component, {
    displayName: pascalCase(name),
  })

  return Component
}

export function useSimpleComposition(
  props: AnyObject,
  root: Root,
  ref: Ref<any>
) {
  const Comp = root

  return <Comp ref={ref} {...props} />
}

type WithAsChild<T> = T & {
  asChild?: boolean
}

export function useAsChild(
  props: WithAsChild<AnyObject>,
  root: Root,
  ref: Ref<any>
): ReactElement {
  const { asChild = false, ...otherProps } = props
  const Comp: any = asChild ? Compose : root

  return <Comp ref={ref} {...otherProps} />
}

export function useAriakitAsChild(
  props: WithAsChild<AnyObject>,
  root: Root,
  ref: Ref<any>
): ReactElement {
  const { asChild = false, children, ...otherProps } = props
  const Comp = root

  return (
    <Comp render={asChild ? children : undefined} ref={ref} {...otherProps}>
      {children}
    </Comp>
  )
}

type Root = ComponentType | ElementType

export interface ShorelineComponentProps<P extends AnyObject> {
  name: string
  useProps?: (props: P) => AnyObject
  useComposition?: any
}
