import React, { Fragment } from 'react'
import { jsx, tag } from '@vtex/admin-ui-react'
import { IconArrow } from '@vtex/admin-ui-icons'

import { Button } from '../../Button'
import { usePageHeaderContext } from './PageHeaderContext'

export const PageTitle = jsx('div')(
  {
    display: 'flex',
    alignItems: 'center',
    '* + *': {
      marginLeft: 4,
    },
  },
  {
    useOptions(_, props) {
      const { children, ...divProps } = props
      const { onPopNavigation } = usePageHeaderContext()

      return {
        ...divProps,
        children: (
          <Fragment>
            {onPopNavigation && (
              <Button
                variant="tertiary"
                icon={<IconArrow direction="left" />}
                onClick={onPopNavigation}
              />
            )}
            <tag.h1 csx={{ text: 'headline' }}>{children}</tag.h1>
          </Fragment>
        ),
      }
    },
  }
)
