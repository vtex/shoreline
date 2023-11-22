function replaceDeclaration(declaration, newValue, newProp) {
  if (declaration.raws.value) {
    declaration.raws.prop.raw = newProp || declaration.prop
    declaration.raws.value.raw = newValue
  } else {
    declaration.prop = newProp || declaration.prop
    declaration.value = newValue
  }
}

module.exports = {
  replaceDeclaration,
}
