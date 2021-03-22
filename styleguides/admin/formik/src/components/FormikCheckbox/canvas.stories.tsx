import React, { useEffect, useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { FormikCheckbox, FormikCheckboxProps } from './index'
import { Form, Formik } from 'formik'
import { Box, Button, Flex, Set, Text } from '@vtex/admin-ui'
import * as Yup from 'yup'
import { IntlProvider, useIntl } from 'react-intl'

export default {
  title: 'admin-formik/FormikCheckbox',
  component: FormikCheckbox,
} as Meta

export const Playground: Story<FormikCheckboxProps> = (args) => {
  type FormValuesInterface = { [ key: string ]: boolean;}
  const initialValues: FormValuesInterface = { [args.name]: false }

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

  const schemaValidation = Yup.object({[args.name]: Yup.bool().isTrue('Error message')})

  return (
    <Formik
      enableReinitialize
      initialValues={courentInicialValues}
      validationSchema={schemaValidation}
      onSubmit={handleSubmit}
    >
      {({ resetForm, values, dirty, initialValues }) => (
        <Form id='form-admin-formik-input'>
          <Flex direction='row' align='center' justify='start'>
            <Flex direction='column' justify='center' csx={{marginX: 8}}>
              <Box csx={{ width: 300 , marginBottom: 3}}>
                <FormikCheckbox
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
                onClick={() => setCourentInicialValues({[args.name]: !values.value})} 
              >
                Set initial values
              </Button>
              <Text 
                variant='small' 
                feedback='secondary' 
                csx={{marginBottom: 3, textAlign: 'center'}}
              >
                { 'Set "' + !initialValues.value + '" as new initial value'}
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
  )
}

Playground.args = {
  label: 'Label',
  name: 'value',
}

export const Basic = () => {
  type FormValuesInterface = { value: boolean;}
  const initialValues: FormValuesInterface = { value: false }

  const handleSubmit = (
    _values: FormValuesInterface, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
          <Form id='form-admin-formik-input'>
            <Flex direction='row' align='center' justify='start'>
              <Box csx={{ width: 300, marginX: 8 }}>
                <FormikCheckbox
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
  )
}

export const Error = () => {
  type FormValuesInterface = { value: boolean;}
  const schemaValidationError = Yup.object({ value: Yup.bool().isFalse('Error message')})
  
  const handleSubmit = (
    _values: FormValuesInterface, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{value: false }}
      validationSchema={schemaValidationError}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
          <Form id='form-admin-formik-input'>
            <Box csx={{ width: 300 }}>
              <FormikCheckbox
                name="value"
                label="Label"
              />
              <Text feedback='primary' children="Change de value to true to appear the error" />
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
  )
}

export const WithIntl = () => {
  const messagesEN = {
    'admin/admin-formik.error.error': "Error message",
  }

  const Content = () => {
    const { formatMessage } = useIntl()
    type FormValuesInterface = { value: boolean;}
    const schemaValidationError = Yup.object({ value: Yup.bool().isFalse('admin/admin-formik.error.error')})
    
    const handleSubmit = (
      _values: FormValuesInterface, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}
    ) => {
      setSubmitting(false) // Lock the form to not be modified
    }

    return (
      <Formik
        enableReinitialize
        initialValues={{value: false }}
        validationSchema={schemaValidationError}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
            <Form id='form-admin-formik-input'>
              <Box csx={{ width: 300 }}>
                <FormikCheckbox
                  name="value"
                  label="Label"
                  formatMessage={(errorCode) => formatMessage({ id: errorCode})}
                />
                <Text feedback='primary' children="Change de value to true to appear the error" />
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
    )
  } 

  return (
    <IntlProvider locale={'en'} messages={messagesEN}>
      <Content />
    </IntlProvider>
  )
}

export const ChangeValueOutside = () => {
  type FormValuesInterface = { value: boolean;}
  const initialValues: FormValuesInterface = { value: false }

  const handleSubmit = (
    _values: FormValuesInterface, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values , setFieldValue}) => (
          <Form id='form-admin-formik-input'>
            <Flex direction='row' align='center' justify='start'>
              <Box csx={{ width: 300, marginX: 8 }}>
                <FormikCheckbox
                  name="value"
                  label="Label"
                />
                <Button 
                  onClick={()=> setFieldValue("value", !values.value )}
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
  )
}

export const ChangeInitialValue = () => {
  type FormValuesInterface = { value: boolean;}
  const initialValues: FormValuesInterface = { value: false }

  const [courentInicialValues, setCourentInicialValues] = useState<FormValuesInterface>(initialValues)

  const handleSubmit = (
    _values: FormValuesInterface, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}
  ) => {
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <Formik
      enableReinitialize
      initialValues={courentInicialValues}
      onSubmit={handleSubmit}
    >
      {({ values, initialValues }) => (
          <Form id='form-admin-formik-input'>
            <Flex direction='row' align='center' justify='start'>
              <Box csx={{ width: 300, marginX: 8 }}>
                <FormikCheckbox
                  name="value"
                  label="Label"
                />
                <Flex direction='column'>
                  <Button 
                    onClick={()=> setCourentInicialValues({value: !initialValues.value})}
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
  )
}