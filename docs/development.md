# Contributor's Guide 🛠️

Interested in improving Zest? Here is how to get started.

### Table of Contents
*   [Project Architecture](#project-architecture)
*   [Local Setup](#local-setup)
*   [Available Scripts](#available-scripts)

---

[← Previous: Configuration](./configuration.md) | [Next: Breaking Changes →](./breaking-changes.md)

---

### Project Architecture
Zest is built with React, TypeScript, and CSS Modules.

*   `src/UI/`: Contains the main components (`ZestResponsiveLayout`, `SidePane`, `DetailPane`).
*   `src/hooks/`: Custom logic for hydration, mobile detection, and outside-click handling.
*   `src/Styles/`: Scoped CSS styles using CSS Modules.

---

### Local Setup
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Jattac/jattac.libs.web.zest-responsive-layout.git
    cd jattac.libs.web.zest-responsive-layout
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Build the project:**
    ```bash
    npm run build
    ```

---

### Available Scripts
*   `npm run build`: Compiles the source code into `dist/` using Rollup. Generates ESM, CJS, and Type definitions.

---

[← Previous: Configuration](./configuration.md) | [Next: Breaking Changes →](./breaking-changes.md)
