# BytePlus ModelArk Integration Notes

## Final decision

The CORTEX shell should not embed a private provider key in `index.html`, `404.html`, or any asset pushed to GitHub Pages.

## Why

1. GitHub Pages is a public static host, so any browser-callable secret becomes a public secret.
2. The ModelArk Coding Plan documentation warns that coding-plan quota is intended for supported AI programming tools and that direct API use is billed independently. A public learning app should not rely on that path as its live production connector.
3. The production-safe route is a proxy that holds the private key outside the browser.

## Current CORTEX architecture

- Page 20 is now the orchestration surface for text, visual, audio, and integration routing.
- `ai_proxy/local_modelark_proxy.mjs` is the safe local bridge for development and later backend deployment.
- `ai_workspace.local.example.js` is the local, gitignored runtime-config template.

## Recommended release path

1. Keep GitHub Pages secret-free.
2. Use a secure proxy with a standard ModelArk API entitlement or another compliant provider contract.
3. Let the shell talk only to the proxy.
4. Route text, image, video, and audio tasks through the proxy rather than directly from the client.
