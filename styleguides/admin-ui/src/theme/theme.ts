export const theme = {
  space: {
    '0': '0rem',
    '1': '0.0625rem',
    '2': '0.125rem',
    '3': '0.25rem',
    '4': '0.375rem',
    '5': '0.5rem',
    '6': '0.625rem',
    '7': '0.75rem',
    '8': '0.875rem',
    '9': '1rem',
    '10': '1.125rem',
    '11': '1.25rem',
    '12': '1.375rem',
    '13': '1.5rem',
    '14': '1.625rem',
    '15': '1.875rem',
    '16': '2rem',
    '17': '2.125rem',
    '18': '2.25rem',
    '19': '2.375rem',
    '20': '2.5rem',
    '21': '2.625rem',
    '22': '2.75rem',
    '23': '2.875rem',
    '24': '3rem',
  },
  sizes: {
    '0': '0rem',
    '1': '0.0625rem',
    '2': '0.125rem',
    '3': '0.25rem',
    '4': '0.5rem',
    '5': '0.75rem',
    '6': '1rem',
    '7': '1.25rem',
    '8': '1.5rem',
    '9': '1.75rem',
    '10': '2rem',
    '11': '2.25rem',
    '12': '2.5rem',
    '13': '3rem',
    '14': '4rem',
    '15': '5rem',
    '16': '6rem',
    '17': '8rem',
    '18': '10rem',
    '19': '12rem',
    '20': '14rem',
    '21': '16rem',
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '1/2': '50%',
    '1/3': '33.333333%',
    '2/3': '66.666667%',
    '1/4': '25%',
    '2/4': '50%',
    '3/4': '75%',
    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
    '1/6': '16.666667%',
    '2/6': '33.333333%',
    '3/6': '50%',
    '4/6': '66.666667%',
    '5/6': '83.333333%',
    '1/12': '8.333333%',
    '2/12': '16.666667%',
    '3/12': '25%',
    '4/12': '33.333333%',
    '5/12': '41.666667%',
    '6/12': '50%',
    '7/12': '58.333333%',
    '8/12': '66.666667%',
    '9/12': '75%',
    '10/12': '83.333333%',
    '11/12': '91.666667%',
    full: '100%',
    screenHeight: '100vh',
    screenWidth: '100vw',
  },
  colors: {
    text: '#323845',
    background: '#FFFFFF',
    muted: ['#686E7B', '#8B9299', '#C1C6CC', '#D7DADF', '#F3F5F9'],
    focus: '#8DB6FA',
    emphasis: '#F71963',
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
    success: {
      base: '#097E47',
      hover: '#005C31',
      active: '#26AE6E',
      contrast: '#FFFFFF',
      washed: '#E2F5EA',
    },
  },
  components: {
    switch: {
      styles: {
        appearance: 'none',
        outline: 'none',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '6.25rem',
        backgroundColor: 'muted.1',
        borderStyle: 'solid',
        borderColor: 'muted.1',
        verticalAlign: 'middle',
        borderWidth: 1,
        '&:after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          borderRadius: '1.25rem',
          backgroundColor: 'success.contrast',
          transition: 'transform .25s ease',
        },
        '&:checked': {
          backgroundColor: 'success.base',
          borderColor: 'success.base',
          '&:focus': {
            backgroundColor: 'success.base',
            borderColor: 'success.base',
          },
          '&:hover': {
            backgroundColor: 'success.hover',
            borderColor: 'success.hover',
          },
          '&:active': {
            backgroundColor: 'success.active',
            borderColor: 'success.active',
          },
          '&:disabled': {
            backgroundColor: 'muted.1',
            borderColor: 'muted.1',
            '&:after': {
              backgroundColor: 'muted.2',
            },
          },
        },
        '&:focus': {
          backgroundColor: 'muted.0',
          borderColor: 'muted.0',
        },
        '&:hover': {
          backgroundColor: 'muted.0',
          borderColor: 'muted.0',
        },
        '&:active': {
          backgroundColor: 'muted.0',
          borderColor: 'muted.0',
        },
        '&:disabled': {
          backgroundColor: 'muted.1',
          borderColor: 'muted.1',
          '&:after': {
            backgroundColor: 'muted.2',
          },
        },
      },
      size: {
        regular: {
          height: 7,
          width: 11,
          '&:after': {
            width: '1.125rem',
            height: '1.125rem',
          },
          '&:checked': {
            '&:after': {
              transform: 'translateX(1rem)',
            },
          },
        },
        small: {
          height: 6,
          width: 9,
          '&:after': {
            width: '0.875rem',
            height: '0.875rem',
          },
          '&:checked': {
            '&:after': {
              transform: 'translateX(0.75rem)',
            },
          },
        },
      },
    },
    skeleton: {
      styles: {
        display: 'inline-block',
        width: 'full',
        height: 'full',
        backgroundColor: 'muted.4',
        backgroundSize: `200px 100%`,
        backgroundRepeat: 'no-repeat',
        lineHeight: 1,
      },
      shape: {
        rect: {
          borderRadius: 4,
        },
        circle: {
          borderRadius: '100%',
        },
      },
    },
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
          height: 12,
          width: 'auto',
          paddingLeft: 9,
          paddingRight: 9,
        },
        'regular-icon': {
          paddingY: 5,
          fontSize: 1,
          height: 12,
          width: 12,
          paddingLeft: 3,
          paddingRight: 3,
        },
        'regular-icon-start': {
          paddingY: 5,
          fontSize: 1,
          height: 12,
          width: 'auto',
          paddingLeft: 5,
          paddingRight: 7,
        },
        'regular-icon-end': {
          paddingY: 5,
          fontSize: 1,
          height: 12,
          width: 'auto',
          paddingLeft: 7,
          paddingRight: 5,
        },
        small: {
          paddingY: 4,
          fontSize: 0,
          height: 10,
          width: 'auto',
          paddingLeft: 7,
          paddingRight: 7,
        },
        'small-icon': {
          paddingY: 4,
          fontSize: 0,
          height: 10,
          width: 10,
          paddingLeft: 2,
          paddingRight: 2,
        },
        'small-icon-start': {
          paddingY: 4,
          fontSize: 0,
          height: 10,
          width: 'auto',
          paddingLeft: 5,
          paddingRight: 7,
        },
        'small-icon-end': {
          paddingY: 4,
          fontSize: 0,
          height: 10,
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
          fontVariationSettings: "'wght' 92",
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
          fontVariationSettings: "'wght' 92",
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
          fontVariationSettings: "'wght' 92",
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
          fontVariationSettings: "'wght' 92",
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
          fontVariationSettings: "'wght' 92",
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
          fontVariationSettings: "'wght' 92",
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
          lineHeight: 'small',
          fontVariationSettings: "'wght' 80",
          fontSize: 0,
        },
        body: {
          lineHeight: 'body',
          fontVariationSettings: "'wght' 80",
          fontSize: 1,
        },
        highlight: {
          lineHeight: 'highlight',
          fontVariationSettings: "'wght' 92",
          fontSize: 1,
        },
        action: {
          lineHeight: 'action',
          fontVariationSettings: "'wght' 92",
          fontSize: 1,
          textTransform: 'uppercase',
        },
        subtitle: {
          lineHeight: 'subtitle',
          fontVariationSettings: "'wght' 92",
          fontSize: 2,
        },
        headline: {
          lineHeight: 'headline',
          fontVariationSettings: "'wght' 92",
          fontSize: 4,
        },
      },
    },
  },
  breakpoints: ['20em', '48em', '56em', '64em'],
  fontSizes: {
    '0': '0.75rem',
    '1': '0.875rem',
    '2': '1rem',
    '3': '1.125rem',
    '4': '1.25rem',
  },
  zIndexes: {
    under: -1,
    plain: 0,
    over: 999,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
  },
  fontVariation: {
    light: "'wght' 80",
    regular: "'wght' 92",
    bold: "'wght' 100",
  },
  lineHeights: {
    small: 1.125,
    body: 1.25,
    highlight: 1.25,
    action: 1.5,
    subtitle: 1.5,
    headline: 1.5,
  },
  borderWidths: {
    '0': '0rem',
    '1': '0.0625rem',
    '2': '0.125rem',
    '3': '0.250rem',
  },
  borderRadius: {
    '0': '0rem',
    '1': '0.0625rem',
    '2': '0.125rem',
    '3': '0.250rem',
  },
}

export type FontSizes = '0' | '1' | '2' | '3' | '4'
export type BorderSizes = '0' | '1' | '2' | '3'
export type FontVariation = keyof typeof theme.fontVariation
export type LineHeights = keyof typeof theme.lineHeights
export type ZIndexes = 'under' | 'plain' | 'over' | '1' | '2' | '3' | '4' | '5'

export type Space =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'

export type Sizes =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '5xl'
  | '6xl'
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '2/4'
  | '3/4'
  | '1/5'
  | '2/5'
  | '3/5'
  | '4/5'
  | '1/6'
  | '2/6'
  | '3/6'
  | '4/6'
  | '5/6'
  | '1/12'
  | '2/12'
  | '3/12'
  | '4/12'
  | '5/12'
  | '6/12'
  | '7/12'
  | '8/12'
  | '9/12'
  | '10/12'
  | '11/12'
  | 'full'
  | 'screenHeight'
  | 'screenWidth'

export type AdminTheme = typeof theme
