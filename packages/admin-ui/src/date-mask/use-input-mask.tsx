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
    mask: '__/__/____',
  },
  'en-US': {
    placeholder: ' ',
    order: {
      month: 0,
      day: 1,
      year: 2,
    },
    mask: '__/__/____',
  },
}

const defaultProps = propsByLocale['pt-BR']

/**
 * @example
 * const { getInputProps } = useDateMask()
 * <input {...getInputProps()} />
 */
export function useDateMask() {
  const [inputValue, setInputValue] = useState('')
  const formatter = useMemo(() => {
    return maskedDateFormatter(defaultProps.mask, /[\d]/gi)
  }, [])

  const handleChange = (text: string) => {
    const finalString = text === '' || text === defaultProps.mask ? '' : text

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
      order: { day: dayIndex, month: monthIndex, year: yearIndex },
    } = defaultProps

    const typedDay = Number(parts?.[dayIndex])
    const day = global.isNaN(typedDay) ? 0 : typedDay

    const typedMonth = Number(parts?.[monthIndex])
    const month = Math.max(global.isNaN(typedMonth) ? 0 : typedMonth - 1, 0)

    const typedYear = Number(parts?.[yearIndex])
    const year = global.isNaN(typedYear) ? 0 : typedYear

    return {
      day,
      month,
      year,
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
  mask: string
}

type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>
type ReturnedInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  type: 'text'
}
