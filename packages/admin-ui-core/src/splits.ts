import { get } from '@vtex/admin-ui-util'

export const splits = {
  // size
  size: ['width', 'height'],
  minSize: ['minWidth', 'minHeight'],
  maxSize: ['maxWidth', 'maxHeight'],
  absoluteSize: ['minWidth', 'minHeight', 'maxWidth', 'maxHeight'],

  // space
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
}

export function canSplit(prop: string) {
  return prop in splits
}

export function split(prop: string, value: any) {
  const entries = get(splits, prop, [])

  return entries.reduce(
    (acc: any, entry: any) => ({
      ...acc,
      [entry]: value,
    }),
    {}
  )
}
