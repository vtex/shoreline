import React, { useMemo } from 'react'
import type { Meta } from '@storybook/react'

import { DataView, useDataViewState, DataViewHeader } from '../index'
import { Button } from '../../button'
import { Spinner } from '../../components/Spinner'

export default {
  title: 'admin-ui-review/data-view',
  component: DataView,
} as Meta

export function Status() {
  const view = useDataViewState()

  const content = useMemo(() => {
    switch (view.status) {
      case 'loading': {
        return <Spinner size={50} />
      }

      case 'ready': {
        return <p>Data View Content</p>
      }

      default: {
        return null
      }
    }
  }, [view.status])

  return (
    <DataView state={view}>
      <DataViewHeader>
        <Button
          variant="neutralTertiary"
          onClick={() => view.setStatus({ type: 'ready' })}
        >
          Ready
        </Button>
        <Button
          variant="neutralTertiary"
          onClick={() => view.setStatus({ type: 'loading' })}
        >
          Loading
        </Button>
        <Button
          variant="neutralTertiary"
          onClick={() =>
            view.setStatus({
              type: 'empty',
              action: {
                text: 'Create item',
                onClick: () => {},
              },
            })
          }
        >
          Empty
        </Button>
        <Button
          variant="neutralTertiary"
          onClick={() =>
            view.setStatus({
              type: 'error',
              action: {
                text: 'Try again',
                onClick: () => {},
              },
            })
          }
        >
          Error
        </Button>
        <Button
          variant="neutralTertiary"
          onClick={() =>
            view.setStatus({
              type: 'not-found',
              suggestion: 'Try using different terms',
            })
          }
        >
          Not found
        </Button>
      </DataViewHeader>
      {content}
    </DataView>
  )
}
