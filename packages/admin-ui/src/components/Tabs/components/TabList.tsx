import { TabList as ReakitTabList } from 'reakit/Tab'
import { jsx } from '@vtex/admin-ui-react'

import { useTabsContext } from '../context'

export const TabList = jsx(ReakitTabList)(
  {
    paddingX: 4,
    width: 'full',
    variants: {
      fluid: {
        true: {
          display: 'flex',
          justifyContent: 'space-evenly',
          '> button': { width: 'full' },
        },
        false: {
          display: 'inline-block',
        },
      },
    },
  },
  {
    options: [],
    useOptions(_, props) {
      const { state } = useTabsContext()

      return { ...props, ...state }
    },
  }
)

TabList.defaultProps = {
  fluid: false,
}

export type TabListProps = React.ComponentPropsWithRef<typeof TabList>
