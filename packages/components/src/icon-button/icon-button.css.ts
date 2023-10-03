import { csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

export const iconButtonStyle = csx({
  '@layer': {
    components: {
      '&[data-sl-icon-button]': {
        [dataAttr('size', 'normal')]: {
          '--sl-element-space-top': '$space-2',
          '--sl-element-space-bottom': '$space-2',
          '--sl-element-space-right': '$space-2',
          '--sl-element-space-left': '$space-2',
        },

        [dataAttr('size', 'large')]: {
          '--sl-element-space-top': '$space-3',
          '--sl-element-space-bottom': '$space-3',
          '--sl-element-space-right': '$space-3',
          '--sl-element-space-left': '$space-3',
        },
      },
    },
  },
})
