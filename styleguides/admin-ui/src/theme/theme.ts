import { Theme } from '@vtex-components/theme'

export const theme: Theme = {
  space: [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
  colors: {
    text: '#323845',
    background: '#FFFFFF',
    muted: ['#686E7B', '#8B9299', '#C1C6CC', '#D7DADF', '#F3F5F9'],
    focus: '#8DB6FA',
    primary: {
      base: '#2953B2',
      hover: '#1E4397',
      active: '#3F6FDB',
      contrast: '#FFFFFF',
      washed: '#F4F8FE',
    },
    danger: {
      base: '#D23030',
      hover: '#A70C0C',
      active: '#DE0404',
      contrast: '#FFFFFF',
      washed: '#FFF0F0',
    },
  },
  components: {
    button: {
      styles: {
        borderWidth: 1,
        borderRadius: 3,
        cursor: 'pointer',
        position: 'relative',
        borderStyle: 'solid',
        '&:focus': {
          outline: 'none',
        },
      },
      size: {
        regular: {
          paddingY: 5,
          fontSize: 1,
          height: 40,
          width: 'auto',
          paddingLeft: 9,
          paddingRight: 9,
        },
        'regular-icon': {
          paddingY: 5,
          fontSize: 1,
          height: 40,
          width: 40,
          paddingLeft: 3,
          paddingRight: 3,
        },
        'regular-icon-start': {
          paddingY: 5,
          fontSize: 1,
          height: 40,
          width: 'auto',
          paddingLeft: 5,
          paddingRight: 7,
        },
        'regular-icon-end': {
          paddingY: 5,
          fontSize: 1,
          height: 40,
          width: 'auto',
          paddingLeft: 7,
          paddingRight: 5,
        },
        small: {
          paddingY: 4,
          fontSize: 0,
          height: 32,
          width: 'auto',
          paddingLeft: 7,
          paddingRight: 7,
        },
        'small-icon': {
          paddingY: 4,
          fontSize: 0,
          height: 32,
          width: 32,
          paddingLeft: 2,
          paddingRight: 2,
        },
        'small-icon-start': {
          paddingY: 4,
          fontSize: 0,
          height: 32,
          width: 'auto',
          paddingLeft: 5,
          paddingRight: 7,
        },
        'small-icon-end': {
          paddingY: 4,
          fontSize: 0,
          height: 32,
          width: 'auto',
          paddingLeft: 7,
          paddingRight: 5,
        },
      },
      variant: {
        'filled-primary': {
          textTransform: 'uppercase',
          color: 'primary.contrast',
          backgroundColor: 'primary.base',
          fontVariationSettings: "'wght' 100",
          borderColor: 'primary.base',
          '&:hover': {
            backgroundColor: 'primary.hover',
            borderColor: 'primary.hover',
          },
          '&:active': {
            backgroundColor: 'primary.active',
            borderColor: 'primary.active',
          },
          '&:disabled': {
            color: 'text',
            borderColor: 'muted.2',
            backgroundColor: 'muted.2',
          },
        },
        'outlined-primary': {
          textTransform: 'uppercase',
          backgroundColor: 'transparent',
          borderColor: 'muted.2',
          color: 'primary.base',
          fontVariationSettings: "'wght' 100",
          '&:hover': {
            backgroundColor: 'primary.washed',
            color: 'primary.hover',
          },
          '&:active': {
            color: 'primary.active',
          },
          '&:disabled': {
            color: 'muted.1',
            backgroundColor: 'muted.4',
          },
        },
        'subtle-primary': {
          borderColor: 'transparent',
          textTransform: 'capitalize',
          backgroundColor: 'transparent',
          color: 'primary.base',
          fontVariationSettings: "'wght' 80",
          '&:hover': {
            color: 'primary.hover',
            backgroundColor: 'primary.washed',
          },
          '&:active': {
            color: 'primary.active',
            backgroundColor: 'primary.washed',
          },
          '&:disabled': {
            color: 'muted.1',
          },
        },
        'filled-danger': {
          textTransform: 'uppercase',
          color: 'danger.contrast',
          backgroundColor: 'danger.base',
          fontVariationSettings: "'wght' 100",
          borderColor: 'danger.base',
          '&:hover': {
            borderColor: 'danger.hover',
            backgroundColor: 'danger.hover',
          },
          '&:active': {
            borderColor: 'danger.active',
            backgroundColor: 'danger.active',
          },
          '&:disabled': {
            borderColor: 'muted.2',
            color: 'text',
            backgroundColor: 'muted.2',
          },
        },
        'outlined-danger': {
          textTransform: 'uppercase',
          backgroundColor: 'transparent',
          borderColor: 'muted.2',
          color: 'danger.base',
          fontVariationSettings: "'wght' 100",
          '&:hover': {
            backgroundColor: 'danger.washed',
            color: 'danger.hover',
          },
          '&:active': {
            color: 'danger.active',
          },
          '&:disabled': {
            color: 'muted.1',
            backgroundColor: 'muted.4',
          },
        },
        'subtle-danger': {
          borderColor: 'transparent',
          textTransform: 'capitalize',
          backgroundColor: 'transparent',
          color: 'danger.base',
          fontVariationSettings: "'wght' 80",
          '&:hover': {
            color: 'danger.hover',
            backgroundColor: 'danger.washed',
          },
          '&:active': {
            color: 'danger.active',
            backgroundColor: 'danger.washed',
          },
          '&:disabled': {
            color: 'muted.1',
          },
        },
      },
    },
    text: {
      variant: {
        small: {
          color: 'text',
          lineHeight: 'small',
          fontVariationSettings: "'wght' 80",
          fontSize: 0,
        },
        body: {
          color: 'text',
          lineHeight: 'body',
          fontVariationSettings: "'wght' 80",
          fontSize: 1,
        },
        highlight: {
          color: 'text',
          lineHeight: 'highlight',
          fontVariationSettings: "'wght' 100",
          fontSize: 1,
        },
        action: {
          color: 'text',
          lineHeight: 'action',
          fontVariationSettings: "'wght' 100",
          fontSize: 1,
          textTransform: 'uppercase',
        },
        subtitle: {
          color: 'text',
          lineHeight: 'subtitle',
          fontVariationSettings: "'wght' 100",
          fontSize: 2,
        },
        headline: {
          color: 'text',
          lineHeight: 'headline',
          fontVariationSettings: "'wght' 100",
          fontSize: 3,
        },
      },
    },
  },
  fontSizes: [12, 14, 16, 20],
  lineHeights: {
    small: 1.125,
    body: 1.25,
    highlight: 1.25,
    action: 1.5,
    subtitle: 1.5,
    headline: 1.5,
  },
  borderWidths: [0, 1, 2, 4, 6],
  borderRadius: [0, 1, 2, 4, 6],
}

export type AdminTheme = typeof theme
