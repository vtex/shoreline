/** @jsx jsx */
import { jsx, Box, Text } from 'theme-ui'
import { PropsWithChildren, useContext } from 'react'
import {
  Disclosure,
  DisclosureContent,
  useDisclosureState,
  Button,
} from 'reakit'

import ToastContext from './ToastContext'
import { ToastProps } from '.'
import { IconExit } from '../..'

const Toast = ({
  children,
  actionText,
  closeOnAction,
  onActionClick,
}: PropsWithChildren<ToastProps>) => {
  const disclosure = useDisclosureState({ visible: true })

  const handleOnActionClick = () => {
    if (onActionClick) onActionClick()
    if (closeOnAction) disclosure.hide()
  }

  return (
    <DisclosureContent {...disclosure} sx={{ variant: 'toast' }}>
      {children}
      <Box variant="toast.actionContainer" sx={{ mt: [actionText ? 4 : 0, 0] }}>
        {actionText && (
          <Button
            sx={{ my: 0, py: 0, color: 'white', variant: 'toast.action' }}
            onClick={handleOnActionClick}
          >
            {actionText}
          </Button>
        )}
        <Disclosure
          {...disclosure}
          sx={{ color: 'white', variant: 'toast.dismiss' }}
        >
          <IconExit size={20} />
        </Disclosure>
      </Box>
    </DisclosureContent>
  )
}

const useToast = (props?: ToastProps) => {
  const { addToast } = useContext(ToastContext)

  const createToast = (text: string) => {
    addToast(
      <Toast {...props}>
        <Text variant="toast.text">{text}</Text>
      </Toast>
    )
  }

  return {
    createToast,
  }
}

export default useToast
