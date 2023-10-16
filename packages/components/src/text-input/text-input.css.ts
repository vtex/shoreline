import { csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

const height = '2.75rem'

export const textInputStyle = csx({
  '@layer': {
    components: {
      '&[data-sl-text-input]': {
        height,
        width: '100%',
        text: '$text-body',
        borderRadius: '$border-radius-medium',
        display: 'flex',
        alignItems: 'center',
        border: '$border-strong',
        '&:hover': {
          border: '$border-strong-hover',
        },
        '&:focus-within': {
          boxShadow: '$focus-ring',
        },
        [dataAttr('error', 'true')]: {
          border: '$border-critical-strong',
          '&:hover': {
            border: '$border-critical-strong-hover',
          },
          '&:focus-within': {
            boxShadow: '$focus-ring-critical',
          },
        },
        [dataAttr('disabled', 'true')]: {
          border: '$border-disabled',
          backgroundColor: '$bg-disabled',
        },
        '> [data-sl-text-input-term]': {
          padding: '$space-3 $space-4',
          height: '100%',
          [dataAttr('type', 'prefix')]: {
            borderRight: '$border',
          },
          [dataAttr('type', 'suffix')]: {
            borderLeft: '$border',
          },
        },
        '> [data-sl-input]': {
          paddingX: '$space-4',
          width: '100%',
          border: 'none',
          backgroundColor: 'unset',

          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
  },
})
