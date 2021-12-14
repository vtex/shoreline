import React from 'react'

import { Formik, Form } from 'formik'

function FormikPreview(props: FormikPreviewProps) {
  const handleFormikSubmit = (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true) // Lock the form to not be modified
    alert(`Values submitted: ${JSON.stringify(values)}`)
    setSubmitting(false) // Lock the form to not be modified
  }

  return (
    <Formik
      initialValues={{
        checkboxValue: false,
        checkboxGroupValue: [],
        inputValue: '',
        inputPasswordValue: '',
        numericStepperValue: 0,
        radioGroupValue: '',
        selectValue: '',
        textAreaValue: '',
        toggleValue: false,
      }}
      onSubmit={handleFormikSubmit}
    >
      <Form>{props.children}</Form>
    </Formik>
  )
}

interface FormikPreviewProps {
  children: Node
}

export default FormikPreview
