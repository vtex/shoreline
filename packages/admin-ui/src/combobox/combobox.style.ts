import { dataAttr, cx, csx } from '@vtex/admin-ui-core'
import { action as actionColorScheme } from '../button/button.style'

const height = '3rem'
const width = '21.625rem'

const floatingLabelFieldRules = {
  focus: 'focus + label',
  placeholder: 'placeholder-shown:not(:focus) + label',
  placeholderShown: 'not(:placeholder-shown) + label',
}

export const fieldContainerTheme = csx({
  width,
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  [`input:${floatingLabelFieldRules.focus}, textarea:${floatingLabelFieldRules.focus}`]:
    {
      transform: 'translate(1px, 4px) scale(0.875)',
    },
  [`input:${floatingLabelFieldRules.placeholder}, textarea:${floatingLabelFieldRules.placeholder}`]:
    {
      paddingTop: '$space-1',
    },
  [`input:${floatingLabelFieldRules.placeholderShown}, textarea:${floatingLabelFieldRules.placeholderShown}`]:
    {
      transform: 'translate(1px, 4px) scale(0.875)',
    },
})

export const fieldLabelTheme = csx({
  text: '$body',
  left: 12,
  paddingTop: '$space-2',
  color: '$secondary',
  marginBottom: '$space-3',
  position: 'absolute',
  transform: 'translate(0, 16px) scale(1)',
  transformOrigin: 'top left',
  transition: 'all 0.2s ease-out;',
})

export const inputTheme = csx({
  width,
  height,
  paddingX: '$space-3',
  text: '$body',
  paddingTop: '$space-4',
  bg: '$form.neutral',
  border: '$form.neutral',
  borderRadius: '$base',
  marginY: '$space-1',
  color: '$form.neutral',
  outline: 0,
  transition: 'snap',
  ':hover': {
    border: '$form.neutralHover',
  },
  ':focus': {
    border: '$form.neutralFocus',
    boxShadow: '$ring.neutral',
  },
  ':disabled': {
    bg: '$disabled',
    color: '$disabled',
  },
})

export const buttonContainerTheme = csx({
  right: '$space-0',
  top: '$space-1',
  height: '2.875rem',
  paddingRight: '$space-3',
  position: 'absolute',
  display: 'flex',
  color: '$primary',
})

export const clearButtonTheme = csx({
  text: '$action1',
  border: 'none',
  borderRadius: '$base',
  cursor: 'pointer',
  position: 'relative',
  marginTop: '$space-2',
  marginRight: '$space-1',
  padding: '$space-2 $space-3',
  height: '2.25rem',
  ...actionColorScheme({
    tone: 'neutral',
    variant: 'tertiary',
  }),
  color: '$secondary',
})

export const popoverTheme = csx({
  width,
  padding: '$space-3',
  bg: '$primary',
  boxShadow: '$overlay.center',
  border: '$neutral',
  borderRadius: '$base',
  zIndex: '$z-4',
})

export const itemTheme = csx({
  text: '$body',
  borderRadius: '$base',
  paddingY: '$space-2',
  paddingX: '$space-3',
  cursor: 'pointer',
  '&[data-active-item]': {
    bg: '$action.neutral.tertiaryPressed',
    color: '$action.neutral.tertiaryPressed',
  },
  ':hover': {
    bg: '$action.neutral.tertiaryHover',
    color: '$action.neutral.tertiaryHover',
  },
})

export const itemMultipleTheme = cx(
  itemTheme,
  csx({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    outline: 'none',
  })
)

export const fieldTagTheme = csx({
  bg: '$action.neutral.secondary',
  color: '$primary',
  text: '$body',
  paddingY: '$space-1',
  paddingX: '$space-2',
  borderRadius: '$base',
  ':hover': {
    bg: '$action.neutral.secondaryHover',
  },
  ':active': {
    bg: '$action.neutral.secondaryPressed',
  },
})

export const fieldTagDismissTheme = csx({
  padding: '$space-0',
  marginLeft: '$space-2',
  bg: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$secondary',
})

export const fieldMultipleContainerTheme = csx({
  width: 500,
  display: 'flex',
  cursor: 'text',
  position: 'relative',
  border: '$form.neutral',
  borderRadius: '$base',
  paddingY: '$space-2',
  paddingX: '$space-3',

  ':hover': {
    border: '$form.neutralHover',
  },
  ':focus-within': {
    border: '$form.neutralFocus',
  },

  input: {
    border: 'none',
    outline: 'none',
    [dataAttr('reduce-label', true)]: {
      paddingY: '$space-1',
    },
    [dataAttr('reduce-label', false)]: {
      paddingY: '$space-0',
    },
  },
})

export const multipleLabelTheme = csx({
  position: 'absolute',
  text: '$body',
  zIndex: '$z-2',
  left: 12,
  color: '$secondary',
  transformOrigin: 'top left',
  transition: 'all 0.2s ease-out;',
  [dataAttr('reduce-label', true)]: {
    transform: 'translate(1px, 0px) scale(0.875)',
  },
  [dataAttr('reduce-label', false)]: {
    transform: 'translate(0, 9px) scale(1)',
  },
})

export const popoverStatusContainerTheme = csx({ margin: '$space-2' })
