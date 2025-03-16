import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { fadeIn, textVariant, staggerContainer } from '../utils/motion';
import { getSkills } from '../services/dataService';

interface Skill {
  name: string;
  level: number;
  color: string;
}

const defaultSkills = [
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
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        setIsLoading(true);
        const data = await getSkills();
        if (data && Array.isArray(data) && data.length > 0) {
          setSkills(data);
        } else {
          // Fallback to localStorage if Firebase data is not available
          const localData = localStorage.getItem('skills');
          if (localData) {
            setSkills(JSON.parse(localData));
          }
        }
      } catch (error) {
        console.error("Error fetching skills data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

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

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={fadeIn('right', 'spring', index * 0.3, 0.5)}
                className="bg-tertiary rounded-xl p-6 shadow-lg"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                  <span className="text-indigo-400 font-semibold">{skill.level}%</span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className={`rounded-full h-full ${skill.color === 'blue' ? 'bg-blue-500' : 
                      skill.color === 'green' ? 'bg-green-500' : 
                      skill.color === 'pink' ? 'bg-pink-500' : 
                      skill.color === 'orange' ? 'bg-orange-500' : 'bg-indigo-500'}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Skills;
