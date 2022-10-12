import type { ReactNode } from 'react'
import React from 'react'
import invariant from 'tiny-invariant'
import { style } from '@vtex/admin-ui-core'

import { Skeleton } from '../../skeleton'
import { Text } from '../../components/Text'
import { Grid } from '../../grid'
import type { ResolverRenderProps } from './resolver-core'
import { createResolver, defaultRender } from './resolver-core'

export function textResolver<T>() {
  return createResolver<T, 'text', TextResolver<T>>({
    cell: function TextResolver({ item, column, context }) {
      if (context === 'loading') {
        return <Skeleton csx={{ height: 24 }} />
      }

      const { resolver } = column

      invariant(
        resolver,
        'Resolver prop is required while using the text resolver'
      )

      const isNameColumn = resolver?.columnType === 'name' ?? 'text'
      const textVariant = isNameColumn ? 'action1' : 'body'

      const hasOverflow = resolver?.overflow ?? false
      const descriptionStyle = style(
        hasOverflow
          ? {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: resolver.overflow,
            }
          : {}
      )

      const data = resolver?.mapDescription ? (
        <Grid
          csx={{
            minHeight: '4rem',
            rowGap: isNameColumn ? '0.125rem' : '0',
          }}
        >
          <Text variant={textVariant} csx={{ alignSelf: 'flex-end' }}>
            {resolver?.mapText(item)}
          </Text>
          <Text tone="secondary" csx={descriptionStyle}>
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
