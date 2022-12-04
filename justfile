push-to-garfield:
  npm run build
  rsync dist/* jaharrhy@garfield.cs.mun.ca:~/.www/ -r

push-most-to-garfield:
  npm run build
  rsync \
    --exclude "*" \
    --include '*/' \
    --include "*.html" \
    --include "*.css" \
    --include "*.js" \
    --include "*.xml" \
    dist/* \
    jaharrhy@garfield.cs.mun.ca:~/.www/ \
    -r
