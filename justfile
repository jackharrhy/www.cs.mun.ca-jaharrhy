push-to-garfield:
  npm run build
  rsync --progress dist/ jaharrhy@garfield.cs.mun.ca:~/.www/ -r

push-most-to-garfield:
  npm run build
  rsync \
    --progress \
    --exclude "*" \
    --include '*/' \
    --include "*.html" \
    --include "*.css" \
    --include "*.js" \
    --include "*.xml" \
    dist/ \
    jaharrhy@garfield.cs.mun.ca:~/.www/ \
    -r
