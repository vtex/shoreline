/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import Playground from '@theme/Playground'
import ReactLiveScope from '@theme/ReactLiveScope'
import CodeBlock from '@theme-init/CodeBlock'
import FormikPreview from '../../components/FormikPreview'

import CustomCodeBlock from './CustomCodeBlock'

const withLiveEditor = (Component) => {
  function WrappedComponent(props) {
    if (props.isFormik) {
      return (
        <FormikPreview>
          <Playground scope={ReactLiveScope} {...props} />
        </FormikPreview>
      )
    }

    if (props.live) {
      return <Playground scope={ReactLiveScope} {...props} />
    }

    return <CustomCodeBlock Component={Component} {...props} />
  }

  return WrappedComponent
}

export default withLiveEditor(CodeBlock)



