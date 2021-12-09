import type { ReactNode } from 'react'
import React, { Fragment } from 'react'
import { Tooltip, TooltipReference, useTooltipState } from 'reakit/Tooltip'
import invariant from 'tiny-invariant'
import type { StyleObject } from '@vtex/admin-ui-core'
import { focusVisible } from '@vtex/admin-ui-core'
import { useSystem } from '@vtex/admin-ui-react'

import type { ResolverContext, ResolverRenderProps } from './core'
import { createResolver, defaultRender } from './core'
import { Skeleton } from '../../Skeleton'
import type { DataGridDensity } from '../typings'

const defaultPreview: ImagePreview = {
  display: true,
  delay: 0,
  size: 'regular',
}

function getImageVariant(density: DataGridDensity): StyleObject {
  return {
    regular: {
      width: 56,
      minWidth: 56,
      height: 56,
      minHeight: 56,
      borderRadius: 4,
    },
    compact: {
      width: 32,
      minWidth: 32,
      height: 32,
      minHeight: 32,
      borderRadius: 4,
    },
    variable: {
      minWidth: 32,
      minHeight: 32,
      borderRadius: 4,
    },
  }[density] as any
}

/**
 * Resolve image fields
 * @generic T: item type
 */
export function imageResolver<T>() {
  return createResolver<T, 'image', ImageResolver<T>>({
    cell: function ImageResolver({ getData, item, column, context }) {
      if (context.status === 'loading') {
        return <Skeleton csx={{ height: 24 }} />
      }

      const { cn } = useSystem()
      const url = getData()
      const { resolver } = column

      invariant(
        resolver,
        'Resolver prop is required while using the image resolver'
      )

      const preview = resolver.preview ?? defaultPreview

      const data = url ? (
        preview.display ? (
          <ImageWithPreview
            url={url}
            alt={resolver.alt}
            preview={preview}
            context={context}
          />
        ) : (
          <img
            alt={resolver.alt}
            className={cn(getImageVariant(context.density))}
            src={url}
          />
        )
      ) : (
        <Skeleton
          csx={{
            ...getImageVariant(context.density),
            animation: '',
          }}
        />
      )

      const render = resolver.render ?? defaultRender

      return render({ data, item, context })
    },
  })
}

/**
 * Image with preview on :hover
 * Delay is configurable through the preview prop
 * Uses reakit tooltip under the hood
 */
function ImageWithPreview(props: PreviewComponentProps) {
  const {
    url,
    preview,
    context: { density },
    alt,
  } = props

  const { cn } = useSystem()

  const tooltip = useTooltipState({
    placement: 'right',
    animated: true,
    visible: false,
  })

  return (
    <Fragment>
      <TooltipReference {...tooltip}>
        {(referenceProps) => (
          <img
            {...referenceProps}
            alt={alt}
            className={cn({
              ...getImageVariant(density),
              cursor: 'zoom-in',
              transition: 'transform 150ms ease-in-out',
              ':hover': {
                transform: 'scale(1.1)',
                boxShadow: '$overlay.bottom',
              },
              ...focusVisible('main'),
            })}
            src={url}
          />
        )}
      </TooltipReference>
      <Tooltip
        {...tooltip}
        className={cn({
          outline: 'none',
          transition: `opacity 100ms ease-in ${preview.delay}ms`,
          willChange: 'opacity',
          opacity: 0,
          img: {
            willChange: 'transform',
            transformOrigin: 'right center',
            transition: `transform 100ms ease-in ${preview.delay}ms`,
            transform: 'scale(0.6)',
          },
          '&[data-enter]': {
            opacity: 1,
            img: {
              transform: 'scale(1)',
            },
          },
        })}
        aria-label={`${alt} large`}
      >
        <img
          alt={`${alt} large`}
          className={cn(
            {
              small: {
                width: 56,
                minWidth: 56,
                height: 56,
                minHeight: 56,
                borderRadius: 4,
                boxShadow: '$overlay.center',
              },
              regular: {
                width: 156,
                minWidth: 156,
                height: 156,
                minHeight: 156,
                borderRadius: 4,
                boxShadow: '$overlay.center',
              },
              large: {
                width: 256,
                minWidth: 256,
                height: 256,
                minHeight: 256,
                borderRadius: 4,
                boxShadow: '$overlay.center',
              },
            }[preview.size] as StyleObject
          )}
          src={url}
        />
      </Tooltip>
    </Fragment>
  )
}

interface PreviewComponentProps {
  /**
   * url of the image
   */
  url: string
  /**
   * preview options
   */
  preview: ImagePreview
  /**
   * resolver context
   */
  context: ResolverContext
  /**
   * HTML img alt
   */
  alt?: string
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
  /**
   * HTML img alt
   */
  alt?: string
  /**
   * Preview options
   * @default {display:true,delay:0,size:'regular'}
   */
  preview?: ImagePreview
  /**
   * optional render function
   */
  render?: (props: ResolverRenderProps<JSX.Element, T>) => ReactNode
}
