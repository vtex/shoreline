# bin/bash
if git log -1 --pretty=%B | grep -q "\[skip-ci\]"; then
    exit 0
fi
