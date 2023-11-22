const stylelint = require('stylelint')
const { replaceDeclaration } = require('../../utils/replace-declaration.mjs')

const { ruleMessages, validateOptions, report } = stylelint.utils

const ruleName = 'shoreline/no-space-px-values'
const messages = ruleMessages(ruleName, {
  expected: (prop, value, expectedValue) =>
    `Expected "${prop}: ${value}" to be "${prop}: ${expectedValue}".`,
})

const spaceProps = [
  'margin',
  'margin-left',
  'margin-right',
  'margin-top',
  'margin-bottom',
  'padding',
  'padding-left',
  'padding-right',
  'padding-top',
  'padding-bottom',
]

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
        const isSpaceProp = spaceProps.includes(decl.prop)

        const isInvalid = isSpaceProp && decl.value.includes('px')

        if (!isInvalid) return

        const pxUnits = decl.value.split('px').filter((unit) => !!unit)

        const remUnits = pxUnits
          .map((unit) => `${Number(unit.trim()) / 16}rem`)
          .join(' ')

        if (isAutoFixing) {
          replaceDeclaration(decl, remUnits)
        } else {
          report({
            ruleName,
            result: postcssResult,
            message: messages.expected(decl.prop, decl.value, remUnits),
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
