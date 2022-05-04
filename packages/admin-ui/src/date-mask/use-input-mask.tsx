import type { ComponentPropsWithoutRef } from 'react'
import { useState, useMemo } from 'react'
import type { DateObject } from '../calendar'
import { maskedDateFormatter } from './date-mask-utils'
import { useInput } from './use-input'

const propsByLocale: Record<string, I18nProps> = {
  'pt-BR': {
    placeholder: ' ',
    order: {
      day: 0,
      month: 1,
      year: 2,
    },
    divider: '/',
  },
}

const mask = '__/__/____'

/**
 * @example
 * const { getInputProps } = useDateMask()
 * <input {...getInputProps()} />
 */
export function useDateMask() {
  const [inputValue, setInputValue] = useState('')
  const formatter = useMemo(() => {
    return maskedDateFormatter(mask, /[\d]/gi)
  }, [])

  const handleChange = (text: string) => {
    const finalString = text === '' || text === mask ? '' : text

    setInputValue(finalString)
  }

  const inputProps = useInput({
    value: inputValue,
    onChange: handleChange,
    format: formatter,
  })

  function getInputProps(customProps?: InputProps): ReturnedInputProps {
    return {
      placeholder: defaultProps.placeholder,
      ...inputProps,
      ...customProps,
      type: 'text',
    }
  }

  function getDateObject(): DateObject {
    if (!inputValue)
      return {
        day: 0,
        month: 0,
        year: 0,
      }

    const parts = inputValue.split('/')

    const {
      order: { day, month, year },
    } = defaultProps

    const typedMonth = Number(parts?.[month])
    const monthValue = global.isNaN(typedMonth) ? 0 : typedMonth

    return {
      day: Number(parts?.[day] ?? 0) ?? 0,
      // month: Number(parts?.[month] ?? 1) - 1,
      month: monthValue,
      year: Number(parts?.[year] ?? 0),
    }
  }

  return {
    getInputProps,
    getDateObject,
  }
}

type DatePart = 'day' | 'month' | 'year'

interface I18nProps {
  placeholder: string
  order: Record<DatePart, number>
  divider: string
}

const defaultProps = propsByLocale['pt-BR']

type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>
type ReturnedInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  type: 'text'
}
