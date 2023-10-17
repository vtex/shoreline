import { csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

export const textStyle = csx({
  [dataAttr('variant', 'body')]: {
    text: '$text-body',
  },
  [dataAttr('variant', 'action')]: {
    text: '$text-action',
  },
  [dataAttr('variant', 'emphasis')]: {
    text: '$text-emphasis',
  },
  [dataAttr('variant', 'caption1')]: {
    text: '$text-caption-1',
  },
  [dataAttr('variant', 'caption2')]: {
    text: '$text-caption-2',
  },
  [dataAttr('variant', 'display1')]: {
    text: '$text-display-1',
  },
  [dataAttr('variant', 'display2')]: {
    text: '$text-display-2',
  },
  [dataAttr('variant', 'display3')]: {
    text: '$text-display-3',
  },
  [dataAttr('variant', 'display4')]: {
    text: '$text-display-4',
  },
})
