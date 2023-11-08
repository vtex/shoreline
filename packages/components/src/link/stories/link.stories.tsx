import '../../../dist/styles.min.css'
import '../link.css'
import React from 'react'

import { Link } from '../index'
import { Text } from '../../text'

export default {
  title: 'shoreline-components/link',
}

export function Default() {
  return (
    <Text>
      Get smart about your digital commerce investments:
      <Link href="https://vtex.com" target="_blank" rel="noreferer">
        Get to know VTEX
      </Link>
    </Text>
  )
}