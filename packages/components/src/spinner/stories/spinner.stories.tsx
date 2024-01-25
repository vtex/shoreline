import React from 'react'

import { Spinner } from '../index'

export default {
  title: 'components/spinner',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Default() {
  return <Spinner />
}
