# @vtex/raccoon-dev

This library simply grabs the VTEX credentials from the `vtex` CLI, writes them on a hidden `.venv/.env` file and loads them into the Next.js application environment.

## Usage

First, make sure you've got the `vtex` CLI installed on your machine:

```bash
vtex --version
```

Create any Next.js project and replace your `package.json`'s `dev` script with the following:

```diff json
    "scripts: {
-        "dev": "next dev",
+        "dev": "raccoon-dev",
```

When you run the `dev` script from your terminal, the `raccoon-dev` library will make your VTEX credentials available to your Next.js application while in development as:

```js
process.env.NEXT_PUBLIC_VTEX_ACCOUNT
process.env.NEXT_PUBLIC_VTEX_WORKSPACE
process.env.NEXT_PUBLIC_VTEX_TOKEN
```
