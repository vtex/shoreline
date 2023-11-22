const stylelint = require('stylelint')
const { replaceDeclaration } = require('../../utils/replace-declaration.js')

const { ruleMessages, validateOptions, report } = stylelint.utils

const ruleName = 'shoreline/no-text-property'
const messages = ruleMessages(ruleName, {
  expected: `Expected "text" property to be splited in "font" and "letter-spacing"`,
})

const textTokenPrefix = '--sl-text'

module.exports = stylelint.createPlugin(
  ruleName,
  function ruleFunction(primaryOption, secondaryOptionObject, context) {
    return function lint(postcssRoot, postcssResult) {
      const validOptions = validateOptions(postcssResult, ruleName, {
        // No options for now...
      })

      if (!validOptions) return

      const isAutoFixing = Boolean(context.fix)

      postcssRoot.walkDecls((decl) => {
        const isTextProp = decl.prop === 'text'

        if (!isTextProp) return

        if (isAutoFixing) {
          const hasShorelinePrefix = decl.value.includes(textTokenPrefix)

          const newFontValue = hasShorelinePrefix
            ? decl.value.replace(')', '-font)')
            : decl.value

          const newLetterSpacingValue = hasShorelinePrefix
            ? newFontValue.replace('font', 'letter-spacing')
            : decl.value

          replaceDeclaration(decl, newFontValue, 'font')

          decl.cloneAfter({
            prop: 'letter-spacing',
            value: newLetterSpacingValue,
          })
        } else {
          report({
            ruleName,
            result: postcssResult,
            message: messages.expected,
            node: decl,
            word: 'text:',
          })
        }
      })
    }
  }
)

module.exports.ruleName = ruleName
module.exports.messages = messages
