import React from 'react'
import '../packages/theme-arpoador/dist/arpoador.css'

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
