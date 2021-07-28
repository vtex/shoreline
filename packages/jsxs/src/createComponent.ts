import {
  ComponentClass,
  ElementType,
  forwardRef,
  ForwardRefExoticComponent,
  FunctionComponent,
  PropsWithoutRef,
  Ref,
  RefAttributes,
} from 'react'

import { jsxs } from './jsxs'

export function createComponent<
  R extends HTMLElement,
  T extends FunctionComponent<P> | ComponentClass<P> | ElementType,
  P extends {},
>(
  type: T,
  useHook: (props: P) => any
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<R>> {
  const Component = forwardRef((props: P, ref: Ref<R>) => {
    const { children, ...parsedProps } = useHook(props)
    return jsxs(type, { ref, ...parsedProps }, children)
  })

  Component.displayName = (type as any).displayName

  return Component as any
}
