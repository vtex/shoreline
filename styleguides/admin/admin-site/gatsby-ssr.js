import React from 'react'

import CoreLayout from './src/components/CoreLayout'

export const wrapPageElement = ({ element, props }) => {
  return <CoreLayout {...props}>{element}</CoreLayout>
}
