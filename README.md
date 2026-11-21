# LIFT Landing

Standalone Spanish and English landing page for LIFT. The project contains no Lift Web application source. The entry page is static and can be published with GitHub Pages.

## Replace the brand and app previews

- The header uses the app icon at `assets/real-app/lift-app-icon.jpeg`; replace this file or change `logo` in `src/config.js`.
- The carousel reads its images from the `screenshots` array in `src/config.js`. Replace those files or update their `src` values. Each entry's `altKey` points to accessible Spanish and English descriptions in `src/main.js`.
- The carousel advances every 5.6 seconds. People can swipe, choose a dot, or use the previous/next and pause/play controls. A manual change pauses autoplay until it is resumed; it also pauses while hovered, while keyboard focus is inside, when the page is in the background, and when reduced motion is requested.
- Set `links.iosAppStore` in `src/config.js` when the App Store page is available. Until then, the white iOS button stays visible but inactive.
- `links.web` is the destination for “Abrir Lift Web”. It points to `web/`, which resolves to `/web/` on a root domain.

The screenshots are the original app captures; the landing page supplies the phone frame.

## Run locally

This is a dependency-free static page. Open `index.html` in a browser or serve this directory with any static file server.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes this project as the site root. In the repository settings, choose **GitHub Actions** as the Pages source. Add the custom domain in Pages settings after the domain is finalized.

GitHub Pages can publish only one site for a custom domain. To serve Lift Web at `/web/` on the same domain, its build output must be included under this deployment's `web/` directory (or a reverse proxy must route that path). The source code remains in its separate Lift Web project. The `/web/` entry is ready in the landing config; deployment composition is a separate integration step.
