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
    role: 'Student · Programmer · Builder',
    intro:
      'I build software, experiment with engineering, and spend an unreasonable amount of time wondering how systems work.',
    direction:
      'Working toward a future in computer engineering, AI and robotics.',
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
      descriptor: 'Commerce / full-system experiment',
      summary: 'From a product link to a fulfilled order.',
      intro:
        'A storefront-first commerce and order-management platform for Thai small sellers and businesses.',
      caseStudy: [
        {
          label: 'Problem',
          text: 'A seller needs more than a product page: stock, customer checkout and incoming orders need to stay connected.',
        },
        {
          label: 'What I built',
          text: 'A connected workflow for products, variants, SKUs, pricing and stock; shareable storefront links; checkout; orders and fulfilment; invoices and receipts; analytics and subscriptions, with Thai/English support and responsive layouts.',
        },
        {
          label: 'Technical challenge',
          text: 'Thinking through how product, inventory and order data relate, while connecting authentication, database-backed interfaces and deployment. A change in one part of the workflow has consequences elsewhere.',
        },
        {
          label: 'What I learned',
          text: 'A feature is only useful when it fits the whole journey. Building the complete loop pushed me to think about data consistency, edge cases and what a seller needs to see next.',
        },
      ],
      technology: [
        'Next.js',
        'Supabase',
        'Databases',
        'Authentication',
        'Cloudflare',
        'Responsive UI',
      ],
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
      descriptor: 'Information / research / Thailand',
      summary: 'A story is more than a headline.',
      intro:
        'A Thailand-focused news and research product exploring context, sources and the connections between events.',
      caseStudy: [
        {
          label: 'Problem',
          text: 'A stream of headlines can tell you what happened while leaving you without the context to understand it.',
        },
        {
          label: 'Approach',
          text: 'Organise concise information around storylines, sources, people and related events, with a Bangkok and Thailand focus.',
        },
        {
          label: 'System',
          text: 'An interface connecting summaries, source material, people and research collections. Frontend architecture, data handling and information architecture all shape how the story is explored.',
        },
        {
          label: 'Lessons',
          text: 'Trust has to be supported by the interface. Sources should be easy to inspect, and adding more information is only helpful when its relationships are clear.',
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
        'A smaller space to explore how a useful interface connects to everyday desktop actions.',
      technology: ['Python', 'Desktop UI', 'Audio interaction'],
    },
    hardware: {
      name: 'Hardware experiments',
      descriptor: 'Arduino / electronics',
      summary:
        'Exploring the connection between code, electronics and physical behaviour.',
      lesson:
        'An introduction to the questions that draw me toward robotics and hardware/software integration.',
      technology: ['Arduino', 'Electronics', 'Robotics experimentation'],
    },
  },
  timeline: [
    {
      title: 'Started with Python',
      body: 'Programming problems became a way to practise breaking a question into smaller steps.',
      tag: 'BEGINNINGS',
    },
    {
      title: 'Developed through Computer Science',
      body: 'Coding competitions and school study helped turn experimentation into more structured problem solving.',
      tag: 'FOUNDATIONS',
    },
    {
      title: 'Connected code to hardware',
      body: 'Arduino and electronics experiments opened up questions about physical systems and control.',
      tag: 'EXPLORATION',
    },
    {
      title: 'Built beyond the classroom',
      body: 'KRUNG, OrderFlow and Mitra expanded the work into interfaces, data and deployment.',
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
        'Perse Python Coding Competition certificates; a record of competitive problem solving.',
    },
    {
      type: 'Invitation',
      title: 'Robotics Olympiad',
      detail: 'Invited to participate in a Robotics Olympiad.',
    },
    {
      type: 'Independent experience',
      title: 'Building complete systems',
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
  activities: [
    {
      title: 'School life',
      theme: 'COMMUNICATION',
      text: 'School activities and an interest in student voice and digital communication bring another dimension to my technical interests.',
    },
    {
      title: 'Ror Dor',
      theme: 'DISCIPLINE',
      text: 'Thai Reserve Officer Training Corps: a part of life outside the screen, with a different emphasis on responsibility and discipline.',
    },
    {
      title: 'Learning with others',
      theme: 'TEAMWORK',
      text: 'I want to become better at explaining ideas, listening to different approaches and contributing to work beyond my own projects.',
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
      title: 'A record in progress',
      organization: '',
      date: '',
      description: 'A space for the people and experiences behind the work.',
      image: '',
      role: '',
      impact: '',
      placeholder: true,
    },
  ] as CommunityEntry[],
  outside: {
    title: 'Still curious, even AFK.',
    text: 'Small electronics experiments. School life. An idea for something useful that probably needs another revision. My interests tend to follow me away from the keyboard.',
    notes: ['MAKE SOMETHING', 'TAKE IT APART', 'ASK ANOTHER QUESTION'],
  },
  future: {
    title: 'Different paths. One direction.',
    text: 'I want to deepen the mathematical and engineering foundations behind my experiments, and learn to design more capable, thoughtful systems.',
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
