import React, { ReactNode, Fragment } from 'react'
import { Tooltip, TooltipReference, useTooltipState } from 'reakit/Tooltip'
import invariant from 'tiny-invariant'

import {
  createResolver,
  defaultRender,
  ResolverContext,
  ResolverRenderProps,
} from './core'
import { Skeleton } from '../../Skeleton'
import { cn } from '../../../system'

const defaultPreview: ImagePreview = {
  display: true,
  delay: 0,
  size: 'regular',
}

/**
 * Resolve image fields
 * @generic T: item type
 */
export function imageResolver<T>() {
  return createResolver<T, 'image', ImageResolver<T>>({
    cell: function ImageResolver({ getData, item, column, context }) {
      if (context.loading) {
        return <Skeleton styles={{ height: 24 }} />
      }

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
            className={cn({ themeKey: `components.table.image.${context.density}` })}
            src={url}
          />
        )
      ) : (
        <Skeleton
          styles={{
            themeKey: `components.table.image.${context.density}`,
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
    context: { dir, density },
    alt,
  } = props

  const tooltip = useTooltipState({
    placement: dir === 'rtl' ? 'left' : 'right',
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
              themeKey: `components.table.image.${density}`,
              cursor: 'zoom-in',
              transition: 'transform 150ms ease-in-out',
              ':hover': {
                transform: 'scale(1.1)',
                boxShadow: 'subtle',
              },
              ':focus:not([data-focus-visible-added])': {
                outline: 'none',
                boxShadow: 'none',
              },
              ':focus': {
                outline: 'none',
                boxShadow: 'focus',
              },
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
            transformOrigin: `${dir === 'rtl' ? 'right' : 'left'} center`,
            transition: `transform 100ms ease-in ${preview.delay}ms`,
            transform: 'scale(0.6)',
          },
          '&[data-enter]': {
            opacity: 1,
            img:  {
              transform: 'scale(1)'
            }
          }
        })}
        aria-label={`${alt} large`}
      >
        <img
          alt={`${alt} large`}
          className={cn({
            themeKey: `components.table.image-preview.${preview.size}`,
          })}
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
