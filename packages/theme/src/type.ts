interface ColorScale {
  default: string
  hover: string
  pressed: string
  secondary: {
    default: string
    hover: string
    pressed: string
  }
}

export interface Vars {
  colors: {
    dark: {
      primary: string
      secondary: string
    }
    light: {
      primary: string
      secondary: string
    }
    mid: {
      primary: string
      secondary: string
      tertiary: string
    }
    focus: string
    blue: ColorScale
    red: ColorScale
    yellow: ColorScale
    green: ColorScale
    sidebar: {
      light: string
      dark: string
      hover: string
    }
  }
  global: Record<string, any>
  sizes: Record<string, string>
  space: {
    0: string
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
    7: string
    8: string
    px: string
    '2px': string
  }
  breakpoints: [string, string, string, string]
  transitions: {
    snap: string
    fade: string
    pop: string
    callout: string
  }
  fonts: {
    sans: string
    mono: string
  }
  fontSizes: {
    '0': string
    '1': string
    '2': string
    '3': string
    '4': string
  }
  text: {
    code: Record<string, any>
    small: Record<string, any>
    body: Record<string, any>
    highlight: Record<string, any>
    action: Record<string, any>
    subtitle: Record<string, any>
    headline: Record<string, any>
  }
  border: {
    default: Record<string, any>
    'divider-bottom': Record<string, any>
    'divider-top': Record<string, any>
  }
  zIndices: {
    under: number
    plain: number
    over: number
    '1': number
    '2': number
    '3': number
    '4': number
    '5': number
    topbar: number
    sidebarDisclosure: number
    sidebarOverlay: number
    sidebarUl: number
  }
  fontSettings: {
    hairline: string
    thin: string
    light: string
    regular: string
    medium: string
    bold: string
    black: string
  }
  lineHeights: {
    code: number
    small: number
    body: number
    highlight: number
    action: number
    subtitle: number
    headline: number
  }
  shadows: {
    menu: string
    subtle: string
    focus: string
    inputFocus: string
    inputFocusError: string
  }
  borderRadius: {
    default: string
    flat: string
    pill: string
    circle: string
  }
}
