import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Afterthoughts',
    short_name: 'Afterthoughts',
    description: "Books, films, and music I've carried. A personal archive of things that stayed.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF8',
    theme_color: '#FAFAF8',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
