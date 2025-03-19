import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjects } from '../services/dataService';
import { styles } from '../styles';
import { Navbar, Footer } from '../components';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const projects = await getProjects();
        const foundProject = projects.find((p: any) => p.id === id);
        if (foundProject) {
          setProject(foundProject);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-primary text-white min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="animate-pulse">Loading project details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-primary text-white min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/#projects" className="inline-flex items-center mt-4 text-secondary hover:text-white">
            <ArrowLeft className="mr-2" size={16} />
            Back to Projects
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-primary text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Link to="/#projects" className="inline-flex items-center mb-8 text-secondary hover:text-white">
          <ArrowLeft className="mr-2" size={16} />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${styles.heroHeadText} text-white`}
            >
              {project.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-secondary text-lg leading-relaxed"
            >
              {project.longDescription || project.description}
            </motion.p>

            {project.challenge && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8"
              >
                <h2 className="text-xl font-bold text-white mb-2">The Challenge</h2>
                <p className="text-secondary">{project.challenge}</p>
              </motion.div>
            )}

            {project.role && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <h2 className="text-xl font-bold text-white mb-2">My Role</h2>
                <p className="text-secondary whitespace-pre-line">{project.role}</p>
              </motion.div>
            )}

            {project.features && project.features.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8"
              >
                <h2 className="text-xl font-bold text-white mb-2">Key Features</h2>
                <ul className="list-disc pl-5 text-secondary">
                  {project.features.map((feature: string, index: number) => (
                    <li key={index} className="mb-1">{feature}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {project.resources && project.resources.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8"
              >
                <h2 className="text-xl font-bold text-white mb-2">Resources</h2>
                <ul className="list-disc pl-5 text-secondary">
                  {project.resources.map((resource: any, index: number) => (
                    <li key={index} className="mb-1">
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {resource.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-tertiary rounded-2xl p-5 h-fit"
            >
              <div className="mb-5">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-auto rounded-xl"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags && project.tags.map((tag: any, index: number) => (
                  <span 
                    key={index}
                    className={`text-sm ${tag.color || 'text-white'} bg-black bg-opacity-30 px-3 py-1 rounded-full`}
                  >
                    {tag.name || tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {project.source_code_link && (
                  <a 
                    href={project.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#151030] hover:bg-[#1d1745] transition-colors flex items-center justify-center gap-2 text-white py-2 px-3 rounded-lg text-sm"
                  >
                    <Github size={16} />
                    Source Code
                  </a>
                )}
                {project.live_demo_link && (
                  <a 
                    href={project.live_demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#151030] hover:bg-[#1d1745] transition-colors flex items-center justify-center gap-2 text-white py-2 px-3 rounded-lg text-sm"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>

              <div className="mt-6 space-y-3">
                {project.year && (
                  <div>
                    <h3 className="text-white font-semibold">Year</h3>
                    <p className="text-secondary">{project.year}</p>
                  </div>
                )}
                {project.timeline && (
                  <div>
                    <h3 className="text-white font-semibold">Timeline</h3>
                    <p className="text-secondary whitespace-pre-line">{project.timeline}</p>
                  </div>
                )}
                {project.tools && (
                  <div>
                    <h3 className="text-white font-semibold">Technologies</h3>
                    <p className="text-secondary whitespace-pre-line">{project.tools}</p>
                  </div>
                )}
                {project.goal && (
                  <div>
                    <h3 className="text-white font-semibold">Goal</h3>
                    <p className="text-secondary">{project.goal}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {project.images && project.images.length > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6"
              >
                <h3 className="text-white font-semibold mb-3">Project Gallery</h3>
                <div className="grid grid-cols-2 gap-3">
                  {project.images.slice(1).map((img: string, index: number) => (
                    <div key={index} className="aspect-w-16 aspect-h-9">
                      <img 
                        src={img} 
                        alt={`${project.name} image ${index + 2}`} 
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
