import React, { ReactNode } from 'react'
import { Box, SxStyleProp } from 'theme-ui'
import { mergeSx } from '@vtex-components/theme'

import { theme } from '../../theme/theme'

const propMap = {
  flexDirection: {
    row: 'row',
    rowReverse: 'row-reverse',
    col: 'column',
    colReverse: 'column-reverse',
  },
  flexWrap: {
    wrap: 'wrap',
    reverse: 'wrap-reverse',
    nowrap: 'nowrap',
  },
  justifyContent: {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  },
  alignItems: {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    baseline: 'baseline',
    stretch: 'stretch',
    auto: 'auto',
  },
  alignSelf: {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    baseline: 'baseline',
    stretch: 'stretch',
    auto: 'auto',
  },
  alignContent: {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
    around: 'space-around',
    stretch: 'stretch',
  },
}

export function Flex(props: FlexProps) {
  const {
    as = 'div',
    direction = 'row',
    wrap = 'nowrap',
    items = 'stretch',
    justify = 'start',
    self = 'auto',
    content = 'start',
    order = 0,
    grow = 0,
    shrink = 1,
    width,
    sx = {},
    ...boxProps
  } = props

  const styles = mergeSx<SxStyleProp>(
    {
      display: 'flex',
      flexDirection: propMap.flexDirection[direction],
      flexWrap: propMap.flexWrap[wrap],
      alignItems: propMap.alignItems[items],
      justifyContent: propMap.justifyContent[justify],
      alignSelf: propMap.alignSelf[self],
      alignContent: propMap.alignContent[content],
      order,
      width,
      flexGrow: grow,
      flexShrink: shrink,
    },
    sx
  )

  return <Box as={as} sx={styles} {...boxProps} />
}

export interface FlexProps {
  as?: 'div' | 'section' | 'main'
  sx?: SxStyleProp
  children?: ReactNode
  direction?: keyof typeof propMap.flexDirection
  wrap?: keyof typeof propMap.flexWrap
  items?: keyof typeof propMap.alignItems
  justify?: keyof typeof propMap.justifyContent
  self?: keyof typeof propMap.alignSelf
  content?: keyof typeof propMap.alignContent
  order?: number
  grow?: number
  shrink?: number
  width?: keyof typeof theme.sizes
}
