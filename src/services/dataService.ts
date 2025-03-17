// ------------------------------------------------
// HARDCODED DATA APPROACH
// ------------------------------------------------
// This file contains hardcoded data for the portfolio website
// All Firebase functionality has been removed to ensure consistent 
// data display across all devices without relying on external data sources.

// Technologies hardcoded data
const technologies = [
  {
    name: "HTML 5",
    icon: "/html.png",
  },
  {
    name: "CSS 3",
    icon: "/css.png",
  },
  {
    name: "JavaScript",
    icon: "/javascript.png",
  },
  {
    name: "TypeScript",
    icon: "/typescript.png",
  },
  {
    name: "React JS",
    icon: "/reactjs.png",
  },
  {
    name: "Redux Toolkit",
    icon: "/redux.png",
  },
  {
    name: "Tailwind CSS",
    icon: "/tailwind.png",
  },
  {
    name: "Node JS",
    icon: "/nodejs.png",
  },
  {
    name: "MongoDB",
    icon: "/mongodb.png",
  },
  {
    name: "Three JS",
    icon: "/threejs.svg",
  },
  {
    name: "git",
    icon: "/git.png",
  },
  {
    name: "figma",
    icon: "/figma.png",
  },
  {
    name: "docker",
    icon: "/docker.png",
  },
];

// Projects hardcoded data
const projects = [
  {
    id: "modern-portfolio",
    name: "Modern Portfolio Website",
    description: "A feature-rich portfolio website built with React, Three.js, and Tailwind CSS. Features 3D models, smooth animations, and a responsive design.",
    longDescription: "This is my personal portfolio website built with modern web technologies. It showcases my work, skills, and experiences in a visually appealing and interactive way. The site features smooth animations, 3D elements, and a responsive design that adapts to any screen size.",
    challenge: "The main challenge was creating a performant and visually appealing website that highlights my work while maintaining good accessibility and user experience across different devices.",
    role: "Sole Developer: Designed and implemented the entire website from concept to deployment.",
    year: "2023-2024",
    timeline: "December 2023 - March 2024",
    tools: "React, TypeScript, Three.js, Tailwind CSS, Framer Motion, Vite",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Three.js", color: "green-text-gradient" },
      { name: "Tailwind CSS", color: "pink-text-gradient" },
      { name: "Framer Motion", color: "orange-text-gradient" }
    ],
    image: "/carrent.png",
    images: [
      "/carrent.png"
    ],
    source_code_link: "https://github.com/nikhilesh-s/nikhileshportfolio-v2",
    live_demo_link: "https://nikhileshsuravarjjala.vercel.app/",
    features: [
      "3D models and animations",
      "Responsive design for all device sizes",
      "Interactive UI elements with smooth transitions",
      "Performance optimized for fast loading",
      "Contact form for easy communication"
    ],
    goal: "Create a modern, visually appealing portfolio to showcase my projects and skills to potential employers and clients."
  },
  {
    id: "backeaze",
    name: "BackEaze Innoventions",
    description: "An innovative ergonomic solution designed to improve posture and comfort while maintaining mobility. Developed as part of the DHS Entrepreneurship project where we created a product from concept to market strategy.",
    longDescription: "BackEaze is an innovative ergonomic solution designed to improve posture and comfort while maintaining mobility. As part of the Dublin High School Entrepreneurship project, we created a comprehensive product from concept to market strategy, addressing the growing issue of back pain among office workers and students.",
    challenge: "How might we create an ergonomic solution that is both effective and user-friendly while ensuring durability and ease of maintenance? Our team needed to address the growing issue of back pain among office workers and students who spend long hours sitting.",
    role: "Project Lead, Hardware Designer, Software Integrator, and Website Developer. Led a team of four students to design, prototype, and develop a comprehensive business strategy for a posture-correction device.",
    year: "2024",
    timeline: "January - March 2024",
    tools: "CAD software (Fusion 360), Arduino IDE, 3D printer, Electronic components (accelerometers, buzzers), Circuit design",
    tags: [
      { name: "CAD Software", color: "blue-text-gradient" },
      { name: "Arduino", color: "green-text-gradient" },
      { name: "3D Printing", color: "pink-text-gradient" },
      { name: "Circuit Design", color: "orange-text-gradient" }
    ],
    image: "/images/projects/backeaze/backeazess.jpeg",
    images: [
      "/images/projects/backeaze/backeazess.jpeg",
      "/images/projects/backeaze/backeazephysicalproto.jpeg",
      "/images/projects/backeaze/customizableaesthetics.jpeg"
    ],
    source_code_link: "https://github.com/nikhilesh-s/Back-Ease-Innovation",
    live_demo_link: "https://docs.google.com/document/d/19y_3gS6pN_2BaMqD63-9Pq6wujIL9njENfl-4Yl_0go/edit?tab=t.0#heading=h.i3peab6127i5",
    features: [
      "Precision posture tracking with advanced accelerometer technology",
      "Haptic feedback system that gently reminds users to correct their posture",
      "Long battery life with USB-C charging",
      "Sleek, minimalist design that fits comfortably on any chair",
      "Simple setup and low maintenance requirements"
    ],
    resources: [
      {
        name: "GitHub Repository",
        url: "https://github.com/nikhilesh-s/Back-Ease-Innovation"
      },
      {
        name: "Technical Drawings",
        url: "https://acrobat.adobe.com/id/urn:aaid:sc:VA6C2:9e9065bc-758b-44ce-9688-1a3ad49a09a0"
      },
      {
        name: "Electronics Explanation Video",
        url: "https://drive.google.com/file/d/1nQ6c-LZOBx_pCbE1AjC6acIbUXD7G-kc/view"
      },
      {
        name: "Marketing Strategy",
        url: "https://docs.google.com/document/d/1qmfPPLpsqkyJwPwxQb4i0GSJGpfsP5t4URW0dWFWXI8/edit?tab=t.0"
      }
    ],
    goal: "Create an affordable, effective solution to combat poor posture and associated health issues for office workers and students."
  },
  {
    id: "studyleaf",
    name: "StudyLeaf - AI Study App",
    description: "A cutting-edge study app designed to revolutionize learning for middle and high school students, featuring AI-powered tools and personalized study experiences. Started with the congressional app challenge, then used to jumpstart Tri-Valley Tech.",
    longDescription: "StudyLeaf is a cutting-edge study app designed to revolutionize learning for middle and high school students. It features AI-powered tools and personalized study experiences that make learning more effective and engaging. The project began as an entry for the Congressional App Challenge and has since evolved to become a cornerstone product for Tri-Valley Tech.",
    challenge: "How can we create an intuitive app that leverages artificial intelligence to enhance studying while accommodating diverse learning styles and making education more accessible and effective?",
    role: "App Co-Founder: Worked alongside Amir to co-found StudyLeaf, a cutting-edge app designed to revolutionize studying for middle and high school students.\n\nLogistics and UI Manager: Assisted in designing user-friendly interfaces and contributed to the organization of features that ensure the app is accessible and effective for diverse learning styles.\n\nStrategic Planner: Helped plan the strategic direction of the app to ensure its growth and relevance in the education space.",
    year: "2024-2025",
    timeline: "Initial Launch: 2024\nGrowth Phase: 2025",
    tools: "Development: Next.js, MongoDB, Gemini API, AWS, Shadcn, RAG for app performance and AI integrations.\nDesign: Shadcn for building the visually appealing and user-friendly interface.\nData Integration: Gemini API for AI-powered features and RAG to generate responses from large document files.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "Gemini API", color: "pink-text-gradient" },
      { name: "AWS", color: "orange-text-gradient" },
      { name: "AI Integration", color: "purple-text-gradient" }
    ],
    image: "/images/projects/studyleaf/logo.png",
    images: [
      "/images/projects/studyleaf/logo.png"
    ],
    source_code_link: "https://github.com/nikhilesh-s/studyleaf",
    live_demo_link: "https://studyleaf.org",
    features: [
      "Personalized Study Plans: Tailors study experiences to individual learning styles and goals.",
      "Quiz Generation & Progress Tracking: Instantly creates quizzes from notes and tracks progress using easy-to-read graphs.",
      "Chat with a PDF: Allows students to ask questions about their notes and get concise, accurate answers.",
      "AI-Powered Lecture to Notes: Converts lecture audio into well-structured notes in various formats (e.g., Cornell style)."
    ],
    goal: "Position StudyLeaf as the #1 study app in the U.S. by the end of 2025."
  }
];

// Experiences hardcoded data
const experiences = [
  {
    title: "Chief Executive Officer",
    company_name: "Tri Valley Tech",
    icon: "/starbucks.png",
    iconBg: "#383E56",
    date: "January 2023 - Present",
    points: [
      "Leading web development consulting services for organizations to establish robust digital platforms.",
      "Developing and maintaining responsive web applications using React, Node.js and modern frameworks.",
      "Designing user interfaces and implementing UX best practices to create intuitive and accessible experiences.",
      "Managing client relationships and ensuring projects meet quality standards and deadlines."
    ],
  },
  {
    title: "VEX Robotics Team Lead",
    company_name: "Dublin High School Robotics",
    icon: "/tesla.png",
    iconBg: "#E6DEDD",
    date: "August 2023 - Present",
    points: [
      "Designing, building, and programming competitive robots for VEX Robotics competitions.",
      "Leading a team of engineers and programmers in developing innovative mechanical solutions.",
      "Applying engineering principles to solve complex challenges in robotics design and function.",
      "Participating in regional and state-level competitions representing Dublin High School."
    ],
  },
  {
    title: "Vice President",
    company_name: "Dublin High School Class of 2027",
    icon: "/meta.png",
    iconBg: "#E6DEDD",
    date: "September 2023 - Present",
    points: [
      "Organizing community and leadership events through the DubLead program.",
      "Managing class initiatives and representing student interests to faculty and administration.",
      "Coordinating with fellow officers to plan activities that enhance student experience.",
      "Developing leadership and organizational skills through hands-on experience in student government."
    ],
  }
];

// About hardcoded data
const about = {
  title: "Nikhilesh Suravarjjala",
  description: [
    "Success in the modern world is driven by technology, innovation, and leadership, and I am committed to making a meaningful impact in these fields. My goal is to pursue a career in computer science and engineering, specializing in software development, web development, and problem-solving applications. I plan to achieve this by continuing to refine my technical expertise through hands-on projects, leadership experiences, and community-driven initiatives. Engineering and software development fascinate me because they provide the opportunity to design solutions that improve efficiency, solve complex challenges, and make a lasting difference. With a passion for technology consulting and strategic problem-solving, I strive to create innovative digital solutions that enhance organizations and businesses.",
    
    "As the Chief Executive Officer of Tri Valley Tech, I lead web development consulting projects to help organizations build strong digital platforms while improving my technical and leadership skills. I actively apply my expertise in software engineering, web development, and user experience design to create functional and impactful websites. In addition, I have gained extensive experience in engineering and problem-solving through my participation in the VEX Robotics Competition, where I design, build, and program competitive robots. My leadership extends beyond technology, as I serve as the Vice President for the Dublin High School Class of 2027 through the DubLead program, where I help organize community and leadership events. I also compete at the national level in Dublin High School Speech and Debate, where I hold the position of Treasurer and have developed strong public speaking, analytical, and persuasive communication skills. Additionally, I serve as the President of the Gallant Gaveliers Gavel Club, where I have earned district and state-level awards for public speaking.",
    
    "Beyond my academic and leadership pursuits, I am involved in varsity tennis and volunteer with the California Scholarship Federation, reinforcing my commitment to teamwork, service, and discipline. Through these experiences, I have developed a strong foundation in leadership, adaptability, and strategic problem-solving, all of which are essential in the field of engineering and technology. Looking ahead, I aspire to combine my technical knowledge, leadership abilities, and problem-solving skills to drive innovation in software engineering and technology consulting. Thank you for your time, and I invite you to explore the rest of my site to learn more about my work and experiences."
  ],
  image: "/profile.jpg",
  skills: ["Software Development", "Web Development", "Robotics", "Leadership", "Public Speaking", "Problem Solving"]
};

// Contact information
const contact = {
  email: "niksuravarjjala@gmail.com",
  phone: "+1 (123) 456-7890",
  location: "New York, NY",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername"
  }
};

// Hero section data
const hero = {
  name: "Nikhilesh Suravarjjala",
  title: "Software Developer",
  subtitle: "I develop modern web applications and interactive 3D experiences",
  cta: "View My Work",
  roles: ["Software Developer", "Full Stack Developer", "Student"],
  description: "Building the future with clean, elegant code. Currently working on cutting-edge web applications and exploring the frontiers of technology.",
  image: "", 
  resumeLink: "/resume.pdf"
};

// Feedbacks data
const feedbacks = [
  {
    testimonial: "I thought it was impossible to make a website as beautiful as our product, but this developer proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial: "I've never met a web developer who truly cares about their clients' success like this person does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial: "After this developer optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

// Functions to return hardcoded data
export const getTechnologies = async () => {
  return technologies;
};

export const getProjects = async () => {
  return projects;
};

export const getExperiences = async () => {
  return experiences;
};

export const getAbout = async () => {
  return about;
};

export const getContact = async () => {
  return contact;
};

export const getHero = async () => {
  return hero;
};

export const getFeedbacks = async () => {
  return feedbacks;
};

// These exports are needed for compatibility with existing imports
// but they don't actually connect to Firebase anymore
export const db = {};
export const auth = {};
export const storage = {};

// Export placeholder functions for admin components
// These functions don't do anything since we've removed Firebase functionality
export const saveProjects = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return false;
};

export const saveTechnologies = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return false;
};

export const saveExperiences = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return false;
};

export const saveAbout = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return false;
};

export const saveContact = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return false;
};

export const saveHero = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return false;
};

export const saveFeedbacks = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return false;
};

export const getSkills = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return [];
};

export const saveSkills = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return false;
};

export const getResume = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return null;
};

export const saveResume = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return false;
};

// Additional placeholder functions for other admin components
export const getCertifications = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return [];
};

export const saveCertifications = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return false;
};

export const getJourney = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return [];
};

export const saveJourney = async () => {
  console.log("Firebase functionality removed - using hardcoded data instead");
  return false;
};