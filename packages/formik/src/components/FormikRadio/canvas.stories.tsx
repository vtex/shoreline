import React, { useEffect, useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Box, Button, Flex, Label, Set, Text } from '@vtex/admin-ui'
import * as Yup from 'yup'
import { useIntl, IntlProvider } from 'react-intl'

import { FormikRadio, FormikRadioGroup } from './index'
import type { FormikRadioGroupProps } from './index'

export default {
  title: 'admin-formik/FormikRadioGroup',
  component: FormikRadioGroup,
} as Meta

export const Playground: Story<FormikRadioGroupProps> = (args) => {
  const options = ['option 1', 'option 2', 'option 3', 'error', 'Disabled']

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
            <Flex
              direction={args.orientation === 'vertical' ? 'row' : 'column'}
              justify="center"
              csx={{ marginX: 8 }}
            >
              <Box
                csx={{
                  width: args.orientation === 'vertical' ? 200 : 600,
                  marginBottom: 3,
                }}
              >
                <FormikRadioGroup {...args}>
                  {options.map((value, key) => {
                    return (
                      <Label key={key}>
                        <FormikRadio
                          value={value}
                          disabled={value === 'Disabled'}
                        />
                        {value}
                      </Label>
                    )
                  })}
                </FormikRadioGroup>
              </Box>
              <Flex
                direction={args.orientation === 'vertical' ? 'column' : 'row'}
              >
                <Flex
                  direction="column"
                  justify="center"
                  csx={{
                    marginRight: 4,
                    maxWidth: args.orientation === 'vertical' ? 'auto' : 150,
                  }}
                >
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
                </Flex>
                <Flex
                  direction="column"
                  justify="center"
                  csx={{
                    marginRight: 4,
                    maxWidth: args.orientation === 'vertical' ? 'auto' : 150,
                  }}
                >
                  <Button type="submit">Save</Button>
                  <Text
                    variant="detail"
                    tone="secondary"
                    csx={{ marginBottom: 3, textAlign: 'center' }}
                  >
                    Set the current value as initial value
                  </Text>
                </Flex>
                <Flex
                  direction="column"
                  justify="center"
                  csx={{
                    marginRight: 4,
                    maxWidth: args.orientation === 'vertical' ? 'auto' : 150,
                  }}
                >
                  <Button
                    variant="secondary"
                    onClick={() =>
                      setCurrentInitialValues({ [args.name]: options[1] })
                    }
                  >
                    Set initial values
                  </Button>
                  <Text
                    variant="detail"
                    tone="secondary"
                    csx={{ marginBottom: 3, textAlign: 'center' }}
                  >
                    Set "{options[1]}" as new initial value
                  </Text>
                </Flex>
              </Flex>
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
  label: 'Label Title',
  name: 'value',
}

export const Basic = () => {
  const options = ['option 1', 'option 2', 'option 3', 'Disabled']

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
              <FormikRadioGroup
                name="value"
                label="Label Title"
                orientation="vertical"
              >
                {options.map((value, key) => {
                  return (
                    <Label key={key}>
                      <FormikRadio
                        value={value}
                        disabled={value === 'Disabled'}
                      />
                      {value}
                    </Label>
                  )
                })}
              </FormikRadioGroup>
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
  const options = ['error 1', 'error 2', 'error 3', 'error 4']

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
          <Box>
            <FormikRadioGroup name="value" label="Label Title">
              {options.map((value, key) => {
                return (
                  <Label key={key}>
                    <FormikRadio
                      value={value}
                      disabled={value === 'Disabled'}
                    />
                    {value}
                  </Label>
                )
              })}
            </FormikRadioGroup>
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
    'admin/admin-formik.error.required': 'This field is required.',
    'admin/admin-formik.error.message': 'Error message',
  }

  const Content = () => {
    const { formatMessage } = useIntl()
    const options = ['error 1', 'error 2', 'error 3', 'error 4']

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
      <IntlProvider locale="en" messages={messagesEN}>
        <Formik
          enableReinitialize
          initialValues={{ value: 'error' }}
          validationSchema={schemaValidationError}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form id="form-admin-formik-input">
              <Box>
                <FormikRadioGroup
                  name="value"
                  label="Label Title"
                  formatMessage={(errorCode) =>
                    formatMessage({ id: errorCode })
                  }
                >
                  {options.map((value, key) => {
                    return (
                      <Label key={key}>
                        <FormikRadio
                          value={value}
                          disabled={value === 'Disabled'}
                        />
                        {value}
                      </Label>
                    )
                  })}
                </FormikRadioGroup>
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
      </IntlProvider>
    )
  }

  return (
    <IntlProvider locale="en" messages={messagesEN}>
      <Content />
    </IntlProvider>
  )
}

export const ChangeValueOutside = () => {
  const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5']

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
            <Box csx={{ width: 200, marginX: 8 }}>
              <FormikRadioGroup
                name="value"
                label="Label Title"
                orientation="vertical"
              >
                {options.map((value, key) => {
                  return (
                    <Label key={key}>
                      <FormikRadio
                        value={value}
                        disabled={value === 'Disabled'}
                      />
                      {value}
                    </Label>
                  )
                })}
              </FormikRadioGroup>
            </Box>
            <Button
              onClick={() =>
                setFieldValue(
                  'value',
                  options[Math.floor(Math.random() * options.length)]
                )
              }
              csx={{ marginX: 8 }}
            >
              Change value
            </Button>
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
  const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5']

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
            <Box csx={{ width: 200, marginX: 8 }}>
              <FormikRadioGroup
                name="value"
                label="Label Title"
                orientation="vertical"
              >
                {options.map((value, key) => {
                  return (
                    <Label key={key}>
                      <FormikRadio
                        value={value}
                        disabled={value === 'Disabled'}
                      />
                      {value}
                    </Label>
                  )
                })}
              </FormikRadioGroup>
            </Box>
            <Flex direction="column">
              <Button
                onClick={() =>
                  setCurrentInitialValues({
                    value: options[Math.floor(Math.random() * options.length)],
                  })
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
  const options = ['option 1', 'option 2', 'option 3', 'Disabled']

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
            <FormikRadioGroup
              name="value"
              label="Label Title"
              orientation="vertical"
              onChange={() => setChanges(changes + 1)}
            >
              {options.map((value, key) => {
                return (
                  <Label key={key}>
                    <FormikRadio
                      value={value}
                      disabled={value === 'Disabled'}
                    />
                    {value}
                  </Label>
                )
              })}
            </FormikRadioGroup>
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
