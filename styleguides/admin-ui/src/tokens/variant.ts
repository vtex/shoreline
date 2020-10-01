import { css } from 'theme-ui'
import { styleFn } from 'styled-system'
import { Interpolation } from '@emotion/styled'
import { get } from '@vtex-components/theme'

import { theme } from '../theme'

export const variantToken = ({ variant }: VariantTokenProps) =>
  css(get(theme, `${variant}`) as Interpolation) as styleFn

export interface VariantTokenProps {
  variant?: string | undefined
}
