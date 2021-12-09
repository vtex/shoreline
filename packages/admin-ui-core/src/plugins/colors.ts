import { createPlugin } from '../system'

export const colors = createPlugin({
  name: 'onda-plugin-colors',
  namespaces: ['colors', 'bg', 'fg', 'borderColor'],
  aliases: {
    bg: 'background',
  },
  rules: {
    color: 'fg',
    backgroundColor: 'bg',
    background: 'bg',
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
