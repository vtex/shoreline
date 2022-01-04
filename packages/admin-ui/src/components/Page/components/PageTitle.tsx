import React, { Fragment } from 'react'
import { jsx, tag } from '@vtex/admin-ui-react'
import { IconArrowLeft } from '@vtex/phosphor-icons'

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
                icon={<IconArrowLeft />}
                onClick={onPopNavigation}
              />
            )}
            <tag.h1 csx={{ text: '$pageTitle' }}>{children}</tag.h1>
          </Fragment>
        ),
      }
    },
  }
)
