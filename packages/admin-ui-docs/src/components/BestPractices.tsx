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
      justify="space-between"
      csx={{
        marginTop: '-21px',
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
  const { bad = false, children } = props

  const Icon = bad ? IconXOctagon : IconCheckCircle

  const token = bad ? '$critical' : '$positive'

  return (
    <Inline
      csx={{
        borderTop: token,
        borderTopWidth: '2px',
        paddingY: '$xl',
        width: '100%',
        flexWrap: 'nowrap',
      }}
    >
      <Icon weight="fill" csx={{ color: token }} />
      <Paragraph>{children}</Paragraph>
    </Inline>
  )
}

interface PracticeProps {
  bad?: boolean
  children?: ReactNode
}
