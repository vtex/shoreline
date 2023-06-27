import type { ReactNode } from 'react'
import React, { Fragment } from 'react'
import { Tooltip, TooltipReference, useTooltipState } from 'reakit/Tooltip'
import invariant from 'tiny-invariant'
import { csx } from '@vtex/admin-ui-core'

import type { ResolverContext, ResolverRenderProps } from './resolver-core'
import { createResolver, defaultRender } from './resolver-core'
import { Skeleton } from '../../skeleton'
import { Flex } from '../../flex'
import {
  imageTheme,
  imageSkeletonTheme,
  imagePreviewTheme,
  imagePreviewTooltipStyle,
  imagePreviewTooltipTheme,
} from './resolvers.css'

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
      if (context === 'loading') {
        return <Skeleton className={csx({ height: '1.5rem' })} />
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
          <ImageContainer>
            <img alt={resolver.alt} className={imageTheme} src={url} />
          </ImageContainer>
        )
      ) : (
        <Skeleton className={imageSkeletonTheme} />
      )

      const render = resolver.render ?? defaultRender

      return render({ data, item, context })
    },
  })
}

function ImageContainer(props: ImageContainerProps) {
  return (
    <Flex align="center" className={csx({ height: '4rem' })}>
      {props.children}
    </Flex>
  )
}

/**
 * Image with preview on :hover
 * Delay is configurable through the preview prop
 * Uses reakit tooltip under the hood
 */
function ImageWithPreview(props: PreviewComponentProps) {
  const { url, preview, alt } = props

  const tooltip = useTooltipState({
    placement: 'right',
    animated: true,
    visible: false,
  })

  return (
    <Fragment>
      <TooltipReference {...(tooltip as any)}>
        {(referenceProps) => (
          <ImageContainer>
            <img
              {...referenceProps}
              alt={alt}
              data-image-preview
              className={imageTheme}
              src={url}
            />
          </ImageContainer>
        )}
      </TooltipReference>
      <Tooltip
        {...tooltip}
        style={imagePreviewTooltipStyle(preview.delay) as any}
        className={imagePreviewTooltipTheme}
        aria-label={`${alt} large`}
      >
        <img
          alt={`${alt} large`}
          data-size={preview.size}
          className={imagePreviewTheme}
          src={url}
        />
      </Tooltip>
    </Fragment>
  )
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
