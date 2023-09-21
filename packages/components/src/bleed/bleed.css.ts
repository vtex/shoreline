import { calc, csx } from '@vtex/shoreline-vanilla-extract'

const { multiply } = calc

export const bleedStyle = csx({
  '@layer': {
    components: {
      marginTop: multiply('var(--sl-bleed-top, 0)', -1),
      marginLeft: multiply('var(--sl-bleed-left, 0)', -1),
      marginBottom: multiply('var(--sl-bleed-bottom, 0)', -1),
      marginRight: multiply('var(--sl-bleed-right, 0)', -1),
      marginInline: multiply('var(--sl-bleed-horizontal, 0)', -1),
      marginBlock: multiply('var(--sl-bleed-vertical, 0)', -1),
    },
  },
})

export const bleedInnerChildStyle = csx({ position: 'relative' })
