import React, { useEffect, useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Box, Button, Flex, Set, Text } from '@vtex/admin-ui'
import * as Yup from 'yup'
import { useIntl, IntlProvider } from 'react-intl'

import { FormikSelect } from './index'
import type { FormikSelectProps } from './index'

export default {
  title: 'admin-formik/FormikSelect',
  component: FormikSelect,
} as Meta

export const Playground: Story<FormikSelectProps<string>> = (args) => {
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
                variant="small"
                tone="muted"
                csx={{ marginBottom: 3, textAlign: 'center' }}
              >
                Change values in formik to current initial values
              </Text>
              <Button type="submit" size="small">
                Save
              </Button>
              <Text
                variant="small"
                tone="muted"
                csx={{ marginBottom: 3, textAlign: 'center' }}
              >
                Set the current value as initial value
              </Text>
              <Button
                variant="secondary"
                size="small"
                onClick={() =>
                  setCurrentInitialValues({ [args.name]: args.items[1] })
                }
              >
                Set initial values
              </Button>
              <Text
                variant="small"
                tone="muted"
                csx={{ marginBottom: 3, textAlign: 'center' }}
              >
                Set "{args.items[1]}" as new initial value
              </Text>
            </Flex>
            <Set orientation="vertical" spacing={4}>
              <Set orientation="vertical">
                <Text variant="subtitle">Current value in formik :</Text>
                <Text tone="muted">
                  <pre>{JSON.stringify(values)}</pre>
                </Text>
              </Set>
              <Set orientation="vertical">
                <Text variant="subtitle">Current initial value in formik:</Text>
                <Text tone="muted">
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
  items: ['option 1', 'option 2', 'option 3', 'error'],
}

export const Basic = () => {
  const options = ['option 1', 'option 2', 'option 3']

  type FormValuesInterface = { value: string }
  const initialValues: FormValuesInterface = { value: '' }

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
              <FormikSelect name="value" label="Label" items={options} />
            </Box>
            <Set orientation="vertical">
              <Text variant="subtitle">Current value in formik :</Text>
              <Text tone="muted">
                <pre>{JSON.stringify(values)}</pre>
              </Text>
            </Set>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}

export const WithObjectList = () => {
  const options = [
    { id: 'option-1', label: 'Option 1' },
    { id: 'option-2', label: 'Option 2' },
    { id: 'option-3', label: 'Option 3' },
    { id: 'option-error', label: 'Invalid Option' },
  ]

  type FormValuesInterface = { value: { id: string; label: string } }
  const schemaValidationError = Yup.object({
    value: Yup.object({
      id: Yup.string()
        .notOneOf(['option-error'], 'Error message')
        .required('This field is required.'),
      label: Yup.string(),
    }),
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
      initialValues={{ value: { id: '', label: '' } }}
      validationSchema={schemaValidationError}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form id="form-admin-formik-input">
          <Box csx={{ width: 300 }}>
            <FormikSelect
              name="value"
              label="Label"
              items={options}
              itemToString={(item) => (item ? item.label : '')}
              renderItem={(item) => (item ? item.label : '')}
            />
          </Box>
          <Set>
            <Text variant="subtitle">Current value in formik :</Text>
            <Text tone="muted">
              <pre>{JSON.stringify(values)}</pre>
            </Text>
          </Set>
        </Form>
      )}
    </Formik>
  )
}

export const Error = () => {
  const options = ['error 1', 'error 2', 'error 3', 'error']

  type FormValuesInterface = { value: string }

  const schemaValidationError = Yup.object({
    value: Yup.string()
      .equals([''], 'Error message')
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
      initialValues={{ value: 'error' }}
      validationSchema={schemaValidationError}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form id="form-admin-formik-input">
          <Box csx={{ width: 300 }}>
            <FormikSelect
              name="value"
              label="Label"
              helperText="Change de value in select to appear the error"
              items={options}
            />
          </Box>
          <Set>
            <Text variant="subtitle">Current value in formik :</Text>
            <Text tone="muted">
              <pre>{JSON.stringify(values)}</pre>
            </Text>
          </Set>
        </Form>
      )}
    </Formik>
  )
}

export const WithIntl = () => {
  const options = ['error 1', 'error 2', 'error 3', 'error']
  const messagesEN = {
    'admin/admin-formik.error.required': 'This field is required.',
    'admin/admin-formik.error.message': 'Error message',
  }

  const Content = () => {
    const { formatMessage } = useIntl()

    type FormValuesInterface = { value: string }
    const schemaValidationError = Yup.object({
      value: Yup.string()
        .equals([''], 'admin/admin-formik.error.message')
        .required('admin/admin-formik.error.required'),
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
        initialValues={{ value: 'error' }}
        validationSchema={schemaValidationError}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form id="form-admin-formik-input">
            <Box csx={{ width: 300 }}>
              <FormikSelect
                name="value"
                label="Label"
                helperText="Change de value in select to appear the error"
                items={options}
                formatMessage={(errorCode) => formatMessage({ id: errorCode })}
              />
            </Box>
            <Set>
              <Text variant="subtitle">Current value in formik :</Text>
              <Text tone="muted">
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
  const options = [
    'option 1',
    'option 2',
    'option 3',
    'option 4',
    'option 5',
    'option 6',
    'option 7',
  ]

  type FormValuesInterface = { value: string }
  const initialValues: FormValuesInterface = { value: '' }

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
              <FormikSelect name="value" label="Label" items={options} />
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
              <Text variant="subtitle">Current value in formik :</Text>
              <Text tone="muted">
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
  const options = [
    'option 1',
    'option 2',
    'option 3',
    'option 4',
    'option 5',
    'option 6',
    'option 7',
  ]

  type FormValuesInterface = { value: string }
  const initialValues: FormValuesInterface = { value: '' }

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
              <FormikSelect name="value" label="Label" items={options} />
              <Flex direction="column">
                <Button
                  onClick={() =>
                    setCurrentInitialValues({
                      value:
                        options[Math.floor(Math.random() * options.length)],
                    })
                  }
                  csx={{ marginY: 2 }}
                >
                  Change initial value
                </Button>
                <Text
                  variant="small"
                  tone="muted"
                  csx={{ marginBottom: 3, textAlign: 'center' }}
                >
                  When the initial value changes the form is restarted
                </Text>
              </Flex>
            </Box>
            <Set orientation="vertical" csx={{ marginX: 8 }}>
              <Text variant="subtitle">Current value in formik :</Text>
              <Text tone="muted">
                <pre>{JSON.stringify(values)}</pre>
              </Text>
            </Set>
            <Set orientation="vertical">
              <Text variant="subtitle">Current initial value in formik:</Text>
              <Text tone="muted">
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
  const options = ['option 1', 'option 2', 'option 3']

  type FormValuesInterface = { value: string }
  const initialValues: FormValuesInterface = { value: '' }
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
            <FormikSelect
              name="value"
              label="Label"
              items={options}
              onChange={() => setChanges(changes + 1)}
            />
          </Box>
          <Set orientation="vertical">
            <Text variant="subtitle">
              Number of times the value has changed: {` ${changes}`}
            </Text>
          </Set>
        </Flex>
      </Form>
    </Formik>
  )
}
