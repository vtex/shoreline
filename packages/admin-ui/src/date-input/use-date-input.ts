import { useState } from 'react'
import type { AnyFunction } from '@vtex/admin-ui-util'
import type { DateObject } from '../calendar'

import { useMaskedInput, useFormatter } from '../masked-input'
import type { TextInputProps } from '../text-input'

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
export function useDateInput({ value: initialValue, onChange, asDate }: any) {
  const [value, setValue] = useState(
    asDate ? asString(initialValue) : initialValue
  )

  const formatter = useFormatter({
    mask: defaultProps.mask,
  })

  const inputProps = useMaskedInput({
    value,
    onChange: (text: string) => {
      const finalString = text === '' || text === defaultProps.mask ? '' : text

      setValue(finalString)
      onChange(asDate ? asDateObject(finalString) : finalString)
    },
    formatter,
  })

  function getInputProps(customProps: TextInputProps = {}): TextInputProps {
    return {
      ...inputProps,
      ...customProps,
      placeholder: defaultProps.placeholder,
      type: 'text',
    }
  }

  return {
    getInputProps,
  }
}

// interface State {
//   dateValue: DateObject
//   stringValue: string
// }

// function reducer(state: State) {}

function asDateObject(value: string): DateObject {
  if (!value)
    return {
      day: 0,
      month: 0,
      year: 0,
    }

  const parts = value.split('/')

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

function asString(value: DateObject): string {
  const { order } = defaultProps

  const res = []

  const stringYear = String(value.year)
  
  res[order.day] =
    value.day < 10 ? `0${value.day}` : `${value.day}`)

  res[order.month] = value.month < 10 ? `0${value.month}` : `${value.month}`
  res[order.year] = stringYear.length < 4

  return res.join('/')
}

type DatePart = 'day' | 'month' | 'year'

interface I18nProps {
  placeholder: string
  order: Record<DatePart, number>
  mask: string
}
