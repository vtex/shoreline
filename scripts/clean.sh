#!/bin/bash

root_entry="./"

# Delete node_modules folders
find "$root_entry" -type d -name "node_modules" -exec rm -rf {} +

# Delete .turbo folders
find "$root_entry" -type d -name ".turbo" -exec rm -rf {} +

# Delete pnpm-lock.yaml file
find "$root_entry" -type f -name "pnpm-lock.yaml" -exec rm -f {} +

# Delete .next folders
find "$root_entry" -type d -name ".next" -exec rm -rf {} +

# Delete dist folders
find "$root_entry" -type d -name "dist" -exec rm -rf {} +

echo "Deleted node_modules, dist, .next, .turbo and pnpm-lock.yaml from all packages"
