import React from 'react'

import './styles.css'
import { Stack, Flex } from '../..'
import { Divider } from '../index'

export default {
  title: 'components/divider',
}

export function Show() {
  return (
    <Stack>
      <Stack space="0">
        <div className="box">content</div>
        <Divider />
        <div className="box">content</div>
        <Divider />
        <div className="box">content</div>
      </Stack>
      <Flex gap="0">
        <div className="box">content</div>
        <Divider orientation="vertical" />
        <div className="box">content</div>
        <Divider orientation="vertical" />
        <div className="box">content</div>
      </Flex>
    </Stack>
  )
}
