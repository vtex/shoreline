import React from 'react'
import '../packages/theme-sunrise/dist/sunrise.css'

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
