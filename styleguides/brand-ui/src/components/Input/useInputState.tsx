import { useState, useEffect } from 'react'

import { InputState } from '.'

interface InputStateModifiers {
  disabled?: boolean
  readOnly?: boolean
  error?: boolean
  lengthError?: boolean
}

const resolveInputState = ({
  disabled,
  readOnly,
  error,
  lengthError,
}: InputStateModifiers): InputState => {
  if (disabled) {
    return 'disabled'
  } else if (readOnly) {
    return 'readOnly'
  } else if (error || lengthError) {
    return 'error'
  } else {
    return 'default'
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
    })
  )

  const translate = (!readOnly && focused) || filled
  useEffect(() => {
    setState(
      resolveInputState({
        disabled,
        readOnly,
        error,
        lengthError,
      })
    )
  }, [error, disabled, readOnly, lengthError])

  return { state, charCount, setFocused, translate }
}

export default useInputState
