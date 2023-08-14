import React from 'react'

import { Spinner } from '../spinner'
import './story.css'

export default {
  title: 'shoreline-aria/spinner',
}

export function Sizes() {
  return (
    <div className="story">
      <Spinner description="Loading indicator" />
    </div>
  )
}
