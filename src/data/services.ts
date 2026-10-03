export type Audience = 'all' | 'her' | 'him'

export type Category = 'Hair' | 'Colour' | 'Skin' | 'Grooming' | 'Nails' | 'Bridal'

export type Service = {
  id: string
  name: string
  blurb: string
  category: Category
  audience: Audience
  minutes: number
  price: number
  from?: boolean
}

export const categories: Category[] = ['Hair', 'Colour', 'Skin', 'Grooming', 'Nails', 'Bridal']

export const services: Service[] = [
  { id: 'cut-short', name: 'Precision cut', blurb: 'Fades, crops, textured tops. Wash and finish included.', category: 'Hair', audience: 'him', minutes: 40, price: 700 },
  { id: 'cut-long', name: 'Signature cut & style', blurb: 'Consultation, cut, wash and a blow-dry you can recreate.', category: 'Hair', audience: 'her', minutes: 60, price: 1400 },
  { id: 'cut-kids', name: 'Kids cut', blurb: 'Under 12s. Patient hands, no tears.', category: 'Hair', audience: 'all', minutes: 30, price: 450 },
  { id: 'blowdry', name: 'Blow-dry & finish', blurb: 'Smooth, bouncy or beach waves.', category: 'Hair', audience: 'all', minutes: 45, price: 900 },
  { id: 'keratin', name: 'Keratin ritual', blurb: 'Frizz control that lasts up to four months.', category: 'Hair', audience: 'all', minutes: 150, price: 5500, from: true },
  { id: 'spa', name: 'Scalp detox & hair spa', blurb: 'Clarifying scrub, steam and deep mask.', category: 'Hair', audience: 'all', minutes: 60, price: 1600 },

  { id: 'root', name: 'Root touch-up', blurb: 'Ammonia-free, up to 1.5 inches of regrowth.', category: 'Colour', audience: 'all', minutes: 60, price: 1500 },
  { id: 'global', name: 'Global colour', blurb: 'One shade, root to tip, with gloss.', category: 'Colour', audience: 'all', minutes: 120, price: 3800, from: true },
  { id: 'balayage', name: 'Balayage', blurb: 'Hand-painted, soft grow-out. Toner included.', category: 'Colour', audience: 'her', minutes: 180, price: 6500, from: true },
  { id: 'grey', name: 'Grey blending', blurb: 'Natural-looking coverage for hair and beard.', category: 'Colour', audience: 'him', minutes: 45, price: 1800 },
  { id: 'fashion', name: 'Fashion colour', blurb: 'Pastels, coppers, streaks. Pre-lightening extra.', category: 'Colour', audience: 'all', minutes: 150, price: 4500, from: true },

  { id: 'hydra', name: 'Hydra facial', blurb: 'Cleanse, extract, hydrate. Visible glow on day one.', category: 'Skin', audience: 'all', minutes: 60, price: 2800 },
  { id: 'detan', name: 'De-tan cleanup', blurb: 'For sun-tired skin. Face and neck.', category: 'Skin', audience: 'all', minutes: 40, price: 1100 },
  { id: 'threading', name: 'Brows & threading', blurb: 'Shape and clean-up.', category: 'Skin', audience: 'all', minutes: 15, price: 150 },

  { id: 'beard', name: 'Beard sculpt', blurb: 'Line-up, shape, hot towel and oil.', category: 'Grooming', audience: 'him', minutes: 30, price: 450 },
  { id: 'shave', name: 'Hot towel shave', blurb: 'Straight razor, the old-school way.', category: 'Grooming', audience: 'him', minutes: 30, price: 550 },
  { id: 'groom', name: 'Groom package', blurb: 'Cut, beard, facial and manicure before the big day.', category: 'Grooming', audience: 'him', minutes: 150, price: 4500 },
  { id: 'wax', name: 'Waxing', blurb: 'Rica wax. Arms, legs, full body.', category: 'Grooming', audience: 'all', minutes: 45, price: 900, from: true },

  { id: 'mani', name: 'Manicure', blurb: 'Shape, cuticle care, polish.', category: 'Nails', audience: 'all', minutes: 40, price: 700 },
  { id: 'pedi', name: 'Spa pedicure', blurb: 'Soak, scrub, massage, polish.', category: 'Nails', audience: 'all', minutes: 50, price: 950 },
  { id: 'gel', name: 'Gel extensions', blurb: 'Lasts three weeks. Nail art extra.', category: 'Nails', audience: 'her', minutes: 90, price: 2200, from: true },

  { id: 'bridal-trial', name: 'Bridal trial', blurb: 'Hair and makeup trial, adjusted until it is right.', category: 'Bridal', audience: 'her', minutes: 120, price: 3500 },
  { id: 'bridal', name: 'Bridal hair & makeup', blurb: 'On the day, at the salon or your venue.', category: 'Bridal', audience: 'her', minutes: 240, price: 18000, from: true },
  { id: 'party', name: 'Party makeup', blurb: 'Sangeet, reception, or just a big night out.', category: 'Bridal', audience: 'her', minutes: 75, price: 3200 },
]

export const inr = (n: number) => '₹' + n.toLocaleString('en-IN')

export const duration = (m: number) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ''}`)
