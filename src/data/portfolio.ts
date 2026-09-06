/** Single source of truth. Empty links and placeholder entries are intentional. */
export type CommunityEntry = {
  title: string;
  organization: string;
  date: string;
  description: string;
  image: string;
  role: string;
  impact: string;
  placeholder: boolean;
};
export const portfolio = {
  person: {
    name: 'Ishan Dubey',
    firstName: 'Ishan',
    lastName: 'Dubey',
    location: 'Thailand',
    stage: 'Year 13',
    school: 'International-school student',
    role: 'Student · Programmer',
    intro:
      'I like building software, figuring out why systems behave the way they do, and occasionally making projects much larger than they needed to be.',
    direction: 'Interested in Computer Engineering, AI and Robotics.',
  },
  academics: {
    subjects: [
      {
        name: 'Mathematics',
        code: '01 / MODEL',
        description: 'Finding structure. Making an idea precise.',
        connection: 'Analytical reasoning',
        diagram: 'math',
      },
      {
        name: 'Physics',
        code: '02 / UNDERSTAND',
        description: 'Connecting mathematical models to the physical world.',
        connection: 'Physical systems',
        diagram: 'physics',
      },
      {
        name: 'Computer Science',
        code: '03 / BUILD',
        description: 'Turning logic into something that actually works.',
        connection: 'Working systems',
        diagram: 'computing',
      },
    ],
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
      { subject: 'Mathematics', grade: 'C' },
      { subject: 'Physics', grade: 'D' },
      { subject: 'Computer Science', grade: 'D' },
    ],
    trajectory:
      'Physics and Computer Science are being retaken in October 2026. A2 study continues alongside retake preparation.',
    path: [
      'First AS sitting',
      'Review',
      'Retake preparation',
      'A2',
      'University',
    ],
    exams: {
      sat: { total: 1250, math: 630, readingWriting: 620 },
      ielts: { status: 'Awaiting result', score: null as number | null },
    },
    destinations: ['Computer Engineering', 'AI', 'Robotics'],
  },
  personalStatement: [
    'I have always been more interested in making and understanding things than simply using them. When I use a piece of software, I find myself wondering how its parts fit together and what I would change. Programming gave me a way to follow those questions: I could turn an idea into something, test it, and work out why it did not behave as I expected.',
    'At first, that meant solving programming problems in Python. I liked the moment when an awkward problem became a clear sequence of steps. As I attempted larger projects, the questions became less tidy. An interface had to make sense to someone else. Information needed a place in a database. A change that worked locally still had to survive deployment. Debugging became as much about understanding the whole system as finding a mistake in one function.',
    'KRUNG and OrderFlow changed how I think about software. With KRUNG, a Thailand-focused news and research project, I began asking how an interface could help someone understand the context around a story. With OrderFlow, I worked through the steps between a seller creating a product and fulfilling an order. These were systems intended to be useful, so organisation, reliability and small product decisions mattered alongside the code. I learned to examine the connections between features instead of treating each one as a separate task.',
    'Studying mathematics and physics has made me increasingly curious about what sits beneath software: computation, electronics, signals and physical systems. Arduino and electronics experiments have given me a small introduction to the point where instructions become physical behaviour. I want to understand that connection more deeply, particularly in computer engineering, AI and robotics. How does a controller respond to uncertain inputs? How can a mathematical model help a machine act sensibly?',
    'I want university to give me the rigorous mathematical and engineering foundation to investigate these questions properly. I also want to work with people who approach problems differently and learn to explain my own decisions clearly. I enjoy experimenting, but I want to move from getting a system to work to understanding why it works, where its limits are, and how to design it better.',
  ],
  statementConcepts: ['software', 'systems', 'physics', 'hardware', 'AI'],
  projects: {
    orderflow: {
      name: 'OrderFlow',
      descriptor: 'Order management for Thai sellers',
      summary: 'Products, checkout and fulfilment.',
      intro:
        'I built OrderFlow to see how a product link could lead to a structured order, with the catalogue, stock and fulfilment in the same system.',
      evidence: {
        image: '',
        alt: 'OrderFlow checkout and seller order view',
        caption: 'Checkout → seller’s order record',
        description:
          'The two views that show how a customer’s purchase reaches the seller.',
        process: '',
      },
      caseStudy: [
        {
          label: 'Problem',
          text: 'A product page is only one part of selling. I also needed to account for variants, available stock, checkout and the seller’s next steps.',
        },
        {
          label: 'What I built',
          text: 'Product and variant records, SKUs, prices and stock; shareable storefront links; checkout and order fulfilment. I also added invoices, receipts, analytics, subscriptions and Thai/English layouts.',
        },
        {
          label: 'Technical challenge',
          text: 'The difficult part was connecting product, inventory and order data. Authentication, database queries and the interface all had to fit the same workflow.',
        },
        {
          label: 'What I learned',
          text: 'I had to think past individual screens: what information the next step needs, and whether the seller can tell what to do with an order.',
        },
      ],
      technology: ['Next.js', 'Supabase', 'Cloudflare'],
      stages: [
        {
          name: 'Seller',
          detail:
            'The seller manages a catalogue and the work behind each order.',
          view: 'Seller workspace',
          fields: ['Products', 'Inventory', 'Orders'],
        },
        {
          name: 'Product',
          detail:
            'Variants, SKU, pricing and stock belong to one organised product record.',
          view: 'Product details',
          fields: ['Product + variants', 'SKU + stock', 'Price'],
        },
        {
          name: 'Storefront link',
          detail:
            'A shareable link gives the customer a direct path to the product.',
          view: 'Share storefront',
          fields: [
            'Product information',
            'Available variants',
            'Shareable link',
          ],
        },
        {
          name: 'Customer',
          detail: 'A responsive checkout connects the customer to the order.',
          view: 'Customer checkout',
          fields: ['Select variant', 'Customer details', 'Order summary'],
        },
        {
          name: 'Order',
          detail:
            'Incoming orders become structured records the seller can work through.',
          view: 'Incoming order',
          fields: ['Order details', 'Items + quantities', 'Invoice / receipt'],
        },
        {
          name: 'Fulfilment',
          detail:
            'A clear fulfilment stage helps the seller keep track of what happens next.',
          view: 'Fulfilment',
          fields: ['Prepare items', 'Track progress', 'Complete order'],
        },
      ],
    },
    krung: {
      name: 'KRUNG',
      descriptor: 'News and research · Thailand',
      summary: 'Following a story beyond the headline.',
      intro:
        'With KRUNG, I wanted a way to follow news in Thailand without losing the sources, people and earlier events behind each story.',
      evidence: {
        image: '',
        alt: 'KRUNG storyline with its sources and related events',
        caption: 'A storyline and its source material',
        description:
          'A real story page will show how summaries, sources and related events sit together.',
        process: '',
      },
      caseStudy: [
        {
          label: 'Problem',
          text: 'Reading one headline rarely explains how a story started or who is involved. I wanted the background within reach of the summary.',
        },
        {
          label: 'Approach',
          text: 'I organised summaries around storylines, with links to sources, people and related events. The focus is Bangkok and Thailand.',
        },
        {
          label: 'System',
          text: 'The main design problem was deciding what belongs on a story page and what belongs in a research collection. The map above shows those content relationships.',
        },
        {
          label: 'Lessons',
          text: 'I learned to make sources easy to inspect. Adding context does not help if the reader cannot see how it relates to the story.',
        },
      ],
      technology: [
        'Frontend architecture',
        'Data handling',
        'UI/UX',
        'Information architecture',
        'Deployment',
      ],
      nodes: [
        {
          name: 'Sources',
          detail:
            'The material behind a story gives readers a way to inspect its basis.',
        },
        {
          name: 'People',
          detail: 'People and organisations help explain who is involved.',
        },
        {
          name: 'Related events',
          detail:
            'A storyline connects developments that a single headline cannot explain.',
        },
        {
          name: 'Research',
          detail:
            'Collections keep related information together for a closer look.',
        },
      ],
    },
    mitra: {
      name: 'Mitra',
      descriptor: 'Python desktop assistant',
      summary:
        'An experiment with reminders, audio interaction, quick application launching and custom interface design.',
      lesson:
        'I used it to practise connecting a Python interface to actions on the desktop.',
      technology: ['Python', 'Desktop UI', 'Audio interaction'],
    },
    hardware: {
      name: 'Hardware experiments',
      descriptor: 'Arduino / electronics',
      summary:
        'Exploring the connection between code, electronics and physical behaviour.',
      lesson:
        'These are early experiments. Photographs, circuit details and build notes still need to be added.',
      technology: ['Arduino', 'Electronics', 'Robotics experimentation'],
    },
  },
  timeline: [
    {
      title: 'Started with Python',
      body: 'Small programming problems helped me practise breaking a task into steps.',
      tag: 'BEGINNINGS',
    },
    {
      title: 'School Computer Science',
      body: 'Coursework and coding competitions gave me more problems to work through.',
      tag: 'FOUNDATIONS',
    },
    {
      title: 'Connected code to hardware',
      body: 'I began experimenting with Arduino and electronics alongside software.',
      tag: 'EXPLORATION',
    },
    {
      title: 'Built beyond the classroom',
      body: 'KRUNG, OrderFlow and Mitra meant working with interfaces, data and deployment.',
      tag: 'INDEPENDENT WORK',
    },
    {
      title: 'Working toward university',
      body: 'Current A-Level study, retake preparation and university applications are the next steps.',
      tag: 'NOW / YEAR 13',
    },
  ],
  achievements: [
    {
      type: 'School award',
      title: 'Best in Computer Science',
      detail: 'Recognition from school for Computer Science.',
    },
    {
      type: 'Coding certificates',
      title: '7+ Perse Python certificates',
      detail:
        'Certificates from the Perse Python Coding Competition. Copies to be added.',
    },
    {
      type: 'Invitation',
      title: 'Robotics Olympiad',
      detail: 'Invited to participate in a Robotics Olympiad.',
    },
    {
      type: 'Independent experience',
      title: 'Independent software projects',
      detail:
        'Work on OrderFlow, KRUNG and Mitra, from interface decisions to debugging and deployment.',
    },
  ],
  skills: [
    {
      group: 'Programming',
      layer: '01 / LANGUAGES',
      items: [
        { name: 'Python', evidence: 'Mitra · coding competitions' },
        {
          name: 'JavaScript / TypeScript',
          evidence: 'Web development · this portfolio',
        },
        {
          name: 'HTML / CSS',
          evidence: 'Responsive interfaces · this portfolio',
        },
        { name: 'SQL', evidence: 'Database work' },
        { name: 'Lua', evidence: 'Programming exploration' },
      ],
    },
    {
      group: 'Web & systems',
      layer: '02 / IMPLEMENTATION',
      items: [
        { name: 'React', evidence: 'This portfolio' },
        { name: 'Next.js', evidence: 'OrderFlow' },
        { name: 'Node', evidence: 'Web development' },
        { name: 'Supabase', evidence: 'OrderFlow' },
        { name: 'Git / GitHub', evidence: 'Version control · this portfolio' },
        { name: 'Cloudflare', evidence: 'OrderFlow deployment infrastructure' },
      ],
    },
    {
      group: 'Engineering',
      layer: '03 / PHYSICAL SYSTEMS',
      items: [
        { name: 'Arduino', evidence: 'Hardware experiments' },
        { name: 'Electronics', evidence: 'Hardware experiments' },
        { name: 'Robotics', evidence: 'Robotics experimentation' },
        { name: 'APIs', evidence: 'Systems exploration' },
      ],
    },
    {
      group: 'Product',
      layer: '04 / HUMAN INTERFACE',
      items: [
        { name: 'UI / UX', evidence: 'KRUNG · OrderFlow · Mitra' },
        { name: 'Prototyping', evidence: 'Independent projects' },
        { name: 'Debugging', evidence: 'Independent projects' },
        { name: 'Deployment', evidence: 'KRUNG · OrderFlow · this portfolio' },
        { name: 'Information architecture', evidence: 'KRUNG' },
      ],
    },
  ],
  activityPhoto: {
    image: '',
    alt: '',
    caption: 'School / Ror Dor · photograph and date pending',
  },
  activities: [
    {
      title: 'School life',
      theme: 'COMMUNICATION',
      text: 'I’m interested in student voice and digital communication at school. Specific activities and photographs will be added here.',
    },
    {
      title: 'Ror Dor',
      theme: 'DISCIPLINE',
      text: 'Thai Reserve Officer Training Corps training is part of my life outside school and programming.',
    },
    {
      title: 'Learning with others',
      theme: 'TEAMWORK',
      text: 'I want more practice explaining my decisions and working on projects with other people.',
    },
  ],
  community: [
    {
      title: 'Community photograph',
      organization: '',
      date: '',
      description: 'Service activity details to be added.',
      image: '',
      role: '',
      impact: '',
      placeholder: true,
    },
    {
      title: 'Service activity',
      organization: '',
      date: '',
      description: 'Photographs and a reflection to follow.',
      image: '',
      role: '',
      impact: '',
      placeholder: true,
    },
    {
      title: 'Activity reflection',
      organization: '',
      date: '',
      description: 'Date, role and a short reflection to be added.',
      image: '',
      role: '',
      impact: '',
      placeholder: true,
    },
  ] as CommunityEntry[],
  outside: {
    title: 'Away from the keyboard',
    text: 'Electronics experiments, school activities and Ror Dor take up some of the time between programming and A Levels.',
    notes: ['MAKE SOMETHING', 'TAKE IT APART', 'ASK ANOTHER QUESTION'],
  },
  future: {
    title: 'What I want to study',
    text: 'Computer Engineering is my main interest. I want to understand the mathematics, electronics and computing behind AI and robotics, then use them in projects I cannot build yet.',
    paths: ['AI', 'Robotics', 'Secure systems', 'Software'],
    destination: 'Computer Engineering',
  },
  universities: [
    {
      short: 'KMUTT',
      name: 'King Mongkut’s University of Technology Thonburi',
      image: 'universities/kmutt/campus.jpg',
      alt: 'KMUTT Bang Khun Thian campus',
      source: 'Wikimedia Commons — KMUTT, Bang Khun Thian campus',
    },
    {
      short: 'Chulalongkorn',
      name: 'Chulalongkorn University',
      image: 'universities/chula/campus.jpg',
      alt: 'Chulalongkorn University west front campus',
      source: 'Wikimedia Commons — West Front Chulalongkorn University',
    },
    {
      short: 'Mahidol',
      name: 'Mahidol University',
      image: 'universities/mahidol/campus.jpg',
      alt: 'Mahidol University Salaya courtyard',
      source: 'Wikimedia Commons — Mahidol University Salaya courtyard',
    },
  ],
  links: {
    github: '',
    krung: 'https://krung.news',
    orderflow: '',
    email: '',
    cv: '',
  },
};
export type Portfolio = typeof portfolio;
