#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")/.."

args=(--dry-run)
case "${1:-}" in
  "") ;;
  --apply) args=() ;;
  *) printf 'Usage: bash scripts/deploy.sh [--apply]\n' >&2; exit 2 ;;
esac

test -s dist/index.html
for path in downloads sounds 3d images play dl files for-neocities phap/bot terranova aoc/2023/prelude; do
  if ! test -d "dist/$path"; then
    printf 'Missing archived public files in dist/%s; refusing deployment.\n' "$path" >&2
    exit 1
  fi
done

rsync -a --checksum --no-owner --no-group --delete-delay --itemize-changes --info=progress2 --stats \
  --chmod=Du+rwx,Dgo+rx,Fu+rw,Fgo+r \
  --exclude=/.plan \
  -e 'ssh -o ServerAliveInterval=30 -o ServerAliveCountMax=6' \
  "${args[@]}" dist/ jaharrhy@garfield.cs.mun.ca:/users/labnet4/st4/jaharrhy/.www/
