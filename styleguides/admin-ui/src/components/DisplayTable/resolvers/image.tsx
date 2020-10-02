/** @jsx jsx */
import { jsx } from 'theme-ui'
import { css } from '@emotion/core'
import { ReactNode, Fragment } from 'react'
import { Tooltip, TooltipReference, useTooltipState } from 'reakit/Tooltip'
import invariant from 'tiny-invariant'

import { createResolver, defaultRender } from './core'
import { Skeleton } from '../../Skeleton'

const defaultPreview: ImagePreview = {
  display: true,
  delay: 0,
  size: 'regular',
}

function ImageWithPreview({
  url,
  preview,
}: {
  url: string
  preview: ImagePreview
}) {
  const tooltip = useTooltipState({
    placement: 'right',
    animated: true,
    visible: false,
  })

  const size = {
    small: 80,
    regular: 156,
    large: 256,
  }[preview.size ?? 'regular']

  return (
    <Fragment>
      <TooltipReference {...tooltip}>
        {(props) => (
          <img
            alt=""
            {...props}
            sx={{
              width: 56,
              minWidth: 56,
              height: 56,
              minHeight: 56,
              borderRadius: 4,
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
            transform-origin: left center;
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
            width: size,
            minWidth: size,
            height: size,
            minHeight: size,
            borderRadius: 4,
            boxShadow: 'menu',
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
    field: function Field({ getData, item, column }) {
      const url = getData()
      const { resolver } = column

      invariant(resolver, 'Resolver prop is required')

      const preview = resolver.preview ?? defaultPreview

      const content = url ? (
        preview.display ? (
          <ImageWithPreview url={url} preview={preview} />
        ) : (
          <img
            alt=""
            sx={{
              width: 56,
              minWidth: 56,
              height: 56,
              minHeight: 56,
              borderRadius: 4,
            }}
            src={url}
          />
        )
      ) : (
        <Skeleton
          sx={{
            width: 56,
            height: 56,
            borderRadius: 4,
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
