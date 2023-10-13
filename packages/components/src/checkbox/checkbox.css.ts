import { csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

const indeterminateSvg = (state?: 'disabled') => {
  const isDisabled = state === 'disabled'
  const fillColor = isDisabled ? 'pink' : 'var(--sl-color-blue-10)'

  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 8C1.75 7.58579 2.08579 7.25 2.5 7.25H13.5C13.9142 7.25 14.25 7.58579 14.25 8C14.25 8.41421 13.9142 8.75 13.5 8.75H2.5C2.08579 8.75 1.75 8.41421 1.75 8Z" fill="${encodeURIComponent(
    fillColor
  )}"/></svg>`
}

export const checkboxStyle = csx({
  '@layer': {
    tokens: {
      '--sl-checkbox-size': '1.25rem',
    },
    components: {
      '&[data-sl-checkbox]': {
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
        userSelect: 'none',
        gap: '$space-2',
        text: '$text-body',
        lineHeight: '$checkbox-size',

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
        '> [data-sl-checkbox-input]': {
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          width: '$checkbox-size',
          height: '$checkbox-size',
          border: '$border-strong',
          bg: '$bg',
          radii: '$border-radius-small',
          transition: 'background 250ms, border 250ms',
          fg: '$fg-inverted',
          ':indeterminate': {
            '&:after': {
              content: `url('data:image/svg+xml; utf8, ${indeterminateSvg()}')`,
              position: 'absolute',
              height: '1rem',
            },

            '&[disabled]:after': {
              content: `url('data:image/svg+xml; utf8, ${indeterminateSvg(
                'disabled'
              )}')`,
            },
          },
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
