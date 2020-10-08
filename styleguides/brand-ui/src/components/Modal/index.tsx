/** @jsx jsx */
import { jsx, Text, Flex } from 'theme-ui'
import { Fragment } from 'react'
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from 'reakit/Dialog'

import { Button } from '../Button'
import { IconClose } from '../../icons/Close'

export const Modal = () => {
  const dialog = useDialogState()

  return (
    <Fragment>
      <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
      <DialogBackdrop
        {...dialog}
        sx={{
          width: '100%',
          height: '100%',
          bg: 'rgba(52, 52, 52, 0.3)',
          position: 'fixed',
          top: 0,
          left: 0,
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Dialog
          {...dialog}
          aria-label="Welcome"
          sx={{
            width: '640px',
            bg: 'white',
            justifyContent: 'center',
            margin: 'auto',
            borderRadius: '5px',
            padding: '2rem',
            boxShadow: '2px 4px 16px rgba(0, 0, 0, 0.3)',
            outline: 'none',
            position: 'relative',
          }}
        >
          <IconClose
            size={39}
            sx={{
              position: 'absolute',
              right: '1.25rem',
              top: '1.25rem',
              color: 'secondary.base',
            }}
          />
          <Text sx={{ fontSize: '.875rem' }}>Confirm Payment</Text>
          <div
            sx={{
              width: '640px',
              height: '1px',
              bg: 'muted.3',
              marginTop: '2rem',
              marginBottom: '1.5rem',
              right: '0',
              left: '0',
              marginX: '-2rem',
            }}
          />
          <Text sx={{ maxWidth: '80%', fontSize: '.75rem' }}>
            Choose another payment method to split your purchase value.
          </Text>
          <Flex
            sx={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              marginTop: '2.62rem',
            }}
          >
            <Button
              variant="tertiary"
              sx={{
                bg: 'transparent',
                color: 'secondary.base',
                marginX: '1rem',
              }}
            >
              Cancel
            </Button>
            <Button variant="primary">Confirm</Button>
          </Flex>
        </Dialog>
      </DialogBackdrop>
    </Fragment>
  )
}
