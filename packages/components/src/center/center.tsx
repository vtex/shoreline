import type { ComponentPropsWithoutRef } from 'react'
import { createComponent } from '@vtex/shoreline-utils'
import './center.css'

export const Center = createComponent<CenterProps>('div', {
  name: 'center',
})

export type CenterProps = ComponentPropsWithoutRef<'div'>
