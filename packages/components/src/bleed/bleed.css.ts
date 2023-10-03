import { calc, csx } from '@vtex/shoreline-vanilla-extract'

export const bleedStyle = csx({
  '@layer': {
    components: {
      marginTop: calc.multiply('var(--sl-bleed-top, 0)', -1),
      marginLeft: calc.multiply('var(--sl-bleed-left, 0)', -1),
      marginBottom: calc.multiply('var(--sl-bleed-bottom, 0)', -1),
      marginRight: calc.multiply('var(--sl-bleed-right, 0)', -1),
      marginInline: calc.multiply('var(--sl-bleed-horizontal, 0)', -1),
      marginBlock: calc.multiply('var(--sl-bleed-vertical, 0)', -1),
    },
  },
})

export const bleedInnerChildStyle = csx({
  '@layer': {
    components: {
      position: 'relative',
      '& > *': {
        marginTop: 'calc(var(--sl-element-space-top) * -1)',
      },
    },
  },
})
