const deprecatedSpace = {
  0: '0rem',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  px: '0.0625rem',
  '2px': '0.125rem',
}

export const space = {
  ...deprecatedSpace,
  xs: '0.25rem 0.5rem',
  s: '0.5rem 0.75rem',
  m: '0.75rem 1rem',
  l: '1rem 1.25rem',
  xl: '1.5rem 1.75rem',
  '2xl': '2.5rem 2.75rem',
  narrow: {
    s: '0.25rem 0.75rem',
    m: '0.75rem 1.25rem',
    l: '1rem 1.75rem',
  },
}

export const hspace = {
  ...deprecatedSpace,
  xs: '0.125rem',
  s: '0.25rem',
  m: '0.5rem',
  l: '0.75rem',
  xl: '1.25rem',
  '2xl': '1.75rem',
  '3xl': '2.75rem',
}

export const vspace = {
  ...deprecatedSpace,
  xs: '0rem',
  s: '0.125rem',
  m: '0.25rem',
  l: '0.5rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '3rem',
}
