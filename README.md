# LIFT Landing

Standalone Spanish and English landing page for LIFT. The project contains no Lift Web application source. The entry page is static and can be published with GitHub Pages.

## Replace the brand and app previews

- The header uses the app icon at `assets/real-app/lift-app-icon.jpeg`; replace this file or change `logo` in `src/config.js`.
- The carousel reads its images from the `screenshots` array in `src/config.js`. Replace those files or update their `src` values. Each entry's `altKey` points to accessible Spanish and English descriptions in `src/main.js`.
- The carousel advances every 5.6 seconds. People can swipe, choose a dot, or use the previous/next and pause/play controls. A manual change pauses autoplay until it is resumed; it also pauses while hovered, while keyboard focus is inside, when the page is in the background, and when reduced motion is requested.
- Set `links.iosAppStore` in `src/config.js` when the App Store page is available. Until then, the white iOS button stays visible but inactive.
- `links.web` is the destination for “Abrir Lift Web”. It points to `https://pc-922.github.io/lift-web-pages/`, the separate LIFT Web project site.

The screenshots are the original app captures; the landing page supplies the phone frame.

## Run locally

This is a dependency-free static page. Open `index.html` in a browser or serve this directory with any static file server.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes this project as the site root. In the repository settings, choose **GitHub Actions** as the Pages source. Add the custom domain in Pages settings after the domain is finalized.

The landing site and the web app are independent GitHub Pages project sites. Publish the app first and verify its public URL before changing the landing link.

## iOS privacy and support pages

The static bilingual pages live at `privacy/` and `support/` and are linked from the existing landing footer. Keep them in the same landing change; the Pages workflow publishes them from the site artifact. They use the contact supplied by PC922. Review the privacy copy and confirm the exact Pages URL before authorizing publication. Use the Pages deployment URL as the base; for a project site it includes the repository path. Pass the resulting HTTPS page URLs as `LIFT_PRIVACY_URL` and `LIFT_SUPPORT_URL` when building the iOS release. Do not assume the project URL is live until both routes resolve publicly.

The separate LIFT Web privacy notice lives at `privacy-web/` and uses the same landing stylesheet. The web app links to this public page; do not move the existing iOS `privacy/` URL.
