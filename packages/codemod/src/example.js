function replaceImports(source, j, componentName) {
  return j(source)
    .find(j.ImportSpecifier, { imported: { name: componentName } })
    .forEach((p) => {
      p.value.imported.name = 'Box'
    })
    .toSource()
}

module.exports = function (file, { jscodeshift: j }) {
  let { source } = file

  source = replaceImports(source, j, 'tag')

  return source
}
