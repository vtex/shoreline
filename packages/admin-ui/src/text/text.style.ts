import { csx, dataAttr } from '@vtex/admin-ui-core'

export const textTheme = csx({
  [dataAttr('variant', 'pageTitle')]: { text: '$pageTitle' },
  [dataAttr('variant', 'title1')]: { text: '$title1' },
  [dataAttr('variant', 'title2')]: { text: '$title2' },
  [dataAttr('variant', 'action1')]: { text: '$action1' },
  [dataAttr('variant', 'action2')]: { text: '$action2' },
  [dataAttr('variant', 'display')]: { text: '$display' },
  [dataAttr('variant', 'body')]: { text: '$body' },
  [dataAttr('variant', 'detail')]: { text: '$detail' },

  [dataAttr('tone', 'primary')]: { color: '$primary' },
  [dataAttr('tone', 'secondary')]: { color: '$secondary' },
  [dataAttr('tone', 'info')]: { color: '$info' },
  [dataAttr('tone', 'positive')]: { color: '$positive' },
  [dataAttr('tone', 'critical')]: { color: '$critical' },
  [dataAttr('tone', 'warning')]: { color: '$warning' },
})
