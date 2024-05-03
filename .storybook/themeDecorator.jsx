import React from 'react'
import '../packages/shoreline/dist/themes/sunrise/styles.css'

export function themeDecorator(storyFn) {
  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      {storyFn()}
    </div>
  )
}
