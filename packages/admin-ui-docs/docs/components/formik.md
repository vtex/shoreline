---
title: Formik
path: /formik/
---

# Formik

`admin-formik` is a package to facilitate the creation of forms with admin-ui using the power of formik package.

To do this, it encapsulates the form components of the `@vtex/admin-ui` package. These new components are called **FormikComponent** where [Component] is the name of the component of the `@vtex/admin-ui` package that has been encapsulated. The complete list of available components can be found [here](#components-list).

This documentation considers that you know [React](https://reactjs.org/docs/getting-started.html), [Formik](https://formik.org/docs/tutorial) and [@vtex/admin-ui](https://admin-ui-docs.vercel.app/) packages.

## Installation

`admin-formik` is available as a npm package. It has `@vtex/admin-ui` and `formik` as a peer dependency.

```sh isStatic
yarn add @vtex/admin-formik @vtex/admin-ui formik
```

**For `VTEX IO` apps you should do this on the /react folder**

## Structure

Every form you build will have the same initial structure. All components of this package must be between the formik and form tags. Soon you will have something like:

```jsx isStatic
<Formik onSubmit={handleSubmit} initialValues={initialValues}>
  <Form>{/* use admin-formik components here */}</Form>
</Formik>
```

:::info
You must always set the initial value of the fields that the form will contain for the correct functioning of the package and as recommended by the formik.
:::
## Common Props

The props of all components of `@vtex/admin-ui` are extended, except for the field's value controls, such as `value` and `state` since they will be controlled by formik. Some properties are added which are common to every component of `@vtex/admin-formik`. These are presented below.

### name

<code style={{fontSize: '14.4px', color: '#0747A6', backgroundColor: '#DEEBFF', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}> name</code>
<code style={{fontSize: '14.4px', color: '#5E6C84', backgroundColor: '#F4F5F7', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}> string</code>
<span style={{fontSize: '14.4px', color: '#BF2600'}}> required</span>

---

All components of this package have a mandatory property called `name` in their API. This property receives a string that corresponds to the field name of the form that is controlled by this component. This attribute is used by the formik to figure out which field to update (more details in the [Formik documentation](https://formik.org/docs/overview#the-gist)).

<br/>

**Example**

Note that in the example, the form data contains an object "name" that contains two fields: first and last. Therefore, the name property for the input that corresponds to the first name receives "name.first" and the one corresponding to the last name receives "name.last".

```tsx live
function Example() {
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    alert('Values submitted: ' + JSON.stringify(values))
    setSubmitting(false)
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ name: { first: '', last: '' }, nationality: '' }}
    >
      <Form>
        <FormikInput name="name.first" label="First Name" />
        <FormikInput name="name.last" label="Last Name" />
        <FormikInput name="nationality" label="Nationality" />
        <Button type="submit"> Submit </Button>
      </Form>
    </Formik>
  )
}
```

### id

<code style={{fontSize: '14.4px', color: '#0747A6', backgroundColor: '#DEEBFF', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}> id</code>
<code style={{fontSize: '14.4px', color: '#5E6C84', backgroundColor: '#F4F5F7', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}> string</code>

---

All components of this package can receive a property called `id` in their API. Every form component must be given an `id`. If the component does not receive this property, it will use the `name` property as an `id`. Components of the `admin-ui` that already had the `id` property as mandatory, now have it as an option. Those who did not have it, now have it.

### label

<code style={{fontSize: '14.4px', color: '#0747A6', backgroundColor: '#DEEBFF', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}> label</code>
<code style={{fontSize: '14.4px', color: '#5E6C84', backgroundColor: '#F4F5F7', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}> string</code>

---

All components of this package can receive a property called `label` in their API, that is the field's label. Components of the `admin-ui` that already had the `label` property continue to have it and those that did not yet have it (the only exceptions are `FormikCheckboxGroup.Item` and `FormikRadio`).

### error

<code style={{fontSize: '14.4px', color: '#0747A6', backgroundColor: '#DEEBFF', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}> error</code>
<code style={{fontSize: '14.4px', color: '#5E6C84', backgroundColor: '#F4F5F7', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}> boolean</code>

---

In addition to the errors, called internal, generated from the validation of the formik, it is possible to configure external errors for all the components of the admin-formik. For this, all components of this package can receive a property called `error` in their API. When error is true, the component will show the message present in errorMessage.

Components of the `admin-ui` that already had the `error` property continue to have it and those that did not yet have it.

:::info
**External errors take precedence over internal ones.** This means that if error is true and the formik also points out an error, the message that will be shown will be that of the external error (error message property). Use it sparingly.
:::

### errorMessage

<code style={{fontSize: '14.4px', color: '#0747A6', backgroundColor: '#DEEBFF', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}> errorMessage</code>
<code style={{fontSize: '14.4px', color: '#5E6C84', backgroundColor: '#F4F5F7', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}> string</code>

---

All components of this package can receive a property called `errorMessage` in their API. When the `error` property is true, the component will show the text in `errorMessage` as the error message in the component. Components of the `admin-ui` that already had the `errorMessage` property continue to have it and those that did not yet have it.

### formatMessage

<code style={{fontSize: '14.4px', color: '#0747A6', backgroundColor: '#DEEBFF', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}>formatMessage</code>
<code style={{fontSize: '14.4px', color: '#5E6C84', backgroundColor: '#F4F5F7', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}>function</code>

---

All components of this package can receive a property called `formatMessage` in their API. This property allows you to format your error messages, either by your own functions or using libraries like [react-intl](https://formatjs.io/docs/getting-started/installation/). That way you can format your messages dynamically. A very common use case is for text localization. More details on this case are given in the section [Localization of error messages](#localization-of-error-messages).

<br/>

**Example**

Note that in the example, the initial value is set to a value that generates an error solely to force the error message. In the example we have both the use case of a proper function and a library when without setting this property.

Touch the fields or try submitting to see error messages.

```tsx live
function Example() {
  const messagesEN = {
    'myApp.erros.error3': 'This is error message formatted with react-intl',
  }

  const Forms = () => {
    const { formatMessage } = useIntl()

    const schemaValidationError = Yup.object({
      error1: Yup.string().notOneOf(['error1'], 'Error message'),
      error2: Yup.string().notOneOf(['error2'], 'error2'),
      error3: Yup.string().notOneOf(['error3'], 'myApp.erros.error3'),
    })

    const myFormatMessage = (codeError) => {
      if (codeError === 'error2')
        return 'This is error message formatted by myself'
      return 'Other error'
    }

    const handleSubmit = (values, { setSubmitting }) => {
      setSubmitting(false)
    }

    return (
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          error1: 'error1',
          error2: 'error2',
          error3: 'error3',
        }}
        validationSchema={schemaValidationError}
      >
        <Form>
          <FormikInput name="error1" label="Without formatMessage proprety" />
          <FormikInput
            name="error2"
            label="formatMessage with a own function"
            formatMessage={myFormatMessage}
          />
          <FormikInput
            name="error3"
            label="formatMessage with react-intl package"
            formatMessage={(errorCode) => formatMessage({ id: errorCode })}
          />
          <Button type="submit" csx={{ marginY: 2 }}>
            Submit
          </Button>
        </Form>
      </Formik>
    )
  }

  return (
    <IntlProvider messages={messagesEN} locale="en" defaultLocale="en">
      <Forms />
    </IntlProvider>
  )
}
```

### onChange

<code style={{fontSize: '14.4px', color: '#0747A6', backgroundColor: '#DEEBFF', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}>onChange</code>
<code style={{fontSize: '14.4px', color: '#5E6C84', backgroundColor: '#F4F5F7', borderRadius: '3px', display: 'inline-block', marginRight: '0.8em', padding: '0 0.2em'}}>function</code>

---

All components of this package can receive a property called `onChange` in their API. Components of the `admin-ui` that already had the `onChange` property as mandatory, now have it as an option. Those who did not have it, now have it. This property is not to be used to control the present value in the formik, but only to enable actions to take place in changing the value, whether the field originates from the component or is made externally to it, by the formik.

<br/>

**Example**

```tsx isFormik
<FormikCheckbox
  name="checkboxValue"
  label="Accept the terms of use"
  onChange={(value) => {
    if (value === true) {
      alert('Terms have been accepted')
    }
  }}
/>
```

## Localization of error messages

To make the localization of your error messages, you can use the `formatMessage` property that all components of `admin-formik` have (method 1) or do it directly in the validator that will pass to `Formik` (method 2). The advantage of using method 1, especially in the case of using `react-intl`, is that it allows the validator to be created in an external component and can be exported (for example to be created outside the context of `react-intl`).

In the example below we show both ways, using the [react-intl](https://formatjs.io/docs/getting-started/installation/) package for localization and [Yup](https://github.com/jquense/yup) for validation. The `input1` uses the methode 1 and the `input2` the methode 2.

Touch the fields or try submitting to see error messages.

```tsx live
function Example() {
  const messagesEN = {
    'myApp.erros.myError': 'This is error message formatted with react-intl',
  }

  const Forms = () => {
    const { formatMessage } = useIntl()

    const schemaValidationError = Yup.object({
      input1: Yup.string().required('myApp.erros.myError'),
      input2: Yup.string().required(
        formatMessage({ id: 'myApp.erros.myError' })
      ),
    })

    const handleSubmit = (values, { setSubmitting }) => {
      setSubmitting(false)
    }

    return (
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          input1: '',
          input2: '',
        }}
        validationSchema={schemaValidationError}
      >
        <Form>
          <FormikInput
            name="input1"
            label="Label 1"
            formatMessage={(errorCode) => formatMessage({ id: errorCode })}
          />
          <FormikInput name="input2" label="Label 2" />
          <Button type="submit" csx={{ marginY: 2 }}>
            Submit
          </Button>
        </Form>
      </Formik>
    )
  }

  return (
    <IntlProvider messages={messagesEN} locale="en" defaultLocale="en">
      <Forms />
    </IntlProvider>
  )
}
```

## A more complete example

Below is a slightly more complete example that shows the possibilities that this package brings.

- **Properties common:** In the example, all the components available in `admin-formik` are used. In them you can see examples of the use of properties common to all these components, as well as the properties that the encapsulated components of the `admin-ui` have ( `minValue` and `maxValue` in NumericStepper, `charLimit` in TextArea, etc.) .
- **Changing the initial value:** The upper buttons (empty forms and pre-filled forms) together with the Formik property `enableReinitialize`, show the possibility to change the initial value of the form and together reset the fields to these new initial values. In this case, the initial values can be those contained in the `emptyForms` object or in the `someone` object.
- **Submit and reset:** The bottom buttons show how to submit or reset the form. It is observed that the reset will change the values on the form to the initial values currently passed to the `Formik`.
- **Enable an action based on changing the value of a field:** In this example, there is also a case of using `onChange`. We invite you to click on the checkbox to accept the terms of use. You will notice that a modal will appear. This is because we do not want the terms to be accepted without the user reading the terms. This is done by the `onChange` property. If you look at the `FormikCheckbox` component, you will see that it receives a function in which if the change was true, it will open the modal.
- **Changing the value of a field made from outside the component:**: In the modal, it can be observed that if it is closed without clicking on accept, it returns the value to false. This is an example of changing the value of a field made from outside the component. For this, the hook provided by the formik package is used, `useField`. The use of this hook can be seen at the beginning of the declaration of the `ModalTerms` function. Where we see that the hook provides both ways to access field information and modifiers. More information about it can be found in the [Formik documentation](https://formik.org/docs/api/useField).
- **Validation:** In the example, the data also undergoes a validation before being submitted. For this, in this example, [Yup](https://github.com/jquense/yup) is used, a package often used with `Formik`. It is observed that we can validate the fields by several criteria. There is an example of a case of conditional validation in the age field. The maximum exists only for human beings, for other creatures there is no age limit. More information about the possibilities of Yup can be found in its [documentation](https://github.com/jquense/yup). Also note that validation for negative ages is carried out in addition to limiting negative values by the `minValue` property. It is important to do this as the `minValue` and `maxValue` properties do not limit values that are entered by the keyboard.
- **Localization:** In this example, error messages are not done with localization for simplicity. If you want to know how to do it, see the [Localization of error messages section](#localization-of-error-messages).

```tsx live
function ExampleComplete() {
  const [startWithSomeone, setStartWithSomeone] = React.useState(false)

  const emptyForms = {
    human: true,
    name: '',
    password: '',
    description: '',
    age: 0,
    civilStatus: 'single',
    genders: '',
    hobbies: [],
    acceptTerms: false,
  }

  const someone = {
    human: true,
    name: 'Alex',
    password: '123456',
    description:
      'I am a Hobbit living in the County area. I met Frodo Baggins personally and although few know, I also took part in the journey to reach Mordor. After all, someone needed to film and record the footage. It was not easy, but I am alive and I keep many secrets that only those who participated in the journey know ...',
    age: 351,
    civilStatus: "I don't want to declare",
    genders: 'I don’t want to identify myself',
    hobbies: ['Dancing', 'Traveling', 'Playing musical instruments'],
    acceptTerms: false,
  }

  const hobbies = [
    'Dancing',
    'Listening to music',
    'Traveling',
    'Reading books',
    'Cycling',
    'Programming',
  ]

  const genders = [
    'Female',
    'Male',
    'Non-binary',
    'Other',
    'I don’t want to identify myself',
  ]

  const civilStatus = [
    'Single',
    'Married',
    'Divorced',
    'Widowed',
    'Civil union',
    'Cohabiting couple',
    "I don't want to declare",
  ]

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    alert('Values submitted: ' + JSON.stringify(values))
    setSubmitting(false)
  }

  const schemaValidationError = Yup.object({
    name: Yup.string().required(
      "We need a name. If you don't like yours it may be a nickname"
    ),
    password: Yup.string()
      .min(6, 'Your password needs at least 6 characters')
      .required('You need a password to protect your data'),
    description: Yup.string()
      .min(100, 'We are interested to know a little more about you.')
      .required('We want to know a little about you'),
    age: Yup.number()
      .min(0, 'We believe that we cannot speak of someone who was not born yet')
      .when('human', {
        is: true,
        then: Yup.number()
          .max(160, 'At that age, you may not be human')
          .max(
            150,
            'If you are over 150 years old maybe you should try the Guinness Book.'
          ),
      })
      .required('Please tell us your age, we promise not to judge.'),
    civilStatus: Yup.string().required('this field is mandatory'),
    genders: Yup.string().required('this field is mandatory'),
    acceptTerms: Yup.bool().required('We need you to accept the terms.'),
  })

  const TermsCheckbox = () => {
    const formikName = 'acceptTerms'
    const stateModal = useModalState({ animated: true })
    const [isAccept, setIsAccept] = React.useState(false)
    const [fieldTerms, _, helpersTerms] = useField({
      name: formikName,
    })

    React.useEffect(() => {
      if (stateModal.visible === false) {
        if (isAccept === false && fieldTerms.value === true) {
          helpersTerms.setValue(false)
        }
        setIsAccept(false)
      }
    }, [stateModal.visible])

    return (
      <>
        <FormikCheckbox
          name={formikName}
          label="I agree with the terms of use"
          onChange={(value) => {
            if (value) {
              stateModal.show()
            }
          }}
        />

        <Modal aria-label="Terms modal" state={stateModal}>
          <ModalHeader title="Terms of Use" />
          <ModalContent>
            <Text>Our only condition is be yourself.</Text>
          </ModalContent>
          <ModalFooter>
            <Button
              variant="secondary"
              onClick={() => {
                stateModal.hide()
              }}
            >
              Reject
            </Button>
            <Button
              onClick={() => {
                setIsAccept(true)
                stateModal.hide()
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={startWithSomeone ? someone : emptyForms}
      enableReinitialize
      validationSchema={schemaValidationError}
    >
      <Form>
        <Set spacing={3} csx={{ marginY: 2 }}>
          <Text variant="highlight" feedback="secondary">
            Start with:{' '}
          </Text>
          <Button
            size="small"
            disabled={!startWithSomeone}
            onClick={() => setStartWithSomeone(false)}
          >
            Empty Forms
          </Button>
          <Button
            size="small"
            disabled={startWithSomeone}
            onClick={() => setStartWithSomeone(true)}
          >
            Pre-filled Forms
          </Button>
        </Set>
        <Divider csx={{ marginY: 3 }} />
        <Set spacing={8}>
          <Heading>Myself</Heading>
          <FormikToggle name="human" label="I'm human" />
        </Set>
        <Flex wrap="wrap">
          <Box csx={{ width: '1/2', paddingRight: 2 }}>
            <FormikInput name="name" label="Full Name" />
          </Box>
          <Box csx={{ width: '1/2' }}>
            <FormikInputPassword name="password" label="Password" />
          </Box>
          <Flex
            direction="colunms"
            align="center"
            justify="space-arround"
            csx={{ width: 'full', marginTop: 3 }}
          >
            <FormikRadioGroup
              name="genders"
              label="How do you identify yourself?"
            >
              {genders.map((value, key) => {
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
          </Flex>
          <Flex csx={{ width: 'full', marginBottom: 3 }}>
            <Set spacing={2} orientation="vertical">
              <Label>How old are you?</Label>
              <FormikNumericStepper
                name="age"
                label="Age"
                helperText="We do not judge any age"
                minValue={0}
              />
            </Set>
            <FormikSelect
              name="civilStatus"
              label="Civil Status"
              csx={{ marginTop: '1.5rem', marginLeft: 8, width: 'full' }}
            >
              {civilStatus.map((cs) => (
                <option key={cs} value={cs}>
                  {cs}
                </option>
              ))}
            </FormikSelect>
          </Flex>
          <FormikTextArea
            name="description"
            label="Description"
            helperText="Helps us to get to know you better"
            charLimit={100}
          />
          <Box csx={{ marginY: 4 }}>
            <FormikCheckboxGroup name="hobbies" label="What are your hobbies?">
              {hobbies.map((value, key) => {
                return (
                  <Label key={key}>
                    <FormikCheckboxGroup.Item value={value} />
                    {value}
                  </Label>
                )
              })}
            </FormikCheckboxGroup>
          </Box>
          <Flex
            direction="column"
            align="center"
            justify="center"
            csx={{ width: 'full' }}
          >
            <TermsCheckbox />
            <Set spacing={3} csx={{ marginY: 2 }}>
              <Button type="submit">Submit</Button>
              <Button type="reset">Reset</Button>
            </Set>
          </Flex>
        </Flex>
      </Form>
    </Formik>
  )
}
```

## Components list

### FormikInput

```jsx isFormik
<FormikInput name="inputValue" label="Name" />
```

### FormikInputPassword

```jsx isFormik
<FormikInputPassword name="inputPasswordValue" label="Password" />
```

### FormikTextArea

```jsx isFormik
<FormikTextArea name="textAreaValue" label="Label" />
```

### FormikNumericStepper

```jsx isFormik
<FormikNumericStepper name="numericStepperValue" label="Label" />
```

### FormikToggle

```jsx isFormik
<FormikToggle name="toggleValue" label="Label" />
```

:::info
This component should not be used with an external label as it will cause problems in the display of error messages. If you want a label, use the component property, as shown above.
:::

### FormikCheckbox

```jsx isFormik
<FormikCheckbox name="checkboxValue" label="Label" />
```

:::info
This component must not be used inside a checkboxGroup. This package provides for a specific component to be used in this context.
:::

:::info
This component should not be used with an external label as it will cause problems in the display of error messages. For this component the label is a mandatory property, as shown above.
:::

### FormikCheckboxGroup

This component works a little differently than in the admin-ui package. For the checkboxes that compose it, you should not use the same component as the checkbox alone, but a component provided by the FormikCheckboxGroup itself, FormikCheckboxGroup.Item, as shown in the example below. This component will use the label component, just as it is done in the admin-ui. In the case of FormikCheckboxGroup.Item the value property was maintained, as it corresponds to the value that the specific checkbox assumes in that checkbox group. The FormikCheckboxGroup.Item component is an exception as it does not receive the `name` property, as it is contained in the FormikCheckboxGroup.

```jsx isFormik
<FormikCheckboxGroup
  name="checkboxGroupValue"
  id="form-group-id"
  label="Group label!"
>
  <Label>
    <FormikCheckboxGroup.Item value="checkbox-1" />
    Label 1
  </Label>
  <Label>
    <FormikCheckboxGroup.Item value="checkbox-2" />
    Label 2
  </Label>
</FormikCheckboxGroup>
```

### FormikRadio and FormikRadioGroup

These two components must always be used together. If you use FormikRadio outside of a FormikRadioGroup, a context error will occur. The FormikRadio component is an exception as it does not receive the `name` property, as it is contained in the FormikRadioGroup.

```jsx isFormik
<FormikRadioGroup
  name="radioGroupValue"
  id="form-group-id"
  label="Group label!"
>
  <Label>
    <FormikRadio value="radio-1" />
    Label 1
  </Label>
  <Label>
    <FormikRadio value="radio-2" />
    Label 2
  </Label>
</FormikRadioGroup>
```

### FormikSelect

```tsx isFormik
<FormikSelect name="selectValue" label="Label">
  <option value="option 1">Option 1</option>
  <option value="option 2">Option 2</option>
  <option value="option 3">Option 3</option>
</FormikSelect>
```
