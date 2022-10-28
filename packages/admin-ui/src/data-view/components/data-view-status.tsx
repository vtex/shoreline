import React from 'react'

import { CollectionError } from '../../components/Illustrations'

import { useMessageFormatter } from '../../i18n'
import { messages } from '../data-view.i18n'
import { useDataViewContext } from '../context'
import * as styles from './data-view.styles'
import type { StatusAction } from '../data-view.state'
import { Button } from '../../button'
import { Stack } from '../../stack'
import { Center } from '../../center'
import { Box } from '../../box'

export function DataViewStatus() {
  const { status, statusObject } = useDataViewContext()

  const formatMessage = useMessageFormatter(messages)

  if (!status || status === 'loading' || status === 'ready') return null

  return (
    <Center csx={styles.status}>
      {status === 'not-found' && (
        <Stack fluid>
          <Box as="span" csx={styles.statusMessage({ type: 'message' })}>
            {formatMessage('notFound')}
          </Box>
          {statusObject.notFound && (
            <Box as="span" csx={styles.statusMessage({ type: 'description' })}>
              {formatMessage('suggestion')}
            </Box>
          )}
        </Stack>
      )}

      {status === 'empty' && (
        <Stack space="$space-2" fluid>
          <Box as="span" csx={styles.statusMessage({ type: 'message' })}>
            {formatMessage('empty')}
          </Box>
          {statusObject.empty?.action ? (
            <Action {...statusObject.empty.action} />
          ) : null}
        </Stack>
      )}

      {status === 'error' && (
        <Stack space="$space-0" fluid>
          <Center>
            <CollectionError />
          </Center>

          <Stack space="$space-2" fluid>
            <Box as="span" csx={styles.statusMessage({ type: 'message' })}>
              {formatMessage('error')}
            </Box>
            {statusObject.error?.action ? (
              <Action {...statusObject.error.action} />
            ) : null}
          </Stack>
        </Stack>
      )}
    </Center>
  );
}

function Action(props: StatusAction) {
  const { text, href = '', onClick } = props

  const anchorProps = href ? { as: 'a', href } : {}

  return (
    <Center>
      <Button {...anchorProps} onClick={onClick} variant="tertiary">
        {text}
      </Button>
    </Center>
  )
}
