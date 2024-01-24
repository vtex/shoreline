const {
  removeLegacyImports,

  updateComponentImports,
} = require('./utils')

function addChildEnd(path, j, element) {
  path.replace(
    j.jsxElement(path.node.openingElement, path.node.closingElement, [
      ...path.node.children, // Copy existing children
      element,
    ])
  )
}

function addChildBegining(path, j, element) {
  path.replace(
    j.jsxElement(path.node.openingElement, path.node.closingElement, [
      element,
      ...path.node.children, // Copy existing children
    ])
  )
}

function getNewVariant(old) {
  return {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    critical: 'critical',
    criticalSecondary: 'criticalTertiary',
    criticalTertiary: 'criticalTertiary',
    neutralTertiary: 'tertiary',
  }[old]
}

function replaceButtonVariantProp(source, j, componentName) {
  return j(source)
    .find(j.JSXElement, { openingElement: { name: { name: componentName } } })
    .forEach((p) => {
      const { name, attributes, selfClosing } = p.value.openingElement

      const draftAttrs = attributes.map((attribute) => {
        if (
          !attribute ||
          !attribute.name ||
          !attribute.value ||
          !attribute.value.value
        ) {
          return attribute
        }

        if (attribute.name.name === 'variant') {
          const newValue = getNewVariant(attribute.value.value)

          return j.jsxAttribute(j.jsxIdentifier('variant'), j.literal(newValue))
        }

        return attribute
      })

      p.value.openingElement = j.jsxOpeningElement(
        name,
        draftAttrs,
        selfClosing
      )
    })
    .toSource()
}

function replaceIconProp(source, j, componentName) {
  return j(source)
    .find(j.JSXElement, { openingElement: { name: { name: componentName } } })
    .forEach((p) => {
      const { name, attributes, selfClosing } = p.value.openingElement
      const { children } = p.value
      const hasChildren = !!children.length
      let iconOnly = false

      const iconPositionAtt = attributes.find(
        (a) => a.name && a.name.name === 'iconPosition'
      )

      const iconPosition =
        (iconPositionAtt &&
          iconPositionAtt.value &&
          iconPositionAtt.value.value) ||
        'start'

      const draftAttrs = attributes
        .map((attribute) => {
          if (!attribute || !attribute.name) {
            return attribute
          }

          if (attribute.name.name === 'icon') {
            // is icon only if found icon attribute and has no children
            iconOnly = !hasChildren
            // transforms into IconButton component and replaces icon for children
            if (iconOnly) {
              name.name = 'IconButton'
              p.value.openingElement = j.jsxOpeningElement(
                name,
                attributes,
                selfClosing
              )
              attribute.name.name = 'children'

              return attribute
            }

            // inserts icon into begining or end
            if (iconPosition === 'start') {
              addChildBegining(p, j, attribute.value.expression)
            } else {
              addChildEnd(p, j, attribute.value.expression)
            }

            // causes attribute icon to be filtered out from atts
            return false
          }

          // filters out iconPosition attribute
          if (attribute.name.name === 'iconPosition') {
            return false
          }

          return attribute
        })
        .filter(Boolean)

      if (iconOnly) {
        draftAttrs.push(j.jsxAttribute(j.jsxIdentifier('label'), j.literal('')))
      }

      p.value.openingElement = j.jsxOpeningElement(
        name,
        draftAttrs,
        selfClosing
      )
    })
    .toSource()
}

function handleBleed(source, j, componentName) {
  const src = j(source)

  src.findJSXElements(componentName).forEach((element) => {
    const { attributes } = element.value.openingElement

    const bleedX = attributes.find(
      (att) => att.name && att.name.name === 'bleedX'
    )

    const bleedY = attributes.find(
      (att) => att.name && att.name.name === 'bleedY'
    )

    if (!bleedX && !bleedY) {
      return element
    }

    const sizeAtt = attributes.find(
      (att) => att.name && att.name.name === 'size'
    )

    const buttonSize =
      (sizeAtt && sizeAtt.value && sizeAtt.value.value) || 'normal'

    const bleedSpace = buttonSize === 'normal' ? '$space-2' : '$space-3'

    const propObj = {
      ...(bleedY ? { top: bleedSpace, bottom: bleedSpace } : {}),
      ...(bleedX ? { left: bleedSpace, right: bleedSpace } : {}),
    }

    const wrapProps = Object.keys(propObj).map((attName) =>
      j.jsxAttribute(
        j.jsxIdentifier(attName),
        j.stringLiteral(propObj[attName])
      )
    )

    const wrappedElement = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier('Bleed'), wrapProps),
      j.jsxClosingElement(j.jsxIdentifier('Bleed')),
      [element.value]
    )

    j(element).replaceWith(wrappedElement)
  })

  src.findJSXElements(componentName).forEach((element) => {
    const { name, attributes, selfClosing } = element.value.openingElement

    const draftAttrs = attributes.filter((attribute) => {
      if (
        attribute &&
        attribute.name &&
        (attribute.name.name === 'bleedY' || attribute.name.name === 'bleedX')
      ) {
        return false
      }

      return true
    })

    element.value.openingElement = j.jsxOpeningElement(
      name,
      draftAttrs,
      selfClosing
    )
  })

  return src.toSource()
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = removeLegacyImports(file.source, j, 'Button')

  source = replaceButtonVariantProp(source, j, 'Button')
  source = handleBleed(source, j, 'Button')
  source = replaceIconProp(source, j, 'Button')

  source = updateComponentImports({
    source,
    j,
    componentName: 'Button',
    importSpecifier: j.importSpecifier(j.identifier('Button')),
    importSource: '@vtex/shoreline',
  })
  source = updateComponentImports({
    source,
    j,
    componentName: 'IconButton',
    importSpecifier: j.importSpecifier(j.identifier('IconButton')),
    importSource: '@vtex/shoreline',
  })
  source = updateComponentImports({
    source,
    j,
    componentName: 'Bleed',
    importSpecifier: j.importSpecifier(j.identifier('Bleed')),
    importSource: '@vtex/shoreline',
  })

  return source
}
