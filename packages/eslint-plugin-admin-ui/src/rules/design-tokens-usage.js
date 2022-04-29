function tokenValidation(value) {
  const message = (token) =>
    `You do not need to use the "${token}" prefix when using this design token`

  const prefixes = ['$fg.', '$bg.', '$border.', '$shadow.']

  const token = prefixes.find((prefix) => value.includes(prefix))
  const isInvalid = !!token

  return {
    invalid: isInvalid,
    message: message(token),
  }
}

const adminUiTokens = {
  meta: {
    docs: {
      description: 'Enforce the right usage of the design tokens',
      category: 'Possible Errors',
    },
    schema: [],
  },

  create(context) {
    return {
      JSXAttribute(node) {
        node.value.expression.properties.forEach((prop) => {
          const propValue = prop.value.value
          const loc = propValue.loc

          if (typeof propValue !== 'string') return

          const { invalid, message } = tokenValidation(propValue)

          if (invalid) {
            context.report({
              node,
              loc,
              message,
            })
          }
        })
      },
    }
  },
}

module.exports = {
  ...adminUiTokens,
}
