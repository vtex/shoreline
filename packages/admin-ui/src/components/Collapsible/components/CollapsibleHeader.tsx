import type { ReactNode, ComponentPropsWithRef } from 'react'
import React, { Fragment } from 'react'
import { jsx } from '@vtex/admin-ui-react'
import { IconCaret } from '@vtex/admin-ui-icons'
import { Disclosure as ReakitDisclosure } from 'reakit/Disclosure'

import { Flex } from '../../Flex'
import { Button } from '../../Button'
import { useCollapsibleContext } from '../context'

export const CollapsibleHeader = jsx.header(
  {
    padding: 6,
    paddingLeft: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    'div > button:nth-of-type(n+2)': {
      marginLeft: 1,
    },
  },
  {
    options: ['label'],
    useOptions(options: CollapsibleHeaderOptions, props, system) {
      const { label } = options
      const { children, className, ...headerProps } = props
      const { cx } = system

      return {
        ...headerProps,
        className: cx('__admin-ui-collapsible--header', className),
        children: (
          <Fragment>
            <Disclosure>{label}</Disclosure>
            <Flex>{children}</Flex>
          </Fragment>
        ),
      }
    },
  }
)

function Disclosure({ children }: { children: ReactNode }) {
  const { visible, ...disclosureProps } = useCollapsibleContext()

  return (
    <ReakitDisclosure visible={visible} {...disclosureProps}>
      {(enhancedProps) => {
        return (
          <Button
            {...enhancedProps}
            iconPosition="start"
            icon={
              <IconCaret
                csx={{
                  transition: 'transform 150ms ease',
                  transform: `rotate(${visible ? 180 : 90}deg)`,
                }}
              />
            }
            variant="tertiary"
            csx={{
              color: 'dark.primary',
              textTransform: 'none',
              '&:hover': { backgroundColor: 'transparent' },
              '&:active': { backgroundColor: 'transparent' },
            }}
          >
            {children}
          </Button>
        )
      }}
    </ReakitDisclosure>
  )
}

export interface CollapsibleHeaderOptions {
  /**
   * Disclosure Button label
   */
  label?: ReactNode
}

export type CollapsibleHeaderProps = ComponentPropsWithRef<
  typeof CollapsibleHeader
> &
  CollapsibleHeaderOptions
