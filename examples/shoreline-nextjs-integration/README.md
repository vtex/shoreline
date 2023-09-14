This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) that makes use of Shoreline's [Next.js Integration](https://github.com/vtex/shoreline/tree/dev/packages/raccoon-next) and [Design System](https://github.com/vtex/shoreline/tree/dev/packages/admin-ui).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and [https://localhost--teamadmin.myvtex.com/admin/rocket] (https://localhost--teamadmin.myvtex.com/admin/rocket) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## @raccoon/next package development 

If you are developing the `@raccoon/next` package, run the command below after making changes to it:

```bash
pnpm build
```

This will build the package and make it available to the example project through [Turbo's ability to link dependencies within this monorepo](https://turbo.build/repo/docs/core-concepts/monorepos/task-dependencies).

## Learn More

To learn more about Shoreline's Next.js Integration, take a look at the following resources:

- [NextJS Integration Documentation](https://github.com/vtex/shoreline/tree/dev/packages/raccoon-next)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

> Deploy on the provider that is best suited for your use case
