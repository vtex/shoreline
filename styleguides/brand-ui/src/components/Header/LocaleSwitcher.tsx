import React, { useState, Fragment } from 'react'
import { Box, Text, Flex } from 'theme-ui'

import { IconCaret, IconGlobe } from '../../icons'

export const LocaleSwitcher = ({
  options,
  onChange,
  locale,
}: LocaleSwitcherProps) => {
  const [open, setOpen] = useState(false)

  const onChangeLocale = (option: LocaleOption) => {
    const nextLocaleValue = option.value

    onChange(nextLocaleValue)
  }

  const getLocaleLabel = () => {
    const currentLocaleOption = options.find(
      (option) => option.value === locale
    )

    return currentLocaleOption?.label ?? ''
  }

  const handleOpen = (value: boolean) => setOpen(value)

  const Option = ({
    screen,
    option,
  }: {
    screen: 'mobile' | 'large'
    option: LocaleOption
  }) => {
    const active = option.value === locale
    const variant = `localeSwitcher.${screen}.option`

    return (
      <Box
        variant={`${variant}${active ? '.active' : ''}`}
        role="presentation"
        onClick={() => {
          onChangeLocale(option)
          setOpen(false)
        }}
      >
        {option.label}
      </Box>
    )
  }

  return (
    <Fragment>
      <Box variant="localeSwitcher.large" onClick={() => handleOpen(!open)}>
        <IconGlobe sx={{ ml: 5 }} size={22} />
        <Text variant="localeSwitcher.large.label">{getLocaleLabel()}</Text>
        <IconCaret
          sx={{ position: 'absolute', right: 4 }}
          direction="down"
          size={30}
        />
      </Box>
      <Box
        variant="localeSwitcher.mobile"
        sx={{ color: open ? 'secondary.base' : 'muted.0' }}
        onClick={() => handleOpen(!open)}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <IconGlobe size={22} />
          <Text variant="localeSwitcher.mobile.label">{getLocaleLabel()}</Text>
        </Flex>
        <IconCaret size={32} direction={open ? 'down' : 'up'} />
      </Box>
      {open && (
        <Fragment>
          <Box variant="localeSwitcher.large.optionContainer">
            {options.map((option) => (
              <Option key={option.label} option={option} screen="large" />
            ))}
          </Box>
          <Box
            variant="localeSwitcher.overlay"
            role="presentation"
            onClick={() => setOpen(false)}
          />
          <Box variant="localeSwitcher.mobile.optionContainer">
            {options.map((option) => (
              <Option key={option.label} option={option} screen="mobile" />
            ))}
          </Box>
        </Fragment>
      )}
    </Fragment>
  )
}

export interface LocaleOption {
  /**
   * Text displayed on localization option label, i.e. "EN".
   */
  label: string
  /**
   * The localization value, i.e. "en".
   */
  value: string
}

export interface LocaleSwitcherProps {
  /**
   * Initial localization value.
   */
  locale: string
  /**
   * Options for localization.
   */
  options: LocaleOption[]
  /**
   * Function triggered when user changes the locale.
   */
  onChange: (locale: string) => void
}
