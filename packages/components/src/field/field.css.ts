import { csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

export const fieldStyle = csx({
  '@layer': {
    components: {
      '&[data-sl-field]': {
        display: 'grid',
        gap: '0.25rem 0.5rem',
        gridTemplateAreas: '"label" "input" "message"',
        [dataAttr('field-control', true)]: {
          gridTemplateAreas: '"input label" "- message"',
        },
        '> [data-sl-checkbox],[data-sl-input],[data-sl-textarea],[data-sl-radio]':
          {
            gridArea: 'input',
          },
      },
    },
  },
})

export const fieldLabelStyle = csx({
  '@layer': {
    components: {
      '&[data-sl-field-label]': {
        color: '$fg',
        display: 'flex',
        alignItems: 'center',
        gridArea: 'label',
      },
    },
  },
})

export const fieldMessageStyle = csx({
  '@layer': {
    components: {
      '&[data-sl-field-message]': {
        gridArea: 'message',
      },
      '&[data-sl-field-message-text]': {
        color: '$fg-muted',
        text: '$text-caption-2',
        [dataAttr('error', true)]: {
          color: '$fg-critical',
        },
      },
    },
  },
})
