import React from 'react'
import { ConfirmationModal } from '../confirmation-modal'
import { Text } from '../../text'

export default {
  title: 'components/confirmation-modal',
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
}

export function Show() {
  return (
    <ConfirmationModal data-testid="confirmation-modal" open>
      <Text variant="body">This is a confirmation modal</Text>
    </ConfirmationModal>
  )
}
