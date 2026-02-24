# Project Workflow

## Release Procedure

When instructed to release:

1.  **Bump Version:** Update `package.json` version following semver (e.g., `npm version patch|minor|major --no-git-tag-version`).
2.  **Verify Build:** Run `npm run build` to ensure the project compiles correctly and the distribution files are updated.
3.  **Update Documentation:**
    -   Sync any new features to `README.md` and relevant files in `docs/`.
    -   Move the latest fixes from `conductor/fixes.md` to a dedicated "Fixes" section in the documentation or a `CHANGELOG.md` (if applicable).
    -   Ensure `conductor/fixes.md` is updated with the released version number.
4.  **Commit & Tag:** 
    -   Commit all changes with a clear release message (e.g., `git add . && git commit -m "chore: release v2.1.0"`).
    -   Create a lightweight or annotated git tag matching the version (e.g., `git tag v2.1.0`).
5.  **Push:** Push the branch and the new tag to the remote repository (`git push origin master --tags`).
6.  **Summary:** Provide a summary of the release to the user.
