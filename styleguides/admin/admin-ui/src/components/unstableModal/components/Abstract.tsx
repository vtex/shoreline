import {
  Dialog,
  DialogBackdrop,
  DialogOptions,
  DialogDisclosure,
} from 'reakit/Dialog'

type AbstractModalProps = Pick<
  DialogOptions,
  'hideOnEsc' | 'hideOnClickOutside'
>

export {
  Dialog as AbstractModal,
  DialogBackdrop as AbstractModalBackdrop,
  DialogDisclosure as AbstractModalDisclosure,
  AbstractModalProps,
}
