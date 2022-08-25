/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

// disable footer
function Footer() {
  return (
    <footer
      style={{
        height: 0,
      }}
    />
  )
}

export default React.memo(Footer)
