import React from 'react'
import userEvent from '@testing-library/user-event'
import { Form, Formik } from 'formik'
import { Button } from '@vtex/admin-ui'

import { FormikSelect } from './index'
import { render, screen, waitFor } from '../../test-utils'

const options = ['option 1', 'option 2', 'option 3', 'error']

const optNodes = options.map((value) => (
  <option value={value} data-testid={value} key={value}>
    {value}
  </option>
))

const sharedProps = {
  name: 'value',
  children: <>{optNodes}</>,
  'data-testid': 'select',
  label: 'Select label',
}

describe('FormikSelect', () => {
  it('change value in formik by input component', async () => {
    const handleSubmit = jest.fn()

    render(
      <Formik initialValues={{ value: '' }} onSubmit={handleSubmit}>
        <Form id="form-admin-formik-input">
          <FormikSelect {...sharedProps} />
          <Button type="submit" children="Submit" />
        </Form>
      </Formik>
    )

    userEvent.selectOptions(screen.getByTestId('select'), options[0])
    userEvent.click(screen.getByRole('button'))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          value: options[0],
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
            <FormikSelect {...sharedProps} />
            <Button
              data-testid="set-button"
              children="Change Value"
              onClick={() => setFieldValue('value', options[0])}
            />
            <Button type="submit" children="Submit" />
          </Form>
        )}
      </Formik>
    )

    const select = screen.getByTestId('select')
    const setButton = screen.getByTestId('set-button')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    userEvent.selectOptions(select, options[1])
    userEvent.click(setButton)

    expect(screen.getByTestId('select')).toHaveTextContent(options[0])

    userEvent.click(submitButton)

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          value: options[0],
        },
        expect.anything()
      )
    )
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
          <FormikSelect {...sharedProps} />
          <Button type="submit" children="Submit" />
        </Form>
      </Formik>
    )

    const select = screen.getByTestId('select')

    userEvent.selectOptions(select, options[2])

    expect(await screen.findByText('Error message')).not.toBeNull()
  })
})
