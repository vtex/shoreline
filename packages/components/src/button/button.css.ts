import { calc, csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

export const buttonStyle = csx({
  '@layer': {
    components: {
      '&[data-sl-button]': {
        padding:
          '$element-space-top $element-space-right $element-space-bottom $element-space-left',
        radii: '$border-radius-medium',
        text: '$text-action',
        border: 'none',
        position: 'relative',
        cursor: 'pointer',
        appearance: 'button',
        textDecoration: 'none',
        '&:focus': {
          outline: 'none',
        },
        '> [data-sl-button-content]': {
          gap: '$space-1',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 1,
          transition: 'opacity 300ms',
          '> [data-sl-icon-small]': {
            marginLeft: calc.multiply('$space-05', -1),
          },
        },
        '> [data-sl-button-overlay]': {
          position: 'absolute',
          color: 'inherit',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        [dataAttr('loading', true)]: {
          '> [data-sl-button-content]': {
            opacity: 0,
          },
        },
        [dataAttr('size', 'normal')]: {
          '--sl-element-space-top': '$space-2',
          '--sl-element-space-bottom': '$space-2',
          '--sl-element-space-right': '$space-3',
          '--sl-element-space-left': '$space-3',
        },
        [dataAttr('size', 'large')]: {
          '--sl-element-space-top': '$space-3',
          '--sl-element-space-bottom': '$space-3',
          '--sl-element-space-right': '$space-4',
          '--sl-element-space-left': '$space-4',
        },
        [dataAttr('variant', 'secondary')]: {
          bg: '$bg-muted',
          fg: '$fg-muted',
          '&:hover': {
            bg: '$bg-muted-hover',
            fg: '$fg-muted-hover',
          },
          '&:active': {
            bg: '$bg-muted-pressed',
            fg: '$fg-muted-pressed',
          },
          '&:focus-visible': {
            boxShadow: '$focus-ring',
          },
          '&:disabled': {
            bg: '$bg-disabled',
            fg: '$fg-disabled',
            '> [data-sl-button-overlay]': {
              fg: '$fg-muted',
            },
          },
        },
        [dataAttr('variant', 'tertiary')]: {
          bg: '$bg-muted-plain',
          fg: '$fg-muted-plain',
          '&:hover': {
            bg: '$bg-muted-plain-hover',
            fg: '$fg-muted-plain-hover',
          },
          '&:active': {
            bg: '$bg-muted-plain-pressed',
            fg: '$fg-muted-plain-pressed',
          },
          '&:focus-visible': {
            boxShadow: '$focus-ring',
          },
          '&:disabled': {
            fg: '$fg-disabled',
            '> [data-sl-button-overlay]': {
              fg: '$fg-muted',
            },
          },
        },
        [dataAttr('variant', 'primary')]: {
          bg: '$bg-accent-strong',
          fg: '$fg-inverted',
          '&:hover': {
            bg: '$bg-accent-strong-hover',
          },
          '&:active': {
            bg: '$bg-accent-strong-pressed',
          },
          '&:focus-visible': {
            boxShadow: '$focus-ring-accent',
          },
          '&:disabled': {
            bg: '$bg-strong-disabled',
          },
        },
        [dataAttr('variant', 'critical')]: {
          bg: '$bg-critical-strong',
          fg: '$fg-inverted',
          '&:hover': {
            bg: '$bg-critical-strong-hover',
          },
          '&:active': {
            bg: '$bg-critical-strong-pressed',
          },
          '&:focus-visible': {
            boxShadow: '$focus-ring-critical',
          },
          '&:disabled': {
            bg: '$bg-strong-disabled',
          },
        },
        [dataAttr('variant', 'criticalTertiary')]: {
          bg: '$bg-critical-plain',
          fg: '$fg-critical',
          '&:hover': {
            bg: '$bg-critical-plain-hover',
            fg: '$fg-critical-hover',
          },
          '&:active': {
            bg: '$bg-critical-plain-pressed',
            fg: '$fg-critical-pressed',
          },
          '&:focus-visible': {
            boxShadow: '$focus-ring-critical',
          },
          '&:disabled': {
            fg: '$fg-disabled',
            '> [data-sl-button-overlay]': {
              fg: '$fg-muted',
            },
          },
        },
      },
    },
  },
})
