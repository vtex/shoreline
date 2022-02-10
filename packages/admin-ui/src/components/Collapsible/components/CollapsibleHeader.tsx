import type { ReactNode, ComponentPropsWithRef } from 'react'
import React, { Fragment } from 'react'
import { jsx } from '@vtex/admin-ui-react'
import { IconCaretUp } from '@vtex/phosphor-icons'

import { Flex } from '../../Flex'
import { Button } from '../../Button'
import { useCollapsibleContext } from '../context'

export const CollapsibleHeader = jsx('header')(
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
  const { getToggleProps, visible, disabled } = useCollapsibleContext()

  return (
    <Button
      variant="adaptative-dark"
      {...getToggleProps()}
      iconPosition="start"
      csx={{
        svg: { height: 20, width: 20, minHeight: 20, maxHeight: 20 },
      }}
      icon={
        <IconCaretUp
          csx={{
            transition: 'transform 150ms ease',
            transform: `rotate(${visible ? 180 : 90}deg)`,
          }}
        />
      }
      disabled={disabled}
    >
      {children}
    </Button>
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
