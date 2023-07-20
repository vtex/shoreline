import React from 'react'
import type { Meta } from '@storybook/react'
import './theme.css'
import { csx } from '../csx'

import type { CsxObject } from '../types'

export default {
  title: 'shoreline/csx',
} as Meta

/**
 * ssx converts csx in jsx style
 */
function ssx(object: CsxObject): React.CSSProperties {
  return csx(object) as React.CSSProperties
}

export function Style() {
  return (
    <div
      style={ssx({
        // custom
        height: 500,
        fontSize: '2.5rem',
        padding: '1rem',

        // themed
        bg: '$bg-primary',
        fg: '$fg-primary',
      })}
    >
      The div
    </div>
  )
}
