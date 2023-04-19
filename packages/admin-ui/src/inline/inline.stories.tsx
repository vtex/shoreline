import React from 'react'

import type { Meta } from '@storybook/react'

import { Inline } from './inline'
import { Tag } from '../tag'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui/Inline',
} as Meta

export const Basic = () => {
  return (
    <Inline>
      <Tag label="Brazil" />
      <Tag label="Argentina" />
      <Tag label="Chile" />
      <Tag label="Uruguai" />
    </Inline>
  )
}

export const Wrap = () => {
  return (
    <div className={csx({ width: '18rem' })}>
      <Inline>
        <Tag label="Brasil" />
        <Tag label="Argentina" />
        <Tag label="Chile" />
        <Tag label="Uruguai" />
        <Tag label="Colombia" />
        <Tag label="Equador" />
        <Tag label="Venezuela" />
      </Inline>
    </div>
  )
}

export const Space = () => {
  return (
    <div className={csx({ width: '18rem' })}>
      <Inline hSpace="10px" vSpace="$space-20">
        <Tag label="Brasil" />
        <Tag label="Argentina" />
        <Tag label="Chile" />
        <Tag label="Uruguai" />
        <Tag label="Colombia" />
        <Tag label="Equador" />
        <Tag label="Venezuela" />
      </Inline>
    </div>
  )
}

export const SpaceInside = () => {
  return (
    <div className={csx({ width: '18rem' })}>
      <Inline spaceInside>
        <Tag label="Brasil" />
        <Tag label="Argentina" />
        <Tag label="Chile" />
        <Tag label="Uruguai" />
        <Tag label="Colombia" />
        <Tag label="Equador" />
        <Tag label="Venezuela" />
      </Inline>
    </div>
  )
}
