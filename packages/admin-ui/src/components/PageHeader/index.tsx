import React, { createContext, Fragment, useContext } from 'react'
import { jsx, tag } from '@vtex/admin-ui-react'
import { IconArrow } from '@vtex/admin-ui-icons'

import { Button } from '../Button'

const NavigationContext = createContext<NavigationContextType | null>(null)

/**
 * @example
 * <PageHeader onPopNavigation={() => {}}>
 *  <PageHeader.Title>
 *    Title
 *  </PageHeader.Title>
 * </PageHeader>
 */
const _PageHeader = jsx.header(
  {
    bg: 'light.primary',
    color: 'dark.primary',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    border: 'divider-bottom',
    position: 'sticky',
    top: 0,
    height: '4.5rem',
    paddingX: 4,
  },
  {
    options: ['onPopNavigation'],
    useOptions(options: PageHeaderOptions, props) {
      const { onPopNavigation } = options
      const { children, ...headerProps } = props

      return {
        ...headerProps,
        children: (
          <NavigationContext.Provider
            value={{
              onPopNavigation,
            }}
          >
            {children}
          </NavigationContext.Provider>
        ),
      }
    },
  }
)

const Title = jsx.div(
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
      const { onPopNavigation } = useNavigationContext()

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

const Actions = jsx.div({
  display: 'flex',
  alignItems: 'center',
  '* + *': {
    marginLeft: 4,
  },
})

interface NavigationContextType {
  onPopNavigation?: () => void
}

function useNavigationContext() {
  const context = useContext(NavigationContext)

  if (!context) {
    throw new Error('You must call PageHader composites inside of it')
  }

  return context
}

interface PageHeaderOptions {
  onPopNavigation?: () => void
}

export const PageHeader = Object.assign(_PageHeader, {
  Title,
  Actions,
})
