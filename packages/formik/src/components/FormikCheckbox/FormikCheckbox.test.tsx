import React from 'react'
import { render, screen, waitFor, axe } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { IntlProvider, useIntl } from 'react-intl'
import { Form, Formik } from 'formik'
import { Button, Text } from '@vtex/admin-ui'

import { FormikCheckbox } from './index'

describe('Checkbox tests', () => {
  beforeEach(() => {
    /**
     * 🚧 Workaround for window.match media
     * @see https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
     */
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it('change value in formik by input component', async () => {
    const handleSubmit = jest.fn()

    render(
      <Formik initialValues={{ value: false }} onSubmit={handleSubmit}>
        <Form id="form-admin-formik-input">
          <FormikCheckbox
            name="value"
            data-testid="checkbox-field"
            label="CheckboxField label"
          />
          <button type="submit" children="Submit" />
        </Form>
      </Formik>
    )

    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    await waitFor(() =>
      expect(checkbox.getAttribute('aria-checked')).toBe('true')
    )

    userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          value: true,
        },
        expect.anything()
      )
    )
  })

  it('change value in formik by setFieldValue', async () => {
    const handleSubmit = jest.fn()

    render(
      <Formik initialValues={{ value: false }} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form id="form-admin-formik-input">
            <FormikCheckbox
              name="value"
              data-testid="checkbox-field"
              label="CheckboxField label"
            />
            <Button
              size="small"
              children="Change Value"
              onClick={() => setFieldValue('value', false)}
            />
            <Button type="submit" size="small" children="Submit" />
          </Form>
        )}
      </Formik>
    )

    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    await waitFor(() =>
      expect(checkbox.getAttribute('aria-checked')).toBe('true')
    )

    userEvent.click(screen.getByRole('button', { name: 'Change Value' }))
    await waitFor(() =>
      expect(checkbox.getAttribute('aria-checked')).toBe('false')
    )

    userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          value: false,
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
        initialValues={{ value: false }}
        onSubmit={handleSubmit}
      >
        <Form id="form-admin-formik-input">
          <FormikCheckbox
            name="value"
            data-testid="checkbox-field"
            label="CheckboxField label"
          />
          <Button type="submit" size="small" children="Submit" />
        </Form>
      </Formik>
    )

    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    await waitFor(() =>
      expect(checkbox.getAttribute('aria-checked')).toBe('true')
    )

    userEvent.click(checkbox)
    await waitFor(() =>
      expect(checkbox.getAttribute('aria-checked')).toBe('false')
    )

    rerender(
      <Formik
        enableReinitialize
        initialValues={{ value: true }}
        onSubmit={handleSubmit}
      >
        <Form id="form-admin-formik-input">
          <FormikCheckbox
            name="value"
            data-testid="checkbox-field"
            label="CheckboxField label"
          />
          <Button type="submit" size="small" children="Submit" />
        </Form>
      </Formik>
    )

    await waitFor(() =>
      expect(checkbox.getAttribute('aria-checked')).toBe('true')
    )
  })

  it('set toched when click and untouched when reset forms', async () => {
    const handleSubmit = jest.fn()

    render(
      <Formik initialValues={{ value: false }} onSubmit={handleSubmit}>
        {({ touched, resetForm }) => (
          <Form id="form-admin-formik-input">
            <FormikCheckbox
              name="value"
              data-testid="checkbox-field"
              label="CheckboxField label"
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
    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    checkbox.blur()

    expect(await screen.findByText('{"value":true}')).not.toBeNull()

    userEvent.click(screen.getByRole('button', { name: 'Reset Form' }))
    expect(await screen.findByText('{}')).not.toBeNull()
  })

  it('error in forms', async () => {
    const handleSubmit = jest.fn()
    const validate = () => ({ value: 'Error message' })

    render(
      <Formik
        initialValues={{ value: false }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form id="form-admin-formik-input">
          <FormikCheckbox
            name="value"
            data-testid="text-field"
            label="TextField label"
          />
          <Button type="submit" size="small" children="Submit" />
        </Form>
      </Formik>
    )

    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    checkbox.blur()
    await waitFor(() =>
      expect(checkbox.getAttribute('aria-checked')).toBe('true')
    )

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
          initialValues={{ value: false }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form id="form-admin-formik-input">
            <FormikCheckbox
              name="value"
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

    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    checkbox.blur()
    await waitFor(() =>
      expect(checkbox.getAttribute('aria-checked')).toBe('true')
    )

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
          <FormikCheckbox
            name="value"
            data-testid="text-field"
            label="TextField label"
            id="text-field-1"
            aria-label="checkbox"
          />
        </Form>
      </Formik>
    )

    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    await waitFor(() =>
      expect(checkbox.getAttribute('aria-checked')).toBe('true')
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
