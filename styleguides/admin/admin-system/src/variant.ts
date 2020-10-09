import { styleFn } from 'styled-system'
import { Interpolation } from '@emotion/styled'
import { get } from '@vtex-components/theme'
import { css } from 'theme-ui'

import { theme } from './theme/config'

export const variantToken = ({ variant }: VariantTokenProps) =>
  css(get(theme, `${variant}`) as Interpolation) as styleFn

export interface VariantTokenProps {
  variant?: string | undefined
}
