import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tilt from 'react-tilt';
import { getProjects } from '../services/dataService';
import { styles } from '../styles';
import { SectionWrapper } from '../utils/wrapper';
import { Project } from '../types';

const ProjectCard = ({ 
  index, 
  id, 
  name, 
  description, 
  tags, 
  image, 
  source_code_link, 
  live_demo_link 
}: Project & { index: number }) => {
  return (
    <motion.div variants={{
      hidden: { y: -50, opacity: 0 },
      show: { y: 0, opacity: 1, transition: { type: 'spring', duration: 0.75, delay: index * 0.175 } }
    }}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <Link to={`/project/${id}`} className="block">
          <div className="relative w-full h-[230px]">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              {source_code_link && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(source_code_link, "_blank");
                  }}
                  className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer mr-2"
                >
                  <Github className="w-1/2 h-1/2 object-contain" />
                </div>
              )}
              {live_demo_link && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(live_demo_link, "_blank");
                  }}
                  className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                >
                  <ExternalLink className="w-1/2 h-1/2 object-contain" />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-white font-bold text-[24px]">{name}</h3>
            <p className="mt-2 text-secondary text-[14px]">{description}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={typeof tag === 'string' ? tag : tag.name} className={`text-[14px] ${typeof tag === 'string' ? 'text-indigo-300' : tag.color}`}>
                #{typeof tag === 'string' ? tag : tag.name}
              </p>
            ))}
          </div>
        </Link>
      </Tilt>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData as Project[]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        // Simple loading simulation
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <motion.div>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } }
          }}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          The following projects showcase my skills and experience through real-world examples of my work. 
          Each project is briefly described with links to code repositories and live demos. 
          They reflect my ability to solve complex problems, work with different technologies, 
          and manage projects effectively.
        </motion.p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="mt-20 flex flex-wrap gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Projects, "projects");
