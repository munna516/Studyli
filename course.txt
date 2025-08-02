const sampleCourses = [
  {
    title: "Introduction to Computer Science",
    shortDescription: "Learn the fundamentals of computer science and programming",
    description: "A comprehensive introduction to computer science concepts, algorithms, and programming fundamentals. This course covers basic programming concepts, data structures, and problem-solving techniques.",
    category: "Computer Science & Engineering",
    author: {
      name: "Dr. Sarah Johnson",
      id: "507f1f77bcf86cd799439011" // This would be a real user ID in production
    },
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "12 hours",
    level: "Beginner",
    price: 0,
    enrolledStudents: []
  },
  {
    title: "Advanced Mathematics for Engineering",
    shortDescription: "Master advanced mathematical concepts for engineering applications",
    description: "Deep dive into calculus, linear algebra, and differential equations for engineering students. Practical applications and problem-solving techniques.",
    category: "Math",
    author: {
      name: "Prof. Michael Chen",
      id: "507f1f77bcf86cd799439012"
    },
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "15 hours",
    level: "Advanced",
    price: 0,
    enrolledStudents: []
  },
  {
    title: "Business Strategy and Management",
    shortDescription: "Develop strategic thinking and management skills",
    description: "Learn essential business strategy concepts and management techniques for modern organizations. Case studies and real-world applications.",
    category: "Management",
    author: {
      name: "Dr. Emily Rodriguez",
      id: "507f1f77bcf86cd799439013"
    },
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "10 hours",
    level: "Intermediate",
    price: 0,
    enrolledStudents: []
  },
  {
    title: "Organic Chemistry Fundamentals",
    shortDescription: "Understand the basics of organic chemistry and molecular structures",
    description: "Comprehensive study of organic compounds, reactions, and molecular structures. Laboratory techniques and safety protocols included.",
    category: "Chemistry",
    author: {
      name: "Prof. David Kim",
      id: "507f1f77bcf86cd799439014"
    },
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "14 hours",
    level: "Intermediate",
    price: 0,
    enrolledStudents: []
  },
  {
    title: "Electrical Circuit Design",
    shortDescription: "Learn to design and analyze electrical circuits",
    description: "Practical course on electrical circuit design, analysis, and implementation. Hands-on projects and simulation tools.",
    category: "Electrical & Electronic Engineering",
    author: {
      name: "Dr. Robert Wilson",
      id: "507f1f77bcf86cd799439015"
    },
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "16 hours",
    level: "Advanced",
    price: 0,
    enrolledStudents: []
  },
  {
    title: "English Literature and Composition",
    shortDescription: "Explore classic literature and improve writing skills",
    description: "Study of classic literature and development of advanced writing and analytical skills. Critical thinking and literary analysis.",
    category: "English",
    author: {
      name: "Prof. Lisa Thompson",
      id: "507f1f77bcf86cd799439016"
    },
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "11 hours",
    level: "Beginner",
    price: 0,
    enrolledStudents: []
  },
  {
    title: "Mechanical Engineering Principles",
    shortDescription: "Core principles of mechanical engineering and design",
    description: "Fundamental concepts of mechanical engineering including statics, dynamics, materials science, and design principles.",
    category: "Mechanical Engineering",
    author: {
      name: "Dr. James Anderson",
      id: "507f1f77bcf86cd799439017"
    },
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "18 hours",
    level: "Intermediate",
    price: 0,
    enrolledStudents: []
  },
  {
    title: "Civil Engineering Fundamentals",
    shortDescription: "Introduction to civil engineering and infrastructure design",
    description: "Basic principles of civil engineering including structural analysis, construction materials, and infrastructure planning.",
    category: "Civil Engineering",
    author: {
      name: "Prof. Maria Garcia",
      id: "507f1f77bcf86cd799439018"
    },
    thumbnail: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "13 hours",
    level: "Beginner",
    price: 0,
    enrolledStudents: []
  },
  {
    title: "Physics for Scientists and Engineers",
    shortDescription: "Comprehensive physics course for science and engineering students",
    description: "Advanced physics concepts including mechanics, thermodynamics, electromagnetism, and modern physics applications.",
    category: "Physics",
    author: {
      name: "Dr. Thomas Brown",
      id: "507f1f77bcf86cd799439019"
    },
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    duration: "20 hours",
    level: "Advanced",
    price: 0,
    enrolledStudents: []
  }
];

