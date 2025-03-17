import { useState, useEffect } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Experience as ExperienceType } from "../types";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../utils/wrapper";
import { titleContentSlideIn } from "../utils/motion";
import { getExperiences } from "../services/dataService";

const ExperienceCard = ({ experience }: { experience: ExperienceType }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const animations = titleContentSlideIn();

  useEffect(() => {
    // Fetch experiences using hardcoded data
    const fetchExperiences = async () => {
      try {
        setIsLoading(true);
        // Get hardcoded experiences data from dataService
        const experienceData = await getExperiences();
        if (experienceData && experienceData.length > 0) {
          setExperiences(experienceData);
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExperiences();
  }, []);

  return (
    <div id="experience" className="padding-x padding-y max-w-7xl mx-auto relative z-0">
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={animations.title}
      >
        <p className={styles.sectionSubText}>My professional journey</p>
        <h2 className={styles.sectionHeadText}>Experience.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
              />
            ))}
          </VerticalTimeline>
        )}
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "experience");
