import { csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

export const buttonStyle = csx({
  '@layer': {
    components: {
      '&[data-sl-button]': {
        '--sl-element-space-top': '$space-2',
        '--sl-element-space-bottom': '$space-2',
        '--sl-element-space-right': '$space-3',
        '--sl-element-space-left': '$space-3',

        padding:
          '$element-space-top $element-space-right $element-space-bottom $element-space-left',

        position: 'relative',
        bg: '$bg-muted',
        fg: '$fg-muted',
        radii: '$border-radius-medium',
        gap: '$space-2',
        '&:hover': {
          bg: '$bg-muted-hover',
          fg: '$fg-muted-hover',
        },
        '&:active': {
          bg: '$bg-muted-pressed',
          fg: '$fg-muted-pressed',
        },

        '> [data-sl-button-content]': {
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 1,
          transition: 'opacity 300ms',
        },

        [dataAttr('loading', true)]: {
          '> [data-sl-button-content]': {
            opacity: 0,
          },
        },

        '> [data-sl-button-overlay]': {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          color: 'inherit',
          display: 'grid',
          placeItems: 'center',
        },
      },
    },
  },
})
