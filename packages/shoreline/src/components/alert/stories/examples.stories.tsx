import { useState } from 'react'

import { Alert } from '../index'
import { Text } from '../../text'

export default {
  title: 'components/alert',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function AsAlert() {
  return (
    <Alert role="alert" variant="critical">
      Alert message
    </Alert>
  )
}

export function Dismiss() {
  const [visible, setVisible] = useState(true)

  const toggle = () => setVisible((v) => !v)

  return (
    <div>
      {visible && (
        <Alert variant="success" onDismiss={toggle}>
          <Text variant="body">Alert message</Text>
        </Alert>
      )}
      <button onClick={toggle}>Toggle alert</button>
    </div>
  )
}
