# Figma Code Connect

This folder contains the repo-side setup for connecting Shoreline React components to Figma Dev Mode with Code Connect.

## How it works

- `shoreline-components.json` is the source manifest for Shoreline component mappings.
- `scripts/generate-code-connect.mjs` reads that manifest and writes publishable `.figma.ts` Code Connect template files into `generated/`.
- Components without a `figmaUrl` are skipped, so the repo can keep a full mapping checklist without breaking `figma connect publish`.

## Adding a missing component

1. In Figma, select the main component or component set.
2. Copy its node URL.
3. Paste the URL into the matching `figmaUrl` field in `shoreline-components.json`.
4. Adjust `props`, `children`, `selfClosing`, or `imports` if the default snippet should be richer.
5. Run:

```sh
pnpm figma:connect:build
```

6. Publish with a shell that has Figma CLI access:

```sh
FIGMA_ACCESS_TOKEN=<token> pnpm figma:connect:publish
```

The token needs permission to publish Code Connect data for the Shoreline Figma library.

## Notes

- Leave `figmaUrl` blank for components that are already connected through Code Connect UI unless you intend to replace that connection with the CLI version.
- Keep `source` pointed at the implementation file, but keep examples importing from `@vtex/shoreline`.
- Prefer mapping high-level public components first. Smaller composition primitives can be connected later when they appear as reusable Figma components.
- Once a component has real Figma property names, add a dedicated template for it if the generic snippet is not expressive enough.
