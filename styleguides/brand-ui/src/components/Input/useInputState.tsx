import { useState, useEffect } from 'react'

import { InputState } from '.'

interface InputStateModifiers {
  disabled?: boolean
  readOnly?: boolean
  error?: boolean
  lengthError?: boolean
  focused?: boolean
  filled?: boolean
  value?: string | number
}

const resolveInputState = ({
  disabled,
  readOnly,
  error,
  filled,
  focused,
  lengthError,
}: InputStateModifiers): InputState => {
  if (error || lengthError) {
    return 'error'
  } else if (disabled) {
    return 'disabled'
  } else if (readOnly) {
    return 'readOnly'
  } else if (focused) {
    return 'focused'
  } else if (filled) {
    return 'filled'
  } else {
    return 'idle'
  }
}

interface InitialState {
  charLimit?: number
  disabled?: boolean
  error?: boolean
  readOnly?: boolean
  value?: string | number
}

const useInputState = ({
  disabled,
  readOnly,
  error,
  value,
  charLimit,
}: InitialState) => {
  const [focused, setFocused] = useState(false)
  const [charCount, setCharCount] = useState(
    value ? value.toString().length : 0
  )
  const [filled, setFilled] = useState(charCount > 0)
  const [lengthError, setLengthError] = useState(
    charLimit ? charCount > charLimit : false
  )
  useEffect(() => {
    const length = value ? value.toString().length : 0
    setCharCount(length)
    setFilled(length > 0)

    if (charLimit) {
      setLengthError(length > charLimit)
    }
  }, [value])

  const [state, setState] = useState<InputState>(
    resolveInputState({
      disabled,
      readOnly,
      error,
      filled,
      focused,
    })
  )

  useEffect(() => {
    setState(
      resolveInputState({
        disabled,
        readOnly,
        error,
        filled,
        focused,
        lengthError,
      })
    )
  }, [filled, focused, error, disabled, readOnly, lengthError])

  return { state, charCount, setFocused }
}

export default useInputState
