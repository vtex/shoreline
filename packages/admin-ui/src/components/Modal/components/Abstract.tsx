import type { DialogOptions } from 'reakit/Dialog'
import { Dialog, DialogBackdrop, DialogDisclosure } from 'reakit/Dialog'

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
