import type { ReactNode } from 'react'
import React, { Fragment } from 'react'
import { Tooltip, TooltipReference, useTooltipState } from 'reakit/Tooltip'
import invariant from 'tiny-invariant'
import type { StyleObject, Theme } from '@vtex/admin-ui-core'
import { style, focusVisible } from '@vtex/admin-ui-core'
import { useSystem } from '@vtex/admin-ui-react'
import { get } from '@vtex/admin-ui-util'

import type { ResolverContext, ResolverRenderProps } from './resolver-core'
import { createResolver, defaultRender } from './resolver-core'
import { Skeleton } from '../../skeleton'
import { Stack } from '../../stack'

const defaultPreview: ImagePreview = {
  display: true,
  delay: 0,
  size: 'regular',
}

const imageStyles = style({
  size: '2.75rem',
  minSize: '2.75rem',
  verticalAlign: 'middle',
  borderRadius: '$default',
  outlineColor: (theme: Theme) => get(theme, 'bg.primary', 'bg.primary'),
  outlineWidth: '0.125rem',
  outlineStyle: 'solid',
})

/**
 * Resolve image fields
 * @generic T: item type
 */
export function imageResolver<T>() {
  return createResolver<T, 'image', ImageResolver<T>>({
    cell: function ImageResolver({ getData, item, column, context }) {
      if (context === 'loading') {
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
          <ImageContainer>
            <img alt={resolver.alt} className={cn(imageStyles)} src={url} />
          </ImageContainer>
        )
      ) : (
        <Skeleton
          csx={{
            ...imageStyles,
            animation: '',
          }}
        />
      )

      const render = resolver.render ?? defaultRender

      return render({ data, item, context })
    },
  })
}

function ImageContainer(props: ImageContainerProps) {
  return (
    <Stack csx={{ height: '4rem', justifyContent: 'center' }}>
      {props.children}
    </Stack>
  )
}

/**
 * Image with preview on :hover
 * Delay is configurable through the preview prop
 * Uses reakit tooltip under the hood
 */
function ImageWithPreview(props: PreviewComponentProps) {
  const { url, preview, alt } = props

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
          <ImageContainer>
            <img
              {...referenceProps}
              alt={alt}
              className={cn({
                ...imageStyles,
                ...focusVisible('main'),
              })}
              src={url}
            />
          </ImageContainer>
        )}
      </TooltipReference>
      <Tooltip
        {...tooltip}
        className={cn({
          display: 'flex',
          outline: 'none',
          paddingY: '$space-2',
          paddingX: '$space-2',
          transition: `opacity 100ms ease-in ${preview.delay}ms`,
          willChange: 'opacity',
          opacity: 0,
          boxShadow: '$overlay.center',
          borderRadius: '$default',
          background: '$primary',
          zIndex: 999,
          img: {
            borderRadius: '$default',
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
                size: 56,
                minSize: 56,
              },
              regular: {
                size: 156,
                minSize: 156,
              },
              large: {
                size: 256,
                minSize: 256,
              },
            }[preview.size] as StyleObject
          )}
          src={url}
        />
      </Tooltip>
    </Fragment>
  );
}

interface ImageContainerProps {
  children: ReactNode
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
