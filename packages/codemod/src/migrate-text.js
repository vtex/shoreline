const { removeLegacyImports, updateComponentImports } = require('./utils')

function getNewVariant(old) {
  return {
    pageTitle: 'display1',
    display: 'display1',
    title1: 'display3',
    title2: 'display4',
    action1: 'action',
    action2: 'emphasis',
    body: 'body',
    detail: 'caption2',
  }[old]
}

function replaceTextVariantProp(source, j, componentName) {
  return j(source)
    .find(j.JSXElement, { openingElement: { name: { name: componentName } } })
    .forEach((p) => {
      const { name, attributes, selfClosing } = p.value.openingElement

      const draftAttrs = attributes.map((attribute) => {
        if (!attribute.value || !attribute.value.value) return attribute

        if (attribute.name && attribute.name.name === 'variant') {
          const newValue = getNewVariant(attribute.value.value)

          return j.jsxAttribute(j.jsxIdentifier('variant'), j.literal(newValue))
        }

        return attribute
      })

      const hasVariant = !!attributes.find(
        (attr) => attr.name && attr.name.name === 'variant'
      )

      const attrs = hasVariant
        ? draftAttrs
        : [
            ...draftAttrs,
            j.jsxAttribute(j.jsxIdentifier('variant'), j.literal('body')),
          ]

      p.value.openingElement = j.jsxOpeningElement(name, attrs, selfClosing)
    })
    .toSource()
}

function getColorFromTone(tone) {
  return {
    primary: 'var(--sl-fg-base)',
    secondary: 'var(--sl-fg-base-soft)',
    info: 'var(--sl-fg-informational)',
    positive: 'var(--sl-fg-success)',
    critical: 'var(--sl-fg-critical)',
    warning: 'var(--sl-fg-warning)',
  }[tone]
}

function replaceTextToneProp(source, j, componentName) {
  return j(source)
    .find(j.JSXElement, { openingElement: { name: { name: componentName } } })
    .forEach((path) => {
      const { attributes } = path.value.openingElement

      const tone = attributes.find(
        (attr) => attr.name && attr.name.name === 'tone'
      )

      // returns if there is no tone attribute
      if (!tone || !tone.value || !tone.value.value) return path

      // build new prop in format {color: 'var(--token)'}
      const newStyleProp = j.property(
        'init',
        j.identifier('color'),
        j.literal(getColorFromTone(tone.value.value))
      )

      const styleAttribute = path.node.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'style'
      )

      // if there is a style prop modify it
      if (
        styleAttribute &&
        styleAttribute.value &&
        styleAttribute.value.expression
      ) {
        if (styleAttribute.value.expression.type === 'ObjectExpression') {
          // add new color property to style
          styleAttribute.value.expression.properties = [
            ...styleAttribute.value.expression.properties,
            newStyleProp,
          ]
        }
      }

      // filter out tone attribute
      let draftAttrs = path.node.openingElement.attributes.filter(
        (attr) => !(attr.name && attr.name.name === 'tone')
      )

      // if a style attribute didnt exist before, add it now
      if (!styleAttribute) {
        draftAttrs = [
          ...draftAttrs,
          j.jsxAttribute(
            j.jsxIdentifier('style'),
            j.jsxExpressionContainer(j.objectExpression([newStyleProp]))
          ),
        ]
      }

      path.node.openingElement.attributes = draftAttrs
    })
    .toSource()
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  // removes old Text imports from adminui
  source = removeLegacyImports(file.source, j, 'Text')

  // changes variant to new variant values
  source = replaceTextVariantProp(source, j, 'Text')
  // removes tone prop and adds color style
  source = replaceTextToneProp(source, j, 'Text')

  // adds shoreline import in files using Text
  source = updateComponentImports({
    source,
    j,
    componentName: 'Text',
    importSpecifier: j.importSpecifier(j.identifier('Text')),
    importSource: '@vtex/shoreline',
  })

  return source
}
