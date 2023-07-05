import React from 'react'
import type { Meta } from '@storybook/react'
import './theme.css'
import { csx } from '../csx'
import { cssVar } from '../css-var'

export default {
  title: 'beachfront/csx',
} as Meta

function ssx(object: Record<string, any>): React.CSSProperties {
  return csx(object) as React.CSSProperties
}

export function Style() {
  return (
    <div
      style={ssx({
        bg: cssVar({ foundation: 'bg', token: 'main' }),
      })}
    >
      The div
    </div>
  )
}
