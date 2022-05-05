import {
  Flex,
  IconCheckCircle,
  IconXOctagon,
  Paragraph,
  Stack,
  style,
} from '@vtex/admin-ui'
import type { ReactNode } from 'react'
import React from 'react'

export function BestPractices(props: BestPracticesProps) {
  const { children } = props

  return (
    <Flex direction="column" csx={styles.practiceContainer}>
      {children}
    </Flex>
  )
}

interface BestPracticesProps {
  children?: ReactNode
}

export function Practice(props: PracticeProps) {
  const { type = 'good', label, children } = props

  const { Icon, token } = {
    bad: {
      Icon: IconXOctagon,
      token: '$critical',
    },
    good: {
      Icon: IconCheckCircle,
      token: '$positive',
    },
  }[type]

  return (
    <Flex direction="column">
      <Flex csx={styles.previewContainer}>{children}</Flex>
      <Stack csx={styles.practice(token)} direction="row" space="$m">
        <Icon weight="fill" csx={{ color: token }} />
        <Paragraph>{label}</Paragraph>
      </Stack>
    </Flex>
  )
}

const styles = {
  practiceContainer: style({
    '@tablet': {
      flexDirection: 'row',
      '> *': {
        maxWidth: '50%',
        minWidth: '50%',
      },
    },
  }),
  previewContainer: style({
    '> *': {
      margin: 0,
      '.preview-grid-container': { height: '100%' },
      '.wrapper-container': { height: '216px' },
    },
  }),
  practice: (token: string) =>
    style({
      borderTop: token,
      borderTopWidth: '2px',
      paddingY: '$xl',
      paddingRight: '$m',
      width: '100%',
      alignItems: 'flex-start',
    }),
}

interface PracticeProps {
  type?: 'good' | 'bad'
  children?: ReactNode
  label: ReactNode
}
