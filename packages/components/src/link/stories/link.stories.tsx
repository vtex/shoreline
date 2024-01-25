import React from 'react'

import { Link } from '../index'
import { Text } from '../../text'

export default {
  title: 'components/link',
}

export function Default() {
  return (
    <Text variant="body">
      Get smart about your digital commerce investments:
      <Link href="https://vtex.com" target="_blank" rel="noreferer">
        Get to know VTEX
      </Link>
    </Text>
  )
}
