import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubLink: string;
  demoLink?: string;
}

const projects: Project[] = [
  {
    title: "Project 1",
    description: "Description of your first project. Highlight the key features and technologies used.",
    tags: ["React", "TypeScript", "Node.js"],
    image: "/project1.png", // Add your project image
    githubLink: "https://github.com/yourusername/project1",
    demoLink: "https://project1-demo.com"
  },
  // Add more projects here
];

const Projects = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
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
                  {project.demoLink && (
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
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
