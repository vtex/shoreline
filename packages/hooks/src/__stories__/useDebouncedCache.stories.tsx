import React from 'react'
import type { Story, Meta } from '@storybook/react'
import { useDebouncedCache } from '../index'

export default {
  title: 'onda-hooks/useDebouncedCache',
} as Meta

export const Input: Story = () => {
  const [state, cache, setState] = useDebouncedCache({
    initialState: '',
    timeoutMs: 500,
  })

  return (
    <div>
      <input
        style={{
          border: '1px solid #333',
        }}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <p>State: {state}</p>
      <p>Debouced chace: {cache}</p>
    </div>
  )
}
