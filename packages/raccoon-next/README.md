# @vtex/raccoon-next

To learn more about this package, read our internal documentation at: https://shoreline.vtex.com/raccoon/getting-started.

## Development guidelines

While making changes to this package you want to see them reflected upon real applications. For this reason, to develop @vtex/raccoon-next you will use one, or all the examples available on the `examples` folder to test the changes you make.

Below you will find a list of commands that streamline the development process for each use case:

```bash
# Builds all raccoon packages in parallel > builds all examples in parallel > watches for
# changes in all raccoon packages and starts the development server for the examples
# all in parallel. This is the most convenient command to test raccoon applications.
# This command doesn't link the examples to VTEX.
pnpm run dev:raccoon-examples

# This command links the examples to VTEX
pnpm run dev:raccoon-examples:link
```

## Contributing

If you found a way of improving this package, please open a pull request or issue and we will be happy to review it.
