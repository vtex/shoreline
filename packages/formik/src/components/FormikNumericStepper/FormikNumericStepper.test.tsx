import React from 'react'
import { render, screen, waitFor, axe } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { IntlProvider, useIntl } from 'react-intl'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Text } from '@vtex/admin-ui'

import { FormikNumericStepper } from './index'

describe('Numeric Stepper tests', () => {
  it('change value in formik by input component', async () => {
    const handleSubmit = jest.fn()

    render(
      <Formik initialValues={{ value: 0 }} onSubmit={handleSubmit}>
        <Form id="form-admin-formik-input">
          <FormikNumericStepper
            name="value"
            data-testid="numeric-field"
            label="NumericStepper label"
            id="numeric-field-1"
          />
          <Button type="submit" children="Submit" data-testid="btn-submit" />
        </Form>
      </Formik>
    )

    const input = screen.getByTestId('numeric-field')

    userEvent.type(input, '5')
    userEvent.click(screen.getByTestId('btn-submit'))
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          value: 5,
        },
        expect.anything()
      )
    )

    const btnIncrement = screen.getByLabelText(
      'NumericStepper label-increase-button}'
    )

    userEvent.click(btnIncrement)
    userEvent.click(screen.getByTestId('btn-submit'))
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          value: 6,
        },
        expect.anything()
      )
    )

    const btnDecrement = screen.getByLabelText(
      'NumericStepper label-decrease-button'
    )

    userEvent.click(btnDecrement)
    userEvent.click(screen.getByTestId('btn-submit'))
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          value: 5,
        },
        expect.anything()
      )
    )
  })

  it('change value in formik by setFieldValue', async () => {
    const handleSubmit = jest.fn()

    render(
      <Formik initialValues={{ value: 0 }} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form id="form-admin-formik-input">
            <FormikNumericStepper
              name="value"
              data-testid="numeric-field"
              label="NumericField label"
              id="numeric-field-1"
            />
            <Button
              children="Change Value"
              onClick={() => setFieldValue('value', 5)}
            />
            <Button type="submit" children="Submit" />
          </Form>
        )}
      </Formik>
    )

    const input = screen.getByTestId('numeric-field')

    userEvent.click(screen.getByRole('button', { name: 'Change Value' }))
    expect(input).toHaveValue(5)

    userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          value: 5,
        },
        expect.anything()
      )
    )
  })

  it('change initial value in formik', async () => {
    const handleSubmit = jest.fn()

    const { rerender } = render(
      <Formik
        enableReinitialize
        initialValues={{ value: 0 }}
        onSubmit={handleSubmit}
      >
        <Form id="form-admin-formik-input">
          <FormikNumericStepper
            name="value"
            data-testid="numeric-field"
            label="NumericField label"
            id="numeric-field-1"
          />
          <Button type="submit" children="Submit" />
        </Form>
      </Formik>
    )

    const input = screen.getByTestId('numeric-field')

    expect(input).toHaveValue(0)

    userEvent.type(input, '5')
    expect(input).toHaveValue(5)

    rerender(
      <Formik
        enableReinitialize
        initialValues={{ value: 7 }}
        onSubmit={handleSubmit}
      >
        <Form id="form-admin-formik-input">
          <FormikNumericStepper
            name="value"
            data-testid="numeric-field"
            label="NumericField label"
            id="numeric-field-1"
          />
          <Button type="submit" children="Submit" />
        </Form>
      </Formik>
    )

    await waitFor(() => expect(input).toHaveValue(7))
  })

  it('set toched when click and untouched when reset forms', async () => {
    const handleSubmit = jest.fn()

    render(
      <Formik initialValues={{ value: false }} onSubmit={handleSubmit}>
        {({ touched, resetForm }) => (
          <Form id="form-admin-formik-input">
            <FormikNumericStepper
              name="value"
              data-testid="numeric-field"
              label="NumericStepper label"
              id="numeric-field-1"
            />
            <Button children="Reset Form" onClick={() => resetForm()} />
            <Text tone="secondary">
              <pre>{JSON.stringify(touched)}</pre>
            </Text>
            <Button type="submit" children="Submit" />
          </Form>
        )}
      </Formik>
    )

    expect(await screen.findByText('{}')).not.toBeNull()

    const btnIncrement = screen.getByLabelText(
      'NumericStepper label-increase-button}'
    )

    userEvent.click(btnIncrement)
    expect(await screen.findByText('{"value":true}')).not.toBeNull()

    userEvent.click(screen.getByRole('button', { name: 'Reset Form' }))
    expect(await screen.findByText('{}')).not.toBeNull()

    const btnDecrement = screen.getByLabelText(
      'NumericStepper label-decrease-button'
    )

    userEvent.click(btnDecrement)
    expect(await screen.findByText('{"value":true}')).not.toBeNull()

    userEvent.click(screen.getByRole('button', { name: 'Reset Form' }))
    expect(await screen.findByText('{}')).not.toBeNull()

    const input = screen.getByTestId('numeric-field')

    userEvent.type(input, '5')
    expect(await screen.findByText('{"value":true}')).not.toBeNull()

    userEvent.click(screen.getByRole('button', { name: 'Reset Form' }))
    expect(await screen.findByText('{}')).not.toBeNull()
  })

  it('error message in forms', async () => {
    const handleSubmit = jest.fn()

    const validate = () => ({ value: 'Error message' })

    render(
      <Formik
        initialValues={{ value: 0 }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form id="form-admin-formik-input">
          <FormikNumericStepper
            name="value"
            data-testid="numeric-field"
            label="NumericField label"
            id="numeric-field-1"
          />
          <Button type="submit" children="Submit" />
        </Form>
      </Formik>
    )
    const input = screen.getByTestId('numeric-field')

    userEvent.type(input, '5')
    await waitFor(() => expect(input).toHaveValue(5))

    expect(await screen.findByText('Error message')).not.toBeNull()
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('error limit in forms', async () => {
    const handleSubmit = jest.fn()

    const maxValue = 5
    const schemaValidationError = Yup.object({
      value: Yup.number().max(maxValue, 'Error message'),
    })

    render(
      <Formik
        initialValues={{ value: 0 }}
        validationSchema={schemaValidationError}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, setFieldTouched }) => (
          <Form id="form-admin-formik-input">
            <FormikNumericStepper
              name="value"
              data-testid="numeric-field"
              label="NumericField label"
              id="numeric-field-1"
              maxValue={maxValue}
            />
            <Button
              children="Change Value"
              onClick={() => {
                setFieldValue('value', maxValue + 2)
                setFieldTouched('value', true)
              }}
            />
          </Form>
        )}
      </Formik>
    )

    const input = screen.getByTestId('numeric-field')

    userEvent.click(screen.getByRole('button', { name: 'Change Value' }))
    expect(input).toHaveValue(maxValue)

    expect(await screen.findByText('Error message')).not.toBeNull()
  })

  it('error message in forms with intl', async () => {
    const messagesEN = {
      'admin/admin-formik.error.message': 'Error message',
    }

    const Content = () => {
      const handleSubmit = jest.fn()
      const { formatMessage } = useIntl()
      const validate = () => ({ value: 'admin/admin-formik.error.message' })

      return (
        <Formik
          initialValues={{ value: 0 }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form id="form-admin-formik-input">
            <FormikNumericStepper
              name="value"
              data-testid="numeric-field"
              label="NumericField label"
              id="numeric-field-1"
              formatMessage={(errorCode) => formatMessage({ id: errorCode })}
            />
            <Button type="submit" children="Submit" />
          </Form>
        </Formik>
      )
    }

    render(
      <IntlProvider locale="en" messages={messagesEN}>
        <Content />
      </IntlProvider>
    )

    const input = screen.getByTestId('numeric-field')

    userEvent.type(input, '5')
    expect(input).toHaveValue(5)

    expect(await screen.findByText('Error message')).not.toBeNull()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Formik
        enableReinitialize
        initialValues={{ value: 0 }}
        onSubmit={() => {}}
      >
        <Form id="form-admin-formik-input">
          <FormikNumericStepper
            name="value"
            data-testid="text-field"
            label="TextField label"
            id="text-field-1"
          />
        </Form>
      </Formik>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
