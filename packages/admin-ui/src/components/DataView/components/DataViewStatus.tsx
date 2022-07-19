import React, { Fragment } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import {
  CollectionEmpty,
  CollectionError,
  CollectionNotFound,
} from '../../Illustrations'

import { Flex } from '../../../flex'
import { Box } from '../../../box'
import { Anchor } from '../../Anchor'
import { Text } from '../../Text'
import { useDataViewContext } from '../context'

/**
 * Renders the illustrations
 * Must be under the DataViewContext
 */
export const View = createComponent<'div', ViewOptions>((props) => {
  const { children, illustration, ...restProps } = props

  return useElement('div', {
    baseStyle: {
      display: 'flex',
      justifyContent: 'center',
      paddingY: '3.375rem',
      overflow: 'auto',
      width: '100%',
      height: '100%',
    },
    ...restProps,
    children: (
      <Box
        csx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: 4,
          maxWidth: '38.75rem',
          minHeight: '11.375rem',
          wordBreak: 'break-word',
        }}
      >
        <Box csx={{ marginLeft: '-1.7rem', marginY: 5 }}>{illustration}</Box>
        {children}
      </Box>
    ),
  })
})

interface ViewOptions {
  illustration: JSX.Element
}

/**
 * Renders the DataView status
 * Must be under the DataViewContext
 */
export function DataViewStatus() {
  const { status, statusObject } = useDataViewContext()

  if (!status) return null

  if (status === 'loading' || status === 'ready') return null

  const illustration = {
    'not-found': <CollectionNotFound />,
    error: <CollectionError />,
    empty: <CollectionEmpty />,
  }[status]

  return (
    <View illustration={illustration}>
      <Flex direction="column" align="center">
        {status === 'not-found' && (
          <Fragment>
            <Text variant="title2">{statusObject.notFound?.message}</Text>
            {statusObject.notFound?.suggestion && (
              <Text variant="body" tone="secondary">
                {statusObject.notFound?.suggestion}
              </Text>
            )}
          </Fragment>
        )}

        {status === 'empty' && (
          <Fragment>
            <Text variant="title2">{statusObject.empty?.message}</Text>
            {statusObject.empty?.action && (
              <Anchor
                csx={{ fontSize: 1, text: '$body' }}
                onClick={statusObject.empty?.action?.onClick}
                href={statusObject.empty?.action?.href}
              >
                {statusObject.empty.action.text}
              </Anchor>
            )}
          </Fragment>
        )}

        {status === 'error' && (
          <Fragment>
            <Text variant="title2">{statusObject.error?.message}</Text>
            {statusObject.error?.action && (
              <Anchor
                csx={{ fontSize: 1, text: '$body' }}
                onClick={statusObject.error?.action?.onClick}
                href={statusObject.error?.action?.href}
              >
                {statusObject.error.action.text}
              </Anchor>
            )}
          </Fragment>
        )}
      </Flex>
    </View>
  )
}
