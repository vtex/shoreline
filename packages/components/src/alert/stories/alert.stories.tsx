import '../../../dist/styles.min.css'
import '../alert.css'
import React, { useState } from 'react'

import { Alert } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/alert',
}

export function Default() {
  return <Alert>Short message</Alert>
}

export function Variants() {
  return (
    <Stack fluid>
      <Alert>Short message</Alert>
      <Alert variant="success">Short message</Alert>
      <Alert variant="critical">Short message</Alert>
      <Alert variant="warning">Short message</Alert>
    </Stack>
  )
}

export function LongText() {
  return (
    <Stack fluid>
      <Alert>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id
        dapibus ex. Donec quis elit volutpat, posuere est a, ultrices urna.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed
        maximus sapien, vel tempor diam. Aliquam id dignissim enim. Vestibulum
        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
        curae; Etiam ipsum sapien, finibus quis pretium eu, suscipit ac nunc.
        Sed viverra egestas orci lacinia feugiat. Cras diam ligula, fermentum
        sit amet lacus sed, pellentesque feugiat libero. Proin et enim nulla.
        Pellentesque cursus nunc libero, at tristique eros gravida vitae. Donec
        ex nisl, dignissim id tortor vel, lobortis lobortis eros. Etiam et arcu
        sapien. Maecenas elementum lorem maximus hendrerit interdum.
      </Alert>
      <Alert
        action={{
          label: 'Action',
        }}
        onDismiss={() => null}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id
        dapibus ex. Donec quis elit volutpat, posuere est a, ultrices urna.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed
        maximus sapien, vel tempor diam. Aliquam id dignissim enim. Vestibulum
        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
        curae; Etiam ipsum sapien, finibus quis pretium eu, suscipit ac nunc.
        Sed viverra egestas orci lacinia feugiat. Cras diam ligula, fermentum
        sit amet lacus sed, pellentesque feugiat libero. Proin et enim nulla.
        Pellentesque cursus nunc libero, at tristique eros gravida vitae. Donec
        ex nisl, dignissim id tortor vel, lobortis lobortis eros. Etiam et arcu
        sapien. Maecenas elementum lorem maximus hendrerit interdum.
      </Alert>
    </Stack>
  )
}

export function AsAlert() {
  return (
    <Alert role="alert" variant="critical">
      Alert message
    </Alert>
  )
}

export function WithAction() {
  return (
    <Stack fluid>
      <Alert
        variant="warning"
        action={{
          onClick: () => alert('Clicked'),
          label: 'Action',
        }}
      >
        Action as button
      </Alert>
      <Alert
        variant="warning"
        action={{
          href: 'htpps://vtex.com.br',
          label: 'See more',
          newTab: true,
        }}
      >
        Action as link
      </Alert>
    </Stack>
  )
}

export function Dismiss() {
  const [visible, setVisible] = useState(true)

  const toggle = () => setVisible((v) => !v)

  return (
    <div>
      {visible && (
        <Alert variant="success" onDismiss={toggle}>
          Alert message
        </Alert>
      )}
      <button onClick={toggle}>Toggle alert</button>
    </div>
  )
}
