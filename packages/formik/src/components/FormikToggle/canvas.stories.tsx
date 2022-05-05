import React, { useEffect, useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Box, Button, Flex, Set, Text } from '@vtex/admin-ui'
import * as Yup from 'yup'
import { IntlProvider, useIntl } from 'react-intl'

import { FormikToggle } from './index'
import type { FormikToggleProps } from './index'

export default {
  title: 'admin-formik/FormikToggle',
  component: FormikToggle,
} as Meta

export const Playground: Story<FormikToggleProps> = (args) => {
  type FormValuesInterface = { [key: string]: boolean }
  const initialValues: FormValuesInterface = { [args.name]: false }

  const schemaValidation = Yup.object({
    [args.name]: Yup.bool().isTrue('Error message'),
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
                <FormikToggle {...args} />
              </Box>
              <Button
                variant="secondary"
                type="reset"
                size="normal"
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
              <Button type="submit" size="normal">
                Save
              </Button>
              <Text
                variant="detail"
                tone="secondary"
                csx={{ marginBottom: 3, textAlign: 'center' }}
              >
                Set the current value as initial value
              </Text>
              <Button
                variant="secondary"
                size="normal"
                onClick={() =>
                  setCurrentInitialValues({ [args.name]: !values.value })
                }
              >
                Set initial values
              </Button>
              <Text
                variant="detail"
                tone="secondary"
                csx={{ marginBottom: 3, textAlign: 'center' }}
              >
                {`Set "${!values.value}" as new initial value`}
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
}

export const Basic = () => {
  type FormValuesInterface = { value: boolean }
  const initialValues: FormValuesInterface = { value: false }

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
              <FormikToggle name="value" label="Label" />
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

export const Error = () => {
  type FormValuesInterface = { value: boolean }

  const schemaValidationError = Yup.object({
    value: Yup.bool().isFalse('Error message'),
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
      initialValues={{ value: true }}
      validationSchema={schemaValidationError}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form id="form-admin-formik-input">
          <Box csx={{ width: 300 }}>
            <FormikToggle name="value" label="Label" />
            <Text
              tone="info"
              children="Change the value to true and click outside to appear the error"
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

export const WithIntl = () => {
  const messagesEN = {
    'admin/admin-formik.error.message': 'Error message',
  }

  const Content = () => {
    const { formatMessage } = useIntl()

    type FormValuesInterface = { value: boolean }
    const schemaValidationError = Yup.object({
      value: Yup.bool().isFalse('admin/admin-formik.error.message'),
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
        initialValues={{ value: true }}
        validationSchema={schemaValidationError}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form id="form-admin-formik-input">
            <Box csx={{ width: 300 }}>
              <FormikToggle
                name="value"
                label="Label"
                formatMessage={(errorCode) => formatMessage({ id: errorCode })}
              />
              <Text
                tone="info"
                children="Change the value to true to appear the error"
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
  type FormValuesInterface = { value: boolean }
  const initialValues: FormValuesInterface = { value: false }

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
              <FormikToggle name="value" label="Label" />
              <Button
                onClick={() => setFieldValue('value', !values.value)}
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

export const ChangeInitialValue = () => {
  type FormValuesInterface = { value: boolean }
  const initialValues: FormValuesInterface = { value: false }

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
      {({ values, initialValues }) => (
        <Form id="form-admin-formik-input">
          <Flex direction="row" align="center" justify="start">
            <Box csx={{ width: 300, marginX: 8 }}>
              <FormikToggle name="value" label="Label" />
              <Flex direction="column">
                <Button
                  onClick={() =>
                    setCurrentInitialValues({ value: !initialValues.value })
                  }
                  csx={{ marginY: 2 }}
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
  type FormValuesInterface = { value: boolean }
  const initialValues: FormValuesInterface = { value: false }
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
            <FormikToggle
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
