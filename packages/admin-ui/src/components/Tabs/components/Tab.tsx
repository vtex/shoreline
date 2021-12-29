import { Tab as ReakitTab } from 'reakit'
import { jsx } from '@vtex/admin-ui-react'

import { useTabsContext } from '../context'

export const Tab = jsx(ReakitTab)(
  {
    text: '$title1',
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
    backgroundColor: 'transparent',
    color: '$primary',
    ':hover': {
      color: '$action.main.tertiaryHover',
    },
  },
  {
    options: [],
    useOptions(_, props) {
      const { id, csx, ...htmlProps } = props
      const { state } = useTabsContext()

      const selected = state.selectedId === id

      return {
        ...htmlProps,
        ...state,
        id,
        csx: {
          ...(selected
            ? {
                borderBottom: '$mainSelected',
                color: '$action.main.tertiarySelected',
              }
            : {}),
          ...csx,
        },
      }
    },
  }
)

export type TabProps = React.ComponentPropsWithRef<typeof Tab>
