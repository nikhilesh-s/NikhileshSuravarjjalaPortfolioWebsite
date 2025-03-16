import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { getProjects } from '../services/dataService';

interface Project {
  title?: string;
  description: string;
  tags: string[] | {name: string, color?: string}[];
  image: string;
  githubLink?: string;
  demoLink?: string;
  name?: string;
  source_code_link?: string;
  live_demo_link?: string;
}

// Fallback projects if Firebase fails
const fallbackProjects: Project[] = [
  {
    title: "Project 1",
    description: "Description of your first project. Highlight the key features and technologies used.",
    tags: ["React", "TypeScript", "Node.js"],
    image: "/project1.png",
    githubLink: "https://github.com/yourusername/project1",
    demoLink: "https://project1-demo.com"
  }
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("Fetching projects...");
        setIsLoading(true);
        const firebaseProjects = await getProjects();
        console.log("Firebase projects:", firebaseProjects);
        
        if (firebaseProjects && Array.isArray(firebaseProjects) && firebaseProjects.length > 0) {
          // Convert from the format used in ProjectEditor to the format used here
          const formattedProjects = firebaseProjects.map((project: any) => {
            console.log("Processing project:", project);
            return {
              title: project.name || project.title || "Untitled Project",
              description: project.description || "No description provided",
              tags: Array.isArray(project.tags) 
                ? project.tags.map((tag: any) => typeof tag === 'string' ? tag : (tag.name || "")) 
                : [],
              image: project.image || "/project1.png",
              githubLink: project.source_code_link || project.githubLink || "#",
              demoLink: project.live_demo_link || project.demoLink || "#"
            };
          });
          console.log("Formatted projects:", formattedProjects);
          setProjects(formattedProjects);
        } else {
          console.log("No Firebase projects found, checking localStorage");
          // Fallback to localStorage if no data in Firebase
          const savedProjects = localStorage.getItem('portfolio-projects');
          if (savedProjects) {
            try {
              const parsedProjects = JSON.parse(savedProjects);
              console.log("Projects from localStorage:", parsedProjects);
              const formattedProjects = parsedProjects.map((project: any) => ({
                title: project.name || project.title || "Untitled Project",
                description: project.description || "No description provided",
                tags: Array.isArray(project.tags) 
                  ? project.tags.map((tag: any) => typeof tag === 'string' ? tag : (tag.name || "")) 
                  : [],
                image: project.image || "/project1.png",
                githubLink: project.source_code_link || project.githubLink || "#",
                demoLink: project.live_demo_link || project.demoLink || "#"
              }));
              console.log("Formatted localStorage projects:", formattedProjects);
              setProjects(formattedProjects);
            } catch (error) {
              console.error("Failed to parse projects from localStorage:", error);
              setProjects(fallbackProjects);
            }
          } else {
            console.log("Using fallback projects");
            setProjects(fallbackProjects);
          }
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Fallback to localStorage if Firebase fails
        const savedProjects = localStorage.getItem('portfolio-projects');
        if (savedProjects) {
          try {
            const parsedProjects = JSON.parse(savedProjects);
            const formattedProjects = parsedProjects.map((project: any) => ({
              title: project.name || project.title || "Untitled Project",
              description: project.description || "No description provided",
              tags: Array.isArray(project.tags) 
                ? project.tags.map((tag: any) => typeof tag === 'string' ? tag : (tag.name || "")) 
                : [],
              image: project.image || "/project1.png",
              githubLink: project.source_code_link || project.githubLink || "#",
              demoLink: project.live_demo_link || project.demoLink || "#"
            }));
            setProjects(formattedProjects);
          } catch (error) {
            console.error("Failed to parse projects from localStorage:", error);
            setProjects(fallbackProjects);
          }
        } else {
          setProjects(fallbackProjects);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="min-h-screen py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            My <span className="text-indigo-500">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {projects.length === 0 ? (
              <div className="text-center text-white">
                <p>No projects found. Add some through the admin dashboard!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-black-100 rounded-xl overflow-hidden group"
                  >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white rounded-full hover:bg-indigo-500 hover:text-white transition-colors duration-300"
                        >
                          <Github size={20} />
                        </a>
                        {project.demoLink && project.demoLink !== "#" && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-full hover:bg-indigo-500 hover:text-white transition-colors duration-300"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm"
                          >
                            {typeof tag === 'string' ? tag : tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-16 text-sm text-gray-400"
        >
          <p>Design inspired by <a href="https://github.com/sunnypatell/Portfolio" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">Sunny Patel's Portfolio</a></p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
