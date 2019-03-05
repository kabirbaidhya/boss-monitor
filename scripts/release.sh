#!/bin/bash
# Release Management and Changelog generation script.

changelog() {
  # NOTE: This requires github_changelog_generator to be installed.
  # https://github.com/skywinder/github-changelog-generator

  if [ -z "$NEXT" ]; then
      NEXT="Next"
  fi

  echo "Generating changelog upto version: $NEXT"
  github_changelog_generator \
    --pr-label "**Improvements:**" \
    --issue-line-labels=ALL \
    --future-release="$NEXT" \
    --release-branch=master \
    --exclude-labels=unnecessary,duplicate,question,invalid,wontfix
}

# Run command received from args.
$1
