# 🌊 Shoreline

Shoreline is a set of tools designed specifically to enhance the experience of designing and implementing apps for the VTEX Admin. The focus is on simplifying the application design, creation, coding, visualization, and QA processes.

## How to develop locally?

After you clone this repo, run the following commands to install the dependencies and build the packages:

```bash
pnpm i && pnpm build
```

Now you can run any of the following commands to run the desired package:

```bash
pnpm dev # [*] runs all packages at once <- don't use it
pnpm test # [*] runs all tests from all components at once
pnpm clean # [*] useful if you want to clean all packages at once - since they are linked, sometimes a rebase not followed by a fresh reinstall can cause some issues
pnpm dev:storybook # [components package] runs its storybook
pnpm dev:docs # [docs package] runs the docs website
```
