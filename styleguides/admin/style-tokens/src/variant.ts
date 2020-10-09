import { get, theme, css } from '@vtex/admin-ui'
import { styleFn } from 'styled-system'
import { Interpolation } from '@emotion/styled'

export const variantToken = ({ variant }: VariantTokenProps) =>
  css(get(theme, `${variant}`) as Interpolation) as styleFn

export interface VariantTokenProps {
  variant?: string | undefined
}
