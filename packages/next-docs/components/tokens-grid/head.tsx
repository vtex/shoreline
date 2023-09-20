import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { headTheme } from './tokens-grid.css'

export function Head(props: ComponentPropsWithoutRef<'div'>) {
  return <div className={headTheme} {...props} />
}
