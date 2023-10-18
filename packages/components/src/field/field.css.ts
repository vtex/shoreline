import { csx } from '@vtex/shoreline-vanilla-extract'

export const fieldStyle = csx({
  '@layer': {
    components: {
      '&[data-sl-field]:has(> [data-sl-checkbox],[data-sl-radio])': {
        gridTemplateAreas: '"input label" "- message"',
      },

      '&[data-sl-field]': {
        display: 'grid',
        gap: '0.25rem 0.5rem',
        gridTemplateAreas: '"label" "input" "message"',

        '[data-sl-checkbox],[data-sl-input],[data-sl-textarea],[data-sl-radio][data-sl-select]':
          {
            gridArea: 'input',
          },

        '[data-sl-field-message]': {
          gridArea: 'message',
        },

        '[data-sl-field-message-text]': {
          color: '$fg-muted',
          text: '$text-caption-2',
        },
        '[data-sl-field-message-text][role="alert"]': {
          color: '$fg-critical',
        },

        '[data-sl-field-label]': {
          color: '$fg',
          display: 'flex',
          alignItems: 'center',
          gridArea: 'label',
        },
      },
    },
  },
})
