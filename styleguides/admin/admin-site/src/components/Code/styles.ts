import { StyleObject } from '@vtex/admin-ui'

export default {
  wrapper: {
    borderRadius: 'default',
    boxShadow: 'menu',
    overflow: 'hidden',
    marginBottom: '32px',
  },
  preview: {
    // TODO: grow height
    position: 'relative',
    padding: '0.5rem',
    background: 'white',
    color: 'black',
    overflow: 'hidden',
  },
  editorWrapper: {
    fontFamily:
      "Hack, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    fontVariant:
      'no-common-ligatures no-discretionary-ligatures no-historical-ligatures no-contextual',
    overflow: 'auto',
    position: 'relative',
    'textarea, pre': {
      fontSize: '14px !important',
      lineHeight: '22px !important',
      padding: '1rem !important',
    },
    '* > textarea:focus': { outline: 'none' },
    '.token': { fontStyle: 'normal !important' },
  },
  liveEditor: {
    display: 'block',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontFamily:
      "Hack, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    fontVariant:
      'no-common-ligatures no-discretionary-ligatures no-historical-ligatures no-contextual',
    padding: '1rem',
    bg: 'danger.washed.base',
    color: 'danger.washed.accent',
    text: 'body',
  },
  copyButton: {
    position: 'absolute',
    top: '0',
    right: '0',
    zIndex: 1,
    color: 'white',
  },
  preHeader: {
    bg: 'text.primary',
    color: 'white',
    fontSize: '12px',
    lineHeight: '18px',
    marginTop: '0.5rem',
    padding: '0.8rem 1rem',
    borderRadius: '5px 5px 0 0',
  },
  lineNo: {
    display: 'inline-block',
    width: '2rem',
    userSelect: 'none',
    opacity: 0.3,
  },
  pre: {
    WebkitOverflowScrolling: 'touch',
    overflowWrap: 'break-word',
    boxShadow: '1px 1px 20px rgba(20, 20, 20, 0.27)',
    code: {
      cssFloat: 'left',
      minWidth: '100%',
      paddingRight: '1rem',
    },
    '.token-line': {
      lineHeight: '22px',
      fontSize: '14px',
      minWidth: '100%',
    },
    '.highlight-line': {
      backgroundColor: '#44475a',
      marginLeft: '-1rem',
      marginRight: '-2rem',
      padding: '0 0.75rem',
      borderLeft: '4px solid blue',
    },
    overflow: 'auto',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    textAlign: 'left',
  },
} as Record<string, StyleObject>
