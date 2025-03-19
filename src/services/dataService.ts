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
    id: "tvt-website",
    name: "Tri Valley Tech Website",
    description: "A clean, modern website for Tri Valley Tech nonprofit organization, built with React, Tailwind CSS, and Vite. The site showcases services, projects, and initiatives for tech education and community impact.",
    longDescription: "The Tri Valley Tech website represents a key platform for our nonprofit organization, dedicated to showcasing our services, projects, and mission. The site offers a clean, professional design with intuitive navigation, providing visitors with easy access to information about our tech initiatives, educational programs, and community outreach. It was built with React, Tailwind CSS, and Vite, ensuring a fast, responsive, and visually appealing user experience.",
    challenge: "The primary challenges involved creating a sleek, modern interface while maintaining simplicity and accessibility. We aimed to highlight our services and projects effectively without overwhelming visitors with excessive content. Additionally, optimizing load times and ensuring seamless navigation across devices were key priorities.",
    role: "CEO & Lead Developer: As the CEO of Tri Valley Tech, I collaborated with my co-CEO, Amir, throughout the website development process. I contributed to the design and layout decisions but primarily focused on site maintenance and regular updates. This included adding new project pages, refining content, and ensuring the site remained functional and up to date. Amir played a major role in the core design and technical development.",
    year: "2024-Ongoing",
    timeline: "October 2024 – Present (ongoing updates and maintenance)",
    tools: "React, Tailwind CSS, Vite, EmailJS",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Tailwind CSS", color: "green-text-gradient" },
      { name: "Vite", color: "pink-text-gradient" },
      { name: "EmailJS", color: "orange-text-gradient" }
    ],
    image: "/TVT Website Image.png", 
    images: [
      "/TVT Website Image.png" 
    ],
    source_code_link: "",
    live_demo_link: "https://trivalleytech.org",
    features: [
      "Clean, modern UI with clear navigation paths",
      "Responsive design that adapts to all device sizes",
      "Showcase of services and projects, with detailed descriptions and links",
      "Contact form with email integration for easy communication",
      "Optimized performance for fast loading speeds",
      "Consistent updates to reflect new initiatives and partnerships"
    ],
    goal: "The goal of the Tri Valley Tech website is to serve as a professional hub for our company, providing a clear and compelling overview of our services and projects. It reflects our commitment to tech education, innovation, and community impact, offering potential collaborators and clients a reliable resource to learn more about our work."
  },
  {
    id: "portfolio",
    name: "Portfolio Website",
    description: "A modern, interactive portfolio website built with React, Three.js, and Tailwind CSS, featuring 3D models, animations, and a responsive design to showcase my projects and skills.",
    longDescription: "This portfolio website represents a significant milestone in my web development journey. It combines cutting-edge technologies like React, Three.js, and Framer Motion to create an immersive, interactive experience that truly represents my skills and personality. The site features 3D models, smooth animations, and a fully responsive design that adapts to any device size. I built this project to showcase my technical abilities and create a memorable platform for potential employers and clients to explore my work.",
    challenge: "The main challenges included optimizing 3D model performance across devices, implementing smooth transitions and animations without affecting load times, and creating a cohesive design that balances visual appeal with usability. I also had to ensure the site remained accessible despite its heavy reliance on advanced visual elements.",
    role: "Full-stack Developer: Designed and implemented the entire website from concept to deployment, including front-end development, responsive design, 3D model integration, performance optimization, and backend connectivity.",
    year: "2023-2024",
    timeline: "December 2023 - March 2024",
    tools: "React, TypeScript, Three.js, Tailwind CSS, Framer Motion, Vite, EmailJS",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Three.js", color: "green-text-gradient" },
      { name: "TypeScript", color: "pink-text-gradient" },
      { name: "Tailwind CSS", color: "orange-text-gradient" },
      { name: "Framer Motion", color: "purple-text-gradient" }
    ],
    image: "/Portfolio Website Image.png", 
    images: [
      "/Portfolio Website Image.png" 
    ],
    source_code_link: "https://github.com/nikhilesh-s/NikhileshSuravarjjalaPortfolioWebsite",
    live_demo_link: "https://nikhileshsuravarjjala.vercel.app/",
    features: [
      "Interactive 3D models and animations using Three.js",
      "Smooth page transitions and scrolling effects with Framer Motion",
      "Fully responsive design that works on all device sizes",
      "Dynamic project showcase with detailed individual project pages",
      "Contact form with email integration",
      "Performance-optimized 3D rendering",
      "TypeScript for improved code reliability and maintainability",
      "Dark mode aesthetic with vibrant accent colors"
    ],
    resources: [
      {
        name: "GitHub Repository",
        url: "https://github.com/nikhilesh-s/NikhileshSuravarjjalaPortfolioWebsite"
      },
      {
        name: "Live Website",
        url: "https://nikhileshsuravarjjala.vercel.app/"
      },
      {
        name: "Three.js Documentation",
        url: "https://threejs.org/docs/"
      }
    ],
    goal: "Create a standout portfolio website that demonstrates my technical skills while providing an engaging experience for visitors to learn about my projects and abilities."
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

// Journey milestones data for the Career Exploration page
export const getJourneyMilestones = async () => {
  // Simulating an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "early-exposure",
          year: "2014-2015",
          title: "Early Exposure to Robotics & Coding",
          description: "In 2014, I participated in Junior FIRST LEGO League (Jr. FLL), where I used block-based coding to program LEGO robots. This was my first introduction to technology, and it sparked my curiosity about automation and problem-solving.",
          image: ""
        },
        {
          id: "fll",
          year: "2016-2021",
          title: "FIRST LEGO League (FLL) & Developing a Passion for Robotics",
          description: "From 2016 to 2021, I participated in FIRST LEGO League (FLL), where I developed a deep passion for robotics and programming. FLL was an opportunity to design, build, and program robots while collaborating with a team to solve real-world challenges.",
          image: ""
        },
        {
          id: "public-speaking",
          year: "2018-Present",
          title: "Leadership & Public Speaking with Gallant Gaveliers Gavel Club",
          description: "Since 2018, I have been an active member of Gallant Gaveliers Gavel Club, where I have continuously refined my public speaking and leadership skills. Through regular speeches, impromptu speaking exercises, and competitions, I have developed confidence in articulating ideas clearly and persuasively.",
          image: ""
        },
        {
          id: "vex-robotics",
          year: "2020-Present",
          title: "VEX Robotics with Gael Force Robotics 5327",
          description: "In 2020, I transitioned from FLL to VEX Robotics, joining Gael Force Robotics 5327. VEX provided me with more advanced engineering challenges, requiring strategic thinking, coding expertise, and collaboration.",
          image: "/VRC Image.webp"
        },
        {
          id: "debate",
          year: "2021-Present",
          title: "Competitive Public Speaking with DHS Speech & Debate",
          description: "As a member of DHS Speech & Debate, I have competed in various tournaments, further enhancing my ability to think critically and communicate effectively.",
          image: ""
        },
        {
          id: "engineering-courses",
          year: "2023-2025",
          title: "Engineering Courses at Dublin High School",
          description: "As a freshman in the 2023-24 school year, I enrolled in Introduction to Engineering Design (IED) at Dublin High School. Now, as a sophomore (2024-25), I am taking Honors Principles of Engineering (POE).",
          image: ""
        },
        {
          id: "tennis",
          year: "2023-Present",
          title: "Varsity Tennis at Dublin High School",
          description: "In addition to my academic and leadership pursuits, I have been a Varsity Tennis player at DHS since 2023. Competing at this level has taught me the importance of discipline, perseverance, and teamwork.",
          image: ""
        },
        {
          id: "vp-class",
          year: "2024-2025",
          title: "Vice President of DHS Class of 2027",
          description: "As the Vice President of the DHS Class of 2027, I have been responsible for organizing school events, fundraising, and representing my class.",
          image: ""
        },
        {
          id: "tvt",
          year: "2024-Present",
          title: "Leading Tri Valley Tech (TVT) as CEO",
          description: "In late 2024, I joined Tri Valley Tech (TVT), a nonprofit organization focused on making technology education and resources more accessible. After contributing to various initiatives, I became the CEO.",
          image: "/TVT logo.svg"
        }
      ]);
    }, 500);
  });
};

// Experiences hardcoded data
const experiences = [
  {
    title: "Chief Executive Officer",
    company_name: "Tri Valley Tech",
    icon: "/TVT logo.svg", // Updated with the TVT Logo
    iconBg: "#383E56",
    date: "October 2024 - Present",
    points: [
      "Leading web development consulting services for organizations to establish robust digital platforms.",
      "Developing and maintaining responsive web applications using React, Node.js and modern frameworks.",
      "Designing user interfaces and implementing UX best practices to create intuitive and accessible experiences.",
      "Managing client relationships and ensuring projects meet quality standards and deadlines."
    ],
  },
  {
    title: "VEX Robotics Team Lead",
    company_name: "Gael Force Robotics 5327",
    icon: "/VRC Image.webp", // Updated with the VRC Image
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
    icon: "/class-27.png", // Placeholder - to be replaced with image of 27
    iconBg: "#E6DEDD",
    date: "August 2024 - June 2025",
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
  phone: "925-384-8053",
  location: "Dublin, CA",
  social: {
    github: "https://github.com/nikhilesh-s",
    linkedin: "#",
    instagram: "https://www.instagram.com/nik.suravarjjala?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr",
    twitter: ""
  }
};

// Hero section data
const hero = {
  name: "Nikhilesh Suravarjjala",
  title: "Software Developer",
  subtitle: "I develop modern web applications and interactive 3D experiences",
  cta: "View My Work",
  roles: ["Software Developer", "Full Stack Developer", "Student", "Speaker", "Leader"],
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
    skillCategories: [
      {
        title: "Frontend",
        skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Three.js"]
      },
      {
        title: "Backend",
        skills: ["Node.js", "Express", "Firebase", "MongoDB"]
      },
      {
        title: "Tools",
        skills: ["Git", "VS Code", "Figma", "Adobe XD"]
      }
    ]
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