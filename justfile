push-to-garfield:
  npm run build
  rsync dist/* jaharrhy@garfield.cs.mun.ca:~/.www/ -r
