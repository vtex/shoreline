import './style.css'
import React from 'react'

import { Textarea } from '../index'

export default {
  title: 'components/textarea',
}

export function Show() {
  const [value, setValue] = React.useState('')

  return (
    <>
      <Textarea
        value={value}
        onChange={setValue}
        className="textarea-container"
        maxLength={120}
      />
      <Textarea
        value={value}
        onChange={setValue}
        className="textarea-container"
        optional
      />
      <Textarea
        value={value}
        onChange={setValue}
        className="textarea-container"
      />
      <Textarea
        value={value}
        onChange={setValue}
        className="textarea-container"
        error
      />
      <Textarea
        value={value}
        onChange={setValue}
        className="textarea-container"
        disabled
      />
      <Textarea
        value="The quick brown fox is tired right now"
        className="textarea-container"
        disabled
      />
      <Textarea
        value={value}
        onChange={setValue}
        className="textarea-container"
        maxLength={120}
      />
    </>
  )
}
