import React, { useEffect, useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { FormikSelect, FormikSelectProps } from './index'
import { Form, Formik } from 'formik'
import { Box, Button, Flex, Set, Text } from '@vtex/admin-ui'
import * as Yup from 'yup'
import { defineMessages, IntlProvider } from 'react-intl'

export default {
  title: 'admin-formik/FormikSelect',
  component: FormikSelect,
} as Meta

export const Playground: Story<FormikSelectProps<string>> = (args) => {

  type FormValuesInterface = { [ key: string ]: string;}
  const initialValues: FormValuesInterface = { [args.name]: '' }
  const messagesEN = {
    'admin/admin-formik.error.required': "This field is required.",
    'admin/admin-formik.error.error': "Error message",
  }
  
  const schemaValidation = Yup.object({[args.name]: Yup.string().notOneOf(['error'],'admin/admin-formik.error.error').required('admin/admin-formik.error.required') })

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
                  <FormikSelect
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
                  onClick={() => setCourentInicialValues({[args.name]: args.items[1]})} 
                >
                  Set initial values
                </Button>
                <Text 
                  variant='small' 
                  feedback='secondary' 
                  csx={{marginBottom: 3, textAlign: 'center'}}
                >
                  Set "{args.items[1]}" as new initial value
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
  items : ['option 1', 'option 2', 'option 3', 'error']
}

export const Basic = () => {
  const options = ['option 1', 'option 2', 'option 3']
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
                  <FormikSelect
                    name="value"
                    label="Label"
                    items={options}
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
  const options = ['error 1', 'error 2', 'error 3', 'error']
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
                <FormikSelect
                  name="value"
                  label="Label"
                  helperText="Change de value in select to appear the error"
                  items={options}
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
  const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7']
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
                  <FormikSelect
                    name="value"
                    label="Label"
                    items={options}
                  />
                  <Button 
                    onClick={()=> setFieldValue("value", options[Math.floor(Math.random() * options.length)  ])}
                    csx={{marginY: 2}}
                  >
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
  const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7']
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
                  <FormikSelect
                    name="value"
                    label="Label"
                    items={options}
                  />
                  <Flex direction='column'>
                    <Button 
                      onClick={()=> setCourentInicialValues({value: options[Math.floor(Math.random() * options.length)  ]})}
                      csx={{marginY: 2}}
                    >
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