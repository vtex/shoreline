import type { AnyObject } from '@vtex/admin-ui-util'

export function useFieldDx(props: AnyObject) {
  if (isDevMode()) {
    registerChecks(props)
  }
}

function isDevMode() {
  return process.env.NODE_ENV !== 'production'
}

function developerMessage(message: DeveloperMessage) {
  switch (message.tone) {
    case 'error': {
      throw Error(message.text)
    }

    case 'warning': {
      console.warn(message.text)
      break
    }

    case 'neutral': {
      console.log(message.text)
      break
    }
  }
}

function registerChecks(props: AnyObject) {
  if (!props.name) {
    developerMessage({
      text: 'The name prop is required',
      tone: 'error',
    })
  }

  if (!props.state) {
    developerMessage({
      text: 'The state prop is required',
      tone: 'error',
    })
  }
}

type DeveloperMessageTone = 'error' | 'warning' | 'neutral'

interface DeveloperMessage {
  text: string
  tone: DeveloperMessageTone
}
