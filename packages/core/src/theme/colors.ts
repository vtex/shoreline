export const blue = {
  blue05: 'hsla(222, 62%, 96%, 1)',
  blue10: 'hsla(222, 62%, 92%, 1)',
  blue20: 'hsla(222, 64%, 84%, 1)',
  blue30: 'hsla(222, 63%, 72%, 1)',
  blue40: 'hsla(222, 63%, 43%, 1)',
  blue50: 'hsla(222, 63%, 34%, 1)',
  blue60: 'hsla(222, 63%, 25%, 1)',
}

export const lightBlue = {
  lightBlue05: 'hsla(203, 62%, 96%, 1)',
  lightBlue10: 'hsla(206, 61%, 92%, 1)',
  lightBlue20: 'hsla(205, 63%, 84%, 1)',
  lightBlue30: 'hsla(206, 63%, 72%, 1)',
  lightBlue40: 'hsla(206, 63%, 44%, 1)',
  lightBlue50: 'hsla(206, 63%, 35%, 1)',
  lightBlue60: 'hsla(207, 64%, 22%, 1)',
}

export const red = {
  red05: 'hsla(0, 56%, 96%, 1)',
  red10: 'hsla(0, 60%, 93%, 1)',
  red20: 'hsla(0, 59%, 83%, 1)',
  red30: 'hsla(0, 59%, 73%, 1)',
  red40: 'hsla(0, 58%, 52%, 1)',
  red50: 'hsla(0, 58%, 37%, 1)',
  red60: 'hsla(0, 58%, 30%, 1)',
}

export const green = {
  green05: 'hsla(120, 39%, 95%, 1)',
  green10: 'hsla(123, 39%, 91%, 1)',
  green20: 'hsla(123, 41%, 77%, 1)',
  green30: 'hsla(122, 41%, 64%, 1)',
  green40: 'hsla(123, 41%, 37%, 1)',
  green50: 'hsla(123, 41%, 26%, 1)',
  green60: 'hsla(123, 41%, 19%, 1)',
}

export const orange = {
  orange05: 'hsla(30, 100%, 96%, 1)',
  orange10: 'hsla(30, 100%, 92%, 1)',
  orange20: 'hsla(30, 100%, 80%, 1)',
  orange30: 'hsla(30, 100%, 69%, 1)',
  orange40: 'hsla(30, 100%, 45%, 1)',
  orange50: 'hsla(30, 100%, 35%, 1)',
  orange60: 'hsla(29, 100%, 18%, 1)',
}

export const cyan = {
  cyan05: 'hsla(188, 71%, 96%, 1)',
  cyan10: 'hsla(188, 72%, 92%, 1)',
  cyan20: 'hsla(186, 70%, 79%, 1)',
  cyan30: 'hsla(187, 71%, 66%, 1)',
  cyan40: 'hsla(187, 71%, 41%, 1)',
  cyan50: 'hsla(187, 71%, 32%, 1)',
  cyan60: 'hsla(188, 78%, 16%, 1)',
}

export const purple = {
  purple05: 'hsla(266, 41%, 97%, 1)',
  purple10: 'hsla(265, 35%, 93%, 1)',
  purple20: 'hsla(268, 37%, 83%, 1)',
  purple30: 'hsla(268, 37%, 73%, 1)',
  purple40: 'hsla(268, 37%, 53%, 1)',
  purple50: 'hsla(268, 37%, 42%, 1)',
  purple60: 'hsla(268, 38%, 28%, 1)',
}

export const pink = {
  pink05: 'hsla(340, 79%, 96%, 1)',
  pink10: 'hsla(340, 83%, 93%, 1)',
  pink20: 'hsla(340, 82%, 82%, 1)',
  pink30: 'hsla(340, 82%, 71%, 1)',
  pink40: 'hsla(340, 82%, 50%, 1)',
  pink50: 'hsla(340, 82%, 39%, 1)',
  pink60: 'hsla(340, 82%, 29%, 1)',
}

export const teal = {
  teal05: 'hsla(177, 41%, 91%, 1)',
  teal10: 'hsla(175, 41%, 79%, 1)',
  teal20: 'hsla(174, 42%, 65%, 1)',
  teal30: 'hsla(174, 42%, 51%, 1)',
  teal40: 'hsla(173, 100%, 24%, 1)',
  teal50: 'hsla(173, 100%, 19%, 1)',
  teal60: 'hsla(173, 100%, 14%, 1)',
}

export const grey = {
  grey10: 'hsla(0, 0%, 98%, 1)',
  grey20: 'hsla(0, 0%, 93%, 1)',
  grey30: 'hsla(0, 0%, 87%, 1)',
  grey40: 'hsla(0, 0%, 73%, 1)',
  grey50: 'hsla(0, 0%, 45%, 1)',
  grey60: 'hsla(0, 0%, 29%, 1)',
  grey70: 'hsla(0, 0%, 20%, 1)',
  grey80: 'hsla(0, 0%, 7%, 1)',
}

export const greyTransparent = {
  greyTransparent05: 'rgba(0, 0, 0, 0.05)',
  greyTransparent10: 'rgba(0, 0, 0, 0.1)',
  greyTransparent20: 'rgba(0, 0, 0, 0.2)',
  greyTransparent30: 'rgba(0, 0, 0, 0.3)',
  greyTransparent40: 'rgba(0, 0, 0, 0.4)',
  greyTransparent50: 'rgba(0, 0, 0, 0.5)',
  greyTransparent60: 'rgba(0, 0, 0, 0.6)',
  greyTransparent70: 'rgba(0, 0, 0, 0.7)',
  greyTransparent80: 'rgba(0, 0, 0, 0.8)',
  greyTransparent90: 'rgba(0, 0, 0, 0.9)',
}

export const solid = {
  white: '#FFFFFF',
  black: '#000000',
}

export const colors = {
  ...solid,
  ...blue,
  ...red,
  ...lightBlue,
  ...orange,
  ...cyan,
  ...pink,
  ...grey,
  ...green,
  ...teal,
  ...purple,
  ...greyTransparent,
}

export const background = {
  base: colors.white,
  muted: colors.grey10,
  popup: colors.black,
  popover: colors.white,
  modal: colors.white,
  overlay: colors.greyTransparent50,
  container: colors.white,
  header: colors.white,
  sidebar: colors.grey10,
  topbar: colors.white,
  skeleton: colors.grey10,
  skeletonMuted: colors.grey20,

  action: {
    neutral: {
      ghost: 'transparent',
      ghostHover: colors.greyTransparent05,
      ghostPressed: colors.greyTransparent10,
      ghostDisabled: 'transparent',
    },

    main: {
      solid: colors.blue40,
      solidHover: colors.blue50,
      solidPressed: colors.blue60,
      solidDisabled: colors.grey30,

      soft: colors.blue10,
      softHover: colors.blue20,
      softPressed: colors.blue30,
      softDisabled: colors.grey30,

      text: 'transparent',
      textHover: colors.blue05,
      textPressed: colors.blue10,
      textDisabled: colors.grey30,
    },

    critical: {
      solid: colors.red40,
      solidHover: colors.red50,
      solidPressed: colors.red60,
      solidDisabled: colors.grey30,

      soft: colors.red10,
      softHover: colors.red20,
      softPressed: colors.red30,
      softDisabled: colors.grey30,

      text: 'transparent',
      textHover: colors.red05,
      textPressed: colors.red10,
      textDisabled: colors.grey30,
    },
  },

  listBoxItem: {
    main: colors.white,
    mainHover: colors.blue05,
    mainPressed: colors.blue10,
    mainSelected: colors.blue05,

    critical: colors.white,
    criticalHover: colors.red05,
    criticalPressed: colors.red10,
    criticalSelected: colors.red05,
  },

  notification: {
    warning: colors.orange10,
    positive: colors.green10,
    info: colors.lightBlue10,
    critical: colors.red10,
  },

  field: {
    neutral: colors.white,
    neutralHover: colors.white,
    neutralFocus: colors.white,
    neutralDisabled: colors.grey30,

    critical: colors.white,
    criticalHover: colors.white,
    criticalFocus: colors.white,
    criticalDisabled: colors.grey30,
  },

  control: {
    neutral: colors.white,
    neutralHover: colors.grey20,
    neutralPressed: colors.grey40,
    neutralDisabled: colors.grey30,

    neutralChecked: colors.black,
    neutralCheckedHover: colors.grey70,
    neutralCheckedPressed: colors.grey60,
    neutralCheckedDisabled: colors.grey30,

    neutralIndeterminate: colors.white,
    neutralIndeterminateHover: colors.grey20,
    neutralIndeterminatePressed: colors.grey40,
    neutralIndeterminateDisabled: colors.grey30,
  },
}

export const foreground = {
  base: colors.black,
  muted: colors.grey50,
  highlight: colors.lightBlue40,
  popup: colors.white,
  popover: colors.black,
  modal: colors.black,
  container: colors.black,
  header: colors.black,
  sidebar: colors.grey50,
  topbar: colors.grey50,

  action: {
    neutral: {
      ghost: colors.black,
      ghostDisabled: colors.grey50,
    },
    main: {
      solid: colors.white,
      solidDisabled: colors.grey50,
      soft: colors.blue40,
      softDisabled: colors.grey50,
      text: colors.blue40,
      textDisabled: colors.grey50,
    },
    critical: {
      solid: colors.white,
      solidDisabled: colors.grey50,
      soft: colors.red40,
      softDisabled: colors.grey50,
      text: colors.red40,
      textDisabled: colors.grey50,
    },
  },

  listBoxItem: {
    main: colors.black,
    mainHover: colors.blue50,
    mainPressed: colors.blue60,
    mainSelected: colors.blue40,

    critical: colors.red40,
    criticalHover: colors.red50,
    criticalPressed: colors.red60,
    criticalSelected: colors.red40,
  },

  link: colors.blue40,
  linkHover: colors.blue50,
  linkVisited: colors.blue60,

  notification: {
    positive: colors.green40,
    info: colors.lightBlue40,
    critical: colors.red40,
    warning: colors.orange40,
  },

  control: {
    neutral: colors.white,
    neutralDisabled: colors.grey50,

    neutralChecked: colors.white,
    neutralCheckedDisabled: colors.grey50,

    neutralIndeterminate: colors.grey60,
    neutralIndeterminateDisabled: colors.grey50,
  },
}

export const borderColor = {
  base: colors.grey30,
  popover: colors.grey30,
  modal: colors.grey30,
  container: colors.grey30,
  header: colors.grey30,
  sidebar: colors.grey30,
  topbar: colors.grey30,

  field: {
    neutral: colors.grey40,
    neutralHover: colors.grey50,
    neutralFocus: colors.grey60,
    neutralDisabled: colors.grey50,

    critical: colors.red40,
    criticalHover: colors.red50,
    criticalFocus: colors.red60,
    criticalDisabled: colors.grey50,
  },

  control: {
    neutral: colors.grey40,
    neutralHover: colors.grey70,
    neutralPressed: colors.grey60,
    neutralDisabled: colors.grey50,

    neutralChecked: colors.black,
    neutralCheckedHover: colors.grey70,
    neutralCheckedPressed: colors.grey60,
    neutralCheckedDisabled: colors.grey50,

    neutralIndeterminate: colors.grey40,
    neutralIndeterminateHover: colors.grey70,
    neutralIndeterminatePressed: colors.grey60,
    neutralIndeterminateDisabled: colors.grey50,
  },

  notification: {
    positive: colors.green30,
    info: colors.lightBlue30,
    critical: colors.red30,
    warning: colors.orange30,
  },
}
