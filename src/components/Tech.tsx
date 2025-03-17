import { useEffect, useState } from "react";
import { SectionWrapper } from "../utils/wrapper";
import { Technology } from "../types";
import { getTechnologies } from "../services/dataService";
import { styles } from "../styles";

const Tech = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        // Using hardcoded technologies data from dataService
        const techData = await getTechnologies();
        setTechnologies(techData);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  return (
    <div className="padding-x padding-y max-w-7xl mx-auto relative z-0">
      <div>
        <p className={styles.sectionSubText}>My technical skills</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </div>

      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {loading ? (
          <p>Loading technologies...</p>
        ) : (
          technologies.map((technology, index) => (
            <div className="w-28 h-28" key={`technology-${index}`}>
              <div className="w-full h-full flex flex-col items-center justify-center">
                <img 
                  src={technology.icon} 
                  alt={technology.name} 
                  className="w-16 h-16 object-contain mb-2"
                  style={{ filter: technology.name === "Three JS" ? "invert(1)" : "none" }}
                  onError={(e) => {
                    // Fallback mechanism for missing icons
                    console.error(`Failed to load icon for ${technology.name}: ${technology.icon}`);
                    e.currentTarget.src = "/vite.svg"; // Default fallback icon
                  }}
                />
                <p className="text-center text-sm">{technology.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
