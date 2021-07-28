import React, { Fragment } from 'react'
import { Flex } from '@vtex/admin-primitives'
import { tag, jsx } from '@vtex/onda-react'
import {
  CollectionEmpty,
  CollectionError,
  CollectionNotFound,
} from '@vtex/admin-illustrations'

import { Anchor } from '../../Anchor'
import { Text } from '../../Text'
import { useStateContext } from '../context'

const View = jsx.div(
  {
    display: 'flex',
    justifyContent: 'center',
    bg: 'light.secondary',
    borderRadius: '4px',
    paddingY: '3.375rem',
    overflow: 'auto',
    width: 'full',
  },
  {
    options: ['illustration'],
    useOptions(options: ViewOptions, props) {
      const { illustration } = options
      const { children, ...viewProps } = props

      return {
        ...viewProps,
        children: (
          <tag.div
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
            <tag.div csx={{ marginLeft: '-1.7rem', marginY: 5 }}>
              {illustration}
            </tag.div>
            {children}
          </tag.div>
        ),
      }
    },
  }
)

interface ViewOptions {
  illustration: JSX.Element
}

export function Status() {
  const { status, statusObject } = useStateContext()

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
            <Text variant="subtitle">{statusObject.notFound?.message}</Text>
            {statusObject.notFound?.suggestion && (
              <Text variant="body" feedback="secondary">
                {statusObject.notFound?.suggestion}
              </Text>
            )}
          </Fragment>
        )}

        {status === 'empty' && (
          <Fragment>
            <Text variant="subtitle">{statusObject.empty?.message}</Text>
          </Fragment>
        )}

        {status === 'error' && (
          <Fragment>
            <Text variant="subtitle">{statusObject.error?.message}</Text>
            {statusObject.error?.onRetry && (
              <Text variant="body">
                <Anchor
                  csx={{ fontSize: 1 }}
                  // href={views[state].anchor?.href}
                  onClick={statusObject.error?.onRetry}
                >
                  Retry
                </Anchor>
              </Text>
            )}
          </Fragment>
        )}
      </Flex>
    </View>
  )
}
