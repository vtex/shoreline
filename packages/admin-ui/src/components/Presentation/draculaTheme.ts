const purple = {
  purple1: 'rgba(149, 128, 255, 0.1)',
  purple2: 'rgba(149, 128, 255, 0.2)',
  purple3: 'rgba(149, 128, 255, 0.3)',
  purple4: 'rgba(149, 128, 255, 0.4)',
  purple5: 'rgba(149, 128, 255, 0.5)',
  purple6: 'rgba(149, 128, 255, 0.6)',
  purple7: 'rgba(149, 128, 255, 0.7)',
  purple8: 'rgba(149, 128, 255, 0.8)',
  purple9: 'rgba(149, 128, 255, 0.9)',
  purple10: 'rgba(149, 128, 255, 1)',
}

export const draculaTheme = {
  background: {
    base: '#21222c',
    muted: '#414558',
    action: {
      primary: purple.purple10,
      primaryHover: purple.purple9,
      primaryPressed: purple.purple8,

      tertiaryHover: purple.purple1,
      tertiaryPressed: purple.purple2,
    },

    control: {
      primary: 'transparent',
      primaryHover: 'transparent',
      primaryPressed: 'transparent',

      primaryChecked: purple.purple10,
      primaryCheckedHover: purple.purple9,
      primaryCheckedPressed: purple.purple8,

      primaryIndeterminate: purple.purple1,
      primaryIndeterminateHover: purple.purple2,
      primaryIndeterminatePressed: purple.purple3,
    },
  },
  foreground: {
    base: '#f8f8f2',
    muted: 'hsla(60, 30%, 96%, 0.5)',
    action: {
      primary: 'black',
      tertiary: purple.purple10,
    },

    control: {
      primary: 'black',
      primaryChecked: 'black',
      primaryIndeterminate: purple.purple10,
    },
  },
  borderColor: {
    base: '#414558',

    control: {
      primary: '#a7abbe',
      primaryHover: '#414558',
      primaryPressed: '#414558',

      primaryChecked: purple.purple10,
      primaryCheckedHover: purple.purple9,
      primaryCheckedPressed: purple.purple8,

      primaryIndeterminate: purple.purple1,
      primaryIndeterminateHover: purple.purple2,
      primaryIndeterminatePressed: purple.purple3,
    },
  },
  shadows: {
    ring: {
      primary: `0rem 0rem 0rem 0.125rem ${purple.purple4}`,
    },
  },
}
