// const testMixins: MixinDictionary = {
//   mixin: (val) => ({
//     prop: val,
//   }),
// }

// const foundOnDefault = findMixin('marginX')
// const found = findMixin('mixin', testMixins)

// expect(typeof foundOnDefault).toBe('function')
// expect(foundOnDefault?.('1rem')).toStrictEqual({
//   marginLeft: '1rem',
//   marginRight: '1rem',
// })
// expect(typeof found).toBe('function')
// expect(found?.('value')).toStrictEqual({
//   prop: 'value',
// })
