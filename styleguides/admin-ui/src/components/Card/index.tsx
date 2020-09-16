import styled from '@emotion/styled'

import { Box, BoxProps as CardProps } from '../Box'

export const Card = styled(Box)<CardProps>``

Card.defaultProps = {
  bg: 'background',
  bc: 'muted.3',
  p: '13',
  bw: '1',
  bs: 'solid',
  br: '3',
}

export { CardProps }
