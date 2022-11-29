import React from 'react'
import type { Meta } from '@storybook/react'

import { Calendar } from '../index'

export default {
  title: 'admin-ui-lab/calendar',
} as Meta

export function Basic() {
  return (
    <div style={{ margin: '1rem' }}>
      <Calendar />
    </div>
  )
}
