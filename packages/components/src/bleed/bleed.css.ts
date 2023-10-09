import { calc, csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

export const bleedStyle = csx({
  '@layer': {
    components: {
      '&[data-sl-bleed]': {
        marginTop: calc.multiply('$bleed-top', -1),
        marginLeft: calc.multiply('$bleed-left', -1),
        marginBottom: calc.multiply('$bleed-bottom', -1),
        marginRight: calc.multiply('$bleed-right', -1),
        marginInline: calc.multiply('$bleed-horizontal', -1),
        marginBlock: calc.multiply('$bleed-vertical', -1),
        '[data-sl-bleed-content]': {
          position: 'relative',
          [dataAttr('top', true)]: {
            '& > *': {
              marginTop: calc.multiply('$element-space-top', -1),
            },
          },
          [dataAttr('right', true)]: {
            '& > *': {
              marginRight: calc.multiply('$element-space-right', -1),
            },
          },
          [dataAttr('bottom', true)]: {
            '& > *': {
              marginBottom: calc.multiply('$element-space-bottom', -1),
            },
          },
          [dataAttr('left', true)]: {
            '& > *': {
              marginLeft: calc.multiply('$element-space-left', -1),
            },
          },
          [dataAttr('horizontal', true)]: {
            '& > *': {
              marginRight: calc.multiply('$element-space-right', -1),
              marginLeft: calc.multiply('$element-space-left', -1),
            },
          },
          [dataAttr('vertical', true)]: {
            '& > *': {
              marginTop: calc.multiply('$element-space-top', -1),
              marginBottom: calc.multiply('$element-space-bottom', -1),
            },
          },
        },
      },
    },
  },
})
