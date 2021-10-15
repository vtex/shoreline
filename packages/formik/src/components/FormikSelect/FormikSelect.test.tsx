import React from 'react'
import { render, screen, waitFor } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { IntlProvider, useIntl } from 'react-intl'
import { Form, Formik } from 'formik'
import { Button, Text } from '@vtex/admin-ui'

import { FormikSelect } from './index'

describe('Select tests', () => {
  it('change value in formik by input component', async () => {
    const handleSubmit = jest.fn()
    const options = ['option 1', 'option 2', 'option 3', 'error']

    render(
      <Formik initialValues={{ value: '' }} onSubmit={handleSubmit}>
        <Form id="form-admin-formik-input">
          <FormikSelect
            name="value"
            items={options}
            data-testid="text-field"
            label="TextField label"
          />
          <Button type="submit" size="small" children="Submit" />
        </Form>
      </Formik>
    )

    userEvent.click(screen.getByRole('button', { name: /TextField label/i }))
    userEvent.click(screen.getByText(options[2]))

    userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          value: options[2],
        },
        expect.anything()
      )
    )
  })

  it('change value in formik by setFieldValue', async () => {
    const handleSubmit = jest.fn()
    const options = ['option 1', 'option 2', 'option 3', 'error']

    render(
      <Formik initialValues={{ value: '' }} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form id="form-admin-formik-input">
            <FormikSelect
              name="value"
              items={options}
              data-testid="text-field"
              label="TextField label"
            />
            <Button
              size="small"
              children="Change Value"
              onClick={() => setFieldValue('value', options[0])}
            />
            <Button type="submit" size="small" children="Submit" />
          </Form>
        )}
      </Formik>
    )

    const select = screen.getByRole('button', { name: /TextField label/i })

    userEvent.click(select)
    userEvent.click(screen.getByText(options[2]))
    expect(select).toHaveTextContent(options[2])

    userEvent.click(screen.getByRole('button', { name: 'Change Value' }))

    expect(select).toHaveTextContent(options[0])

    userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          value: options[0],
        },
        expect.anything()
      )
    )
  })

  it('change initial value in formik', async () => {
    const handleSubmit = jest.fn()
    const options = ['option 1', 'option 2', 'option 3', 'error']

    const { rerender } = render(
      <Formik
        enableReinitialize
        initialValues={{ value: '' }}
        onSubmit={handleSubmit}
      >
        <Form id="form-admin-formik-input">
          <FormikSelect
            name="value"
            data-testid="text-field"
            label="TextField label"
            items={options}
          />
          <Button type="submit" size="small" children="Submit" />
        </Form>
      </Formik>
    )

    const select = screen.getByRole('button', { name: /TextField label/i })

    userEvent.click(select)
    userEvent.click(screen.getByText(options[2]))
    await waitFor(() => expect(select).toHaveTextContent(options[2]))

    rerender(
      <Formik
        enableReinitialize
        initialValues={{ value: options[0] }}
        onSubmit={handleSubmit}
      >
        <Form id="form-admin-formik-input">
          <FormikSelect
            name="value"
            items={options}
            data-testid="text-field"
            label="TextField label"
          />
          <Button type="submit" size="small" children="Submit" />
        </Form>
      </Formik>
    )

    await waitFor(() => expect(select).toHaveTextContent(options[0]))
  })

  it('set toched when click and untouched when reset forms', async () => {
    const handleSubmit = jest.fn()
    const options = ['option 1', 'option 2', 'option 3', 'error']

    render(
      <Formik initialValues={{ value: false }} onSubmit={handleSubmit}>
        {({ touched, resetForm }) => (
          <Form id="form-admin-formik-input">
            <FormikSelect
              name="value"
              items={options}
              data-testid="text-field"
              label="TextField label"
            />
            <Button
              size="small"
              children="Reset Form"
              onClick={() => resetForm()}
            />
            <Text tone="muted">
              <pre>{JSON.stringify(touched)}</pre>
            </Text>
            <Button type="submit" size="small" children="Submit" />
          </Form>
        )}
      </Formik>
    )

    expect(await screen.findByText('{}')).not.toBeNull()

    userEvent.click(screen.getByRole('button', { name: /TextField label/i }))
    expect(await screen.findByText('{"value":true}')).not.toBeNull()

    userEvent.click(screen.getByRole('button', { name: 'Reset Form' }))
    expect(await screen.findByText('{}')).not.toBeNull()
  })

  it('error in forms', async () => {
    const handleSubmit = jest.fn()
    const options = ['option 1', 'option 2', 'option 3', 'error']

    const validate = () => ({ value: 'Error message' })

    render(
      <Formik
        initialValues={{ value: '' }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form id="form-admin-formik-input">
          <FormikSelect
            name="value"
            items={options}
            data-testid="text-field"
            label="TextField label"
          />
          <Button type="submit" size="small" children="Submit" />
        </Form>
      </Formik>
    )

    const select = screen.getByRole('button', { name: /TextField label/i })

    userEvent.click(select)
    userEvent.click(screen.getByText(options[2]))

    expect(await screen.findByText('Error message')).not.toBeNull()
  })

  it('error in forms with intl', async () => {
    const options = ['option 1', 'option 2', 'option 3', 'error']
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
            <FormikSelect
              name="value"
              items={options}
              data-testid="text-field"
              label="TextField label"
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

    const select = screen.getByRole('button', { name: /TextField label/i })

    userEvent.click(select)
    userEvent.click(screen.getByText(options[2]))

    expect(await screen.findByText('Error message')).not.toBeNull()
  })

  it('Select with array of objects', async () => {
    const handleSubmit = jest.fn()
    const options = [
      { id: 'option-1', label: 'Option 1' },
      { id: 'option-2', label: 'Option 2' },
      { id: 'option-3', label: 'Option 3' },
      { id: 'option-error', label: 'Invalid Option' },
    ]

    const validate = (values: { value: { id: string; label: string } }) => {
      if (values.value.id === '')
        return { value: { id: 'This field is required.' } }
      if (values.value.id === 'option-error')
        return { value: { id: 'Error message' } }

      return {}
    }

    render(
      <Formik
        initialValues={{ value: { id: '', label: '' } }}
        onSubmit={handleSubmit}
        validate={validate}
      >
        <Form id="form-admin-formik-input">
          <FormikSelect
            name="value"
            items={options}
            data-testid="text-field"
            label="TextField label"
            itemToString={(item) => (item ? item.label : '')}
            renderItem={(item) => (item ? item.label : '')}
          />
          <Button type="submit" size="small" children="Submit" />
        </Form>
      </Formik>
    )

    userEvent.click(screen.getByRole('button', { name: /TextField label/i }))
    userEvent.click(screen.getByText(options[1].label))

    userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          value: options[1],
        },
        expect.anything()
      )
    )

    userEvent.click(screen.getByRole('button', { name: /TextField label/i }))
    userEvent.click(screen.getByText(options[3].label))

    userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(await screen.findByText('Error message')).not.toBeNull()
  })
})
