import { createPlugin } from '../system'

const defaultBreakpoints = ['40em', '48em', '64em', '75em']

export const responsive = createPlugin({
  name: 'onda-plugin-responsive',
  namespaces: ['breakpoints'],
  aliases: (theme) => {
    const breakpoints = theme?.breakpoints ?? defaultBreakpoints

    const [, tablet, desktop, widescreen] = breakpoints

    return {
      '@tablet': `@media (min-width: ${tablet}) and (max-width: ${desktop})`,
      '@desktop': `@media (min-width: ${desktop}) and (max-width: ${widescreen})`,
      '@widescreen': `@media (min-width: ${widescreen})`,
    }
  },
})
