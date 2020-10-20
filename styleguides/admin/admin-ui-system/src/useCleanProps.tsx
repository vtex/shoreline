import { omitCSSProps, pickHTMLProps } from './util'

export function useCleanProps<P>(props: P): Partial<P> {
  const legalProps = pickHTMLProps((props as unknown) as object)
  const cleanProps = omitCSSProps(legalProps)

  return cleanProps
}
