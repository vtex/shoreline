const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const transform = require('../set-to-stack')

describe('Switch for Stack', () => {
  defineInlineTest(
    transform,
    {},
    '<Set />',
    '<Stack direction="row" />',
    'choose stack w/ row'
  )

  defineInlineTest(
    transform,
    {},
    '<Set orientation="horizontal" />',
    '<Stack direction="row" />',
    'choose stack w/ row'
  )

  defineInlineTest(
    transform,
    {},
    '<Set orientation="vertical" />',
    '<Stack />',
    'choose stack w/column'
  )
})

describe('Spacing to space', () => {
  defineInlineTest(
    transform,
    {},
    '<Set spacing="1" />',
    '<Stack space="1" direction="row" />',
    'inline w/ space'
  )

  defineInlineTest(
    transform,
    {},
    '<Set orientation="horizontal" spacing="1" />',
    '<Stack direction="row" space="1" />',
    'stack w/ row & space'
  )

  defineInlineTest(
    transform,
    {},
    '<Set orientation="vertical" spacing="1" />',
    '<Stack space="1" />',
    'stack w/ column & space'
  )
})
