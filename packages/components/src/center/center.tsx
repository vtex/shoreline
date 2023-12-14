import type { ComponentPropsWithoutRef } from 'react'
import { slComponent } from '@vtex/shoreline-utils'
import './center.css'

export const Center = slComponent<CenterProps>('div', {
  name: 'center',
})

export type CenterProps = ComponentPropsWithoutRef<'div'>
