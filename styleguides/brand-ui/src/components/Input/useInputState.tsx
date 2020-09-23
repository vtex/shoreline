import { useState, useEffect } from 'react'

import { InputState } from '.'

interface InputStateModifiers {
  disabled?: boolean
  readOnly?: boolean
  error?: boolean
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
}: InputStateModifiers): InputState => {
  if (error) {
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

const useInputState = ({
  disabled,
  readOnly,
  error,
  value,
}: InputStateModifiers) => {
  const [focused, setFocused] = useState(false)
  const [charCount, setCharCount] = useState(
    value ? value.toString().length : 0
  )
  const [filled, setFilled] = useState(charCount > 0)

  useEffect(() => {
    setCharCount(value ? value.toString().length : 0)
    setFilled(value ? value.toString().length > 0 : false)
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
    setState(resolveInputState({ disabled, readOnly, error, filled, focused }))
  }, [filled, focused, error, disabled, readOnly])

  return { state, setFocused, charCount, setCharCount }
}

export default useInputState
