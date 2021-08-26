import { useSystem } from '@vtex/onda-core'

export function useElementProps(type: any, props: any) {
  const { cx, cn } = useSystem()
  const { className, csx, ...elementProps } = props

  return typeof type === 'string'
    ? {
        className: cx(className, cn(csx)),
        ...elementProps,
      }
    : props
}
