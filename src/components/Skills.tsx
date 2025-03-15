import { motion } from 'framer-motion';
import { fadeIn, textVariant, staggerContainer } from '../utils/motion';

const skills = [
  {
    name: "React",
    level: 90,
    color: "blue"
  },
  {
    name: "TypeScript",
    level: 85,
    color: "blue"
  },
  {
    name: "Node.js",
    level: 80,
    color: "green"
  },
  {
    name: "Python",
    level: 85,
    color: "orange"
  },
  {
    name: "Java",
    level: 75,
    color: "pink"
  },
  // Add more skills as needed
];

const Skills = () => {
  return (
    <motion.section 
      id="skills" 
      className="min-h-screen py-20 bg-primary"
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={textVariant(0.1)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            My <span className="text-indigo-500">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          variants={fadeIn("", "", 0.1, 1)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="transform transition-all duration-300"
            >
              <div className="bg-secondary p-6 rounded-lg hover:shadow-lg hover:shadow-indigo-500/20">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white text-lg font-medium">{skill.name}</h3>
                  <span className={`text-${skill.color}-400`}>{skill.level}%</span>
                </div>
                <div className="w-full bg-tertiary rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.2 + index * 0.1,
                      ease: "easeOut"
                    }}
                    className={`h-2.5 rounded-full bg-${skill.color}-500`}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;
