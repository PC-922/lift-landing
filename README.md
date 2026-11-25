# LIFT Landing

Página oficial de LIFT, la app para registrar tus entrenamientos.

## Replace the brand and app previews

- The header uses the app icon at `assets/real-app/lift-app-icon.jpeg`; replace this file or change `logo` in `src/config.js`.
- The carousel reads its images from the `screenshots` array in `src/config.js`. Replace those files or update their `src` values. Each entry's `altKey` points to accessible Spanish and English descriptions in `src/main.js`.
- The carousel advances every 4.5 seconds. You can swipe, choose a dot, or use the previous and next buttons. Autoplay resumes after manual interaction and pauses when the page is hidden or reduced motion is enabled.
- Set `links.iosAppStore` in `src/config.js` when the App Store page is available. Until then, the white iOS button stays visible but inactive.
- `links.web` is the destination for “Abrir Lift Web”. It points to `https://pc-922.github.io/lift/web/`, the LIFT Web app.

The screenshots are the original app captures; the landing page supplies the phone frame.

## Run locally

This is a dependency-free static page. Open `index.html` in a browser or serve this directory with any static file server.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes this project as the site root. In the repository settings, choose **GitHub Actions** as the Pages source. Add the custom domain in Pages settings after the domain is finalized.

The public deployment combines this landing at `/lift/` with the production web build at `/lift/web/`. The `PC-922/lift` publishing workflow packages both together.

## iOS privacy and support pages

The static bilingual pages live at `privacy/` and `support/` and are linked from the existing landing footer. Keep them in the same landing change; the Pages workflow publishes them from the site artifact. They use the contact supplied by PC922. Review the privacy copy and confirm the exact Pages URL before authorizing publication. Use the Pages deployment URL as the base; for a project site it includes the repository path. Pass the resulting HTTPS page URLs as `LIFT_PRIVACY_URL` and `LIFT_SUPPORT_URL` when building the iOS release. Do not assume the project URL is live until both routes resolve publicly.

The separate LIFT Web privacy notice lives at `privacy-web/` and uses the same landing stylesheet. The web app links to this public page; do not move the existing iOS `privacy/` URL.
