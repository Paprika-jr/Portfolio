// Portfolio Content and Configuration

export const PERSONAL_INFO = {
  name: 'Khun Htet Lin Aung',
  title: 'Second Year ICT Student | Jamk UAS | Guitar Enthusiast',
  location: 'Jyväskylä, Finland',
  email: 'hlin14046@gmail.com',
  bio: "Passionate about technology and music. Currently studying ICT at Jamk in Finland, combining my love for coding with creative problem-solving. When I'm not programming, you'll find me playing guitar and exploring new musical horizons.",
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/Paprika-jr',
  linkedin: 'https://www.linkedin.com/in/khun-htet-lin-aung-225273323/',
  instagram: 'https://www.instagram.com/ht3tlin_a?igsh=NTZ1emkyMTIydGpq&utm_source=qr',
};

export const SKILLS = {
  frontend: [
    { name: 'React', level: 'Advanced', icon: '⚛️', fret: 10 },
    { name: 'HTML/CSS', level: 'Advanced', icon: '🎨', fret: 11 },
    { name: 'JavaScript', level: 'Advanced', icon: '⚡', fret: 9 },
    { name: 'Vite', level: 'Intermediate', icon: '⚡', fret: 7 },
  ],
  backend: [
    { name: 'Node.js', level: 'Intermediate', icon: '🟢', fret: 6 },
    { name: 'Firebase', level: 'Advanced', icon: '🔥', fret: 9 },
    { name: 'Firestore', level: 'Advanced', icon: '💾', fret: 8 },
    { name: 'Auth', level: 'Intermediate', icon: '🔐', fret: 7 },
  ],
  tools: [
    { name: 'Git', level: 'Intermediate', icon: '📦', fret: 7 },
    { name: 'Vercel', level: 'Advanced', icon: '▲', fret: 9 },
    { name: 'VS Code', level: 'Advanced', icon: '💻', fret: 10 },
    { name: 'Python', level: 'Intermediate', icon: '🐍', fret: 6 },
  ],
};

export const EDUCATION = [
  {
    year: '2024 - Present',
    degree: "Bachelor's Degree in ICT",
    institution: 'Jamk University of Applied Sciences',
    location: 'Jyväskylä, Finland',
    description:
      'Second Year | Focusing on web development, software engineering, and digital solutions. Actively working on real-world projects including digital menu systems and community platforms.',
    status: 'current',
  },
  {
    year: '2023',
    degree: 'GED Diploma',
    institution: 'Educatry Academy',
    location: 'Taunggyi, Myanmar',
    description:
      'Completed General Education Development (GED) diploma, demonstrating high school level academic skills and knowledge.',
    status: 'completed',
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'Digital Menu & Ordering System',
    description:
      'Mobile-first menu and real-time ordering for restaurants. Customers scan a QR code, browse items, add to cart, place orders, and track status live. Includes a secure admin dashboard for order management and status updates.',
    emoji: '🍽️',
    tags: ['React', 'Firebase', 'Real-time', 'Responsive'],
    links: {
      demo: 'https://digital-menu-nine-fawn.vercel.app',
      code: 'https://github.com/Paprika-jr/digital-menu',
      admin: 'https://digital-menu-nine-fawn.vercel.app/admin',
    },
    color: '#8b5cf6', // Purple
  },
  {
    id: 2,
    title: 'Musicians Community Platform',
    description:
      'A community website for local musicians in the Viitasaari area, featuring event announcements and band connection features with full Finnish/English bilingual support.',
    emoji: '🎸',
    tags: ['React', 'Node.js', 'Firebase', 'i18n'],
    links: {
      demo: '#',
      code: '#',
    },
    color: '#ec4899', // Pink
  },
  {
    id: 3,
    title: 'Coming Soon...',
    description:
      "Working on something exciting! Check back soon for updates on my latest project. Always exploring new technologies and creative solutions.",
    emoji: '🚀',
    tags: ['In Progress'],
    links: {},
    color: '#3b82f6', // Blue
  },
];

export const GUITAR_STRINGS = [
  { note: 'E', frequency: 329.63 },
  { note: 'B', frequency: 246.94 },
  { note: 'G', frequency: 196.00 },
  { note: 'D', frequency: 146.83 },
  { note: 'A', frequency: 110.00 },
  { note: 'E', frequency: 82.41 },
];

export const NAVIGATION_SECTIONS = [
  { id: 'home', label: 'Home', stringIndex: 0 },
  { id: 'about', label: 'About', stringIndex: 1 },
  { id: 'education', label: 'Education', stringIndex: 2 },
  { id: 'projects', label: 'Projects', stringIndex: 3 },
  { id: 'contact', label: 'Contact', stringIndex: 4 },
];

export const EASTER_EGGS = {
  GUITAR_CODE: ['g', 'u', 'i', 't', 'a', 'r'],
  KONAMI_CODE: [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ],
};

export const SOUND_EFFECTS = {
  stringE: '/sounds/string-e.mp3',
  stringA: '/sounds/string-a.mp3',
  stringD: '/sounds/string-d.mp3',
  stringG: '/sounds/string-g.mp3',
  stringB: '/sounds/string-b.mp3',
  stringHighE: '/sounds/string-high-e.mp3',
  chordC: '/sounds/chord-c.mp3',
  chordG: '/sounds/chord-g.mp3',
  click: '/sounds/click.mp3',
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
};
