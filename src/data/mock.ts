import towers from '../assets/img/towers.jpg'
import football from '../assets/img/football.jpg'
import clinic from '../assets/img/clinic.jpg'
import pothole from '../assets/img/pothole.jpg'
import market from '../assets/img/market.jpg'
import water from '../assets/img/water.jpg'
import barber from '../assets/img/barber.jpg'

export const img = { towers, football, clinic, pothole, market, water, barber }

/* ---------------------------------- News --------------------------------- */

export interface Article {
  id: string
  category: string
  headline: string
  dek: string
  byline: string
  time: string
  area: string
  image?: string
  breaking?: boolean
  readTime: number
  body: string[]
}

export const articles: Article[] = [
  {
    id: 'a1',
    category: 'News',
    headline: 'Orlando Towers facelift puts 40 local painters back on payroll',
    dek: 'The landmark’s first full repaint in nine years will be done entirely by crews hired from Orlando, Pimville and Diepkloof, the ward office confirmed.',
    byline: 'Naledi Khumalo',
    time: '2h ago',
    area: 'Orlando',
    image: towers,
    breaking: true,
    readTime: 4,
    body: [
      'The two cooling towers that define the Soweto skyline will get their first full repaint in nine years — and every brush stroke will come from local hands.',
      'Ward 25 councillor’s office confirmed on Tuesday that the contractor appointed by the city must draw its 40-strong painting crew from Orlando, Pimville and Diepkloof, following months of pressure from community forums.',
      '“These towers are our Eiffel Tower,” said local forum chairperson Sipho Dlamini. “If money is being spent on them, it should be spent on the people who wake up under them.”',
      'Work is expected to begin next month and run for 14 weeks. The city says the murals’ design will be put to a public vote at the Orlando Communal Hall on 18 October.',
    ],
  },
  {
    id: 'a2',
    category: 'Community',
    headline: 'Diepkloof clinic queue cuts in half after new booking slip system',
    dek: 'A hand-numbered slip pilot, started by two nurses on their own initiative, has brought average waiting time down from five hours to just over two.',
    byline: 'Thabiso Molefe',
    time: '4h ago',
    area: 'Diepkloof',
    image: clinic,
    readTime: 3,
    body: [
      'A simple paper slip system — thought up by two nurses tired of watching patients wait all day — has halved queues at Diepkloof’s busiest clinic.',
      'Patients now take a numbered slip on arrival and receive an approximate slot, freeing them to run errands instead of sitting on benches from dawn.',
      'The provincial health department says it is “studying the pilot” for possible rollout to eleven other facilities in the region.',
    ],
  },
  {
    id: 'a3',
    category: 'Sport',
    headline: 'Pimville Young Stars one win from promotion play-off',
    dek: 'Sunday’s 2–1 comeback over Jabavu City was watched by an estimated 3,000 people packed around the dusty Marks Park touchlines.',
    byline: 'Karabo Sithole',
    time: '6h ago',
    area: 'Pimville',
    image: football,
    readTime: 3,
    body: [
      'Pimville Young Stars are ninety minutes away from the regional promotion play-offs after a raucous 2–1 comeback win over Jabavu City on Sunday.',
      'An estimated 3,000 supporters ringed the Marks Park pitch, with the winning goal — an 88th-minute header from 19-year-old striker Lwazi Ngcobo — sparking a pitch invasion that delayed the final whistle by ten minutes.',
      'The Stars travel to Eldorado Park this Saturday. A draw will be enough.',
    ],
  },
  {
    id: 'a4',
    category: 'Politics',
    headline: 'Ward 25 by-election date set for 12 November',
    dek: 'The IEC confirmed the date after the seat fell vacant last month. Four candidates have registered so far.',
    byline: 'Naledi Khumalo',
    time: '8h ago',
    area: 'Ward 25',
    readTime: 2,
    body: [
      'The Electoral Commission has set 12 November for the Ward 25 by-election, following the vacancy created last month.',
      'Four candidates had registered by close of business on Friday. Voter registration weekend for the ward is scheduled for 25–26 October at the usual stations.',
    ],
  },
  {
    id: 'a6',
    category: 'News',
    headline: 'Tankers on day nine: Diepkloof keeps queuing as repairs drag on',
    dek: 'Residents say the twice-daily tanker schedule is holding, but patience is wearing thin while Johannesburg Water chases a second burst upstream.',
    byline: 'Karabo Sithole',
    time: 'Yesterday',
    area: 'Diepkloof',
    image: water,
    readTime: 3,
    body: [
      'The water tankers are still coming twice a day — but so is the queue.',
      'Nine days after a burst main cut supply to three Diepkloof zones, Johannesburg Water says a second burst discovered upstream has delayed full restoration. Tankers remain stationed at Diepkloof Square and the Zone 4 Hall.',
      '“The tankers come, that much is true,” said Zone 4 resident Johanna Radebe, wheeling two 25-litre containers. “But a tap in your yard is not too much to ask.”',
    ],
  },
  {
    id: 'a5',
    category: 'Business',
    headline: 'Spaza owners form buying co-op to fight wholesale prices',
    dek: 'Sixty-two shop owners from across Soweto have pooled weekly orders, negotiating bulk rates they say will cut shelf prices by up to 9%.',
    byline: 'Thabiso Molefe',
    time: 'Yesterday',
    area: 'Orlando West',
    image: market,
    readTime: 5,
    body: [
      'Sixty-two spaza shop owners have formed a buying cooperative to negotiate wholesale prices directly with distributors, in what organisers call the biggest show of retail unity in Soweto in a decade.',
      'The co-op pools weekly orders for staples — maize meal, cooking oil, sugar, paraffin — and members say early rounds have cut their cost prices by up to 9%.',
      '“Alone, a wholesaler does not know you,” said founding member Maria Ndlovu, who has run her Orlando West shop for 21 years. “Sixty-two shops together, they phone you back.”',
      'The group meets every second Thursday at the YMCA and is open to new members.',
    ],
  },
]

export const newsCategories = ['All', 'News', 'Politics', 'Business', 'Sport', 'Community']

export const tickerItems = [
  'BREAKING · Orlando Towers repaint to use 40 local painters, ward office confirms',
  'CITY POWER · Planned outage Orlando East, Thu 09:00–14:00',
  'PIKITUP · Recycling collection in Diepkloof moves to Fridays from next week',
  'WARD 25 · By-election set for 12 November — registration 25–26 Oct',
]

/* ------------------------------ Government ------------------------------- */

export interface GovAlert {
  id: string
  /** who published it, e.g. "SASSA", "City Power" */
  department: string
  /** filter group shown on the Notices screen */
  source: 'SASSA' | 'UIF' | 'SEDA' | 'IEC' | 'City of Joburg'
  /** time-critical public-safety notice */
  priority: boolean
  title: string
  body: string
  time: string
  area: string
  /** paid = bought by the publishing body; free = published free as a community service */
  placement: 'paid' | 'free'
  attachment?: string
}

export const noticeSources = ['All', 'SASSA', 'UIF', 'SEDA', 'IEC', 'City of Joburg']

/* All notice text below is SAMPLE content for design review, not real notices. */
export const govAlerts: GovAlert[] = [
  {
    id: 'g1',
    department: 'Johannesburg Water',
    source: 'City of Joburg',
    priority: true,
    title: 'Burst main: water off in parts of Diepkloof Zone 3–5',
    body: 'A burst 450mm main has cut supply to Zones 3, 4 and 5. Repairs are under way. Tankers are stationed at Diepkloof Square and Zone 4 Hall until supply is restored, estimated 20:00 tonight.',
    time: '35 min ago',
    area: 'Diepkloof',
    placement: 'free',
  },
  {
    id: 'g2',
    department: 'City Power',
    source: 'City of Joburg',
    priority: true,
    title: 'Planned outage: Orlando East, Thursday 09:00–14:00',
    body: 'Scheduled maintenance on the Orlando East substation. Power will be off Thursday 09:00–14:00. Treat all installations as live during the outage.',
    time: '3h ago',
    area: 'Orlando East',
    placement: 'free',
  },
  {
    id: 'g8',
    department: 'IEC',
    source: 'IEC',
    priority: false,
    title: 'Check your registration and voting station before 4 November',
    body: 'SAMPLE: Local government elections are on Wednesday 4 November 2026. Confirm that you are registered and where you vote before election day, and take your ID with you.',
    time: 'Today',
    area: 'Soweto-wide',
    placement: 'free',
  },
  {
    id: 'g3',
    department: 'SASSA',
    source: 'SASSA',
    priority: false,
    title: 'Grant payment dates for November',
    body: 'SAMPLE: Older Persons grants from 3 Nov, Disability grants from 4 Nov, Children grants from 5 Nov. Collect at your usual pay point or use your bank card. Never pay anyone to speed up your grant.',
    time: 'Today',
    area: 'Soweto-wide',
    placement: 'free',
    attachment: 'Payment calendar · PDF',
  },
  {
    id: 'g4',
    department: 'UIF',
    source: 'UIF',
    priority: false,
    title: 'Check or claim your UIF benefit online: no queue needed',
    body: 'SAMPLE: Claims can be submitted online. If you need help, bring your ID and your last payslip to the Soweto labour centre. UIF never charges a fee, so beware of agents who ask for money.',
    time: 'Yesterday',
    area: 'Soweto-wide',
    placement: 'free',
  },
  {
    id: 'g5',
    department: 'SEDA',
    source: 'SEDA',
    priority: false,
    title: 'Free small-business training: pricing and record-keeping',
    body: 'SAMPLE: Two-day workshop for spaza owners and home-based businesses, Orlando Civic Centre, 21–22 Oct, 09:00–15:00. Register with your ID and business details. Seats are limited.',
    time: '2 days ago',
    area: 'Orlando',
    placement: 'paid',
    attachment: 'Registration form · PDF',
  },
  {
    id: 'g6',
    department: 'Pikitup',
    source: 'City of Joburg',
    priority: false,
    title: 'Recycling collection moves to Fridays in Diepkloof',
    body: 'From next week, kerbside recycling in Diepkloof will be collected on Fridays instead of Wednesdays. General waste collection days are unchanged.',
    time: 'Yesterday',
    area: 'Diepkloof',
    placement: 'paid',
  },
  {
    id: 'g7',
    department: 'CoJ Health',
    source: 'City of Joburg',
    priority: false,
    title: 'Free flu vaccinations at four Soweto clinics this month',
    body: 'Over-65s and children under 5 can get free flu shots at Diepkloof, Chiawelo, Zola and Orlando East clinics, weekdays 08:00–14:00, while stocks last.',
    time: '2 days ago',
    area: 'Soweto-wide',
    placement: 'paid',
  },
]

export interface SafetyPost {
  id: string
  text: string
  area: string
  time: string
  backs: number
}

export const safetyPosts: SafetyPost[] = [
  { id: 's1', text: 'Break-in reported on Maseko Street — residents say gate motor was forced around 03:00. SAPS were on scene by morning.', area: 'Diepkloof Zone 2', time: '1h ago', backs: 14 },
  { id: 's2', text: 'Streetlights out along the whole of Immink Drive between the taxi rank and Zone 5 — very dark on foot after 19:00.', area: 'Diepkloof Zone 5', time: '3h ago', backs: 32 },
  { id: 's3', text: 'Neighbourhood watch patrolling near Klipspruit station on Friday evenings again. Volunteers welcome, meet 18:30 at the rank.', area: 'Klipspruit', time: 'Yesterday', backs: 21 },
]

/* ---------------------------- Community street alerts -------------------- */
/* Alerts are shared between neighbours. They are NOT sent to the City.
   Status is community-driven: Posted -> Confirmed (5+ neighbours) -> Marked fixed. */

export interface Issue {
  id: string
  ref: string
  category: string
  title: string
  area: string
  status: 'Posted' | 'Confirmed' | 'Marked fixed'
  /** neighbours who confirmed this alert */
  coSigns: number
  age: string
  resolvedIn?: string
  mine?: boolean
  image?: string
}

export const myIssues: Issue[] = [
  {
    id: 'i1', ref: 'SA-2481', category: 'Pothole', title: 'Metre-wide pothole, corner of Mooki & Maseko',
    area: 'Orlando East', status: 'Confirmed', coSigns: 87, age: '6 days ago', mine: true, image: pothole,
  },
  {
    id: 'i2', ref: 'SA-2495', category: 'Streetlight / robots out', title: 'Robots out at the Immink Drive and Zone 5 turn-off',
    area: 'Diepkloof Zone 5', status: 'Posted', coSigns: 3, age: '2 hours ago', mine: true,
  },
  {
    id: 'i3', ref: 'SA-1977', category: 'Burst pipe', title: 'Leaking communal tap, Block 6 hostel',
    area: 'Diepkloof', status: 'Marked fixed', coSigns: 63, age: 'Posted 19 days ago', resolvedIn: 'Marked fixed after 11 days', mine: true,
  },
]

export const nearbyIssues: Issue[] = [
  { id: 'n1', ref: 'SA-2490', category: 'Illegal dumping', title: 'Dumping behind the old Meadowlands shops', area: 'Meadowlands', status: 'Confirmed', coSigns: 28, age: '1 day ago' },
  { id: 'n2', ref: 'SA-2474', category: 'Road flooded', title: 'Road flooded at the Zone 4 entrance circle after rain', area: 'Diepkloof Zone 4', status: 'Confirmed', coSigns: 55, age: '4 days ago' },
  { id: 'n3', ref: 'SA-2468', category: 'Streetlight / robots out', title: 'High-mast light out near Diepkloof Square', area: 'Diepkloof', status: 'Confirmed', coSigns: 19, age: '5 days ago' },
]

export const issueCategories = ['Water shortage', 'No electricity', 'Pothole', 'Road closure', 'Area theft notice', 'Other']

/* --------------------------------- Deals --------------------------------- */

export interface Deal {
  id: string
  shop: string
  chain: 'local' | 'partner'
  category: string
  title: string
  price: string
  was?: string
  expires: string
  area: string
  image?: string
}

export const deals: Deal[] = [
  { id: 'd1', shop: 'Boxer Diepkloof', chain: 'partner', category: 'Food', title: '10kg maize meal + 2L cooking oil combo', price: 'R189', was: 'R234', expires: 'Ends Sun', area: 'Diepkloof Square' },
  { id: 'd2', shop: 'Maria’s Fresh Produce', chain: 'local', category: 'Food', title: 'Spinach bunch + 1kg tomatoes', price: 'R25', expires: 'Ends Sat', area: 'Orlando West', image: market },
  { id: 'd3', shop: 'Shoprite Jabulani', chain: 'partner', category: 'Food', title: '2.5kg rice, any brand in the promo bay', price: 'R54.99', was: 'R69.99', expires: 'Ends Wed', area: 'Jabulani Mall' },
  { id: 'd4', shop: 'Sbu’s Hardware', chain: 'local', category: 'Hardware', title: '20kg cement + free trowel while stocks last', price: 'R119', expires: 'Ends Sun', area: 'Pimville' },
  { id: 'd5', shop: 'Elegant Touch Salon', chain: 'local', category: 'Beauty', title: 'Wash, blow & braid — weekday special', price: 'R150', was: 'R220', expires: 'Mon–Thu only', area: 'Diepkloof Zone 2', image: barber },
  { id: 'd6', shop: 'Food Lover’s Market', chain: 'partner', category: 'Food', title: 'Chicken portions 2kg bag', price: 'R89.99', was: 'R109.99', expires: 'Ends Fri', area: 'Southgate Value' },
  { id: 'd7', shop: 'Fix-It-Right Auto', chain: 'local', category: 'Services', title: 'Brake pad check + quote at no charge', price: 'Free', expires: 'This month', area: 'Orlando East' },
  { id: 'd8', shop: 'Kasi Cuts Barbershop', chain: 'local', category: 'Beauty', title: 'Gents cut + beard line-up', price: 'R70', was: 'R95', expires: 'Ends Sat', area: 'Klipspruit' },
]

export const dealCategories = ['All', 'Food', 'Hardware', 'Beauty', 'Services']

/* ------------------------------- Directory ------------------------------- */

export interface Provider {
  id: string
  name: string
  category: string
  area: string
  distance: string
  verified: boolean
  blurb: string
  phone: string
  image?: string
}

export const providers: Provider[] = [
  { id: 'p1', name: 'Kasi Cuts Barbershop', category: 'Hair & beauty', area: 'Klipspruit', distance: '1.2 km', verified: true, blurb: 'Walk-ins welcome. Pensioner Tuesdays half price.', phone: '073 555 0142', image: barber },
  { id: 'p2', name: 'Thandi’s Plumbing', category: 'Plumber', area: 'Orlando East', distance: '2.0 km', verified: true, blurb: 'Burst pipes, geyser repairs. 24h call-out in Soweto.', phone: '082 555 0198' },
  { id: 'p3', name: 'A+ Maths Tutoring — Bongani', category: 'Tutor', area: 'Diepkloof', distance: '0.8 km', verified: true, blurb: 'Gr 8–12 maths & physical science. Group rates for 3+.', phone: '061 555 0177' },
  { id: 'p4', name: 'Fix-It-Right Auto', category: 'Mechanic', area: 'Orlando East', distance: '2.4 km', verified: true, blurb: 'Diagnostics, brakes, services. Quotes in writing.', phone: '083 555 0110' },
  { id: 'p5', name: 'Bra Willie Electrical', category: 'Electrician', area: 'Meadowlands', distance: '3.1 km', verified: false, blurb: 'CoCs, rewiring, prepaid meter installs.', phone: '079 555 0164' },
  { id: 'p6', name: 'Sew & Grow Alterations', category: 'Dressmaking', area: 'Diepkloof Zone 2', distance: '1.5 km', verified: true, blurb: 'School uniforms, alterations, traditional wear.', phone: '072 555 0133' },
]

export const providerCategories = ['All', 'Plumber', 'Electrician', 'Mechanic', 'Tutor', 'Hair & beauty', 'Dressmaking']

/* --------------------------------- Impact -------------------------------- */

export const impact = {
  posted: 412,
  confirmed: 336,
  markedFixed: 289,
  fixedRate: 70,
  storiesSparked: 9,
  byType: [
    { name: 'Potholes and roads', n: 151 },
    { name: 'Water and burst pipes', n: 98 },
    { name: 'Streetlights and robots', n: 87 },
    { name: 'Illegal dumping', n: 54 },
    { name: 'Other', n: 22 },
  ],
  platform: { articles: 96, specialsViewed: '18,204', shops: 57, confirmations: 3194 },
}

/* ---------------------------------- Ward --------------------------------- */

export const ward = {
  number: 25,
  area: 'Orlando, Orlando East & Pimville North',
  councillor: {
    name: 'Cllr. Dikeledi Mokoena',
    role: 'Ward Councillor · Ward 25',
    phone: '011 555 0125',
    email: 'ward25@joburg.org.za',
    officeHours: 'Mon & Thu 09:00–13:00 · Orlando Civic Centre, Room 4',
  },
  updates: [
    { id: 'w1', title: 'Orlando Towers repaint crew recruitment opens Friday', time: '2h ago' },
    { id: 'w2', title: 'Ward committee meeting — minutes from 30 Sept now available', time: '2 days ago' },
    { id: 'w3', title: 'IDP budget consultation: have your say on 2026/27 ward priorities', time: '5 days ago' },
  ],
}

/* ------------------------------ Shop dashboard --------------------------- */

export const shopDash = {
  name: 'Maria’s Fresh Produce',
  status: 'Live',
  stats: { impressions: 3212, clicks: 486, downloads: 143 },
  daily: [312, 408, 391, 520, 486, 610, 485],
  days: ['F', 'S', 'S', 'M', 'T', 'W', 'T'],
  promos: [
    { id: 'sp1', title: 'Spinach + 1kg tomatoes — R25', views: 1211, downloads: 64, expires: 'Ends Sat', active: true },
    { id: 'sp2', title: 'Butternut 3 for R20', views: 843, downloads: 41, expires: 'Ended Mon', active: false },
    { id: 'sp3', title: 'Fresh bread daily from 07:00', views: 512, downloads: 38, expires: 'Ongoing', active: true },
  ],
}

/* ------------------------------- Contributor ----------------------------- */

export const contributor = {
  name: 'Thabiso Molefe',
  published: 14,
  guidelines: [
    'Original reporting only — you must have spoken to at least one named source.',
    'No advertorial. Paid or gifted coverage must be declared and is published as sponsored.',
    'Names, ages and addresses of minors are never published.',
    'An editor reviews every submission within 48 hours before anything goes live.',
  ],
  submissions: [
    { id: 'c1', title: 'Spaza owners form buying co-op to fight wholesale prices', status: 'Published', date: '6 Oct' },
    { id: 'c2', title: 'The night nurses of Bara: inside a 12-hour casualty shift', status: 'In review', date: '5 Oct' },
    { id: 'c3', title: 'Diepkloof clinic queue cuts in half after booking slip pilot', status: 'Published', date: '4 Oct' },
    { id: 'c4', title: 'Orlando East gogos’ stokvel turns 30', status: 'Approved', date: '1 Oct' },
  ],
}

/* Change this ONE line to the real status before the prototype is shown publicly. */
export const pressCouncilLine = 'Press Council of South Africa membership: in progress.'
