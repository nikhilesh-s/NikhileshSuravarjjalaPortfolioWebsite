import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fadeIn, titleContentSlideIn } from "../utils/motion";
import { styles } from "../styles";
import { SectionWrapper } from "../utils/wrapper";
import { getFeedbacks } from "../services/dataService";

// Fallback skills data
const fallbackSkillCategories = [
  {
    title: "Frontend Development",
    skills: ["React", "NextJS", "TypeScript", "TailwindCSS", "Redux", "HTML5/CSS3", "JavaScript", "Vue.js"]
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Django", "Flask", "GraphQL", "REST API"]
  },
  {
    title: "DevOps & Tools",
    skills: ["Docker", "AWS", "CI/CD", "Git", "GitHub Actions", "Kubernetes", "Linux", "Bash"]
  },
  {
    title: "3D & Graphics",
    skills: ["Three.js", "WebGL", "Blender", "Framer Motion", "GSAP", "Shader Programming"]
  },
  {
    title: "Leadership & Soft Skills",
    skills: ["Project Management", "Team Leadership", "Agile/Scrum", "Technical Writing", "Public Speaking", "Problem Solving"]
  }
];

// Skill category component
const SkillCategory = ({ title, skills, index }: { title: string; skills: string[]; index: number }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
      className="w-full md:w-[48%] bg-tertiary rounded-2xl p-6 mb-4"
    >
      <h3 className="text-white font-bold text-[20px] mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, skillIndex) => (
          <span 
            key={skillIndex} 
            className="bg-primary px-3 py-1 rounded-full text-[14px] text-white"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Feedbacks = () => {
  // Removing unused feedbacks state variable to fix lint warning
  const [skillCategories, setSkillCategories] = useState(fallbackSkillCategories);
  const [isLoading, setIsLoading] = useState(true);
  const animations = titleContentSlideIn();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setIsLoading(true);
        const data = await getFeedbacks();
        if (data && data.length > 0) {
          // If we have skills data in feedbacks, update skill categories
          if (data[0]?.skillCategories) {
            setSkillCategories(data[0].skillCategories);
          }
        } else {
          // Fallback to localStorage
          const localFeedbacks = localStorage.getItem('portfolio-feedbacks');
          if (localFeedbacks) {
            try {
              const parsedFeedbacks = JSON.parse(localFeedbacks);
              // If we have skills data in feedbacks, update skill categories
              if (parsedFeedbacks[0]?.skillCategories) {
                setSkillCategories(parsedFeedbacks[0].skillCategories);
              }
            } catch (e) {
              console.error("Error parsing localStorage feedbacks:", e);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error);
        // Try localStorage as fallback
        const localFeedbacks = localStorage.getItem('portfolio-feedbacks');
        if (localFeedbacks) {
          try {
            const parsedFeedbacks = JSON.parse(localFeedbacks);
            // If we have skills data in feedbacks, update skill categories
            if (parsedFeedbacks[0]?.skillCategories) {
              setSkillCategories(parsedFeedbacks[0].skillCategories);
            }
          } catch (e) {
            console.error("Error parsing localStorage feedbacks:", e);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div id="skills" className="padding-x padding-y max-w-7xl mx-auto relative z-0">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={animations.title}
        className="mb-12"
      >
        <p className={styles.sectionSubText}>My capabilities</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-between gap-4">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              skills={category.skills}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Feedbacks, "skills");
