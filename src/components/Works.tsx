import { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { projects as defaultProjects } from "../constants";
import { fadeIn, titleContentSlideIn } from "../utils/motion";
import type { Project } from "../types";
import { Github } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { styles } from "../styles";
import { SectionWrapper } from "../utils/wrapper";
import { getProjects } from "../services/dataService";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}: Project & { index: number }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            {source_code_link && (
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer mr-2"
              >
                <Github className="w-1/2 h-1/2 object-contain" />
              </div>
            )}
            {live_demo_link && (
              <div
                onClick={() => window.open(live_demo_link, "_blank")}
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
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const animations = titleContentSlideIn();

  useEffect(() => {
    // Fetch projects from Firebase with localStorage fallback
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        // Try to get projects from Firebase
        const firebaseProjects = await getProjects();
        
        if (firebaseProjects && firebaseProjects.length > 0) {
          setProjects(firebaseProjects);
        } else {
          // Fallback to localStorage if Firebase doesn't have data
          const savedProjects = localStorage.getItem('portfolio-projects');
          if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
          } else {
            setProjects(defaultProjects);
          }
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        // If Firebase fails, try localStorage
        const savedProjects = localStorage.getItem('portfolio-projects');
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects));
        } else {
          setProjects(defaultProjects);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  return (
    <div id="projects" className="padding-x padding-y max-w-7xl mx-auto relative z-0">
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={animations.title}
      >
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={animations.content}
        className="mt-20 flex flex-row flex-wrap justify-center gap-7"
      >
        {isLoading ? (
          <p className="text-white">Loading projects...</p>
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))
        )}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Works, "projects");
