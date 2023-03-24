import React from 'react'

import { CollectionError } from '../../components/Illustrations'

import { useMessageFormatter } from '../../i18n'
import { messages } from '../data-view.i18n'
import type { DataViewState, StatusAction } from '../data-view.state'
import { Button } from '../../button'
import { Stack } from '../../stack'
import { Center } from '../../center'
import { statusTheme, statusMessageTheme } from './data-view.css'

export function DataViewStatus(props: DataViewStatusProps) {
  const { state } = props
  const { status, statusObject } = state

  const formatMessage = useMessageFormatter(messages)

  if (!status || status === 'loading' || status === 'ready') return null

  return (
    <Center className={statusTheme}>
      {status === 'not-found' && (
        <Stack fluid>
          <span data-type="message" className={statusMessageTheme}>
            {formatMessage('notFound')}
          </span>
          {statusObject.notFound && (
            <span data-type="description" className={statusMessageTheme}>
              {formatMessage('suggestion')}
            </span>
          )}
        </Stack>
      )}

      {status === 'empty' && (
        <Stack space="$space-2" fluid>
          <span data-type="message" className={statusMessageTheme}>
            {formatMessage('empty')}
          </span>
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
            <span data-type="message" className={statusMessageTheme}>
              {formatMessage('error')}
            </span>
            {statusObject.error?.action ? (
              <Action {...statusObject.error.action} />
            ) : null}
          </Stack>
        </Stack>
      )}
    </Center>
  )
}

function Action(props: StatusAction) {
  const { text, href = '', onClick } = props

  return (
    <Center>
      {href ? (
        <a href={href}>
          <Button onClick={onClick} variant="tertiary">
            {text}
          </Button>
        </a>
      ) : (
        <Button onClick={onClick} variant="tertiary">
          {text}
        </Button>
      )}
    </Center>
  )
}

export interface DataViewStatusProps {
  state: DataViewState
}
