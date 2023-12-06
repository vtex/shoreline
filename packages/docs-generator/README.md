# @vtex/docs-generator

## Description

This is a package that generates documentation from Typescript code. It uses TypeDoc under the hood to generate the documentation, and then it passes its output down the pipeline to typedoc-plugin-markdown, which generates markdown files from the JSON output.

Once the markdown files are generated, they are passed down to the docs-generator, which enables the client to customize the markdown files output, declare paths where these files should be placed, and also customize the output appearance.

## Usage

Configure the docs-generator.

WIP

From the root of this repository (vtex/shoreline), run:

```sh
pnpm run generate-docs
```
