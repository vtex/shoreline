import { useState } from 'react'
import { Button, ConfirmationModal, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)

  return (
    <Stack horizontal>
      <div>
        <Text variant="caption1">Standard</Text>
        <Button onClick={() => setOpen1(true)}>Open Confirmation Modal</Button>
        <ConfirmationModal
          open={open1}
          onClose={() => setOpen1(false)}
          onConfirm={() => setOpen1(false)}
          onCancel={() => setOpen1(false)}
        >
          <Text variant="body">
            Are you sure you want to proceed with this action?
          </Text>
        </ConfirmationModal>
      </div>

      <div>
        <Text variant="caption1">Critical Action</Text>
        <Button variant="critical" onClick={() => setOpen2(true)}>
          Delete Item
        </Button>
        <ConfirmationModal
          open={open2}
          onClose={() => setOpen2(false)}
          onConfirm={() => setOpen2(false)}
          onCancel={() => setOpen2(false)}
        >
          <Text variant="body">
            This action cannot be undone. Are you sure you want to delete this
            item?
          </Text>
        </ConfirmationModal>
      </div>
    </Stack>
  )
}
