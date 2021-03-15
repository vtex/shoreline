import React from 'react'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { axe } from 'jest-axe'

import { ThemeProvider } from '@vtex/admin-core'
import { IntlProvider } from 'react-intl'
import { Form, Formik } from 'formik'
// import * as Yup from 'yup'
import { FormikInputPassword } from './index'
import { Button } from '@vtex/admin-ui';

describe('Input password tests', () => {
  it('change value in formik by input component', async () => {
    const handleSubmit = jest.fn()

    render( 
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            initialValues={{value: ''}}
            onSubmit={handleSubmit}
          >
              <Form id='form-admin-formik-input'>
                <FormikInputPassword
                  name="value"
                  data-testid="text-field"
                  label="TextField label"
                  id="text-field-1"
                />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )

    userEvent.type(screen.getByLabelText(/TextField label/i), 'value of test')
    userEvent.click(screen.getByRole('button', {name: "Submit"}))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        value: 'value of test'
      }, expect.anything())
    )
  })

  it('change value in formik by setFieldValue', async () => {
    const handleSubmit = jest.fn()

    render(
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            initialValues={{value: ''}}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form id='form-admin-formik-input'>
                <FormikInputPassword
                  name="value"
                  data-testid="text-field"
                  label="TextField label"
                  id="text-field-1"
                />
                <Button 
                  size='small' 
                  children="Change Value" 
                  onClick={()=> setFieldValue("value", "value changed by setFieldValue")}
                />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
            )}
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )

    const input = screen.getByLabelText(/TextField label/i)
    userEvent.type(input , 'value of test')
    userEvent.click(screen.getByRole('button', {name: "Change Value"}))

    // const input = screen.getByPlaceholderText("TextField label")
    expect(input).toHaveValue('value changed by setFieldValue')

    userEvent.click(screen.getByRole('button', {name: "Submit"}))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        value: 'value changed by setFieldValue'
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
            initialValues={{value: ""}}
            onSubmit={handleSubmit}
          >
              <Form id='form-admin-formik-input'>
                <FormikInputPassword
                  name="value"
                  data-testid="text-field"
                  label="TextField label"
                  id="text-field-1"
                />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )

    const input = screen.getByLabelText(/TextField label/i)
    expect(input).toHaveValue('')
    
    userEvent.type(input , 'value of test')
    await waitFor(() => expect(input).toHaveValue('value of test'))
    
    rerender(
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            enableReinitialize
            initialValues={{value: "new initial value"}}
            onSubmit={handleSubmit}
            >
              <Form id='form-admin-formik-input'>
                <FormikInputPassword
                  name="value"
                  data-testid="text-field"
                  label="TextField label"
                  id="text-field-1"
                  />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )
    
    await waitFor(() => expect(input).toHaveValue('new initial value'))

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
                <FormikInputPassword
                  name="value"
                  data-testid="text-field"
                  label="TextField label"
                  id="text-field-1"
                />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )

    const input = screen.getByLabelText(/TextField label/i)
    fireEvent.blur(input);

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
                <FormikInputPassword
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
