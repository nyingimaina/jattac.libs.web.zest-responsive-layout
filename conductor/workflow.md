# Project Workflow

## Release Procedure

When instructed to release:

1.  **Bump Version:** Update `package.json` version following semver (e.g., `npm version patch|minor|major --no-git-tag-version`).
2.  **Verify Build:** Run `npm run build` to ensure the project compiles correctly and the distribution files are updated.
3.  **Update Documentation:**
    -   Sync any new features to `README.md` and relevant files in `docs/`.
    -   Move the latest fixes from `conductor/fixes.md` to a dedicated "Fixes" section in the documentation or a `CHANGELOG.md` (if applicable).
    -   Ensure `conductor/fixes.md` is updated with the released version number.
4.  **Summary:** Provide a summary of the release to the user.
