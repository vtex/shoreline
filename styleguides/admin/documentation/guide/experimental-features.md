---
path: /guide/experimental/
experimental: true
---

# Experimental features

<blockquote experimental="true">

Experimental features may introduce **breaking changes** or be **removed altogether** in a patch and minor versions without notice. The simple act of promoting an experimental feature to its stable version would break your code if you are using it as the feature would be renamed.

</blockquote>

## Releasing an experimental package

Follow the instructions below to release an experimental feature.

1. Merge your current changes into the `experimental` branch, on Github.
2. Then run the following command: `yarn publish:experimental`
