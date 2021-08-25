import React from 'react'
import { fireEvent, render, screen, waitFor, axe } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { IntlProvider, useIntl } from 'react-intl'
import { Form, Formik } from 'formik'
import { Button, Text } from '@vtex/admin-ui'

import { FormikTextArea } from './index'

describe('TextArea tests', () => {
  it('change value in formik by input component', async () => {
    const handleSubmit = jest.fn()

    render(
      <Formik initialValues={{ value: '' }} onSubmit={handleSubmit}>
        <Form id="form-admin-formik-input">
          <FormikTextArea
            name="value"
            data-testid="text-field"
            label="TextField label"
            id="text-field-1"
          />
          <Button type="submit" size="small" children="Submit" />
        </Form>
      </Formik>
    )

    userEvent.type(screen.getByLabelText(/TextField label/i), 'v')
    userEvent.type(screen.getByLabelText(/TextField label/i), 'alue of test')
    userEvent.click(screen.getByRole('button'))

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
      <Formik initialValues={{ value: '' }} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form id="form-admin-formik-input">
            <FormikTextArea
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
      <Formik
        enableReinitialize
        initialValues={{ value: '' }}
        onSubmit={handleSubmit}
      >
        <Form id="form-admin-formik-input">
          <FormikTextArea
            name="value"
            data-testid="text-field"
            label="TextField label"
            id="text-field-1"
          />
          <Button type="submit" size="small" children="Submit" />
        </Form>
      </Formik>
    )

    const input = screen.getByLabelText(/TextField label/i)

    expect(screen.getByLabelText(/TextField label/i).innerHTML).toEqual('')
    userEvent.type(screen.getByLabelText(/TextField label/i), 'v')
    expect(screen.getByLabelText(/TextField label/i).innerHTML).toEqual('v')

    userEvent.type(screen.getByLabelText(/TextField label/i), 'alue of test')
    await waitFor(() =>
      expect(screen.getByLabelText(/TextField label/i).innerHTML).toEqual(
        'value of test'
      )
    )

    rerender(
      <Formik
        enableReinitialize
        initialValues={{ value: 'new initial value' }}
        onSubmit={handleSubmit}
      >
        <Form id="form-admin-formik-input">
          <FormikTextArea
            name="value"
            data-testid="text-field"
            label="TextField label"
            id="text-field-1"
          />
          <Button type="submit" size="small" children="Submit" />
        </Form>
      </Formik>
    )

    await waitFor(() => expect(input).toHaveValue('new initial value'))
  })

  it('set toched when click and untouched when reset forms', async () => {
    const handleSubmit = jest.fn()

    render(
      <Formik initialValues={{ value: false }} onSubmit={handleSubmit}>
        {({ touched, resetForm }) => (
          <Form id="form-admin-formik-input">
            <FormikTextArea
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
      <Formik
        initialValues={{ value: '' }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form id="form-admin-formik-input">
          <FormikTextArea
            name="value"
            data-testid="text-field"
            label="TextField label"
            id="text-field-1"
          />
          <Button type="submit" size="small" children="Submit" />
        </Form>
      </Formik>
    )

    const input = screen.getByLabelText(/TextField label/i)

    fireEvent.blur(input)

    expect(await screen.findByText('Error message')).not.toBeNull()
  })

  it('error in forms with intl', async () => {
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
            <FormikTextArea
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
      <IntlProvider locale="en" messages={messagesEN}>
        <Content />
      </IntlProvider>
    )

    const input = screen.getByLabelText(/TextField label/i)

    fireEvent.blur(input)

    expect(await screen.findByText('Error message')).not.toBeNull()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Formik
        enableReinitialize
        initialValues={{ value: '' }}
        onSubmit={() => {}}
      >
        <Form id="form-admin-formik-input">
          <FormikTextArea
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
