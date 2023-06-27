import React from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

export default function Code({ children }) {
  return (
    <LiveProvider code={children}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  )
}
