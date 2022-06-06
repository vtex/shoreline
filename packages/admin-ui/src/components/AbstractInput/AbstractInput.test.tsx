import React, { Fragment } from 'react'
import { axe } from 'jest-axe'
import { IconPlus } from '@vtex/phosphor-icons'
import { render, fireEvent } from '../../test-utils'

import { AbstractInput, AbstractInputPassword } from './index'

describe('AbstractInput tests', () => {
  describe('Text', () => {
    it('should not have a11y violations', async () => {
      const { container } = render(
        <Fragment>
          <AbstractInput aria-label="raw-input" />
          <AbstractInput value="Test1" aria-label="input-value" readOnly />
          <AbstractInput onClear={() => {}} aria-label="input-clear" />
          <AbstractInput
            onClear={() => {}}
            value="Test2"
            aria-label="input-clear-value"
            readOnly
          />
          <AbstractInput icon={<IconPlus />} aria-label="input-icon" />
          <AbstractInput
            icon={<IconPlus />}
            value="Test3"
            aria-label="input-icon-value"
            readOnly
          />
          <AbstractInput
            icon={<IconPlus />}
            onClear={() => {}}
            aria-label="input-icon-clear"
          />
          <AbstractInput
            icon={<IconPlus />}
            onClear={() => {}}
            value="Test4"
            aria-label="input-icon-clear-value"
            readOnly
          />
          <AbstractInput suffix="Kg" aria-label="input-suffix" />
          <AbstractInput
            suffix="Kg"
            aria-label="input-suffix-value"
            value="Test5"
            readOnly
          />
          <AbstractInput
            suffix="Kg"
            onClear={() => {}}
            aria-label="input-suffix-clear"
          />
          <AbstractInput
            suffix="Kg"
            icon={<IconPlus />}
            aria-label="input-suffix-icon"
          />
          <AbstractInput
            suffix="Kg"
            icon={<IconPlus />}
            onClear={() => {}}
            aria-label="input-suffix-icon-clear"
          />
          <AbstractInput
            suffix="Kg"
            icon={<IconPlus />}
            onClear={() => {}}
            value="Test6"
            aria-label="input-suffix-icon-clear-value"
            readOnly
          />
        </Fragment>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
  describe('Password', () => {
    it('should be able to show & hide the password', () => {
      const { getByRole, getByTestId } = render(
        <AbstractInputPassword
          data-testid="input-password"
          csx={{ color: 'coral' }}
          value="Test1"
          readOnly
        />
      )

      const input = () => getByTestId('input-password')
      const revealButton = () => getByRole('button')
      const clickButton = () => fireEvent.click(revealButton())

      expect(input()).toBeInTheDocument()
      expect(revealButton()).toBeInTheDocument()

      // hidden
      expect(input()).toHaveAttribute('type', 'password')

      // shown
      clickButton()
      expect(input()).toHaveAttribute('type', 'text')

      // hidden
      clickButton()
      expect(input()).toHaveAttribute('type', 'password')
    })
  })
})
