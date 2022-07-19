import React from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Paragraph } from '../components/Paragraph'
import { Stack } from '../stack'

export const CardTitle = createComponent<'div', CardTitleOptions>((props) => {
  const { children, label, thumbnail, ...restProps } = props

  return useElement('div', {
    ...restProps,
    children: (
      <Stack direction="row" space="$l">
        {thumbnail ? (
          <CardThumbnail src={thumbnail.src} alt={thumbnail.alt} />
        ) : null}
        <Paragraph
          className="__admin-ui-card-nested-title"
          csx={{ text: '$title1' }}
        >
          {label}
        </Paragraph>
        {children}
      </Stack>
    ),
  })
})

export const CardThumbnail = createComponent<'img'>((props) => {
  return useElement('img', {
    ...props,
    baseStyle: {
      absoluteSize: '1rem',
      order: 0,
    },
  })
})

export interface CardTitleOptions {
  label: ReactNode
  thumbnail?: { src: string; alt: string }
}

export type CardTitleProps = ComponentPropsWithRef<typeof CardTitle>
