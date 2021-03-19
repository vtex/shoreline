import React, { useEffect, useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { FormikInputPassword, FormikInputPasswordProps } from './index'
import { Form, Formik } from 'formik'
import { Box, Button, Flex, Set, Text } from '@vtex/admin-ui'
import * as Yup from 'yup'
import { defineMessages, IntlProvider } from 'react-intl'

export default {
  title: 'admin-formik/FormikInputPassword',
  component: FormikInputPassword,
} as Meta

export const Playground: Story<FormikInputPasswordProps> = (args) => {
  type FormValuesInterface = { [ key: string ]: string;}
  const initialValues: FormValuesInterface = { [args.name]: '' }
  const messages = defineMessages({
    errorRequired: {
      id: 'admin/admin-formik.error.required',
      defaultMessage: "This field is required.",
    },
  })
  const messagesEN = {
    'admin/admin-formik.error.required': "This field is required.",
  }
  
  const schemaValidation = Yup.object({[args.name]: Yup.string().required(messages.errorRequired.id) })

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
                    <FormikInputPassword
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
                    onClick={() => setCourentInicialValues({[args.name]: 'admin-formik'})} 
                  >
                    Set initial values
                  </Button>
                  <Text 
                    variant='small' 
                    feedback='secondary' 
                    csx={{marginBottom: 3, textAlign: 'center'}}
                  >
                    Set "admin-formik" as new initial value
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
  id: 'Input',
  label: 'Label',
  name: 'value'
}

export const Basic = () => {
  type FormValuesInterface = { value: string;}
  const initialValues: FormValuesInterface = { value: '' }

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
                  <FormikInputPassword
                    name="value"
                    label="Label"
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
  type FormValuesInterface = { value: string;}
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
  const schemaValidationError = Yup.object({ value: Yup.string().equals([''],messages.errorMessage.id).required(messages.errorRequired.id)})
  
  const handleSubmit = (
    _values: FormValuesInterface, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <IntlProvider locale={'en'} messages={messagesEN}>
      <Formik
        enableReinitialize
        initialValues={{value: 'error' }}
        validationSchema={schemaValidationError}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
            <Form id='form-admin-formik-input'>
              <Box csx={{ width: 300 }}>
                <FormikInputPassword
                  name="value"
                  label="Label"
                  helperText="Change de value in input to appear the error"
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
  type FormValuesInterface = { value: string;}
  const initialValues: FormValuesInterface = { value: '' }

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
                  <FormikInputPassword
                    name="value"
                    label="Label"
                  />
                  <Button onClick={()=> setFieldValue("value", "Randow number "+Math.trunc(Math.random()*10))}>
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
  type FormValuesInterface = { value: string;}
  const initialValues: FormValuesInterface = { value: '' }

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
                  <FormikInputPassword
                    name="value"
                    label="Label"
                  />
                  <Flex direction='column'>
                    <Button onClick={()=> setCourentInicialValues({value: "Randow number "+Math.trunc(Math.random()*10)})}>
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