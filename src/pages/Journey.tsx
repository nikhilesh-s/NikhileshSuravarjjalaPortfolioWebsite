import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { styles } from "../styles";
import { ChevronLeft } from "lucide-react";
import { getJourneyMilestones } from "../services/dataService";

const INITIAL_JOURNEY_DATA = [
  {
    id: "early-exposure",
    year: "2014-2015",
    title: "Early Exposure to Robotics & Coding",
    description: "Started my journey into the world of programming with simple HTML websites and basic JavaScript games. This early exposure sparked my passion for technology and problem-solving.",
    image: "/company/meta.png"
  },
  {
    id: "fll",
    year: "2016-2021",
    title: "Developing Skills Through FIRST LEGO League (FLL)",
    description: "Over the next five years, I was an active member of an FLL team, where I fell in love with robotics, programming, and teamwork.",
    image: "/company/shopify.png"
  },
  {
    id: "public-speaking",
    year: "2018-Present",
    title: "Public Speaking & Leadership with Gallant Gaveliers Gavel Club",
    description: "Since 2018, I have been an active member of the Gallant Gaveliers Gavel Club, consistently honing my public speaking and leadership skills.",
    image: "/company/shopify.png"
  },
  {
    id: "vex-robotics",
    year: "2020-Present",
    title: "VEX Robotics with Gael Force Robotics 5327",
    description: "Transitioning to VEX Robotics in 2020, I continued to refine my technical skills while also taking on leadership roles within my team.",
    image: "/company/tesla.png"
  },
  {
    id: "tennis",
    year: "2023-Present",
    title: "Varsity Tennis at DHS",
    description: "Competing at the varsity level has taught me the importance of resilience, discipline, and teamwork.",
    image: "/company/starbucks.png"
  },
  {
    id: "engineering-courses",
    year: "2023-2025",
    title: "Engineering Courses at Dublin High School",
    description: "Taking Introduction to Engineering Design (IED) and Honors Principles of Engineering (POE) has deepened my understanding of engineering principles.",
    image: "/company/meta.png"
  },
  {
    id: "tvt",
    year: "2024-Present",
    title: "Leading Tri Valley Tech (TVT)",
    description: "As CEO of TVT, I lead initiatives to provide web development services, mentorship programs, and career-building opportunities for students.",
    image: "/company/shopify.png"
  },
  {
    id: "vp-class",
    year: "2024-2025",
    title: "Vice President of DHS Class of 2027",
    description: "As VP, I have been heavily involved in organizing major school events, fundraising, and representing my class.",
    image: "/company/meta.png"
  }
];

const Journey = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderRange, setSliderRange] = useState(0);
  const [milestones, setMilestones] = useState(INITIAL_JOURNEY_DATA);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    // Calculate range based on number of milestones
    setSliderRange(milestones.length - 1);
  }, [milestones]);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const data = await getJourneyMilestones();
        if (data && data.length > 0) {
          setMilestones(data);
        }
      } catch (error) {
        console.error("Error fetching journey data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseInt(e.target.value, 10);
    setActiveIndex(newIndex);
  };

  return (
    <section className="min-h-screen relative bg-primary">
      {/* Back to Home button */}
      <NavLink 
        to="/" 
        className="absolute top-24 left-8 flex items-center text-white hover:text-secondary transition-colors z-10"
      >
        <ChevronLeft className="mr-1" size={20} />
        Back to Home
      </NavLink>

      <div className="padding-x padding-y max-w-7xl mx-auto relative z-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <p className={styles.sectionSubText}>A Look Back at My Career Path</p>
          <h2 className={styles.sectionHeadText}>Career Exploration</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          During my time exploring engineering, technology, and leadership, I have had the opportunity to engage in various hands-on experiences, competitions, and professional interactions that have shaped my career aspirations. From early robotics programs to leading a technology nonprofit, serving as a student government leader, and competing in public speaking and athletics, my journey has been defined by continuous learning, innovation, and leadership.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col"
        >
          {/* Timeline Slider */}
          <div className="w-full mb-12">
            <input
              ref={sliderRef}
              type="range"
              min="0"
              max={sliderRange}
              value={activeIndex}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-secondary"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`text-center transition-colors ${index === activeIndex ? 'text-white font-bold' : ''}`}
                  style={{ width: `${100/milestones.length}%` }}
                >
                  {milestone.year}
                </div>
              ))}
            </div>
          </div>
          
          {/* Active Milestone */}
          {!loading && (
            <div className="bg-tertiary p-6 rounded-2xl">
              <h3 className="text-white font-bold text-2xl mb-2">
                {milestones[activeIndex].title}
              </h3>
              <p className="text-secondary mb-6">
                <span className="text-white font-semibold">{milestones[activeIndex].year}</span>
              </p>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <img 
                    src={milestones[activeIndex].image} 
                    alt={milestones[activeIndex].title} 
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
                <div className="md:w-2/3">
                  {activeIndex === 0 && (
                    <div className="text-white">
                      <p className="mb-4">
                        I first discovered my passion for technology in 2014 when I participated in Junior FIRST LEGO League (Jr. FLL), where I used block-based coding to program simple LEGO robots. This early exposure to problem-solving and automation sparked my curiosity about how technology can be used to create real-world solutions.
                      </p>
                      <p>
                        In 2015, I took my first steps into coding by writing basic scripts, setting the foundation for my future in programming and engineering.
                      </p>
                    </div>
                  )}
                  
                  {activeIndex === 1 && (
                    <div className="text-white">
                      <p className="mb-4">
                        Over the next five years, I was an active member of an FLL team, where I fell in love with robotics, programming, and teamwork. The experience of designing, building, and programming autonomous robots taught me invaluable engineering and problem-solving skills.
                      </p>
                      <p>
                        FLL also introduced me to industry professionals through events and competitions, where I gained insights into careers in engineering and technology.
                      </p>
                    </div>
                  )}
                  
                  {activeIndex === 2 && (
                    <div className="text-white">
                      <p className="mb-4">
                        Since 2018, I have been an active member of the <strong>Gallant Gaveliers Gavel Club</strong>, consistently honing my public speaking and leadership skills. Through regular speeches, competitions, and impromptu speaking exercises, I have developed confidence in articulating ideas clearly and persuasively.
                      </p>
                      <p>
                        This experience has strengthened my ability to lead, influence, and communicate effectively—skills that are crucial in both engineering and leadership roles.
                      </p>
                    </div>
                  )}
                  
                  {activeIndex === 3 && (
                    <div className="text-white">
                      <p className="mb-4">
                        Transitioning to VEX Robotics in 2020, I continued to refine my technical skills while also taking on leadership roles within my team. Competing with Gael Force Robotics 5327 has provided me with opportunities to collaborate on complex engineering challenges, improve my coding abilities, and develop strategic thinking.
                      </p>
                      <p>
                        Through VEX, I have interacted with professionals in STEM fields, learning about career paths in robotics, automation, and engineering.
                      </p>
                    </div>
                  )}
                  
                  {activeIndex === 4 && (
                    <div className="text-white">
                      <p className="mb-4">
                        Beyond academics and technology, I have been a <strong>Varsity Tennis player at Dublin High School</strong> since 2023. Competing at this level has taught me the importance of resilience, discipline, and teamwork.
                      </p>
                      <p>
                        Balancing sports with academics and leadership roles has strengthened my time management and ability to perform under pressure. Tennis has also provided a competitive yet rewarding outlet that complements my technical and leadership pursuits.
                      </p>
                    </div>
                  )}
                  
                  {activeIndex === 5 && (
                    <div className="text-white">
                      <p className="mb-4">
                        As a freshman at Dublin High School, I enrolled in <strong>Introduction to Engineering Design (IED)</strong>, where I learned foundational engineering principles, 3D modeling, and the design process.
                      </p>
                      <p>
                        Currently, as a sophomore, I am taking <strong>Honors Principles of Engineering (POE)</strong>, which has deepened my understanding of circuitry, mechanical systems, and problem-solving in engineering contexts. These courses have reinforced my decision to pursue engineering as a career.
                      </p>
                    </div>
                  )}
                  
                  {activeIndex === 6 && (
                    <div className="text-white">
                      <p className="mb-4">
                        In late 2024, I joined <strong>Tri Valley Tech (TVT)</strong>, a nonprofit dedicated to making technology accessible. I later became <strong>CEO</strong>, leading initiatives to provide web development services, mentorship programs, and career-building opportunities for students.
                      </p>
                      <p>
                        This role has given me firsthand experience in consulting, business development, and leadership, all of which have influenced my long-term career aspirations.
                      </p>
                    </div>
                  )}
                  
                  {activeIndex === 7 && (
                    <div className="text-white">
                      <p className="mb-4">
                        As the <strong>Vice President of the DHS Class of 2027</strong>, I have been heavily involved in organizing major school events, fundraising, and representing my class. One of my biggest contributions was leading the <strong>Homecoming float design</strong>, where I created a <strong>3D model</strong> to plan and execute our vision.
                      </p>
                      <p>
                        This position has strengthened my ability to manage projects, collaborate with teams, and make decisions that impact the student body.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Future Goals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-white font-bold text-2xl mb-4">Career Exploration & Future Goals</h3>
          
          <div className="bg-tertiary p-6 rounded-2xl">
            <div className="mb-8">
              <h4 className="text-white font-semibold text-xl mb-3">Career Exploration & Research</h4>
              <p className="text-secondary">
                Beyond my direct experiences, I have conducted research into career options using tools like the <strong className="text-white">California Colleges Interest Profiler</strong>, which helped me identify fields that align with my skills and interests. I have explored careers in <strong className="text-white">software engineering, robotics, and technology consulting</strong>, all of which combine my passion for problem-solving with real-world impact. My experiences in robotics and leadership have further reinforced my interest in entrepreneurship and technology-driven solutions.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold text-xl mb-3">Future Goals</h4>
              <p className="text-secondary">
                Looking ahead, I plan to attend a <strong className="text-white">California university</strong> to earn a <strong className="text-white">Bachelor's degree in Engineering or Computer Science</strong>, with the goal of pursuing a <strong className="text-white">Master's degree</strong> later in my career. I aim to continue <strong className="text-white">Tri Valley Tech</strong>, expanding its impact, and explore opportunities in <strong className="text-white">consulting, robotics, and technology startups</strong>. My ultimate goal is to be at the forefront of innovation, whether by leading a company, developing cutting-edge solutions, or mentoring the next generation of engineers.
              </p>
            </div>
          </div>
          
          <p className="mt-8 text-secondary text-center">
            This journey has been an evolving path of discovery, driven by my passion for engineering, problem-solving, and leadership. Each step has prepared me for the future, and I look forward to continuing to learn, grow, and make a meaningful impact in the field of technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;
