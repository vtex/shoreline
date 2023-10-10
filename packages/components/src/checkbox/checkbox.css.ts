import { csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

export const checkboxStyle = csx({
  '@layer': {
    tokens: {
      '--sl-checkbox-size': '1.25rem',
    },
    components: {
      '&[data-sl-checkbox]': {
        display: 'flex',
        flex: '1 0',
        alignItems: 'center',
        userSelect: 'none',
        gap: '$space-2',
        text: '$text-body',
        [dataAttr({ 'focus-visible': true })]: {
          '> [data-sl-checkbox-check]': {
            boxShadow: '$focus-ring',
          },
        },
        [dataAttr({ 'focus-visible': true, error: true })]: {
          '> [data-sl-checkbox-check]': {
            boxShadow: '$focus-ring-critical',
          },
        },
        [dataAttr('checked', true)]: {
          [dataAttr('focus-visible', true)]: {
            '> [data-sl-checkbox-check]': {
              boxShadow: '$focus-ring-accent',
            },
          },
        },
        '> [data-sl-checkbox-check]': {
          display: 'grid',
          placeItems: 'center',
          width: '$checkbox-size',
          height: '$checkbox-size',
          border: '$border-strong',
          bg: '$bg',
          radii: '$border-radius-small',
          transition: 'background 250ms, border 250ms',
          fg: '$fg-inverted',
          '> [data-sl-icon-small]': {
            transition: 'opacity 250ms',
            opacity: 0,
          },
          [dataAttr('error', true)]: {
            border: '$border-critical-strong',
          },

          [dataAttr('checked', true)]: {
            bg: '$bg-accent-strong',
            fg: '$fg-inverted',
            border: '$border-accent-strong',
            '> [data-sl-icon-small]': {
              opacity: 1,
            },
          },
        },
      },
    },
  },
})
