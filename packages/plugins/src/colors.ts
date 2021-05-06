import { createPlugin } from '@vtex/onda-system'

export const colors = createPlugin({
  name: 'onda-plugin-colors',
  namespaces: ['colors'],
  onCreateAlias: () => ({
    bg: 'backgroundColor',
  }),
  onCreateRule: () => ({
    color: 'colors',
    backgroundColor: 'colors',
    borderColor: 'colors',
    caretColor: 'colors',
    columnRuleColor: 'colors',
    borderTopColor: 'colors',
    borderBottomColor: 'colors',
    borderLeftColor: 'colors',
    borderRightColor: 'colors',
    fill: 'colors',
    stroke: 'colors',
    outlineColor: 'colors',
  }),
})
