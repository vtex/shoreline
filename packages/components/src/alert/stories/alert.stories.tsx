import React, { useState } from 'react'

import { Alert } from '../index'
import { Stack } from '../../stack'
import { Text } from '../../text'
import { Action } from '../../action'

export default {
  title: 'shoreline-components/alert',
}

export function Default() {
  return (
    <Alert>
      <Text>Short message</Text>
    </Alert>
  )
}

export function Variants() {
  return (
    <Stack fluid>
      <Alert>
        <Text>Short message</Text>
      </Alert>
      <Alert variant="success">
        <Text>Short message</Text>
      </Alert>
      <Alert variant="critical">
        <Text>Short message</Text>
      </Alert>
      <Alert variant="warning">
        <Text>Short message</Text>
      </Alert>
    </Stack>
  )
}

export function LongText() {
  return (
    <Stack fluid>
      <Alert>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id
          dapibus ex. Donec quis elit volutpat, posuere est a, ultrices urna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed
          maximus sapien, vel tempor diam. Aliquam id dignissim enim. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Etiam ipsum sapien, finibus quis pretium eu, suscipit ac nunc.
          Sed viverra egestas orci lacinia feugiat. Cras diam ligula, fermentum
          sit amet lacus sed, pellentesque feugiat libero. Proin et enim nulla.
          Pellentesque cursus nunc libero, at tristique eros gravida vitae.
          Donec ex nisl, dignissim id tortor vel, lobortis lobortis eros. Etiam
          et arcu sapien. Maecenas elementum lorem maximus hendrerit interdum.
        </Text>
      </Alert>
      <Alert onDismiss={() => null}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id
          dapibus ex. Donec quis elit volutpat, posuere est a, ultrices urna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed
          maximus sapien, vel tempor diam. Aliquam id dignissim enim. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Etiam ipsum sapien, finibus quis pretium eu, suscipit ac nunc.
          Sed viverra egestas orci lacinia feugiat. Cras diam ligula, fermentum
          sit amet lacus sed, pellentesque feugiat libero. Proin et enim nulla.
          Pellentesque cursus nunc libero, at tristique eros gravida vitae.
          Donec ex nisl, dignissim id tortor vel, lobortis lobortis eros. Etiam
          et arcu sapien. Maecenas elementum lorem maximus hendrerit interdum.
        </Text>
        <Action>Action</Action>
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
      <Alert variant="warning">
        <Text>Action as button</Text>
        <Action onClick={() => alert('Clicked')}>Action</Action>
      </Alert>
      <Alert variant="warning">
        <Text>Action as link</Text>
        <Action asChild>
          <a href="htpps://vtex.com.br" target="_blank" rel="noreferrer">
            See more
          </a>
        </Action>
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
          <Text>Alert message</Text>
        </Alert>
      )}
      <button onClick={toggle}>Toggle alert</button>
    </div>
  )
}
