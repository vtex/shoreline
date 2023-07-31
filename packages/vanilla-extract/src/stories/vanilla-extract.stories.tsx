import React from 'react'
import type { Meta } from '@storybook/react'
import { container } from './style.css'

export default {
  title: 'shoreline/vanilla-extract',
} as Meta

export function Style() {
  return <div className={container}>Should have a gray background</div>
}
