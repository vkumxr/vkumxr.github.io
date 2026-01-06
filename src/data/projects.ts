export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  highlights: string[];
  // Case study content
  problem: string;
  solution: string;
  features: string[];
  challenges: string[];
  outcome: string;
  learnings: string[];
}

export const projects: Project[] = [
  {
    slug: 'redroid-ai',
    title: 'ReDroid-AI',
    subtitle: 'Reverse Engineering Assistant',
    period: 'Dec 2024 – Present',
    description: 'AI-powered Linux-based reverse engineering framework for automated static analysis of Android APKs.',
    techStack: ['Python', 'Linux', 'AI/ML', 'APKTool', 'Jadx'],
    githubUrl: 'https://github.com/vkumxr/ReDroid-AI',
    highlights: [
      'Automated APK extraction and application inspection workflows',
      'Modular architecture for analyzing Android internals and security vulnerabilities',
      'Intelligent analysis pipelines to accelerate vulnerability discovery',
    ],
    problem: 'Reverse engineering Android applications is a time-consuming process that requires multiple tools and manual analysis. Security researchers spend hours extracting APKs, decompiling code, and searching for vulnerabilities manually.',
    solution: 'Built an AI-powered framework that automates the entire reverse engineering workflow. The system extracts APKs, decompiles them using industry-standard tools, and uses AI to identify potential security vulnerabilities and interesting code patterns.',
    features: [
      'Automated APK extraction and decompilation pipeline',
      'Integration with APKTool and Jadx for comprehensive analysis',
      'AI-powered vulnerability detection and pattern matching',
      'Modular plugin architecture for custom analyzers',
      'Command-line interface for easy integration into existing workflows',
    ],
    challenges: [
      'Handling obfuscated code and anti-analysis techniques',
      'Optimizing performance for large applications with thousands of classes',
      'Training AI models to recognize diverse vulnerability patterns',
    ],
    outcome: 'The framework significantly reduces the time required for initial APK analysis from hours to minutes. Currently being used for personal security research and CTF challenges.',
    learnings: [
      'Deep understanding of Android application internals and DEX format',
      'Experience with static analysis techniques and tools',
      'AI/ML integration for security applications',
    ],
  },
  {
    slug: 'pubot',
    title: 'PuBOT',
    subtitle: 'Portable Ultra ROBOT',
    period: 'Aug 2024 – Present',
    description: 'Modular teleoperated robotics system with AI capabilities.',
    techStack: ['Raspberry Pi', 'Python', 'Embedded Linux', 'GPIO', 'OpenCV'],
    githubUrl: 'https://github.com/vkumxr/PuBOT',
    highlights: [
      'Integrated DC motors, ultrasonic sensors, and HDMI display for real-time interaction',
      'Autonomous navigation with conversational AI via voice control',
      'Hardware-software integration achieving reliable performance through iterative testing',
    ],
    problem: 'Traditional robotics projects often result in single-purpose machines that are difficult to modify or extend. There was a need for a modular, educational robotics platform that could be easily customized and upgraded.',
    solution: 'Designed and built a modular robot using Raspberry Pi as the brain, with hot-swappable sensor modules and a flexible software architecture that allows adding new capabilities without redesigning the entire system.',
    features: [
      'Teleoperated control via web interface and mobile app',
      'Ultrasonic obstacle detection and autonomous navigation',
      'Voice control integration for hands-free operation',
      'Real-time video streaming via HDMI display',
      'Modular sensor attachment system',
    ],
    challenges: [
      'Managing power consumption across multiple sensors and motors',
      'Achieving low-latency video streaming over WiFi',
      'Integrating voice recognition with limited Raspberry Pi resources',
    ],
    outcome: 'Successfully built a working prototype that demonstrates autonomous navigation and voice control. The project serves as a learning platform for embedded systems and robotics concepts.',
    learnings: [
      'Hands-on experience with embedded Linux and GPIO programming',
      'Hardware-software integration and real-time systems',
      'Power management and motor control techniques',
    ],
  },
  {
    slug: 'intellibank-ai',
    title: 'IntelliBank AI',
    subtitle: 'Conversational Banking Assistant',
    period: 'Jun 2024 – Sept 2024',
    description: 'Production-ready Java Spring Boot conversational banking assistant with LLM integration.',
    techStack: ['Java', 'Spring Boot', 'LangChain', 'REST APIs', 'PostgreSQL'],
    githubUrl: 'https://github.com/vkumxr/IntelliBank-AI',
    highlights: [
      'RESTful API backend with modular design patterns for scalability',
      'LLM-based conversational logic for intelligent query processing',
      'Context-aware response generation improving user experience',
    ],
    problem: 'Traditional banking chatbots rely on rigid decision trees that frustrate users when their queries do not match predefined patterns. There was a need for a more intelligent assistant that could understand natural language and provide contextual responses.',
    solution: 'Built a conversational banking assistant using Spring Boot and LangChain that leverages LLMs to understand user intent and provide intelligent responses. The system maintains conversation context and can handle complex multi-turn interactions.',
    features: [
      'Natural language understanding for banking queries',
      'Account balance and transaction history retrieval',
      'Bill payment and transfer assistance',
      'Context-aware conversation management',
      'RESTful API for easy integration',
    ],
    challenges: [
      'Ensuring accurate intent classification for financial queries',
      'Managing conversation state across multiple interactions',
      'Balancing response quality with latency requirements',
    ],
    outcome: 'Developed a fully functional conversational assistant that demonstrates the potential of LLMs in banking applications. The modular architecture allows easy extension to additional banking services.',
    learnings: [
      'LLM integration and prompt engineering techniques',
      'Spring Boot best practices and design patterns',
      'Building production-ready REST APIs',
    ],
  },
  {
    slug: 'fruitcutter',
    title: 'FruitCutter',
    subtitle: 'The Classic Fruit Ninja Reimagined',
    period: '2024',
    description: 'A nostalgic recreation of the classic Fruit Ninja game built on Scratch with smooth gameplay mechanics.',
    techStack: ['Scratch', 'Game Design', 'Animation', 'Physics'],
    githubUrl: 'https://github.com/vkumxr/FruitCutter---The-Classic-Fruit-Ninja-Reimagined',
    demoUrl: 'https://scratch.mit.edu/projects/1197626235',
    highlights: [
      'Smooth slicing mechanics with realistic fruit physics',
      'Score tracking and combo system for engaging gameplay',
      'Classic arcade-style visuals with polished animations',
    ],
    problem: 'Wanted to explore game development fundamentals and create an engaging project that could be shared with others while learning core game design principles like physics, animations, and user input handling.',
    solution: 'Recreated the popular Fruit Ninja game using Scratch, implementing custom physics for fruit trajectories, slice detection, and a scoring system with combos. The project demonstrates that engaging games can be built with simple tools.',
    features: [
      'Smooth mouse/touch-based slicing mechanics',
      'Realistic fruit physics with gravity and trajectories',
      'Combo system for consecutive slices',
      'Progressive difficulty scaling',
      'High score tracking',
    ],
    challenges: [
      'Implementing smooth slice detection in Scratch',
      'Creating realistic physics with limited tools',
      'Optimizing performance for smooth gameplay',
    ],
    outcome: 'Published on Scratch and received positive feedback from the community. The project demonstrates game design fundamentals and serves as an introduction to interactive programming.',
    learnings: [
      'Game development fundamentals and game loop concepts',
      'Physics simulation and collision detection',
      'User experience design for interactive applications',
    ],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};
