import { csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

export const fieldStyle = csx({
  '@layer': {
    components: {
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
})

export const fieldLabelStyle = csx({
  '@layer': {
    components: {
      color: '$fg',
      display: 'flex',
      alignItems: 'center',
      gridArea: 'label',
    },
  },
})

export const fieldMessageStyle = csx({
  '@layer': {
    components: {
      color: '$fg-muted',
      gridArea: 'message',
      text: '$text-caption-2',
      [dataAttr('error', true)]: {
        color: '$fg-critical',
      },
    },
  },
})
