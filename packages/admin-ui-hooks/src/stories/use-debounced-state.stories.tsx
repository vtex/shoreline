import React from 'react'
import type { Story, Meta } from '@storybook/react'
import { useDebouncedState } from '../index'

export default {
  title: 'hooks/use-debounced-state',
} as Meta

export const Input: Story = () => {
  const [state, setState] = useDebouncedState({
    initialState: '',
    timeoutMs: 250,
  })

  return (
    <div>
      <input
        style={{
          border: '1px solid #333',
        }}
        defaultValue="Default value"
        onChange={(e) => setState(e.target.value)}
      />
      <p>Debouced state: {state}</p>
    </div>
  )
}
