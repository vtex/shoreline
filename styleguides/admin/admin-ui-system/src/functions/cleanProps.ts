import { omitCSSProps } from './omitCSSProps'
import { pickHTMLProps } from './pickHTMLProps'

export function cleanProps<P>(props: P): Partial<P> {
  const legalProps = pickHTMLProps((props as unknown) as object)
  const safeProps = omitCSSProps(legalProps)

  return safeProps
}
