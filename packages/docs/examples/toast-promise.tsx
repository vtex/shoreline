import { Button, ToastStack, toast } from '@vtex/shoreline'

export default function Example() {
  function promiseToResolve() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
  }

  return (
    <>
      <Button
        onClick={() =>
          toast.promise(promiseToResolve(), {
            success: 'Resolved',
            error: 'Promisse has error',
            loading: 'Loading',
          })
        }
      >
        Show toast
      </Button>
      <ToastStack />
    </>
  )
}
