import { omitCSSProps } from './omitCSSProps'
import { pickHTMLProps } from './pickHTMLProps'

/**
 * clean all html props
 */
export function cleanProps<P>(props: P): Partial<P> {
  const legalProps = pickHTMLProps((props as unknown) as object)
  const safeProps = omitCSSProps(legalProps)

  return safeProps
}
