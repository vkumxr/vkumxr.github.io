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
    subtitle: 'AI-Powered Reverse Engineering Tool',
    period: 'Dec 2024 – Present',
    description: 'A Linux-based framework that automates static analysis of Android APKs using AI. It extracts, decompiles, and analyzes applications to identify security vulnerabilities and suspicious patterns — reducing manual analysis time from hours to minutes.',
    techStack: ['Python', 'Linux', 'AI/ML', 'APKTool', 'Jadx'],
    githubUrl: 'https://github.com/vkumxr/ReDroid-AI',
    highlights: [
      'Automates APK extraction and decompilation pipeline',
      'AI-powered pattern matching for vulnerability detection',
      'Modular architecture for custom analysis plugins',
    ],
    problem: 'Security analysts spend hours manually extracting APKs, decompiling code, and searching for vulnerabilities. The process requires juggling multiple tools and significant domain expertise.',
    solution: 'Built an automated framework that chains industry-standard tools (APKTool, Jadx) with AI-powered analysis. The system identifies potential vulnerabilities and suspicious code patterns without manual intervention.',
    features: [
      'Automated APK extraction and decompilation',
      'AI-driven vulnerability pattern detection',
      'Integration with APKTool and Jadx',
      'Modular plugin architecture',
      'CLI for workflow integration',
    ],
    challenges: [
      'Handling heavily obfuscated code',
      'Optimizing for large applications with thousands of classes',
      'Training models to recognize diverse vulnerability patterns',
    ],
    outcome: 'Reduces initial APK analysis time from hours to minutes. Currently used for personal security research and CTF challenges.',
    learnings: [
      'Android internals and DEX format',
      'Static analysis techniques',
      'AI/ML for security applications',
    ],
  },
  {
    slug: 'pubot',
    title: 'PuBOT',
    subtitle: 'Developer Productivity & Automation Tool',
    period: 'Aug 2024 – Present',
    description: 'A modular automation platform built on Raspberry Pi that combines hardware control with software automation. Designed for developer productivity — handles repetitive tasks, integrates with development workflows, and provides real-time monitoring.',
    techStack: ['Raspberry Pi', 'Python', 'Embedded Linux', 'GPIO', 'OpenCV'],
    githubUrl: 'https://github.com/vkumxr/PuBOT',
    highlights: [
      'Hardware-software integration for real-time automation',
      'Voice-controlled operation for hands-free development',
      'Modular sensor system for extensibility',
    ],
    problem: 'Development environments often require managing multiple monitoring tasks, hardware interactions, and repetitive automation that disrupts focus.',
    solution: 'Built a modular automation system that handles hardware monitoring, task automation, and provides voice-controlled operation — allowing hands-free interaction during development.',
    features: [
      'Web-based and mobile control interface',
      'Ultrasonic obstacle detection',
      'Voice control integration',
      'Real-time video streaming',
      'Hot-swappable sensor modules',
    ],
    challenges: [
      'Power management across multiple components',
      'Low-latency streaming over WiFi',
      'Voice recognition with limited compute resources',
    ],
    outcome: 'Working prototype demonstrating autonomous operation and voice control. Serves as a platform for learning embedded systems.',
    learnings: [
      'Embedded Linux and GPIO programming',
      'Real-time systems design',
      'Power management techniques',
    ],
  },
  {
    slug: 'intellibank-ai',
    title: 'IntelliBank AI',
    subtitle: 'AI-Driven Backend System',
    period: 'Jun 2024 – Sept 2024',
    description: 'A production-ready Java Spring Boot backend that uses LLMs to process and respond to structured data queries. Built with clean architecture principles — demonstrates applied AI integration with enterprise-grade backend engineering.',
    techStack: ['Java', 'Spring Boot', 'LangChain', 'REST APIs', 'PostgreSQL'],
    githubUrl: 'https://github.com/vkumxr/IntelliBank-AI',
    highlights: [
      'RESTful API with modular design patterns',
      'LLM integration for natural language query processing',
      'Context-aware response generation',
    ],
    problem: 'Traditional query systems require users to learn specific syntax or navigate complex interfaces. There was a need for a system that understands natural language and provides contextual responses.',
    solution: 'Built a Spring Boot backend that leverages LangChain and LLMs to understand user intent, maintain conversation context, and process complex multi-turn interactions.',
    features: [
      'Natural language query understanding',
      'Account and transaction data retrieval',
      'Context-aware conversation management',
      'RESTful API for integration',
      'Extensible architecture',
    ],
    challenges: [
      'Accurate intent classification',
      'Managing conversation state',
      'Balancing response quality with latency',
    ],
    outcome: 'Fully functional conversational system demonstrating LLM integration potential. Modular architecture allows easy extension.',
    learnings: [
      'LLM integration and prompt engineering',
      'Spring Boot best practices',
      'Production-ready API design',
    ],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};
