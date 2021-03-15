import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ThemeProvider } from '@vtex/admin-core'
import { IntlProvider } from 'react-intl'
import { Form, Formik } from 'formik'
import { FormikRadio, FormikRadioGroup } from './index'
import { Button, Label } from '@vtex/admin-ui';

describe('Radio and RadioGroup tests', () => {
  it('change value in formik by input component', async () => {
    const handleSubmit = jest.fn()
    const options = ['option 1', 'option 2', 'option 3', 'error']

    render( 
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            initialValues={{value: ''}}
            onSubmit={handleSubmit}
          >
              <Form id='form-admin-formik-input'>
                <FormikRadioGroup
                  name="value"
                  label="Label Title"
                  aria-label="label-title"
                >
                  {options.map((value, key) => {
                    return (
                      <Label key={key}>
                        <FormikRadio
                          value={value}
                        />
                        {value}
                      </Label>
                    )
                  })}
                </FormikRadioGroup>
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )
    userEvent.click(screen.getByDisplayValue(options[2]))

    userEvent.click(screen.getByRole('button', {name: "Submit"}))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        value: options[2]
      }, expect.anything())
    )
  })

  it('change value in formik by setFieldValue', async () => {
    const handleSubmit = jest.fn()
    const options = ['option 1', 'option 2', 'option 3', 'error']

    render(
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            initialValues={{value: ''}}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form id='form-admin-formik-input'>
                <FormikRadioGroup
                  name="value"
                  label="Label Title"
                  aria-label="label-title"
                >
                  {options.map((value, key) => {
                    return (
                      <Label key={key}>
                        <FormikRadio
                          value={value}
                        />
                        {value}
                      </Label>
                    )
                  })}
                </FormikRadioGroup>
                <Button 
                  size='small' 
                  children="Change Value" 
                  onClick={()=> setFieldValue("value", options[0])}
                />
                <Button type="submit" size='small' children="Submit"/>
              </Form>
            )}
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )

    const option2 = screen.getByDisplayValue(options[2])
    userEvent.click(option2)
    await waitFor(() => expect(option2.getAttribute("aria-checked")).toBe("true"))

    userEvent.click(screen.getByRole('button', {name: "Change Value"}))
    await waitFor(() => expect(option2.getAttribute("aria-checked")).toBe("false"))
    await waitFor(() => expect(screen.getByDisplayValue(options[0]).getAttribute("aria-checked")).toBe("true"))

    userEvent.click(screen.getByRole('button', {name: "Submit"}))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        value: options[0]
      }, expect.anything())
    )
  })

  it('change initial value in formik', async () => {
    const handleSubmit = jest.fn()
    const options = ['option 1', 'option 2', 'option 3', 'error']

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
                <FormikRadioGroup
                  name="value"
                  label="Label Title"
                  aria-label="label-title"
                >
                  {options.map((value, key) => {
                    return (
                      <Label key={key}>
                        <FormikRadio
                          value={value}
                        />
                        {value}
                      </Label>
                    )
                  })}
                </FormikRadioGroup>
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )

    const option2 = screen.getByDisplayValue(options[2])
    userEvent.click(option2)
    await waitFor(() => expect(option2.getAttribute("aria-checked")).toBe("true"))

    rerender(
      <ThemeProvider>
        <IntlProvider locale={'en'}>
          <Formik
            enableReinitialize
            initialValues={{value: options[0]}}
            onSubmit={handleSubmit}
            >
              <Form id='form-admin-formik-input'>
                <FormikRadioGroup
                  name="value"
                  label="Label Title"
                  aria-label="label-title"
                >
                  {options.map((value, key) => {
                    return (
                      <Label key={key}>
                        <FormikRadio
                          value={value}
                        />
                        {value}
                      </Label>
                    )
                  })}
                </FormikRadioGroup>
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )

    await waitFor(() => expect(option2.getAttribute("aria-checked")).toBe("false"))
    await waitFor(() => expect(screen.getByDisplayValue(options[0]).getAttribute("aria-checked")).toBe("true"))

  })

  it('error in forms', async () => {
    const handleSubmit = jest.fn()
    const options = ['option 1', 'option 2', 'option 3', 'error']
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
                <FormikRadioGroup
                  name="value"
                  label="Label Title"
                  aria-label="label-title"
                >
                  {options.map((value, key) => {
                    return (
                      <Label key={key}>
                        <FormikRadio
                          value={value}
                        />
                        {value}
                      </Label>
                    )
                  })}
                </FormikRadioGroup>
                <Button type="submit" size='small' children="Submit"/>
              </Form>
          </Formik>
        </IntlProvider> 
      </ThemeProvider>
    )

    const error = screen.getByDisplayValue(options[3])
    userEvent.click(error)
    await waitFor(() => expect(error.getAttribute("aria-checked")).toBe("true"))

    expect(await screen.findByText("Error message")).not.toBeNull();
  })
})
