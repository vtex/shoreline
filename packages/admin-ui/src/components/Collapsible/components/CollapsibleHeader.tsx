import type { ReactNode, ComponentPropsWithRef } from 'react'
import React, { Fragment } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { cx, csx } from '@vtex/admin-ui-core'

import { IconCaretUp } from '@vtex/phosphor-icons'

import { Flex } from '../../../flex'
import { Button } from '../../../button'
import { useCollapsibleContext } from '../context'

export const CollapsibleHeader = createComponent<
  'div',
  CollapsibleHeaderOptions
>((props) => {
  const { label, className = '', children, ...restProps } = props

  return useElement('div', {
    baseStyle: {
      padding: '$space-6',
      paddingLeft: '$space-2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      'div > button:nth-of-type(n+2)': {
        marginLeft: '$space-1',
      },
    },
    className: cx('__admin-ui-collapsible--header', className),
    children: (
      <Fragment>
        <Disclosure>{label}</Disclosure>
        <Flex>{children}</Flex>
      </Fragment>
    ),
    ...restProps,
  })
})

function Disclosure(props: DisclosureProps) {
  const { children } = props
  const { getToggleProps, visible, disabled } = useCollapsibleContext()

  return (
    <Button
      variant="neutralTertiary"
      {...getToggleProps()}
      iconPosition="start"
      className={csx({
        svg: { height: 20, width: 20, minHeight: 20, maxHeight: 20 },
      })}
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

export interface DisclosureProps {
  children: ReactNode
}

export type CollapsibleHeaderProps = ComponentPropsWithRef<
  typeof CollapsibleHeader
> &
  CollapsibleHeaderOptions
