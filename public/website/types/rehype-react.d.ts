/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
declare module 'rehype-react' {
  import * as React from 'react'

  type Options = {
    createElement: typeof React.createElement
    components: {
      [tagName: string]: React.ComponentType<any>
    }
  }

  export default class RehypeReact {
    constructor(options: Options)

    Compiler: (node: any) => any
  }
}
