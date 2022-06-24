import type { ReactNode } from 'react'
import React from 'react'
import invariant from 'tiny-invariant'

import { Skeleton } from '../../components/Skeleton'
import { Text } from '../../components/Text'
import { Stack } from '../../stack'
import type { ResolverRenderProps } from './resolver-core'
import { createResolver, defaultRender } from './resolver-core'

export function textResolver<T>() {
  return createResolver<T, 'text', TextResolver<T>>({
    cell: function TextResolver({ item, column, context }) {
      if (context.status === 'loading') {
        return <Skeleton csx={{ height: 24 }} />
      }

      const { resolver } = column

      invariant(
        resolver,
        'Resolver prop is required while using the image resolver'
      )

      const textVariant = resolver?.isNameCell ? 'action1' : 'body'

      const data = resolver?.mapDescription ? (
        <Stack
          space={resolver?.isNameCell ? '$s' : '0'}
          csx={{ height: 64, justifyContent: 'center' }}
        >
          <Text variant={textVariant}>{resolver?.mapText(item)}</Text>
          <Text tone="secondary">{resolver.mapDescription(item)}</Text>
        </Stack>
      ) : (
        <Text variant={textVariant}>{resolver?.mapText(item)}</Text>
      )

      const render = resolver?.render ?? defaultRender

      return render({ data, item, context })
    },
  })
}

export type TextResolver<T> = {
  type: 'text'
  isNameCell?: boolean
  mapText: (item: T) => ReactNode
  mapDescription?: (item: T) => ReactNode
  render?: (props: ResolverRenderProps<ReactNode, T>) => ReactNode
}
