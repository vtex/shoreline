# @vtex/raccoon-dev

This is the development setup for Next.js apps to run locally while accessing VTEX services, not necessarily within the Admin, like what Raccoon currently does. This is a standalone project that simply grabs the VTEX credentials from the `vtex` CLI and load them into the environment variables so that the Next.js app can access them.

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
