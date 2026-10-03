// Placeholder photography, all under the Unsplash License (free to use, no
// attribution required). Hotlinked through Unsplash's image CDN as their
// guidelines ask. Replace with the salon's own shoot before launch.

export const unsplash = (id: string, w = 1200, q = 78) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`

export const photos = {
  hero: '1605369572399-05d8d64a0f6e',
  heroInset: '1602956280248-66d6efd0ba7d',
  studio: '1695527081827-fdbc4e77be9b',
  studioShelf: '1695527081782-33e110235ade',
} as const
