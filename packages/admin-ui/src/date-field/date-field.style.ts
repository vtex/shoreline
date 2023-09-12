import { csx, dataAttr } from '@vtex/admin-ui-core'

export const dateFieldTheme = csx({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: '$space-2 $space-3',
  height: 52,
  width: 288,
  borderRadius: 4,
  [dataAttr('tone', 'critical')]: { border: '$form.critical' },
  [dataAttr('tone', 'neutral')]: { border: '$form.neutral' },
  [dataAttr('disabled', 'true')]: { border: '$disabled' },
})

export const dateFieldLabelTheme = csx({
  text: '$detail',
  color: '$secondary',
})
