import { SxProps as SxTokensProps, css } from '@vtex/admin-ui'
import { Interpolation } from '@emotion/styled'
import { styleFn } from 'styled-system'

export const sxTokens = ({ sx }: SxTokensProps) =>
  css(sx as Interpolation) as styleFn

export { SxTokensProps }
