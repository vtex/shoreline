/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Fragment } from 'react'
import Playground from '@theme/Playground'
import ReactLiveScope from '@theme/ReactLiveScope'
import CodeBlock from '@theme-init/CodeBlock'
import { TabPanel } from '@vtex/admin-ui'

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
      const Wrapper = props.optionId ? TabPanel : Fragment

      return (
        <Wrapper>
          <Playground scope={ReactLiveScope} {...props} />
        </Wrapper>
      )
    }

    return <CustomCodeBlock Component={Component} {...props} />
  }

  return WrappedComponent
}

export default withLiveEditor(CodeBlock)
