import { useState, useEffect } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences as defaultExperiences } from "../constants";
import { Experience as ExperienceType } from "../types";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../utils/wrapper";
import { titleContentSlideIn } from "../utils/motion";

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
  const animations = titleContentSlideIn();

  useEffect(() => {
    // Load experiences from localStorage or use defaults
    const savedExperiences = localStorage.getItem('portfolio-experiences');
    if (savedExperiences) {
      setExperiences(JSON.parse(savedExperiences));
    } else {
      setExperiences(defaultExperiences);
    }
  }, []);

  return (
    <div id="experience" className="padding-x padding-y max-w-7xl mx-auto relative z-0">
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={animations.title}
      >
        <p className={styles.sectionSubText}>
          What I have done so far
        </p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <motion.div 
        className="mt-20 flex flex-col"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={animations.content}
      >
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Experience, "experience");
