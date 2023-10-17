import { csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

export const textareaStyle = csx({
  '@layer': {
    components: {
      '&[data-sl-textarea-container]': {
        position: 'relative',
      },

      '&[data-sl-textarea]': {
        display: 'block',
        border: '$border-strong',
        width: '100%',
        height: 'auto',
        cursor: 'text',
        resize: 'none',
        radii: '$border-radius-small',
        outline: 'none',

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
      },

      '&[data-sl-textarea-char-counter]': {
        position: 'absolute',
        right: '0rem',
        bottom: '-1.5rem',
        color: '$fg-muted',
        text: '$text-caption-2',
      },
    },
  },
})
