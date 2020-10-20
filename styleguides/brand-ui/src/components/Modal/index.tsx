/** @jsx jsx */
import { jsx, Text, Flex } from 'theme-ui'
import { Fragment, MouseEvent } from 'react'
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from 'reakit/Dialog'
import { css } from '@emotion/core'
import { Box } from 'reakit'

import { Button } from '../Button'
import { IconClose } from '../../icons/Close'

const backdropAnimation = css`
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  &[data-enter] {
    opacity: 1;
  }
`

const surfaceAnimation = css`
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out 50ms;
  opacity: 0;
  &[data-enter] {
    opacity: 1;
  }
`

interface TitleProps {
  handleClick: () => void
}

interface ActionsBarProps {
  handleClose: () => void
  handleConfirm: (event: MouseEvent<unknown, globalThis.MouseEvent>) => void
}

const Title = ({ handleClick }: TitleProps) => {
  return (
    <Box
      sx={{
        padding: '2rem',
        paddingLeft: ['1rem', '2rem', '2rem', '2rem'],
        borderRadius: '5px 5px 0px 0px',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'muted.3',
      }}
    >
      <Button
        icon={() => <IconClose size={39} />}
        sx={{
          position: 'absolute',
          right: '1.25rem',
          top: '1.25rem',
          color: 'secondary.base',
          padding: '0',
          height: 'auto',
        }}
        variant="tertiary"
        onClick={handleClick}
      />
      <Text sx={{ fontSize: '.875rem' }}>Confirm Payment</Text>
    </Box>
  )
}

const ActionsBar = ({ handleClose, handleConfirm }: ActionsBarProps) => {
  const handleClick = (event: MouseEvent<unknown, globalThis.MouseEvent>) => {
    handleConfirm(event)
    handleClose()
  }

  return (
    <Flex
      sx={{
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: ['1.5rem', '2rem', '2rem', '2rem'],
        paddingX: ['1rem', '2rem', '2rem', '2rem'],
        paddingBottom: ['1.5rem', '2rem', '2rem', '2rem'],
      }}
    >
      <Button
        variant="tertiary"
        sx={{
          bg: 'transparent',
          color: 'secondary.base',
          marginX: '1rem',
        }}
        onClick={handleClose}
      >
        Cancel
      </Button>
      <Button variant="primary" onClick={handleClick}>
        Confirm
      </Button>
    </Flex>
  )
}

export const Modal = () => {
  const dialog = useDialogState({ animated: true })

  const handleClose = () => {
    dialog.hide()
  }

  return (
    <Fragment>
      <DialogDisclosure {...dialog} as={Button}>
        Open dialog
      </DialogDisclosure>
      <DialogBackdrop
        {...dialog}
        css={backdropAnimation}
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
          css={surfaceAnimation}
          sx={{
            width: ['20rem', '40rem', '40rem', '56rem'],
            bg: 'white',
            justifyContent: 'center',
            margin: 'auto',
            borderRadius: '5px',
            boxShadow: '2px 4px 16px rgba(0, 0, 0, 0.3)',
            outline: 'none',
            position: 'relative',
          }}
        >
          <Title handleClick={handleClose} />
          <Box
            sx={{
              maxHeight: '100%',
              overflowY: 'auto',
              paddingX: '2rem',
              paddingTop: '2rem',
            }}
          >
            <Text
              sx={{
                maxWidth: '100%',
                fontSize: '.75rem',
                maxHeight: '40vh',
              }}
            >
              Choose another payment method to split your purchase value.
            </Text>
          </Box>
          <ActionsBar handleClose={handleClose} handleConfirm={handleClose} />
        </Dialog>
      </DialogBackdrop>
    </Fragment>
  )
}
