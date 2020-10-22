/* eslint-disable react/jsx-handler-names */
/** @jsx jsx */
import { Box, Text, Flex, jsx } from 'theme-ui'
import { Disclosure, DisclosureContent, useDisclosureState } from 'reakit'
import { Fragment } from 'react'

import { IconCaret, IconGlobe } from '../../icons'

const Option = ({ screen, option, onClick, active }: OptionProps) => {
  const variant = `localeSwitcher.${screen}.option`

  return (
    <Box
      variant={`${variant}${active ? '.active' : ''}`}
      role="presentation"
      onClick={onClick}
    >
      {option.label}
    </Box>
  )
}

interface OptionProps {
  screen: 'mobile' | 'large'
  option: LocaleOption
  active: boolean
  onClick?: () => void
}

export const LocaleSwitcher = ({
  options,
  onChange,
  locale,
}: LocaleSwitcherProps) => {
  const disclosure = useDisclosureState({ visible: false })

  const getLocaleLabel = () => {
    const currentLocaleOption = options.find(
      (option) => option.value === locale
    )

    return currentLocaleOption?.label ?? ''
  }

  const handleOptionClick = (option: LocaleOption) => {
    onChange(option.value)
    disclosure.hide()
  }

  return (
    <Fragment>
      <Disclosure sx={{ variant: 'localeSwitcher.large' }} {...disclosure}>
        <IconGlobe sx={{ ml: 5 }} size={22} />
        <Text variant="localeSwitcher.large.label">{getLocaleLabel()}</Text>
        <IconCaret
          sx={{ position: 'absolute', right: 4 }}
          direction="down"
          size={30}
        />
      </Disclosure>
      <Disclosure
        {...disclosure}
        sx={{
          variant: `localeSwitcher.mobile${disclosure.visible ? '.open' : ''}`,
        }}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <IconGlobe size={22} />
          <Text variant="localeSwitcher.mobile.label">{getLocaleLabel()}</Text>
        </Flex>
        <IconCaret size={32} direction={disclosure.visible ? 'down' : 'up'} />
      </Disclosure>
      <DisclosureContent
        {...disclosure}
        sx={{
          variant: 'localeSwitcher.large.optionContainer',
        }}
      >
        {options.map((option) => (
          <Option
            key={option.label}
            option={option}
            screen="large"
            onClick={() => {
              handleOptionClick(option)
            }}
            active={option.value === locale}
          />
        ))}
      </DisclosureContent>
      <DisclosureContent
        {...disclosure}
        onClick={() => disclosure.hide()}
        sx={{
          variant: 'localeSwitcher.overlay',
        }}
        role="presentation"
      />
      <DisclosureContent
        {...disclosure}
        sx={{ variant: 'localeSwitcher.mobile.optionContainer' }}
      >
        {options.map((option) => (
          <Option
            key={option.label}
            option={option}
            screen="mobile"
            onClick={() => {
              handleOptionClick(option)
            }}
            active={option.value === locale}
          />
        ))}
      </DisclosureContent>
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
