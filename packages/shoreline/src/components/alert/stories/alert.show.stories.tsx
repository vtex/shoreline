import React from 'react'

import { Alert } from '../index'
import { Stack } from '../../stack'
import { Text } from '../../text'
import { Button } from '../../button'

export default {
  title: 'components/alert',
}

export function Show() {
  return (
    <Stack fluid>
      <Alert>
        <Text variant="body">Short message</Text>
      </Alert>
      <Alert variant="success">
        <Text variant="body">Short message</Text>
      </Alert>
      <Alert variant="critical">
        <Text variant="body">Short message</Text>
      </Alert>
      <Alert variant="warning">
        <Text variant="body">Short message</Text>
      </Alert>
      <Alert>
        <Text variant="body">
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
      <Alert variant="success" onDismiss={() => null}>
        <Text variant="body">
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
        <Button variant="tertiary">Action</Button>
      </Alert>
      <Alert variant="warning">
        <Text variant="body">Action as button</Text>
        <Button variant="tertiary" onClick={() => alert('Clicked')}>
          Action
        </Button>
      </Alert>
      <Alert variant="critical" onDismiss={() => null}>
        <Text variant="body">Action as link</Text>
        <Button variant="tertiary" asChild>
          <a href="htpps://vtex.com.br" target="_blank" rel="noreferrer">
            See more
          </a>
        </Button>
      </Alert>
    </Stack>
  )
}
