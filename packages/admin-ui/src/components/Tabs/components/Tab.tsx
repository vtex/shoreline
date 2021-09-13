import { Tab as ReakitTab } from 'reakit'
import { jsx } from '@vtex/admin-ui-react'

import { useTabsContext } from '../context'

export const Tab = jsx(ReakitTab)(
  {
    fontFamily: 'sans',
    fontSettings: 'regular',
    border: 'none',
    borderRadius: 'default',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    borderTopStyle: 'solid',
    borderTopColor: 'transparent',
    borderTopWidth: '2px',
    height: 44,
    minWidth: 110,
    cursor: 'pointer',
    position: 'relative',
    ':focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
    },
    ':focus': {
      outline: 'none',
      boxShadow: 'focus',
    },
    paddingX: 6,
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    color: 'dark.secondary',
  },
  {
    options: ['label'],
    useOptions(options: TabOptions, props) {
      const { label } = options
      const { id, csx, ...htmlProps } = props
      const { state } = useTabsContext()

      const selected = state.selectedId === id

      return {
        ...htmlProps,
        ...state,
        'aria-label': label,
        id,
        csx: {
          ...(selected
            ? { borderBottomColor: 'blue', color: 'blue' }
            : {
                ':hover': {
                  color: 'blue.hover',
                },
              }),
          ...csx,
        },
        children: label,
      }
    },
  }
)

interface TabOptions {
  label: string
}

export type TabProps = React.ComponentPropsWithRef<typeof Tab> & TabOptions
