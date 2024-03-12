# @vtex/raccoon-next

To learn more about this package, read our internal documentation at: https://shoreline.vtex.com/raccoon/getting-started.

## Development

Use one of the examples available on the `examples` folder to test your changes.

Once you made changes to the package, run the command below to build it and make it available to the example project through [Turbo's ability to link dependencies within this monorepo](https://turbo.build/repo/docs/core-concepts/monorepos/task-dependencies)

```bash
pnpm build
```

Get back to the example project, build it (since it's not built along with the packages), and run the development server to see your changes in action.

```bash
pnpm i
pnpm build
pnpm dev
```

## Contributing

If you found a way of improving this package, please open a pull request and we will be happy to review it.
