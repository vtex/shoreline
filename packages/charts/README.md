# 🌊📊 Shoreline Charts

[Shoreline](https://github.com/vtex/shoreline/tree/main)'s data visualization library, featuring a standard set of charts and their variants, built with Apache Echarts.

<img width="849" height="342" alt="Screenshot_21-Aug_18-02-39_google-chrome" src="https://github.com/user-attachments/assets/aa2a4d5a-200f-4481-aa60-192d30e79a32" />



## Install and build
`shoreline-components` and `echarts` are peer dependencies of `shoreline-charts`
```sh
pnpm add @vtex/shoreline echarts @vtex/shoreline-charts
```
## Run
``` sh
pnpm test # [*] runs all tests from all components at once
pnpm clean # [*] useful if you want to clean all packages at once - since they are linked, sometimes a rebase not followed by a fresh reinstall can cause some issues
pnpm dev:storybook # [components package] runs its storybook alongside the styles package
pnpm dev:docs # [docs package] runs the docs website
```

## Contribute to this repo

Pull requests are welcome, please check our
[development guideline](https://shoreline.vtex.com/guides/code/development-guideline)!
