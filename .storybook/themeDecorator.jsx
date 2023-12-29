import React from 'react'
import '../packages/tokens/dist/styles.min.css'
import '../packages/styles/dist/index.css'

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
