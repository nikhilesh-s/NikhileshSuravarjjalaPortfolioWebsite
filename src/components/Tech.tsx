import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { technologies as defaultTechnologies } from "../constants";
import { fadeIn, titleContentSlideIn } from "../utils/motion";
import { SectionWrapper } from "../utils/wrapper";
import { Technology } from "../types";
import { getTechnologies } from "../services/dataService";

const TechCard = ({ name, icon, index }: { name: string; icon: string; index: number }) => {
  // Special styling for ThreeJS
  const isThreeJS = name === "Three JS";
  
  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.1 * index, 0.75)}
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)" }}
      className={`w-28 h-28 rounded-xl shadow-card flex flex-col items-center justify-center relative group transition-all duration-300 ${isThreeJS ? 'border-2 border-purple-400 bg-black/40' : ''}`}
    >
      <motion.div 
        className={`${isThreeJS ? 'w-20 h-20' : 'w-16 h-16'} relative mb-2`}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <img 
          src={icon} 
          alt={name} 
          className={`w-full h-full object-contain ${isThreeJS ? 'brightness-150' : ''}`}
        />
      </motion.div>
      <p className="text-white text-sm font-bold text-center">{name}</p>
    </motion.div>
  );
};

const Tech = () => {
  const [technologies, setTechnologies] = useState<Technology[]>(defaultTechnologies);
  const [isLoading, setIsLoading] = useState(true);
  const animations = titleContentSlideIn();
  
  // Load technologies from Firebase or localStorage if available
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setIsLoading(true);
        // Try to get technologies from Firebase
        const firebaseTechnologies = await getTechnologies();
        
        if (firebaseTechnologies && firebaseTechnologies.length > 0) {
          setTechnologies(firebaseTechnologies);
        } else {
          // Fallback to localStorage if Firebase doesn't have data
          const savedTechnologies = localStorage.getItem('portfolio-technologies');
          if (savedTechnologies) {
            setTechnologies(JSON.parse(savedTechnologies));
          }
        }
      } catch (error) {
        console.error("Error fetching technologies:", error);
        // If Firebase fails, try localStorage
        const savedTechnologies = localStorage.getItem('portfolio-technologies');
        if (savedTechnologies) {
          setTechnologies(JSON.parse(savedTechnologies));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTechnologies();
  }, []);
  
  return (
    <div className="padding-x padding-y max-w-7xl mx-auto relative z-0">
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={animations.title}
      >
        <p className={styles.sectionSubText}>My technical skills</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={animations.content}
        className="mt-20 flex flex-wrap gap-10 justify-center"
      >
        {isLoading ? (
          <p>Loading technologies...</p>
        ) : (
          technologies.map((technology, index) => (
            <TechCard
              key={technology.name}
              index={index}
              {...technology}
            />
          ))
        )}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
