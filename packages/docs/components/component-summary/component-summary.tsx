import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import Image from 'next/image'
import { getComponentProps } from '../../utils/get-component-props'
import { ImgCard } from '../img-card'

const imageEstimatedWidth = 370
const imageEstimatedHeight = 218

/**
 * Renders a component summary
 */
export function ComponentSummary(props: ComponentSummaryProps) {
  const { href, name } = props

  const componentProps = getComponentProps(name)

  return (
    <ImgCard
      href={href || `/components/${name}`}
      title={componentProps?.name}
      description={componentProps?.description}
      image={
        <Image
          src={`/assets/all-${name}.png`}
          alt={name}
          width={imageEstimatedWidth}
          height={imageEstimatedHeight}
        />
      }
    />
  )
}

interface ComponentSummaryProps extends ComponentPropsWithoutRef<'a'> {
  /**
   * Link href
   */
  href?: string
  /**
   * Component name
   */
  name: string
}
