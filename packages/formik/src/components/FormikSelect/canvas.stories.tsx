import React, { useEffect, useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Box, Button, Flex, Set, Text } from '@vtex/admin-ui'
import * as Yup from 'yup'

import { FormikSelect } from './index'
import type { FormikSelectProps } from './index'

export default {
  title: 'admin-formik/FormikSelect',
  component: FormikSelect,
} as Meta

export const Playground: Story<FormikSelectProps> = (args) => {
  type FormValuesInterface = { [key: string]: string }
  const initialValues: FormValuesInterface = { [args.name]: '' }

  const schemaValidation = Yup.object({
    [args.name]: Yup.string()
      .notOneOf(['error'], 'Error message')
      .required('This field is required.'),
  })

  const [currentInitialValues, setCurrentInitialValues] =
    useState<FormValuesInterface>(initialValues)

  const handleSubmit = (
    values: FormValuesInterface,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true) // Lock the form to not be modified
    setCurrentInitialValues(values)
    setSubmitting(false) // Lock the form to not be modified
  }

  useEffect(() => {
    const value = Object.values(currentInitialValues)[0]

    setCurrentInitialValues({ [args.name]: value })
  }, [args.name])

  return (
    <Formik
      enableReinitialize
      initialValues={currentInitialValues}
      validationSchema={schemaValidation}
      onSubmit={handleSubmit}
    >
      {({ resetForm, values, dirty }) => (
        <Form id="form-admin-formik-input">
          <Flex direction="row" align="center" justify="start">
            <Flex direction="column" justify="center" csx={{ marginX: 8 }}>
              <Box csx={{ width: 300, marginBottom: 3 }}>
                <FormikSelect {...args} />
              </Box>
              <Button
                variant="secondary"
                type="reset"
                size="small"
                onClick={() => resetForm()}
                disabled={!dirty}
              >
                Reset Forms
              </Button>
              <Text
                variant="detail"
                tone="secondary"
                csx={{ marginBottom: 3, textAlign: 'center' }}
              >
                Change values in formik to current initial values
              </Text>
              <Button type="submit" size="small">
                Save
              </Button>
              <Text
                variant="detail"
                tone="secondary"
                csx={{ marginBottom: 3, textAlign: 'center' }}
              >
                Set the current value as initial value
              </Text>
              <Button variant="secondary" size="small">
                Set initial values
              </Button>
              <Text
                variant="detail"
                tone="secondary"
                csx={{ marginBottom: 3, textAlign: 'center' }}
              >
                {/* Set "{args.items[1]}" as new initial value */}
              </Text>
            </Flex>
            <Set orientation="vertical" spacing={4}>
              <Set orientation="vertical">
                <Text variant="title2">Current value in formik :</Text>
                <Text tone="secondary">
                  <pre>{JSON.stringify(values)}</pre>
                </Text>
              </Set>
              <Set orientation="vertical">
                <Text variant="title2">Current initial value in formik:</Text>
                <Text tone="secondary">
                  <pre>{JSON.stringify(currentInitialValues)}</pre>
                </Text>
              </Set>
            </Set>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}

Playground.args = {
  label: 'Label',
  name: 'value',
  children: (
    <>
      <option value="option 1">option 1</option>
      <option value="option 2">option 2</option>
      <option value="option 3">option 3</option>
      <option value="error">error</option>
    </>
  ),
}

export const Basic = () => (
  <Formik
    initialValues={{
      theme: 'a11y-light',
    }}
    onSubmit={(values) =>
      console.log({
        values,
      })
    }
  >
    {({ values }) => (
      <Form id="form-admin-formik-input">
        <Flex direction="row" align="center" justify="start">
          <Box csx={{ width: 300, marginX: 8 }}>
            <FormikSelect name="theme" label="Theme">
              <option value="a11y-light">a11y light</option>
              <option value="a11y-dark">a11y dark</option>
              <option value="light">light</option>
              <option value="dark">dark</option>
            </FormikSelect>
          </Box>
          <Set orientation="vertical">
            <Text variant="title2">Current value in formik :</Text>
            <Text tone="secondary">
              <pre>{JSON.stringify(values)}</pre>
            </Text>
          </Set>
        </Flex>
      </Form>
    )}
  </Formik>
)

export const Error = () => (
  <Formik
    enableReinitialize
    initialValues={{ value: 'error' }}
    validationSchema={Yup.object({
      value: Yup.string()
        .equals([''], 'Error message')
        .required('This field is required.'),
    })}
    onSubmit={(values) => console.log({ values })}
  >
    {({ values }) => (
      <Form id="form-admin-formik-input">
        <Box csx={{ width: 300 }}>
          <FormikSelect
            name="value"
            label="Label"
            helperText="Change de value in select to appear the error"
          >
            <option value="error 1">error 1</option>
            <option value="error 2">error 2</option>
            <option value="error 3">error 3</option>
            <option value="error">error</option>
          </FormikSelect>
        </Box>
        <Set>
          <Text variant="title2">Current value in formik :</Text>
          <Text tone="secondary">
            <pre>{JSON.stringify(values)}</pre>
          </Text>
        </Set>
      </Form>
    )}
  </Formik>
)

export const ChangeValueOutside = () => {
  const options = [
    'option 1',
    'option 2',
    'option 3',
    'option 4',
    'option 5',
    'option 6',
    'option 7',
  ]

  return (
    <Formik
      initialValues={{ value: '' }}
      onSubmit={(values) => console.log({ values })}
    >
      {({ values, setFieldValue }) => (
        <Form id="form-admin-formik-input">
          <Flex direction="row" align="center" justify="start">
            <Box csx={{ width: 300, marginX: 8 }}>
              <FormikSelect name="value" label="Label">
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </FormikSelect>
              <Button
                onClick={() =>
                  setFieldValue(
                    'value',
                    options[Math.floor(Math.random() * options.length)]
                  )
                }
                csx={{ marginY: 2 }}
              >
                Change value
              </Button>
            </Box>
            <Set orientation="vertical">
              <Text variant="title2">Current value in formik :</Text>
              <Text tone="secondary">
                <pre>{JSON.stringify(values)}</pre>
              </Text>
            </Set>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
