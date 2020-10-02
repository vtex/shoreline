/** @jsx jsx */
import { jsx } from 'theme-ui'
import { css } from '@emotion/core'
import { ReactNode, Fragment } from 'react'
import { Tooltip, TooltipReference, useTooltipState } from 'reakit/Tooltip'
import invariant from 'tiny-invariant'

import { createResolver, defaultRender, ResolverContext } from './core'
import { Skeleton } from '../../Skeleton'

const defaultPreview: ImagePreview = {
  display: true,
  delay: 0,
  size: 'regular',
}

function ImageWithPreview({
  url,
  preview,
  context: { dir, density },
}: {
  url: string
  preview: ImagePreview
  context: ResolverContext
}) {
  const tooltip = useTooltipState({
    placement: dir === 'rtl' ? 'left' : 'right',
    animated: true,
    visible: false,
  })

  return (
    <Fragment>
      <TooltipReference {...tooltip}>
        {(props) => (
          <img
            alt=""
            {...props}
            sx={{
              variant: `data.table.image.${density}`,
              cursor: 'pointer',
              transition: 'transform 150ms ease-in-out',
              ':hover': {
                transform: 'scale(1.1)',
                boxShadow: 'subtle',
              },
              ':focus': {
                outline: 'none',
                boxShadow: 'focus',
              },
            }}
            src={url}
          />
        )}
      </TooltipReference>
      <Tooltip
        {...tooltip}
        css={css`
          transition: opacity 100ms ease-in ${preview.delay}ms;
          will-change: opacity;
          opacity: 0;
          img {
            will-change: transform;
            transform-origin: ${dir === 'rtl' ? 'right' : 'left'} center;
            transition: transform 100ms ease-in ${preview.delay}ms;
            transform: scale(0.6);
          }
          &[data-enter] {
            opacity: 1;
            img {
              transform: scale(1);
            }
          }
        `}
        aria-label="Large Image"
        sx={{ outline: 'none' }}
      >
        <img
          alt=""
          sx={{
            variant: `data.table.image-preview.${preview.size}`,
          }}
          src={url}
        />
      </Tooltip>
    </Fragment>
  )
}

/**
 * Resolve image fields
 * @generic T: item type
 */
export function imageResolver<T>() {
  return createResolver<T, 'image', ImageResolver<T>>({
    field: function Field({ getData, item, column, context }) {
      const url = getData()
      const { resolver } = column

      invariant(resolver, 'Resolver prop is required')

      const preview = resolver.preview ?? defaultPreview

      const content = url ? (
        preview.display ? (
          <ImageWithPreview url={url} preview={preview} context={context} />
        ) : (
          <img
            alt=""
            sx={{ variant: `data.table.image.${context.density}` }}
            src={url}
          />
        )
      ) : (
        <Skeleton
          sx={{
            variant: `data.table.image.${context.density}`,
            animation: '',
          }}
        />
      )

      const render = resolver.render ?? defaultRender

      return render(content, item)
    },
  })
}

type ImagePreview = {
  /**
   * if should display preview or not
   * @default true
   */
  display: boolean
  /**
   * Delay to show (in ms)
   * @default 0
   */
  delay: number
  /**
   * Preview size
   * @default regular
   */
  size: 'small' | 'regular' | 'large'
}

export type ImageResolver<T> = {
  type: 'image'
  preview?: ImagePreview
  render?: (image: JSX.Element, item: T) => ReactNode
}
