import React, { ComponentPropsWithRef, PropsWithChildren } from 'react'
import { Box, Flex } from '@vtex/admin-primitives'
import { useViewContext, TableViewState } from '../context'
import { Anchor } from '../../Anchor'
import { Text } from '../../Text'
import {
  CollectionEmpty,
  CollectionError,
  CollectionNotFound,
} from '@vtex/admin-illustrations'

const illustrations = {
  itemsNotFound: <CollectionNotFound />,
  error: <CollectionError />,
  empty: <CollectionEmpty />,
}

const titleFallback = {
  itemsNotFound: 'No product match your search criteria',
  empty: 'You don’t have a product yet',
  error: 'Something went wrong',
}

export function TableViews(props: PropsWithChildren<TableViewsProps>) {
  const { illustration, children } = props

  return (
    <Flex
      justify="center"
      csx={{
        bg: 'light.secondary',
        borderRadius: '4px',
        paddingY: '8rem',
        overflow: 'auto',
        width: 'full',
      }}
    >
      <Flex justify="center" csx={{ width: '300px' }} wrap="wrap">
        <Box csx={{ marginLeft: '-1.7rem', marginY: 5 }}>{illustration}</Box>
        {children}
      </Flex>
    </Flex>
  )
}

export function TableViewResolver(props: TableViewResolverProps) {
  const { children, views } = props

  const { loading, error, itemsNotFound, empty } = useViewContext()

  const state = loading
    ? 'loading'
    : error
    ? 'error'
    : itemsNotFound
    ? 'itemsNotFound'
    : empty
    ? 'empty'
    : undefined

  if (state && state !== 'loading') {
    return (
      <TableViews illustration={illustrations[state]}>
        <Flex direction="column" align="center">
          <Text variant="subtitle">
            {views?.[state].title ?? titleFallback[state]}
          </Text>
          {views?.[state].text && (
            <Text variant="body" feedback="secondary">
              {views[state].text}
            </Text>
          )}
          {views?.[state].anchor && (
            <Anchor
              csx={{ fontSize: 1 }}
              href={views[state].anchor?.href}
              onClick={views[state].anchor?.onClick}
            >
              {views[state].anchor?.text}
            </Anchor>
          )}
        </Flex>
      </TableViews>
    )
  }

  return children
}

export interface TableViewsProps {
  illustration?: JSX.Element
  children?: JSX.Element
}

export interface TableViewResolverProps {
  children: JSX.Element
  views?: TableViewsType
}

export interface BasicTableView {
  title?: string
}

export interface TablewViewWithAnchor extends BasicTableView {
  anchor?: ViewAnchor
  text?: never
}

export interface TablewViewWithText extends BasicTableView {
  anchor?: never
  text?: string
}

type TableView = TablewViewWithText | TablewViewWithAnchor

interface ViewAnchor
  extends Pick<ComponentPropsWithRef<'a'>, 'onClick' | 'href'> {
  text: string
}

export type TableViewsType = Omit<
  Record<keyof TableViewState, TableView>,
  'loading'
>
