/* eslint-disable react/jsx-filename-extension */
import 'whatwg-fetch'
import React from 'react'

import CoreLayout from './src/components/CoreLayout'

export const wrapPageElement = ({ element, props }) => {
  return <CoreLayout {...props}>{element}</CoreLayout>
}
