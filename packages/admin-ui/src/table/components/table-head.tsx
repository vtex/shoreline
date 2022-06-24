import React, { cloneElement, Fragment } from 'react'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'
import { IconCaretDown, IconCaretUp } from '@vtex/phosphor-icons'

import { useStateContext } from '../context'
import { TableCell } from './table-cell'
import * as styles from '../styles/table-head.styles'

export const TableHead = createComponent<'thead'>((props) => {
  const { children, role = 'rowgroup', ...headProps } = props
  const state = useStateContext()

  return useElement('thead', {
    baseStyle: styles.baseline,
    ...headProps,
    role,
    children: (
      <Row>
        {state.columns.map((column) => {
          const { content, isSortable, sortDirection } = state.resolveHeader({
            column,
            items: state.data,
          })

          const cellProps = {
            column,
            role: 'columnheader',
            density: 'variable',
            onClick: isSortable
              ? () => state.sortState.sort(column.id)
              : undefined,
            children: isSortable ? (
              <tag.div csx={styles.sortableContainer}>
                {content}
                <SortIndicator direction={sortDirection} />
              </tag.div>
            ) : (
              content
            ),
          } as any

          return (
            <Fragment key={String(column.id)}>
              {children ? (
                cloneElement(children as any, cellProps)
              ) : (
                <TableCell {...cellProps} />
              )}
            </Fragment>
          )
        })}
      </Row>
    ),
  })
})

const Row = createComponent<'tr'>((props) => {
  return useElement('tr', {
    baseStyle: styles.rowBaseline,
    role: 'row',
    ...props,
  })
})

const SortIndicator = createComponent<'div', SortIndicatorOptions>((props) => {
  const { direction, ...restProps } = props

  return useElement('div', {
    ...restProps,
    baseStyle: styles.sortIndicator,
    children: (
      <Fragment>
        {direction !== 'DSC' && (
          <IconCaretUp
            weight="fill"
            height="8px"
            width="8px"
            csx={{
              color: direction === 'ASC' ? '$primary' : '$secondary',
            }}
          />
        )}
        {direction !== 'ASC' && (
          <IconCaretDown
            weight="fill"
            height="8px"
            width="8px"
            csx={{
              color: direction === 'DSC' ? '$primary' : '$secondary',
            }}
          />
        )}
      </Fragment>
    ),
  })
})

interface SortIndicatorOptions {
  direction?: 'ASC' | 'DSC' | null
}
