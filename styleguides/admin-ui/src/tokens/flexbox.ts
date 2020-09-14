import { system, ResponsiveValue } from 'styled-system'
import * as CSS from 'csstype'

const flexMap = {
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

export const flexTokens = system({
  direction: {
    property: 'flexDirection',
    transform: (direction: FlexDirection) => flexMap.flexDirection?.[direction],
  },
  wrap: {
    property: 'flexWrap',
    transform: (wrap: FlexWrap) => flexMap.flexWrap?.[wrap],
  },
  items: {
    property: 'alignItems',
    transform: (items: FlexItems) => flexMap.alignItems?.[items],
  },
  justify: {
    property: 'justifyContent',
    transform: (justify: FlexJustify) => flexMap.justifyContent?.[justify],
  },
  self: {
    property: 'alignSelf',
    transform: (self: FlexSelf) => flexMap.alignSelf?.[self],
  },
  content: {
    property: 'alignContent',
    transform: (content: FlexContent) => flexMap.alignContent?.[content],
  },
  grow: {
    property: 'flexGrow',
  },
  shrink: {
    property: 'flexShrink',
  },
  order: true,
})

type FlexDirection = keyof typeof flexMap.flexDirection
type FlexWrap = keyof typeof flexMap.flexWrap
type FlexItems = keyof typeof flexMap.alignItems
type FlexJustify = keyof typeof flexMap.justifyContent
type FlexSelf = keyof typeof flexMap.alignSelf
type FlexContent = keyof typeof flexMap.alignContent

export interface FlexTokensProps {
  direction?: FlexDirection
  wrap?: FlexWrap
  items?: FlexItems
  justify?: FlexJustify
  self?: FlexSelf
  content?: FlexContent
  order?: ResponsiveValue<CSS.Property.Order>
  grow?: ResponsiveValue<CSS.Property.FlexGrow>
  shrink?: ResponsiveValue<CSS.Property.FlexShrink>
}
