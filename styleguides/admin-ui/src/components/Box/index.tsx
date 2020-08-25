/** @jsx jsx */
import { jsx, Box as ThemeUIBox, BoxProps } from 'theme-ui'

export { BoxProps }

export function Box(props: BoxProps) {
  return <ThemeUIBox {...props} />
}
