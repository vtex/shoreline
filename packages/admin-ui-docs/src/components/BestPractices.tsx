import {
  Flex,
  IconCheckCircle,
  IconXOctagon,
  Inline,
  Paragraph,
} from '@vtex/admin-ui'
import type { ReactNode } from 'react'
import React from 'react'

export function BestPractices(props: BestPracticesProps) {
  const { children } = props

  return (
    <Flex
      csx={{
        marginBottom: '$xl',
        flexDirection: 'column',
        '@tablet': {
          flexDirection: 'row',
          '> *': {
            maxWidth: '50%',
          },
        },
      }}
    >
      {children}
    </Flex>
  )
}

interface BestPracticesProps {
  children?: ReactNode
}

export function Practice(props: PracticeProps) {
  const { bad = false, label, children } = props

  const Icon = bad ? IconXOctagon : IconCheckCircle

  const token = bad ? '$critical' : '$positive'

  return (
    <Flex direction="column">
      <Flex justify="center" csx={{ '> *': { margin: 0 } }}>
        {children}
      </Flex>
      <Inline
        csx={{
          borderTop: token,
          borderTopWidth: '2px',
          paddingY: '$xl',
          width: '100%',
        }}
        noWrap
      >
        <Icon weight="fill" csx={{ color: token }} />
        <Paragraph>{label}</Paragraph>
      </Inline>
    </Flex>
  )
}

interface PracticeProps {
  bad?: boolean
  children?: ReactNode
  label: ReactNode
}
