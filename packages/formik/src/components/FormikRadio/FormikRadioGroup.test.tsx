import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ThemeProvider } from '@vtex/admin-core'
import { IntlProvider, useIntl } from 'react-intl'
import { Form, Formik } from 'formik'
import { Button, Label, Text } from '@vtex/admin-ui'

import { FormikRadio, FormikRadioGroup } from './index'

describe('Radio and RadioGroup tests', () => {
  it('change value in formik by input component', async () => {
    const handleSubmit = jest.fn()
    const options = ['option 1', 'option 2', 'option 3', 'error']

    render(
      <ThemeProvider>
        <Formik initialValues={{ value: '' }} onSubmit={handleSubmit}>
          <Form id="form-admin-formik-input">
            <FormikRadioGroup
              name="value"
              label="Label Title"
              aria-label="label-title"
            >
              {options.map((value, key) => {
                return (
                  <Label key={key}>
                    <FormikRadio value={value} />
                    {value}
                  </Label>
                )
              })}
            </FormikRadioGroup>
            <Button type="submit" size="small" children="Submit" />
          </Form>
        </Formik>
      </ThemeProvider>
    )
    userEvent.click(screen.getByDisplayValue(options[2]))

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
      <ThemeProvider>
        <Formik initialValues={{ value: '' }} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form id="form-admin-formik-input">
              <FormikRadioGroup
                name="value"
                label="Label Title"
                aria-label="label-title"
              >
                {options.map((value, key) => {
                  return (
                    <Label key={key}>
                      <FormikRadio value={value} />
                      {value}
                    </Label>
                  )
                })}
              </FormikRadioGroup>
              <Button
                size="small"
                children="Change Value"
                onClick={() => setFieldValue('value', options[0])}
              />
              <Button type="submit" size="small" children="Submit" />
            </Form>
          )}
        </Formik>
      </ThemeProvider>
    )

    const option2 = screen.getByDisplayValue(options[2])

    userEvent.click(option2)
    await waitFor(() =>
      expect(option2.getAttribute('aria-checked')).toBe('true')
    )

    userEvent.click(screen.getByRole('button', { name: 'Change Value' }))
    await waitFor(() =>
      expect(option2.getAttribute('aria-checked')).toBe('false')
    )
    await waitFor(() =>
      expect(
        screen.getByDisplayValue(options[0]).getAttribute('aria-checked')
      ).toBe('true')
    )

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
      <ThemeProvider>
        <Formik
          enableReinitialize
          initialValues={{ value: '' }}
          onSubmit={handleSubmit}
        >
          <Form id="form-admin-formik-input">
            <FormikRadioGroup
              name="value"
              label="Label Title"
              aria-label="label-title"
            >
              {options.map((value, key) => {
                return (
                  <Label key={key}>
                    <FormikRadio value={value} />
                    {value}
                  </Label>
                )
              })}
            </FormikRadioGroup>
            <Button type="submit" size="small" children="Submit" />
          </Form>
        </Formik>
      </ThemeProvider>
    )

    const option2 = screen.getByDisplayValue(options[2])

    userEvent.click(option2)
    await waitFor(() =>
      expect(option2.getAttribute('aria-checked')).toBe('true')
    )

    rerender(
      <ThemeProvider>
        <Formik
          enableReinitialize
          initialValues={{ value: options[0] }}
          onSubmit={handleSubmit}
        >
          <Form id="form-admin-formik-input">
            <FormikRadioGroup
              name="value"
              label="Label Title"
              aria-label="label-title"
            >
              {options.map((value, key) => {
                return (
                  <Label key={key}>
                    <FormikRadio value={value} />
                    {value}
                  </Label>
                )
              })}
            </FormikRadioGroup>
            <Button type="submit" size="small" children="Submit" />
          </Form>
        </Formik>
      </ThemeProvider>
    )

    await waitFor(() =>
      expect(option2.getAttribute('aria-checked')).toBe('false')
    )
    await waitFor(() =>
      expect(
        screen.getByDisplayValue(options[0]).getAttribute('aria-checked')
      ).toBe('true')
    )
  })

  it('set toched when click and untouched when reset forms', async () => {
    const handleSubmit = jest.fn()
    const options = ['option 1', 'option 2', 'option 3', 'error']

    render(
      <ThemeProvider>
        <Formik initialValues={{ value: false }} onSubmit={handleSubmit}>
          {({ touched, resetForm }) => (
            <Form id="form-admin-formik-input">
              <FormikRadioGroup
                name="value"
                label="Label Title"
                aria-label="label-title"
              >
                {options.map((value, key) => {
                  return (
                    <Label key={key}>
                      <FormikRadio value={value} />
                      {value}
                    </Label>
                  )
                })}
              </FormikRadioGroup>
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
    const option2 = screen.getByText(options[2])

    userEvent.click(option2)
    userEvent.click(document.body)
    expect(await screen.findByText('{"value":true}')).not.toBeNull()

    userEvent.click(screen.getByRole('button', { name: 'Reset Form' }))
    expect(await screen.findByText('{}')).not.toBeNull()
  })

  it('error in forms', async () => {
    const handleSubmit = jest.fn()
    const options = ['option 1', 'option 2', 'option 3', 'error']

    const validate = () => ({ value: 'Error message' })

    render(
      <ThemeProvider>
        <Formik
          initialValues={{ value: '' }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form id="form-admin-formik-input">
            <FormikRadioGroup
              name="value"
              label="Label Title"
              aria-label="label-title"
            >
              {options.map((value, key) => {
                return (
                  <Label key={key}>
                    <FormikRadio value={value} />
                    {value}
                  </Label>
                )
              })}
            </FormikRadioGroup>
            <Button type="submit" size="small" children="Submit" />
          </Form>
        </Formik>
      </ThemeProvider>
    )

    const error = screen.getByDisplayValue(options[3])

    userEvent.click(error)
    userEvent.click(document.body)
    await waitFor(() => expect(error.getAttribute('aria-checked')).toBe('true'))

    expect(await screen.findByText('Error message')).not.toBeNull()
  })

  it('error in forms with intl', async () => {
    const messagesEN = {
      'admin/admin-formik.error.message': 'Error message',
    }

    const options = ['option 1', 'option 2', 'option 3', 'error']

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
            <FormikRadioGroup
              name="value"
              label="Label Title"
              aria-label="label-title"
              formatMessage={(errorCode) => formatMessage({ id: errorCode })}
            >
              {options.map((value, key) => {
                return (
                  <Label key={key}>
                    <FormikRadio value={value} />
                    {value}
                  </Label>
                )
              })}
            </FormikRadioGroup>
            <Button type="submit" size="small" children="Submit" />
          </Form>
        </Formik>
      )
    }

    render(
      <ThemeProvider>
        <IntlProvider locale="en" messages={messagesEN}>
          <Content />
        </IntlProvider>
      </ThemeProvider>
    )

    const error = screen.getByDisplayValue(options[3])

    userEvent.click(error)
    userEvent.click(document.body)
    await waitFor(() => expect(error.getAttribute('aria-checked')).toBe('true'))

    expect(await screen.findByText('Error message')).not.toBeNull()
  })

  it('should not have a11y violations', async () => {
    const options = ['option 1', 'option 2', 'option 3', 'error']

    const { container } = render(
      <ThemeProvider>
        <Formik initialValues={{ value: [] }} onSubmit={() => {}}>
          <Form id="form-admin-formik-input">
            <FormikRadioGroup
              name="value"
              label="Label Title"
              aria-label="label-title"
            >
              {options.map((value, key) => {
                return (
                  <Label key={key}>
                    <FormikRadio value={value} aria-label="Radio" />
                    {value}
                  </Label>
                )
              })}
            </FormikRadioGroup>
            <Button type="submit" size="small" children="Submit" />
          </Form>
        </Formik>
      </ThemeProvider>
    )

    const option2 = screen.getByText(options[2])

    userEvent.click(option2)
    await waitFor(() =>
      expect(
        option2.getElementsByTagName('input')[0].getAttribute('aria-checked')
      ).toBe('true')
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
