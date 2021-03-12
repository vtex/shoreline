import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ThemeProvider } from '@vtex/admin-core'
import { IntlProvider } from 'react-intl'
import { Form, Formik } from 'formik'
import { FormikToggle } from './index'
import { Button } from '@vtex/admin-ui';
import { axe } from 'jest-axe'

describe('Input tests', () => {
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
                <FormikToggle
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
    
    const toggle = screen.getByRole('switch')

    userEvent.click(toggle)
    await waitFor(() => expect(toggle.getAttribute("aria-checked")).toBe("true"))

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
                <FormikToggle
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

    const toggle = screen.getByRole('switch')

    userEvent.click(toggle)
    await waitFor(() => expect(toggle.getAttribute("aria-checked")).toBe("true"))

    userEvent.click(screen.getByRole('button', {name: "Change Value"}))
    await waitFor(() => expect(toggle.getAttribute("aria-checked")).toBe("false"))

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
                <FormikToggle
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

    const toggle = screen.getByRole('switch')

    userEvent.click(toggle)
    await waitFor(() => expect(toggle.getAttribute("aria-checked")).toBe("true"))

    userEvent.click(toggle)
    await waitFor(() => expect(toggle.getAttribute("aria-checked")).toBe("false"))
    
    rerender(
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            enableReinitialize
            initialValues={{value: true}}
            onSubmit={handleSubmit}
            >
              <Form id='form-admin-formik-input'>
                <FormikToggle
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
    
    await waitFor(() => expect(toggle.getAttribute("aria-checked")).toBe("true"))

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
                <FormikToggle
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

    const toggle = screen.getByRole('switch')

    userEvent.click(toggle)
    await waitFor(() => expect(toggle.getAttribute("aria-checked")).toBe("true"))

    expect(await screen.findByText("Error message")).not.toBeNull();
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            enableReinitialize
            initialValues={{value: false}}
            onSubmit={()=>{}}
          >
              <Form id='form-admin-formik-input'>
                <FormikToggle
                  name="value"
                  aria-label="toggle"
                  size="regular"
                />
              </Form>
          </Formik>
        </IntlProvider>
      </ThemeProvider>
    )
    const toggle = screen.getByRole('switch')
    userEvent.click(toggle)
    await waitFor(() => expect(toggle.getAttribute("aria-checked")).toBe("true"))

    const results = await axe(container)
    
    expect(results).toHaveNoViolations()
  })
})
