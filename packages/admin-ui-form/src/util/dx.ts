import type { AnyObject } from '@vtex/admin-ui-util'

/**
 * React hook that improves the field's developer experience
 * @example
 * function Field(props) {
 *  useFieldDx(props)
 *  // ... rest
 * }
 */
export function useFieldDx(props: AnyObject) {
  if (isDevMode()) {
    registerChecks(props)
  }
}

/**
 * Wether is dev mode
 */
function isDevMode() {
  return process.env.NODE_ENV !== 'production'
}

/**
 * Displays a message to the developer with an appropriate tone
 * @param message dev message
 * @example
 * developerMessage({
 *  text: 'Text content',
 *  tone: 'error' | 'warning' | 'neutral'
 * })
 */
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

/**
 * Validations for the field registeration proccess
 */
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
  /** text content */
  text: string
  /** message tone */
  tone: DeveloperMessageTone
}
