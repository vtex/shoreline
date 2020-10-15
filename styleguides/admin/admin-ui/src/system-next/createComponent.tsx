import { forwardRef, memo, FunctionComponentElement } from 'react'

export function createComponent<Props>(
  Component: (
    props: React.PropsWithChildren<Props>,
    ref: React.Ref<any>
  ) => FunctionComponentElement<Props>,
  config?: {
    assign?: {
      displayName?: string
      useProps: (
        props?: Partial<Props>,
        config?: { disableCSSProps?: string[] }
      ) => any
    }
    defaultProps?: Partial<Props>
    memoize?: boolean
  }
): (
  props: Props,
  ref: React.Ref<any>
) => FunctionComponentElement<Props> & { useProps?: any; dispayName?: string } {
  let FlushComponent = forwardRef(Component)

  if (config?.memoize) {
    // @ts-expect-error
    FlushComponent = memo(FlushComponent)
  }

  // @ts-expect-error
  return Object.assign(FlushComponent, config?.assign)
}
