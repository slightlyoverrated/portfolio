/**
 * PORTFOLIO CONTENT SOURCE OF TRUTH
 * Update grades, exam status, links, awards, project copy, or personal details here.
 * The visual components intentionally read from this file rather than hardcoding content.
 */

export const portfolio = {
  person: {
    name: 'Ishan',
    location: 'Thailand',
    stage: 'Year 13 international-school student',
    headline: 'Student. Programmer. Builder. Future Engineer.',
    intro:
      'I like understanding how things work — and then trying to build something better.',
    bio: [
      'I am a Year 13 international-school student in Thailand studying Mathematics, Physics and Computer Science.',
      'My interests sit where software meets computer engineering, artificial intelligence, robotics, systems, cybersecurity and technology that has to work in the real world.',
      'I enjoy turning ideas into working systems — especially ideas that could create practical impact in Thailand — and I want to keep taking on more ambitious engineering problems.',
    ],
  },

  universities: [
    {
      short: 'KMUTT',
      name: "King Mongkut's University of Technology Thonburi",
      image: '/universities/kmutt/campus.jpg',
      alt: "King Mongkut's University of Technology Thonburi Bang Khun Thian campus",
      focus: 'Engineering · Computer Engineering',
      source: 'Wikimedia Commons — KMUTT, Bang Khun Thian campus',
    },
    {
      short: 'CHULA',
      name: 'Chulalongkorn University',
      image: '/universities/chula/campus.jpg',
      alt: 'Chulalongkorn University west front campus view',
      focus: 'Bangkok · Engineering',
      source: 'Wikimedia Commons — West Front Chulalongkorn University',
    },
    {
      short: 'MAHIDOL',
      name: 'Mahidol University',
      image: '/universities/mahidol/campus.jpg',
      alt: 'Mahidol University Salaya campus courtyard',
      focus: 'AI · Research · Robotics',
      source: 'Wikimedia Commons — Mahidol University Salaya courtyard',
    },
  ],

  personalStatement: [
    'I have always found more satisfaction in building something than merely using it. Programming became important to me because it turned an idea into a system I could test, break, improve and, eventually, let somebody else use.',
    'As my projects grew, so did my questions. I became interested not only in whether code worked, but in how software communicates with hardware, how information is organised, how intelligent systems make decisions and how engineering can solve problems beyond a computer screen.',
    'Building KRUNG and OrderFlow moved me beyond classroom exercises. I had to think about actual users, interface design, reliability, deployment, databases, organisation and trust. Neither project arrived fully formed. Their difficult parts taught me to investigate failures, make trade-offs and keep refining a system until the pieces made sense together.',
    'Mathematics and Physics strengthened the analytical side of this interest. Engineering appeals to me because it connects abstract reasoning with systems that exist in the physical world. I am especially curious about computer engineering, artificial intelligence, robotics, secure systems and advanced technology with practical value in Thailand.',
    'At university, I want to deepen the mathematical and engineering foundations behind the things I currently learn through experimentation. I want to understand the principles beneath the tools, work with people who approach problems differently and become capable of tackling systems whose scale currently exceeds my experience.',
    'I do not simply want to learn how existing systems work. I want the ability to design the systems that come next.',
  ],

  timeline: [
    {
      commit: 'commit 01',
      title: 'Started programming',
      body: 'Python became a primary language and opened the door to competitive coding and larger experiments.',
      tag: 'origin/main',
    },
    {
      commit: 'commit 02',
      title: 'Competitive problem solving',
      body: 'Earned 7+ Perse Python Coding Competition certificates while learning to reason clearly under constraints.',
      tag: 'perse.py',
    },
    {
      commit: 'commit 03',
      title: 'Best in Computer Science',
      body: "Received the school's Best in Computer Science award.",
      tag: 'award',
    },
    {
      commit: 'commit 04',
      title: 'Hardware entered the chat',
      body: 'Experimented with Arduino, electronics and robotics, and was invited to participate in a Robotics Olympiad.',
      tag: 'arduino.ino',
    },
    {
      commit: 'commit 05',
      title: 'Built beyond the classroom',
      body: 'Progressed into independently building larger products: KRUNG, Mitra and OrderFlow.',
      tag: 'ship → learn',
    },
    {
      commit: 'commit 07',
      title: 'Things got slightly out of hand',
      body: 'Started thinking about products for real businesses and users: design, deployment, trust and all.',
      tag: 'HEAD',
    },
  ],

  projects: {
    krung: {
      name: 'KRUNG',
      url: 'https://krung.news',
      descriptor: 'Thailand-focused news & research',
      summary:
        'A platform designed to make important stories easier to understand — with context over headline volume and clarity over clickbait.',
      features: [
        'Storylines',
        'Concise summaries',
        'Sources / receipts',
        'People & players',
        'Research collections',
        'Bangkok / Thailand focus',
      ],
      lessons: [
        'Information architecture is part of the reporting.',
        'Trust has to be designed into the interface.',
        'A larger codebase rewards boring, maintainable decisions.',
      ],
      learned: [
        'Frontend architecture', 'UI/UX', 'Information architecture', 'Data handling',
        'Research design', 'Product thinking', 'Accessibility', 'Deployment',
      ],
    },
    orderflow: {
      name: 'OrderFlow',
      url: '',
      descriptor: 'Storefront-first order management',
      summary:
        'A commerce system for small businesses and online sellers: create products and links, accept customer orders and organise what happens next.',
      stages: ['Product', 'Link', 'Customer', 'Order', 'Fulfilment'],
      features: [
        'Products, variants & SKUs', 'Pricing & inventory', 'Storefront links',
        'Customer checkout', 'Organised orders', 'Receipts & invoices',
        'Analytics & subscriptions', 'Thai / English thinking', 'Mobile-first use',
      ],
      technology: ['Next.js', 'Supabase', 'Databases', 'Authentication', 'Cloudflare', 'Responsive UI'],
      note:
        'OrderFlow is an ambitious product experiment, not a claim of flawless production infrastructure. Building the whole loop taught me where real product complexity hides.',
    },
    mitra: {
      name: 'Mitra',
      url: '',
      descriptor: 'Desktop assistant experiment',
      summary:
        'A Python desktop assistant exploring reminders, audio interaction, quick application launching and custom interface design.',
      features: ['Python', 'Desktop UI', 'Reminders', 'Audio', 'App launching'],
    },
  },

  skills: [
    { group: 'Programming', items: ['Python', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Lua', 'SQL'] },
    { group: 'Web systems', items: ['React', 'Next.js', 'Node', 'Supabase', 'Git/GitHub', 'Cloudflare', 'Responsive UI'] },
    { group: 'Engineering', items: ['Arduino', 'Electronics', 'Hardware experiments', 'Robotics', 'APIs', 'System design'] },
    { group: 'Product', items: ['UI/UX', 'Prototyping', 'Product thinking', 'Research', 'Debugging', 'Deployment'] },
  ],

  academics: {
    note: 'Academic data is deliberately centralised here because results will change.',
    igcse: [
      { subject: 'Computer Science', grade: 'A' },
      { subject: 'English', grade: 'B' },
      { subject: 'Biology', grade: 'B' },
      { subject: 'Physics', grade: 'B' },
      { subject: 'Mathematics', grade: 'B' },
      { subject: 'Economics', grade: 'B' },
      { subject: 'Chemistry', grade: 'C' },
    ],
    aLevels: [
      { subject: 'Mathematics', grade: 'C', current: true },
      { subject: 'Physics', grade: 'D', current: true },
      { subject: 'Computer Science', grade: 'D', current: true },
    ],
    recovery:
      'Physics and Computer Science are being retaken in October 2026. A2 study continues alongside retake preparation.',
    path: ['Initial AS sitting', 'Analysis', 'Retake preparation', 'A2', 'University'],
    exams: {
      sat: { total: 1250, math: 630, readingWriting: 620 },
      ielts: { status: 'Upcoming / result pending', score: null },
    },
  },

  achievements: [
    { type: 'award', title: 'Best in Computer Science', detail: 'School award' },
    { type: 'certificates', title: '7+ Perse Python certificates', detail: 'Competitive problem solving' },
    { type: 'invitation', title: 'Robotics Olympiad invitation', detail: 'Robotics participation' },
    { type: 'test', title: 'SAT 1250', detail: 'Math 630 · Reading & Writing 620' },
    { type: 'projects', title: 'Independent software projects', detail: 'KRUNG · OrderFlow · Mitra' },
  ],

  offline: [
    { label: 'School life', text: 'Activities that make teamwork more than a pull request.' },
    { label: 'Student voice', text: 'Leadership, council involvement and digital communication interests.' },
    { label: 'Ror Dor', text: 'Thai Reserve Officer Training Corps — discipline outside the screen.' },
    { label: 'Experiments', text: 'Small technology and entrepreneurship ideas tested in the real world.' },
  ],

  values: [
    { title: 'BUILD THINGS.', text: 'Ideas become far more interesting once somebody can actually use them.' },
    { title: 'UNDERSTAND WHY.', text: 'Knowing a formula or framework matters less to me than understanding why it works.' },
    { title: 'MAKE IT USEFUL.', text: 'Technology matters most when its complexity disappears into something helpful.' },
  ],

  future: {
    paths: ['Computer Engineering', 'Artificial Intelligence', 'Robotics', 'Secure Systems', 'Systems Engineering'],
    question:
      'My interests keep changing shape, but they revolve around one question: how can software, intelligence and engineering be combined to build systems that matter?',
  },

  links: {
    github: '',
    krung: 'https://krung.news',
    orderflow: '',
    email: '',
    cv: '',
  },
} as const;

export type Portfolio = typeof portfolio;
