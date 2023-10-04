import { calc, csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

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
      [dataAttr('top', true)]: {
        '& > *': {
          marginTop: 'calc(var(--sl-element-space-top) * -1)',
        },
      },
      [dataAttr('right', true)]: {
        '& > *': {
          marginRight: 'calc(var(--sl-element-space-right) * -1)',
        },
      },
      [dataAttr('bottom', true)]: {
        '& > *': {
          marginBottom: 'calc(var(--sl-element-space-bottom) * -1)',
        },
      },
      [dataAttr('left', true)]: {
        '& > *': {
          marginLeft: 'calc(var(--sl-element-space-left) * -1)',
        },
      },
      [dataAttr('horizontal', true)]: {
        '& > *': {
          marginRight: 'calc(var(--sl-element-space-right) * -1)',
          marginLeft: 'calc(var(--sl-element-space-left) * -1)',
        },
      },
      [dataAttr('vertical', true)]: {
        '& > *': {
          marginTop: 'calc(var(--sl-element-space-top) * -1)',
          marginBottom: 'calc(var(--sl-element-space-bottom) * -1)',
        },
      },
    },
  },
})
