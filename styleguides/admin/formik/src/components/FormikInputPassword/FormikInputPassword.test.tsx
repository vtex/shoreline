import React from 'react'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { axe } from 'jest-axe'

import { ThemeProvider } from '@vtex/admin-core'
import { Form, Formik } from 'formik'
import { FormikInputPassword } from './index'
import { Button, Text } from '@vtex/admin-ui'

import { useIntl, IntlProvider } from 'react-intl'

describe('Input password tests', () => {
  it('change value in formik by input component', async () => {
    const handleSubmit = jest.fn()

    render(
      <ThemeProvider>
        <Formik initialValues={{ value: '' }} onSubmit={handleSubmit}>
          <Form id="form-admin-formik-input">
            <FormikInputPassword
              name="value"
              data-testid="text-field"
              label="TextField label"
              id="text-field-1"
            />
            <Button type="submit" size="small" children="Submit" />
          </Form>
        </Formik>
      </ThemeProvider>
    )

    userEvent.type(screen.getByLabelText(/TextField label/i), 'value of test')
    userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          value: 'value of test',
        },
        expect.anything()
      )
    )
  })

  it('change value in formik by setFieldValue', async () => {
    const handleSubmit = jest.fn()

    render(
      <ThemeProvider>
        <Formik initialValues={{ value: '' }} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form id="form-admin-formik-input">
              <FormikInputPassword
                name="value"
                data-testid="text-field"
                label="TextField label"
                id="text-field-1"
              />
              <Button
                size="small"
                children="Change Value"
                onClick={() =>
                  setFieldValue('value', 'value changed by setFieldValue')
                }
              />
              <Button type="submit" size="small" children="Submit" />
            </Form>
          )}
        </Formik>
      </ThemeProvider>
    )

    const input = screen.getByLabelText(/TextField label/i)
    userEvent.type(input, 'value of test')
    userEvent.click(screen.getByRole('button', { name: 'Change Value' }))

    expect(input).toHaveValue('value changed by setFieldValue')

    userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          value: 'value changed by setFieldValue',
        },
        expect.anything()
      )
    )
  })

  it('change initial value in formik', async () => {
    const handleSubmit = jest.fn()

    const { rerender } = render(
      <ThemeProvider>
        <Formik
          enableReinitialize
          initialValues={{ value: '' }}
          onSubmit={handleSubmit}
        >
          <Form id="form-admin-formik-input">
            <FormikInputPassword
              name="value"
              data-testid="text-field"
              label="TextField label"
              id="text-field-1"
            />
            <Button type="submit" size="small" children="Submit" />
          </Form>
        </Formik>
      </ThemeProvider>
    )

    const input = screen.getByLabelText(/TextField label/i)
    expect(input).toHaveValue('')

    userEvent.type(input, 'value of test')
    await waitFor(() => expect(input).toHaveValue('value of test'))

    rerender(
      <ThemeProvider>
        <Formik
          enableReinitialize
          initialValues={{ value: 'new initial value' }}
          onSubmit={handleSubmit}
        >
          <Form id="form-admin-formik-input">
            <FormikInputPassword
              name="value"
              data-testid="text-field"
              label="TextField label"
              id="text-field-1"
            />
            <Button type="submit" size="small" children="Submit" />
          </Form>
        </Formik>
      </ThemeProvider>
    )

    await waitFor(() => expect(input).toHaveValue('new initial value'))
  })

  it('set toched when click and untouched when reset forms', async () => {
    const handleSubmit = jest.fn()

    render(
      <ThemeProvider>
        <Formik initialValues={{ value: false }} onSubmit={handleSubmit}>
          {({ touched, resetForm }) => (
            <Form id="form-admin-formik-input">
              <FormikInputPassword
                name="value"
                data-testid="text-field"
                label="TextField label"
                id="text-field-1"
              />
              <Button
                size="small"
                children="Reset Form"
                onClick={() => resetForm()}
              />
              <Text feedback="secondary">
                <pre>{JSON.stringify(touched)}</pre>
              </Text>
              <Button type="submit" size="small" children="Submit" />
            </Form>
          )}
        </Formik>
      </ThemeProvider>
    )

    expect(await screen.findByText('{}')).not.toBeNull()
    const input = screen.getByLabelText(/TextField label/i)

    fireEvent.blur(input)
    expect(await screen.findByText('{"value":true}')).not.toBeNull()

    userEvent.click(screen.getByRole('button', { name: 'Reset Form' }))
    expect(await screen.findByText('{}')).not.toBeNull()
  })

  it('error in forms', async () => {
    const handleSubmit = jest.fn()
    const validate = () => ({ value: 'Error message' })

    render(
      <ThemeProvider>
        <Formik
          initialValues={{ value: '' }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form id="form-admin-formik-input">
            <FormikInputPassword
              name="value"
              data-testid="text-field"
              label="TextField label"
              id="text-field-1"
            />
            <Button type="submit" size="small" children="Submit" />
          </Form>
        </Formik>
      </ThemeProvider>
    )

    const input = screen.getByLabelText(/TextField label/i)
    fireEvent.blur(input)

    expect(await screen.findByText('Error message')).not.toBeNull()
  })

  it('error in forms', async () => {
    const messagesEN = {
      'admin/admin-formik.error.message': 'Error message',
    }

    const Content = () => {
      const handleSubmit = jest.fn()
      const { formatMessage } = useIntl()

      const validate = () => ({ value: 'admin/admin-formik.error.message' })

      return (
        <Formik
          initialValues={{ value: '' }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form id="form-admin-formik-input">
            <FormikInputPassword
              name="value"
              data-testid="text-field"
              label="TextField label"
              id="text-field-1"
              formatMessage={(errorCode) => formatMessage({ id: errorCode })}
            />
            <Button type="submit" size="small" children="Submit" />
          </Form>
        </Formik>
      )
    }

    render(
      <ThemeProvider>
        <IntlProvider locale={'en'} messages={messagesEN}>
          <Content />
        </IntlProvider>
      </ThemeProvider>
    )

    const input = screen.getByLabelText(/TextField label/i)
    fireEvent.blur(input)

    expect(await screen.findByText('Error message')).not.toBeNull()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Formik
          enableReinitialize
          initialValues={{ value: '' }}
          onSubmit={() => {}}
        >
          <Form id="form-admin-formik-input">
            <FormikInputPassword
              name="value"
              data-testid="text-field"
              label="TextField label"
              id="text-field-1"
            />
          </Form>
        </Formik>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
