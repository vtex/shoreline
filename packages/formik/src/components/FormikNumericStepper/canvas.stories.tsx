import React, { useEffect, useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Box, Button, Flex, Set, Text } from '@vtex/admin-ui'
import * as Yup from 'yup'
import { useIntl, IntlProvider } from 'react-intl'

import { FormikNumericStepper } from './index'
import type { FormikNumericStepperProps } from './index'

export default {
  title: 'admin-formik/FormikNumericStepper',
  component: FormikNumericStepper,
} as Meta

export const Playground: Story<FormikNumericStepperProps> = (args) => {
  type FormValuesInterface = { [key: string]: number }
  const initialValues: FormValuesInterface = { [args.name]: 0 }

  const schemaValidation = Yup.object({
    [args.name]: Yup.number()
      .notOneOf([2], 'This field can not be 2')
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
                <FormikNumericStepper {...args} />
              </Box>
              <Button
                variant="secondary"
                type="reset"
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
              <Button type="submit">Save</Button>
              <Text
                variant="detail"
                tone="secondary"
                csx={{ marginBottom: 3, textAlign: 'center' }}
              >
                Set the current value as initial value
              </Text>
              <Button
                variant="secondary"
                onClick={() => setCurrentInitialValues({ [args.name]: 10 })}
              >
                Set initial values
              </Button>
              <Text
                variant="detail"
                tone="secondary"
                csx={{ marginBottom: 3, textAlign: 'center' }}
              >
                Set "10" as new initial value
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
  helperText: 'Helper Text',
  maxValue: 10,
}

export const Basic = () => {
  type FormValuesInterface = { value: number }
  const initialValues: FormValuesInterface = { value: 0 }

  const handleSubmit = (
    _values: FormValuesInterface,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form id="form-admin-formik-input">
          <Flex direction="row" align="center" justify="start">
            <Box csx={{ width: 300, marginX: 8 }}>
              <FormikNumericStepper
                name="value"
                label="Label"
                helperText="Helper Text"
              />
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

export const ErrorMessage = () => {
  type FormValuesInterface = { value: number }

  const schemaValidationError = Yup.object({
    value: Yup.number()
      .equals([2], 'This field must have a value of 2')
      .required('This field is required.'),
  })

  const handleSubmit = (
    _values: FormValuesInterface,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{ value: 2 }}
      validationSchema={schemaValidationError}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form id="form-admin-formik-input">
          <Box csx={{ width: 300 }}>
            <FormikNumericStepper
              name="value"
              label="Label"
              helperText="Change de value to different of 2 to appear the error"
            />
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
}

export const ErrorLimit = () => {
  const maxValue = 4

  type FormValuesInterface = { value: number }

  const schemaValidationError = Yup.object({
    value: Yup.number()
      .max(maxValue, `This field cannot have a value greater than ${maxValue}`)
      .required('This field is required.'),
  })

  const handleSubmit = (
    _values: FormValuesInterface,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{ value: 0 }}
      validationSchema={schemaValidationError}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, setFieldTouched }) => (
        <Form id="form-admin-formik-input">
          <Set spacing={8} css={{ marginBottom: 8 }}>
            <Box>
              <FormikNumericStepper
                name="value"
                label="Label"
                maxValue={maxValue}
                helperText={`Max value is ${maxValue}`}
              />
            </Box>
            <Set orientation="vertical" spacing={1}>
              <Button
                onClick={() => {
                  setFieldValue('value', maxValue + 1)
                  setFieldTouched('value', true)
                }}
              >
                Change value
              </Button>
              <Text tone="secondary">Try change value to {maxValue + 1}</Text>
            </Set>
          </Set>
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
}

export const WithIntl = () => {
  const messagesEN = {
    'admin/admin-formik.error.message': 'This field must have a value of 2',
  }

  const Content = () => {
    const { formatMessage } = useIntl()

    type FormValuesInterface = { value: number }

    const schemaValidationError = Yup.object({
      value: Yup.number().equals([2], 'admin/admin-formik.error.message'),
    })

    const handleSubmit = (
      _values: FormValuesInterface,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
      setSubmitting(false) // Lock the form to not be modified
    }

    return (
      <Formik
        enableReinitialize
        initialValues={{ value: 2 }}
        validationSchema={schemaValidationError}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form id="form-admin-formik-input">
            <Box csx={{ width: 300 }}>
              <FormikNumericStepper
                name="value"
                label="Label"
                helperText="Change de value to different of 2 to appear the error"
                formatMessage={(errorCode) => formatMessage({ id: errorCode })}
              />
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
  }

  return (
    <IntlProvider locale="en" messages={messagesEN}>
      <Content />
    </IntlProvider>
  )
}

export const ChangeValueOutside = () => {
  type FormValuesInterface = { value: number }
  const initialValues: FormValuesInterface = { value: 0 }

  const handleSubmit = (
    _values: FormValuesInterface,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form id="form-admin-formik-input">
          <Flex direction="row" align="center" justify="start">
            <Box csx={{ width: 300, marginX: 8 }}>
              <Box csx={{ marginBottom: 5 }}>
                <FormikNumericStepper name="value" label="Label" />
              </Box>
              <Button
                onClick={() =>
                  setFieldValue('value', Math.trunc(Math.random() * 10))
                }
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

export const ChangeInitialValue = () => {
  type FormValuesInterface = { value: number }
  const initialValues: FormValuesInterface = { value: 0 }

  const [currentInitialValues, setCurrentInitialValues] =
    useState<FormValuesInterface>(initialValues)

  const handleSubmit = (
    _values: FormValuesInterface,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <Formik
      enableReinitialize
      initialValues={currentInitialValues}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form id="form-admin-formik-input">
          <Flex direction="row" align="center" justify="start">
            <Box csx={{ width: 300, marginX: 8 }}>
              <Box csx={{ marginBottom: 5 }}>
                <FormikNumericStepper name="value" label="Label" />
              </Box>
              <Flex direction="column">
                <Button
                  onClick={() =>
                    setCurrentInitialValues({
                      value: Math.trunc(Math.random() * 10),
                    })
                  }
                >
                  Change initial value
                </Button>
                <Text
                  variant="detail"
                  tone="secondary"
                  csx={{ marginBottom: 3, textAlign: 'center' }}
                >
                  When the initial value changes the form is restarted
                </Text>
              </Flex>
            </Box>
            <Set orientation="vertical" csx={{ marginX: 8 }}>
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
          </Flex>
        </Form>
      )}
    </Formik>
  )
}

export const OnChangeExample = () => {
  type FormValuesInterface = { value: number }
  const initialValues: FormValuesInterface = { value: 0 }
  const [changes, setChanges] = useState(0)

  const handleSubmit = (
    _values: FormValuesInterface,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form id="form-admin-formik-input">
        <Flex direction="row" align="center" justify="start">
          <Box csx={{ width: 300, marginX: 8 }}>
            <FormikNumericStepper
              name="value"
              label="Label"
              onChange={() => setChanges(changes + 1)}
            />
          </Box>
          <Set orientation="vertical">
            <Text variant="title2">
              Number of times the value has changed: {` ${changes}`}
            </Text>
          </Set>
        </Flex>
      </Form>
    </Formik>
  )
}
