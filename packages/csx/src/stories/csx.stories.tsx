import React from 'react'
import type { Meta } from '@storybook/react'
import './theme.css'
import { csx } from '../csx'

import type { CsxObject } from '../types'

export default {
  title: 'shoreline/csx',
} as Meta

function ssx(object: CsxObject): React.CSSProperties {
  return csx(object) as React.CSSProperties
}

export function Style() {
  return (
    <div
      style={ssx({
        bg: '$primary',
      })}
    >
      The div
    </div>
  )
}
