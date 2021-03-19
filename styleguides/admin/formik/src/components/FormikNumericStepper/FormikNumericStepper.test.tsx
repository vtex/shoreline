import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { axe } from 'jest-axe'

import { ThemeProvider } from '@vtex/admin-core'
import { IntlProvider } from 'react-intl'
import { Form, Formik } from 'formik'
// import * as Yup from 'yup'
import { FormikNumericStepper } from './index'
import { Button } from '@vtex/admin-ui';

describe('Numeric Stepper tests', () => {
  it('change value in formik by input component', async () => {
    const handleSubmit = jest.fn()

    render( 
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            initialValues={{value: 0}}
            onSubmit={handleSubmit}
          >
              <Form id='form-admin-formik-input'>
                <FormikNumericStepper
                  name="value"
                  data-testid="numeric-field"
                  label="NumericStepper label"
                  id="numeric-field-1"
                />
                <Button type="submit" size='small' children="Submit" data-testid="btn-submit" />
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )
    
    const input = screen.getByTestId('numeric-field')
    userEvent.type(input, '5')
    userEvent.click(screen.getByTestId('btn-submit'))
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        value: 5
      }, expect.anything())
    )

    const btnIncrement = screen.getByLabelText('NumericStepper label-increase-button}')
    userEvent.click(btnIncrement)
    userEvent.click(screen.getByTestId('btn-submit'))
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        value: 6
      }, expect.anything())
    )

    const btnDecrement = screen.getByLabelText('NumericStepper label-decrease-button')
    userEvent.click(btnDecrement)
    userEvent.click(screen.getByTestId('btn-submit'))
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        value: 5
      }, expect.anything())
    )
  })

  it('change value in formik by setFieldValue', async () => {
    const handleSubmit = jest.fn()

    render(
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            initialValues={{value: 0}}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form id='form-admin-formik-input'>
                <FormikNumericStepper
                  name="value"
                  data-testid="numeric-field"
                  label="NumericField label"
                  id="numeric-field-1"
                />
                <Button 
                  size='small' 
                  children="Change Value" 
                  onClick={()=> setFieldValue("value", 5)}
                />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
            )}
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )

    const input = screen.getByTestId('numeric-field')
    userEvent.click(screen.getByRole('button', {name: "Change Value"}))
    expect(input).toHaveValue(5)

    userEvent.click(screen.getByRole('button', {name: "Submit"}))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        value: 5
      }, expect.anything())
    )
  })

  it('change initial value in formik', async () => {
    const handleSubmit = jest.fn()

    const { rerender } = 
    render(
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            enableReinitialize
            initialValues={{value: 0}}
            onSubmit={handleSubmit}
          >
              <Form id='form-admin-formik-input'>
                <FormikNumericStepper
                  name="value"
                  data-testid="numeric-field"
                  label="NumericField label"
                  id="numeric-field-1"
                />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )

    const input = screen.getByTestId('numeric-field')
    expect(input).toHaveValue(0)

    userEvent.type(input, '5')
    expect(input).toHaveValue(5)
    
    rerender(
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            enableReinitialize
            initialValues={{value: 7}}
            onSubmit={handleSubmit}
            >
              <Form id='form-admin-formik-input'>
                <FormikNumericStepper
                  name="value"
                  data-testid="numeric-field"
                  label="NumericField label"
                  id="numeric-field-1"
                  />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )
    
    await waitFor(() => expect(input).toHaveValue(7))

  })

  it('error in forms', async () => {
    const handleSubmit = jest.fn()
    const messagesEN = {
      'admin/admin-formik.error.message': "Error message"
    }

    const validate = () => ({ value: 'admin/admin-formik.error.message' });

    render( 
      <ThemeProvider>
        <IntlProvider locale={'en'} messages={messagesEN}>
          <Formik
            initialValues={{value: ''}}
            validate={validate}
            onSubmit={handleSubmit}
          >
              <Form id='form-admin-formik-input'>
                <FormikNumericStepper
                  name="value"
                  data-testid="numeric-field"
                  label="NumericField label"
                  id="numeric-field-1"
                />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )
    const input = screen.getByTestId('numeric-field')
    userEvent.type(input, '5')
    expect(input).toHaveValue(5)

    expect(await screen.findByText("Error message")).not.toBeNull();
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            enableReinitialize
            initialValues={{value: ''}}
            onSubmit={()=>{}}
          >
              <Form id='form-admin-formik-input'>
                <FormikNumericStepper
                  name="value"
                  data-testid="text-field"
                  label="TextField label"
                  id="text-field-1"
                />
              </Form>
          </Formik>
        </IntlProvider>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
