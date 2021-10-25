import { createPlugin } from '../system'

export const colors = createPlugin({
  name: 'onda-plugin-colors',
  namespaces: ['colors', 'background', 'foreground', 'borderColor'],
  aliases: {
    bg: 'backgroundColor',
  },
  rules: {
    color: 'foreground',
    backgroundColor: 'background',
    borderColor: 'borderColor',
    caretColor: 'colors',
    columnRuleColor: 'colors',
    borderTopColor: 'borderColor',
    borderBottomColor: 'borderColor',
    borderLeftColor: 'borderColor',
    borderRightColor: 'borderColor',
    fill: 'colors',
    stroke: 'colors',
    outlineColor: 'colors',
  },
})
