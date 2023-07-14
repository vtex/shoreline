import { csx, dataAttr } from '@vtex/admin-ui'

export const headerButtonStyle = csx({
  padding: '$space-1',
  bg: '#fff',
  fg: '$action.neutral.tertiary',
  borderRadius: 'var(--sp-border-radius)',
  ':hover': {
    bg: 'var(--sp-colors-surface3)',
  },
})

export const sandpackContainer = csx({
  paddingY: '$space-4',
  marginBottom: '$space-4',
})

export const layoutStyle = csx({
  [dataAttr('is-fullscreened', true)]: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: '9999',
    height: '100%',
    width: '100%',
    position: 'fixed',
    inset: '0px',
  },
  '.sp-wrapper': {
    flex: '1 1 0%',
    display: 'flex',
    height: '100%',
  },
})

export const copyCodeButtonStyle = csx({})

export const editorStyle = csx({
  maxHeight: '32.5rem',
  [dataAttr('is-fullscreened', true)]: {
    order: 2,
  },
})

export const editorContainerStyle = csx({ width: '100%', position: 'relative' })

export const previewStyle = csx({ padding: '$space-4' })

export const headerStyle = csx({
  width: '100%',
  display: 'flex',
  height: '2.25rem',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingY: '$space-1',
  paddingX: '$space-4',
  bg: '#fff',
})
