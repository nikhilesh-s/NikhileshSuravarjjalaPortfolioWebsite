import { motion } from "framer-motion";
import { fadeIn, titleContentSlideIn } from "../utils/motion";
import { styles } from "../styles";
import { SectionWrapper } from "../utils/wrapper";

// Skill categories with their skills
const skillCategories = [
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

// Feedbacks component (renamed to Skills in display)
const Feedbacks = () => {
  const animations = titleContentSlideIn();
  
  return (
    <div id="skills" className="padding-x padding-y max-w-7xl mx-auto relative z-0">
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={animations.title}
      >
        <p className={styles.sectionSubText}>My technical expertise</p>
        <h2 className={styles.sectionHeadText}>Skills & Competencies</h2>
      </motion.div>

      <motion.div 
        className="mt-12 flex flex-wrap justify-between"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={animations.content}
      >
        {skillCategories.map((category, index) => (
          <SkillCategory 
            key={index}
            title={category.title}
            skills={category.skills}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "skills");
