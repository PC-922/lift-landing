# LIFT Landing

Standalone Spanish and English landing page for LIFT. The project contains no Lift Web application source. The entry page is static and can be published with GitHub Pages.

## Replace the brand and app previews

- Replace `assets/lift-wordmark.svg` to change the header logo.
- Put real screen captures in `assets/screens/` and set their paths in `src/config.js` under `previews.routine`, `previews.workout`, and `previews.stats`. Suggested paths are `assets/screens/routine.png`, `assets/screens/workout.png`, and `assets/screens/stats.png`. Leave a value empty to show the built-in preview instead.
- Set `links.iosAppStore` in `src/config.js` when the App Store page is available. Until then, the white iOS button stays visible but inactive.
- `links.web` is the destination for “Abrir Lift Web”. It points to `web/`, which resolves to `/web/` on a root domain.

The preview captures should contain only the app screen. The landing page supplies the phone frame.

## Run locally

This is a dependency-free static page. Open `index.html` in a browser or serve this directory with any static file server.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes this project as the site root. In the repository settings, choose **GitHub Actions** as the Pages source. Add the custom domain in Pages settings after the domain is finalized.

GitHub Pages can publish only one site for a custom domain. To serve Lift Web at `/web/` on the same domain, its build output must be included under this deployment's `web/` directory (or a reverse proxy must route that path). The source code remains in its separate Lift Web project. The `/web/` entry is ready in the landing config; deployment composition is a separate integration step.
