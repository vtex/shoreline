import { Button, ToastStack, toast } from '@vtex/shoreline'

export function InformationalToast() {
  return (
    <>
      <Button
        onClick={() => toast.informational('Informational toast message')}
      >
        Show Informational Toast
      </Button>
      <ToastStack />
    </>
  )
}

export function SuccessToast() {
  return (
    <>
      <Button onClick={() => toast.success('Success toast message')}>
        Show Success Toast
      </Button>
      <ToastStack />
    </>
  )
}

export function CriticalToast() {
  return (
    <>
      <Button onClick={() => toast.critical('Critical toast message')}>
        Show Critical Toast
      </Button>
      <ToastStack />
    </>
  )
}

export function WarningToast() {
  return (
    <>
      <Button onClick={() => toast.warning('Warning toast message')}>
        Show Warning Toast
      </Button>
      <ToastStack />
    </>
  )
}

export function LoadingToast() {
  return (
    <>
      <Button onClick={() => toast.loading('Loading toast message')}>
        Show Loading Toast
      </Button>
      <ToastStack />
    </>
  )
}
