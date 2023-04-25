import { csx, dataAttr, style } from '@vtex/admin-ui-core'

export const pageTheme = csx({
  display: 'block',
  width: '100%',
})

export const pageHeaderViewportRef = csx({
  height: '1rem',
  position: 'absolute',
  left: '$space-0',
  right: '$space-0',
  zIndex: -2147483638,
  top: 'var(--header-distance-from-top, 0)',
})

export const pageHeaderViewportRefStyle = (space: number) =>
  style({ '--header-distance-from-top': space })

export const pageHeaderTheme = csx({
  bg: '$primary',
  color: '$primary',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  borderBottom: '$neutral',
  position: 'sticky',
  top: '$space-0',
  minHeight: '5.75rem',
  paddingX: '2rem',
  paddingY: '1.5rem',
  zIndex: '$z-9',
  [dataAttr('scrollOnTop', 'false')]: { boxShadow: '$overlay.center' },
})

export const pageHeaderTopTheme = csx({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '95rem',
  minHeight: '2.75rem',
})

export const pageHeaderBottomTheme = csx({
  width: '100%',
  marginTop: '$space-2',
  '> div': {
    paddingX: 'unset',
  },
  maxWidth: '95rem',
  [dataAttr('tabs', 'true')]: {
    marginBottom: '-1.5rem',
    '* > button': {
      minWidth: 'unset',
    },
  },
})

export const pageHeaderTitleContainer = csx({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
})

export const pageHeaderTitleTheme = csx({
  text: '$pageTitle',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  '> div:first-of-type': {
    marginLeft: '0.75rem',
  },
})

export const popNavigationButtonTheme = csx({
  marginRight: '0.5rem !important',
})

export const pageHeaderActionsTheme = csx({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
})

export const pageHeaderButtonTheme = csx({
  minWidth: '6.5rem',
})

export const pageContentTheme = csx({
  width: '100%',
  margin: 'auto',
  display: 'grid',
  gridGap: '1rem',
  paddingX: '1rem',
  gridTemplateColumns: 'var(--page-content-template)',
  '@desktop': {
    paddingX: '2rem',
  },
  [dataAttr('layout', 'wide')]: {
    maxWidth: '99rem',
    paddingTop: '2rem',
    paddingBottom: '3rem',
  },
  [dataAttr('layout', 'standard')]: {
    maxWidth: '75rem',
    paddingTop: '2.5rem',
    paddingBottom: '5rem',
  },
  [dataAttr('layout', 'narrow')]: {
    maxWidth: '50rem',
    paddingTop: '3rem',
    paddingBottom: '8rem',
  },
})
