import { motion } from "framer-motion";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { Briefcase, GraduationCap, Award, Heart, Code, Circle } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const Journey = () => {
  // Journey timeline data
  const journeyData = [
    {
      title: "Discovering Programming",
      subtitle: "First Lines of Code",
      description: "Started my journey into the world of programming with simple HTML websites and basic JavaScript games. This early exposure sparked my passion for technology and problem-solving.",
      date: "2012",
      icon: <Code className="text-white" />,
      iconBg: "#050816",
      category: "learning"
    },
    {
      title: "Computer Science Major",
      subtitle: "University of California, Berkeley",
      description: "Decided to pursue Computer Science as my major. Took foundational courses in algorithms, data structures, and software engineering that shaped my understanding of programming principles.",
      date: "2015",
      icon: <GraduationCap className="text-white" />,
      iconBg: "#1d1836",
      category: "education"
    },
    {
      title: "First Hackathon",
      subtitle: "Berkeley Innovation Challenge",
      description: "Participated in my first hackathon where our team built a real-time collaborative code editor. We didn't win, but the experience taught me valuable lessons about teamwork and rapid prototyping.",
      date: "2016",
      icon: <Code className="text-white" />,
      iconBg: "#232631",
      category: "project"
    },
    {
      title: "Summer Internship",
      subtitle: "Global Tech",
      description: "Secured my first internship where I worked on mobile application development. This experience exposed me to professional software development practices and agile methodologies.",
      date: "2018",
      icon: <Briefcase className="text-white" />,
      iconBg: "#050816",
      category: "work"
    },
    {
      title: "Graduation & First Job",
      subtitle: "Bachelor's Degree & DataViz Solutions",
      description: "Graduated with honors and started my first full-time position as a software developer working on data visualization tools. This role helped me develop my frontend skills.",
      date: "2019",
      icon: <GraduationCap className="text-white" />,
      iconBg: "#1d1836",
      category: "education"
    },
    {
      title: "Master's Program",
      subtitle: "Stanford University",
      description: "Decided to advance my education by pursuing a Master's degree in Computer Science with a focus on AI and Machine Learning. The program expanded my technical skills in emerging technologies.",
      date: "2019 - 2021",
      icon: <GraduationCap className="text-white" />,
      iconBg: "#232631",
      category: "education"
    },
    {
      title: "Open Source Contribution",
      subtitle: "React Visualization Library",
      description: "Made significant contributions to an open-source data visualization library for React. My work helped improve performance and add new chart types that benefited thousands of developers.",
      date: "2020",
      icon: <Heart className="text-white" />,
      iconBg: "#050816",
      category: "project"
    },
    {
      title: "Career Advancement",
      subtitle: "Tech Innovations Inc.",
      description: "Joined a forward-thinking company as a Senior Software Engineer. Here, I've had the opportunity to lead projects, mentor junior developers, and work with cutting-edge technologies.",
      date: "2021 - Present",
      icon: <Briefcase className="text-white" />,
      iconBg: "#1d1836",
      category: "work"
    },
    {
      title: "Industry Recognition",
      subtitle: "Developer Excellence Award",
      description: "Received an industry award for my contributions to web development and open-source projects. This recognition validated my approach to creating clean, efficient, and user-friendly software.",
      date: "2022",
      icon: <Award className="text-white" />,
      iconBg: "#232631",
      category: "achievement"
    },
    {
      title: "Personal Portfolio",
      subtitle: "Showcasing My Journey",
      description: "Created this portfolio website to share my professional journey and showcase the projects I've worked on. It represents both my technical skills and my growth as a developer.",
      date: "2023",
      icon: <Code className="text-white" />,
      iconBg: "#050816",
      category: "project"
    }
  ];

  // Get color for category
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      education: "#8b5cf6", // Purple
      work: "#3b82f6",      // Blue
      project: "#10b981",   // Green
      achievement: "#f59e0b", // Amber
      learning: "#ec4899",  // Pink
    };
    return colors[category] || "#6b7280"; // Default gray
  };

  // Timeline slider functionality
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderHeight = 400; // Fixed height for slider track

  // Calculate step size for each timeline item
  const stepSize = sliderHeight / (journeyData.length - 1);

  // Handle slider drag
  const handleSliderDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    let clientY = 0;
    if ('touches' in e) {
      clientY = e.touches[0].clientY;
    } else {
      clientY = e.clientY;
    }
    
    const sliderRect = sliderRef.current.getBoundingClientRect();
    let newPosition = clientY - sliderRect.top;
    
    // Constrain position within the slider track
    newPosition = Math.max(0, Math.min(newPosition, sliderHeight));
    setSliderPosition(newPosition);
    
    // Calculate which timeline item to show
    const newIndex = Math.min(
      journeyData.length - 1,
      Math.max(0, Math.floor(newPosition / stepSize))
    );
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      
      // Scroll to the corresponding timeline element
      const timelineElement = document.querySelector(`.vertical-timeline-element:nth-child(${newIndex + 1})`);
      if (timelineElement) {
        timelineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Handle mouse/touch events
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);

  // Add event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleSliderDrag as any);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleSliderDrag as any);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleSliderDrag as any);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleSliderDrag as any);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, activeIndex]);

  return (
    <div className="bg-primary">
      <div className="padding-x padding-y max-w-7xl mx-auto">
        <motion.div
          variants={textVariant()}
          initial="hidden"
          animate="show"
          className="mt-20"
        >
          <p className={styles.sectionSubText}>A Look Back at My Career Path</p>
          <h2 className={styles.sectionHeadText}>My Journey</h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          animate="show"
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          This timeline showcases key moments, milestones, and experiences that have shaped my career 
          in technology and software development. Slide the circle to navigate through my journey.
        </motion.p>

        <motion.div
          variants={fadeIn("", "", 0.2, 1)}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-col md:flex-row"
        >
          {/* Timeline slider */}
          <div className="hidden md:flex md:w-1/5 flex-col items-center relative mr-10">
            <div 
              ref={sliderRef}
              className="h-[400px] w-1 bg-gray-700 rounded-full relative"
            >
              {journeyData.map((_, index) => (
                <div 
                  key={index}
                  className={`absolute w-3 h-3 rounded-full left-1/2 transform -translate-x-1/2 ${
                    index <= activeIndex ? 'bg-purple-500' : 'bg-gray-500'
                  }`}
                  style={{ top: `${index * stepSize}px` }}
                  onClick={() => {
                    setActiveIndex(index);
                    setSliderPosition(index * stepSize);
                    const timelineElement = document.querySelector(`.vertical-timeline-element:nth-child(${index + 1})`);
                    if (timelineElement) {
                      timelineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                ></div>
              ))}
              
              {/* Draggable slider button */}
              <div 
                className="absolute w-6 h-6 bg-purple-600 rounded-full left-1/2 transform -translate-x-1/2 cursor-pointer flex items-center justify-center shadow-lg"
                style={{ top: `${sliderPosition}px` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                <Circle size={24} className="text-white animate-pulse" />
              </div>
            </div>
            <p className="text-secondary text-sm mt-4">
              {journeyData[activeIndex]?.date}
            </p>
          </div>

          {/* Timeline content */}
          <div ref={timelineRef} className="md:w-4/5">
            <VerticalTimeline>
              {journeyData.map((item, index) => (
                <VerticalTimelineElement
                  key={index}
                  date={item.date}
                  iconStyle={{ background: item.iconBg }}
                  icon={item.icon}
                  contentStyle={{ 
                    background: "#1d1836", 
                    color: "#fff",
                    boxShadow: `0 3px 0 ${getCategoryColor(item.category)}`,
                    borderRadius: "15px",
                    opacity: index === activeIndex ? 1 : 0.7,
                    transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease-in-out'
                  }}
                  contentArrowStyle={{ borderRight: "7px solid #1d1836" }}
                  onTimelineElementClick={() => {
                    setActiveIndex(index);
                    setSliderPosition(index * stepSize);
                  }}
                >
                  <div>
                    <h3 className="text-white text-[24px] font-bold">{item.title}</h3>
                    <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
                      {item.subtitle}
                    </p>
                  </div>
                  <p className="text-white-100 text-[14px] mt-4">
                    {item.description}
                  </p>
                  <div 
                    className="mt-4 px-3 py-1 rounded-full text-[12px] inline-block"
                    style={{ background: getCategoryColor(item.category) }}
                  >
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </div>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </motion.div>

        {/* Create Your Own Journey CTA */}
        <motion.div
          variants={fadeIn("", "", 0.5, 1)}
          initial="hidden"
          animate="show"
          className="mt-16 flex flex-col items-center justify-center bg-tertiary rounded-2xl p-8"
        >
          <h3 className="text-white text-[24px] font-bold text-center">Looking to Create Your Own Journey?</h3>
          <p className="text-secondary text-[17px] max-w-3xl mt-4 text-center">
            I'm always open to discussing new projects, opportunities, or collaborations. 
            Let's connect and explore how we can work together to create something amazing.
          </p>
          <button className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 py-3 px-8 outline-none text-white font-bold shadow-md shadow-primary rounded-xl">
            Get in Touch
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Journey;
