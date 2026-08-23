/**
 * Resolves a public/ asset against Vite's base path, so the same code works
 * under the GitHub Pages sub-path and at a domain root.
 */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
