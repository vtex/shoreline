import type { ReactNode } from 'react'
import React from 'react'
import invariant from 'tiny-invariant'
import { csx } from '@vtex/admin-ui-core'

import { Skeleton } from '../../skeleton'
import { Text } from '../../components/Text'
import { Grid } from '../../grid'
import type { ResolverRenderProps } from './resolver-core'
import { createResolver, defaultRender } from './resolver-core'
import {
  textContainerTheme,
  textDescriptionTheme,
  textTheme,
} from './resolvers.css'

export function textResolver<T>() {
  return createResolver<T, 'text', TextResolver<T>>({
    cell: function TextResolver({ item, column, context }) {
      if (context === 'loading') {
        return <Skeleton className={csx({ height: 24 })} />
      }

      const { resolver } = column

      invariant(
        resolver,
        'Resolver prop is required while using the text resolver'
      )

      const isNameColumn = resolver?.columnType === 'name' ?? 'text'
      const textVariant = isNameColumn ? 'action1' : 'body'

      const hasOverflow = resolver?.overflow ?? false

      const data = resolver?.mapDescription ? (
        <Grid className={textContainerTheme} data-name-column={isNameColumn}>
          <Text variant={textVariant} className={textTheme}>
            {resolver?.mapText(item)}
          </Text>
          <Text
            tone="secondary"
            data-overflow={hasOverflow}
            data-type={resolver.overflow}
            className={textDescriptionTheme}
          >
            {resolver.mapDescription(item)}
          </Text>
        </Grid>
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
  columnType?: 'name' | 'text'
  overflow?: 'ellipsis' | 'auto'
  mapText: (item: T) => ReactNode
  mapDescription?: (item: T) => ReactNode
  render?: (props: ResolverRenderProps<ReactNode, T>) => ReactNode
}
