import { useState } from 'react'
import { MAX_HEIGHT } from './text-area.style'

const MIN_AREA_ROWS = 2

export function useTextarea() {
  const [charCount, setCharCount] = useState(0)
  const [lineHeight, setLineHeight] = useState<number>(0)
  const [minScrollHeight, setMinScrollHeight] = useState<number>(0)

  const getLineHeight = (elm: HTMLTextAreaElement) => {
    if (lineHeight) {
      return lineHeight
    }

    const savedRows = elm.rows
    const savedValue = elm.value

    elm.value = ''
    elm.rows = 1
    const base1 = elm.scrollHeight

    elm.rows = 2
    const base2 = elm.scrollHeight

    elm.rows = savedRows
    elm.value = savedValue

    const calculatedHeight = base2 - base1

    setLineHeight(calculatedHeight)

    return calculatedHeight
  }

  const getMinScrollHeight = (elm: HTMLTextAreaElement) => {
    if (minScrollHeight) {
      return minScrollHeight
    }

    const savedValue = elm.value

    elm.value = ''

    const baseScrollHeight = elm.scrollHeight

    elm.value = savedValue

    setMinScrollHeight(baseScrollHeight)

    return baseScrollHeight
  }

  const resizeTextArea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const elm = e.target as HTMLTextAreaElement

    const lineHeight = getLineHeight(elm)
    const minScrollHeight = getMinScrollHeight(elm)

    elm.rows = MIN_AREA_ROWS
    const newHeight = Math.min(elm.scrollHeight, MAX_HEIGHT - lineHeight)

    const extraRows: number = Math.ceil(
      (newHeight - minScrollHeight) / lineHeight
    )

    elm.rows = MIN_AREA_ROWS + extraRows
  }

  const getTextareaProps = (
    customProps: React.ComponentPropsWithoutRef<'textarea'>
  ) => {
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.currentTarget.value.toString().length)
      customProps.onChange?.(e)
    }

    const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      resizeTextArea(e)
      customProps.onInput?.(e)
    }

    return {
      ...customProps,
      onInput,
      onChange,
    }
  }

  return { getTextareaProps, charCount }
}
