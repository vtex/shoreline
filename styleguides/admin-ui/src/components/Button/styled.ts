import BaseButton, { ButtonProps as BaseProps } from '@vtex-components/button'
import styled from '@emotion/styled'

import {
  spaceTokens,
  sxTokens,
  layoutTokens,
  flexTokens,
  SpaceTokensProps,
  SxTokensProps,
  FlexTokensProps,
  LayoutTokensProps,
} from '../../tokens'

export type StyledButtonProps = Pick<
  BaseProps,
  | 'disabled'
  | 'focusable'
  | 'children'
  | 'id'
  | 'type'
  | 'name'
  | 'onClick'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onMouseDown'
  | 'onMouseUp'
  | 'onFocus'
  | 'onMouseOver'
  | 'value'
  | 'variant'
  | 'size'
  | 'ref'
> &
  Pick<SpaceTokensProps, 'm' | 'mt' | 'mb' | 'mr' | 'ml' | 'mx' | 'my'> &
  SxTokensProps &
  Pick<FlexTokensProps, 'self'> &
  Pick<LayoutTokensProps, 'position'>

export const StyledButton = styled(BaseButton)<StyledButtonProps>`
  ${spaceTokens}
  ${sxTokens}
  ${flexTokens}
  ${layoutTokens}
`
