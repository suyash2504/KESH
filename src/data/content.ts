export type Stylist = {
  id: string
  name: string
  role: string
  years: number
  specialties: string[]
  photo: string
  focus?: string
}

export const stylists: Stylist[] = [
  { id: 'meera', name: 'Meera Kapoor', role: 'Creative director', years: 12, specialties: ['Balayage', 'Lived-in colour'], photo: '1580489944761-15a19d654956' },
  { id: 'kabir', name: 'Kabir Sethi', role: 'Senior barber', years: 9, specialties: ['Skin fades', 'Beard design'], photo: '1729157661483-ed21901ed892', focus: '50% 20%' },
  { id: 'ananya', name: 'Ananya Rao', role: 'Bridal & makeup lead', years: 8, specialties: ['Bridal', 'Party looks'], photo: '1761498443962-1f00eed12137', focus: '50% 20%' },
  { id: 'arjun', name: 'Arjun Mehta', role: 'Texture specialist', years: 7, specialties: ['Curly cuts', 'Keratin'], photo: '1590335745924-8430837a573d', focus: '50% 25%' },
]

export type Shot = { id: string; label: string; tall?: boolean }

export const gallery: Shot[] = [
  { id: '1605497788044-5a32c7078486', label: 'Textured crop & blow-dry', tall: true },
  { id: '1605980625982-b128a7e7fde2', label: 'Foil balayage, in progress' },
  { id: '1787616291784-0de8970e3ad4', label: 'Curly cut with shaved design', tall: true },
  { id: '1785456411888-c2e842552820', label: 'Soft ombré' },
  { id: '1599011176306-4a96f1516d4d', label: 'Beard sculpt, scissor finish' },
  { id: '1779350676620-fde279b1d023', label: 'Sleek glass bob', tall: true },
  { id: '1593702275687-f8b402bf1fb5', label: 'Classic taper' },
  { id: '1785456390070-9960e3997066', label: 'Beach-wave styling' },
]

export type Offer = { tag: string; title: string; price: string; note: string; perks: string[]; featured?: boolean }

export const offers: Offer[] = [
  { tag: 'First visit', title: 'New here?', price: '15% off', note: 'Any service, first booking only.', perks: ['Free hair & scalp consultation', 'Use code HELLOKESH', 'Valid on weekdays'] },
  { tag: 'Membership', title: 'KESH Circle', price: '₹2,999 / quarter', note: 'Pays for itself in two visits.', perks: ['20% off every service', 'One free blow-dry or beard sculpt a month', 'Priority weekend slots', 'Birthday hair spa on us'], featured: true },
  { tag: 'Bring a friend', title: 'Chair for two', price: '₹500 off each', note: 'Book two services together.', perks: ['Couples, besties, father & son', 'Side-by-side chairs', 'Complimentary cold brew'] },
]

export type Review = { name: string; text: string; service: string }

export const reviews: Review[] = [
  { name: 'Rohan M.', service: 'Precision cut', text: 'Best fade I have had in this city. Kabir actually listens, and the hot towel at the end is a whole experience.' },
  { name: 'Shreya P.', service: 'Balayage', text: 'Meera took two photos and somehow got exactly what was in my head. Four months later it is still growing out beautifully.' },
  { name: 'Aditya & Neha', service: 'Chair for two', text: 'We booked side-by-side chairs on a Saturday. Neha got a keratin, I got a beard sculpt. Easiest date we have had.' },
  { name: 'Farah K.', service: 'Bridal hair & makeup', text: 'Ananya and team did my sangeet and wedding looks. Calm, on time, and nothing budged through ten hours of dancing.' },
  { name: 'Vikram S.', service: 'Grey blending', text: 'Wanted the grey softened, not erased. They nailed it. Nobody at work could tell, they just said I looked rested.' },
  { name: 'Ira D.', service: 'Curly cut', text: 'First salon that did not try to straighten my curls. Arjun cut them dry, curl by curl. I have finally found my person.' },
]

export const hours = [
  ['Mon – Fri', '10:00 am – 9:00 pm'],
  ['Saturday', '9:00 am – 9:30 pm'],
  ['Sunday', '10:00 am – 7:00 pm'],
] as const

export const contact = {
  address: ['12, 100 Feet Road', 'Indiranagar, Bengaluru 560038'],
  phone: '+91 98XXX XXX07',
  email: 'hello@kesh.studio',
  mapQuery: 'Indiranagar 100 Feet Road Bengaluru',
}
