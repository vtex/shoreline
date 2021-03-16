import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ThemeProvider } from '@vtex/admin-core'
import { IntlProvider } from 'react-intl'
import { Form, Formik } from 'formik'
import { FormikCheckbox } from './index'
import { Button } from '@vtex/admin-ui';

describe('Checkbox tests', () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });

  it('change value in formik by input component', async () => {
    const handleSubmit = jest.fn()

    render( 
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            initialValues={{value: false}}
            onSubmit={handleSubmit}
          >
              <Form id='form-admin-formik-input'>
                <FormikCheckbox
                  name="value"
                  data-testid="text-field"
                  label="TextField label"
                />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik> 
        </IntlProvider> 
      </ThemeProvider>
    )
    
    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    await waitFor(() => expect(checkbox.getAttribute("aria-checked")).toBe("true"))

    userEvent.click(screen.getByRole('button', {name: "Submit"}))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        value: true
      }, expect.anything())
    )
  })

  it('change value in formik by setFieldValue', async () => {
    const handleSubmit = jest.fn()

    render(
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            initialValues={{value: false}}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form id='form-admin-formik-input'>
                <FormikCheckbox
                  name="value"
                  data-testid="text-field"
                  label="TextField label"
                />
                <Button 
                  size='small' 
                  children="Change Value" 
                  onClick={()=> setFieldValue("value", false)}
                />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
            )}
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )


    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    await waitFor(() => expect(checkbox.getAttribute("aria-checked")).toBe("true"))

    userEvent.click(screen.getByRole('button', {name: "Change Value"}))
    await waitFor(() => expect(checkbox.getAttribute("aria-checked")).toBe("false"))

    userEvent.click(screen.getByRole('button', {name: "Submit"}))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        value: false
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
            initialValues={{value: false}}
            onSubmit={handleSubmit}
          >
              <Form id='form-admin-formik-input'>
                <FormikCheckbox
                  name="value"
                  data-testid="text-field"
                  label="TextField label"
                />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )

    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    await waitFor(() => expect(checkbox.getAttribute("aria-checked")).toBe("true"))

    userEvent.click(checkbox)
    await waitFor(() => expect(checkbox.getAttribute("aria-checked")).toBe("false"))
    
    rerender(
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            enableReinitialize
            initialValues={{value: true}}
            onSubmit={handleSubmit}
            >
              <Form id='form-admin-formik-input'>
                <FormikCheckbox
                  name="value"
                  data-testid="text-field"
                  label="TextField label"
                  />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )
    
    await waitFor(() => expect(checkbox.getAttribute("aria-checked")).toBe("true"))

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
            initialValues={{value: false}}
            validate={validate}
            onSubmit={handleSubmit}
          >
              <Form id='form-admin-formik-input'>
                <FormikCheckbox
                  name="value"
                  data-testid="text-field"
                  label="TextField label"
                />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )

    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    await waitFor(() => expect(checkbox.getAttribute("aria-checked")).toBe("true"))

    expect(await screen.findByText("Error message")).not.toBeNull();
  })

})
