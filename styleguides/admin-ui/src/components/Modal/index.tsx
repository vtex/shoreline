/* eslint-disable react/jsx-handler-names */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { cloneElement, Fragment } from 'react'
import {
  useDialogState,
  Dialog as BaseDialog,
  DialogBackdrop,
  DialogDisclosure,
} from 'reakit/Dialog'

import { Box } from '../Box'
import { Text } from '../Text'
import { Button } from '../Button'
import { IconClose } from '../../icons'

export interface ModalProps {
  disclosure: any
  children: any
}

export function Modal({ disclosure, children, ...props }: ModalProps) {
  const dialog = useDialogState()

  return (
    <Fragment>
      <DialogDisclosure {...dialog} ref={disclosure.ref} {...disclosure.props}>
        {(disclosureProps) => cloneElement(disclosure, disclosureProps)}
      </DialogDisclosure>
      <DialogBackdrop
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bg: 'text',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }}
        {...dialog}
      >
        <BaseDialog
          sx={{
            outline: 'none',
            bg: 'background',
            borderRadius: 3,
            borderColor: 'muted.4',
            borderStyle: 'solid',
            borderWidth: 1,
            width: 320,
          }}
          {...dialog}
          {...props}
        >
          <Box
            display="flex"
            justify="between"
            items="center"
            py="9"
            px="13"
            bbc="muted.4"
            bbw="1"
            bbs="solid"
          >
            <Text variant="subtitle" sx={{ lineHeight: 0 }}>
              Title
            </Text>
            <Button
              onClick={dialog.hide}
              variant="subtle"
              icon={IconClose}
              sx={{ color: 'text' }}
            />
          </Box>
          <Box pt="9" px="13" pb="13">
            {children}
          </Box>
        </BaseDialog>
      </DialogBackdrop>
    </Fragment>
  )
}
