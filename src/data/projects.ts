export interface Project {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  techStack: string[];
  githubUrl: string;
  status?: string;
}

export const projects: Project[] = [
  {
    slug: 'redroid-ai',
    title: 'ReDroid-AI',
    problem: 'Reverse-engineering Android apps is slow and manual.',
    solution: 'AI-driven assistant that explains unknown code, highlights suspicious behavior, and generates readable analysis reports.',
    techStack: ['Python', 'AI Workflows'],
    githubUrl: 'https://github.com/vkumxr/ReDroid-AI',
    status: 'MVP in progress',
  },
  {
    slug: 'pubot',
    title: 'PuBot',
    problem: 'Need a modular, hackable robotics platform for learning.',
    solution: 'Python-powered robotics platform using Raspberry Pi for automation and control. Modular, extendable, practical.',
    techStack: ['Python', 'Raspberry Pi'],
    githubUrl: 'https://github.com/vkumxr/PuBOT',
  },
  {
    slug: 'intellibank-ai',
    title: 'IntelliBank-AI',
    problem: 'Traditional banking chatbots are rigid and frustrating.',
    solution: 'Backend system with AI chat interface capable of handling banking-style queries and automation tasks.',
    techStack: ['Java', 'Spring Boot', 'AI'],
    githubUrl: 'https://github.com/vkumxr/IntelliBank-AI',
  },
  {
    slug: 'facelog',
    title: 'FaceLog',
    problem: 'Manual attendance tracking is inefficient.',
    solution: 'Python + OpenCV system that identifies faces and logs attendance automatically.',
    techStack: ['Python', 'OpenCV'],
    githubUrl: 'https://github.com/vkumxr/FaceLog',
  },
  {
    slug: 'fruitcutter',
    title: 'FruitCutter',
    problem: 'Wanted to learn game dev fundamentals.',
    solution: 'Re-implemented slicing mechanics, scoring, and collision logic from scratch.',
    techStack: ['Scratch'],
    githubUrl: 'https://github.com/vkumxr/FruitCutter---The-Classic-Fruit-Ninja-Reimagined',
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};
