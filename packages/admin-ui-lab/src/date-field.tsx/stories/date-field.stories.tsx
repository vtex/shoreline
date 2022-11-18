import React from 'react'
import type { Meta } from '@storybook/react'

import { DateField } from '../index'

export default {
  title: 'admin-ui-lab/date-field',
} as Meta

export function Basic() {
  return <DateField />
}
