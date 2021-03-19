import React, { useEffect, useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { FormikNumericStepper, FormikNumericStepperProps } from './index'
import { Form, Formik } from 'formik'
import { Box, Button, Flex, Set, Text } from '@vtex/admin-ui'
import * as Yup from 'yup'
import { defineMessages, IntlProvider } from 'react-intl'

export default {
  title: 'admin-formik/FormikNumericStepper',
  component: FormikNumericStepper,
} as Meta

export const Playground: Story<FormikNumericStepperProps> = (args) => {
  type FormValuesInterface = { [ key: string ]: number;}
  const initialValues: FormValuesInterface = { [args.name]: 0 }
  const messages = defineMessages({
    errorRequired: {
      id: 'admin/admin-formik.error.required',
      defaultMessage: "This field is required.",
    },
    errorMax: {
      id: 'admin/admin-formik.error.max',
      defaultMessage: "The max value is 10",
    },
  })
  const messagesEN = {
    'admin/admin-formik.error.required': "This field is required.",
    'admin/admin-formik.error.max': "The need to be different to 2",
  }
  
  const schemaValidation = Yup.object({[args.name]: Yup.number().notOneOf([2],messages.errorMax.id).required(messages.errorRequired.id) })

  const [courentInicialValues, setCourentInicialValues] = useState<FormValuesInterface>(initialValues)

  const handleSubmit = (
    values: FormValuesInterface, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}
  ) => {
    setSubmitting(true) // Lock the form to not be modified
    setCourentInicialValues(values)
    setSubmitting(false) // Lock the form to not be modified
  }

  useEffect(()=>{
    let value = Object.values(courentInicialValues)[0]
    setCourentInicialValues( { [args.name]: value } )
  }, [args.name])

  return (
    <IntlProvider locale={'en'} messages={messagesEN}>
      <Formik
        enableReinitialize
        initialValues={courentInicialValues}
        validationSchema={schemaValidation}
        onSubmit={handleSubmit}
      >
        {({ resetForm, values, dirty }) => (
          <Form id='form-admin-formik-input'>
            <Flex direction='row' align='center' justify='start'>
              <Flex direction='column' justify='center' csx={{marginX: 8}}>
                <Box csx={{ width: 300 , marginBottom: 3}}>
                  <FormikNumericStepper
                    {...args}
                  />
                </Box>
                <Button
                  variant="secondary"
                  type="reset"
                  size='small'
                  onClick={() => resetForm()}
                  disabled={!dirty}
                >
                  Reset Forms
                </Button>
                <Text 
                  variant='small' 
                  feedback='secondary' 
                  csx={{marginBottom: 3, textAlign: 'center'}}
                >
                  Change values in formik to current initial values
                </Text>
                <Button type="submit" size='small'>
                  Save
                </Button>
                <Text 
                  variant='small' 
                  feedback='secondary' 
                  csx={{marginBottom: 3, textAlign: 'center'}}
                >
                  Set the current value as initial value
                </Text>
                <Button 
                  variant='secondary' 
                  size='small'
                  onClick={() => setCourentInicialValues({[args.name]: 10})} 
                >
                  Set initial values
                </Button>
                <Text 
                  variant='small' 
                  feedback='secondary' 
                  csx={{marginBottom: 3, textAlign: 'center'}}
                >
                  Set "10" as new initial value
                </Text>
              </Flex>
              <Set orientation='vertical' spacing={4}>
                <Set orientation='vertical'>
                  <Text variant='subtitle'> 
                    Current value in formik : 
                  </Text>
                  <Text feedback='secondary'>
                    <pre>
                      {JSON.stringify(values)}
                    </pre> 
                  </Text>
                </Set>
                <Set orientation='vertical'>
                  <Text variant='subtitle'> 
                    Current initial value in formik: 
                  </Text>
                  <Text feedback='secondary'>
                    <pre>
                      {JSON.stringify(courentInicialValues)}
                    </pre>
                  </Text>
                </Set>
              </Set> 
            </Flex>
          </Form>
        )}
      </Formik> 
    </IntlProvider>
  )
}

Playground.args = {
  label: 'Label',
  name: 'value',
  helperText: "Helper Text",
  maxValue: 10,
}

export const Basic = () => {
  type FormValuesInterface = { value: number;}
  const initialValues: FormValuesInterface = { value: 0 }

  const handleSubmit = (
    _values: FormValuesInterface, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <IntlProvider locale={'en'}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
            <Form id='form-admin-formik-input'>
              <Flex direction='row' align='center' justify='start'>
                <Box csx={{ width: 300, marginX: 8 }}>
                  <FormikNumericStepper
                    name="value"
                    label="Label"
                    helperText="Helper Text"
                  />
                </Box>
                <Set orientation='vertical'>
                  <Text variant='subtitle'> 
                    Current value in formik : 
                  </Text>
                  <Text feedback='secondary'>
                    <pre>
                      {JSON.stringify(values)}
                    </pre> 
                  </Text>
                </Set>
              </Flex>
            </Form>
        )}
      </Formik>
    </IntlProvider>
  )
}

export const Error = () => {
  type FormValuesInterface = { value: number;}
  const messages = defineMessages({
    errorRequired: {
      id: 'admin/admin-formik.error.required',
      defaultMessage: "This field is required.",
    },
    errorMessage: {
      id: 'admin/admin-formik.error.message',
      defaultMessage: "Error message",
    },
  })
  const messagesEN = {
    'admin/admin-formik.error.required': "This field is required.",
    'admin/admin-formik.error.message': "Error message"
  }
  const schemaValidationError = Yup.object({ value: Yup.number()
    .max(2,messages.errorMessage.id)
    .required(messages.errorRequired.id)})
  
  const handleSubmit = (
    _values: FormValuesInterface, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <IntlProvider locale={'en'} messages={messagesEN}>
      <Formik
        enableReinitialize
        initialValues={{value: 2 }}
        validationSchema={schemaValidationError}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
            <Form id='form-admin-formik-input'>
              <Box csx={{ width: 300 }}>
                <FormikNumericStepper
                  name="value"
                  label="Label"
                  helperText="Change de value to more than 2 to appear the error"
                />
              </Box>
              <Set>
                <Text variant='subtitle'> 
                  Current value in formik : 
                </Text>
                <Text feedback='secondary'>
                  <pre>
                    {JSON.stringify(values)}
                  </pre> 
                </Text>
              </Set>
            </Form>
        )}
      </Formik>
    </IntlProvider>
  )
}

export const ChangeValueOutside = () => {
  type FormValuesInterface = { value: number;}
  const initialValues: FormValuesInterface = { value: 0 }

  const handleSubmit = (
    _values: FormValuesInterface, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <IntlProvider locale={'en'}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values , setFieldValue}) => (
            <Form id='form-admin-formik-input'>
              <Flex direction='row' align='center' justify='start'>
                <Box csx={{ width: 300, marginX: 8 }}>
                  <Box csx={{ marginBottom: 5}} >
                    <FormikNumericStepper
                      name="value"
                      label="Label"
                    />
                  </Box>
                  <Button onClick={()=> setFieldValue("value", Math.trunc(Math.random()*10))}>
                    Change value
                  </Button>
                </Box>
                <Set orientation='vertical'>
                  <Text variant='subtitle'> 
                    Current value in formik : 
                  </Text>
                  <Text feedback='secondary'>
                    <pre>
                      {JSON.stringify(values)}
                    </pre> 
                  </Text>
                </Set>
              </Flex>
            </Form>
        )}
      </Formik>
    </IntlProvider>
  )
}

export const ChangeInitialValue = () => {
  type FormValuesInterface = { value: number;}
  const initialValues: FormValuesInterface = { value: 0 }

  const [courentInicialValues, setCourentInicialValues] = useState<FormValuesInterface>(initialValues)

  const handleSubmit = (
    _values: FormValuesInterface, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <IntlProvider locale={'en'}>
      <Formik
        enableReinitialize
        initialValues={courentInicialValues}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
            <Form id='form-admin-formik-input'>
              <Flex direction='row' align='center' justify='start'>
                <Box csx={{ width: 300, marginX: 8 }}>
                  <Box csx={{ marginBottom: 5 }}>
                    <FormikNumericStepper
                      name="value"
                      label="Label"
                    />
                  </Box>
                  <Flex direction='column'>
                    <Button onClick={()=> setCourentInicialValues({value: Math.trunc(Math.random()*10) })} >
                      Change initial value
                    </Button>
                    <Text 
                      variant='small' 
                      feedback='secondary' 
                      csx={{marginBottom: 3, textAlign: 'center'}}
                    >
                      When the initial value changes the form is restarted
                    </Text>
                  </Flex>
                </Box>
                  <Set orientation='vertical' csx={{marginX: 8}}>
                    <Text variant='subtitle'> 
                      Current value in formik : 
                    </Text>
                    <Text feedback='secondary'>
                      <pre>
                        {JSON.stringify(values)}
                      </pre> 
                    </Text>
                  </Set>
                  <Set orientation='vertical'>
                    <Text variant='subtitle'> 
                      Current initial value in formik: 
                    </Text>
                    <Text feedback='secondary'>
                      <pre>
                        {JSON.stringify(courentInicialValues)}
                      </pre>
                    </Text>
                  </Set>
              </Flex>
            </Form>
        )}
      </Formik>
    </IntlProvider>
  )
}