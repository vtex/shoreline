<a href="https://shoreline.storybook.vtex.com" target="_blank"><img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg"></a>

# 🌊 Shoreline <!-- omit in toc -->

Shoreline is a set of tools designed specifically to enhance the experience of designing and implementing apps for the VTEX Admin. The focus is on simplifying the application design, creation, coding, visualization, and QA processes.

- [Install and build dependencies](#install-and-build-dependencies)
- [Run a command](#run-a-command)
- [Contribute to this repo](#contribute-to-this-repo)

## Install and build dependencies

```bash
pnpm i && pnpm build
```

## Run a command

```bash
pnpm test # [*] runs all tests from all components at once
pnpm clean # [*] useful if you want to clean all packages at once - since they are linked, sometimes a rebase not followed by a fresh reinstall can cause some issues
pnpm dev:storybook # [components package] runs its storybook alongside the styles package
pnpm dev:docs # [docs package] runs the docs website
```

## Contribute to this repo

Pull requests are welcome, please check our [development guide](https://shoreline.vtex.com/guides/engineering-contribution/development-guideline)!
