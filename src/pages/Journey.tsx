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
    description: "In 2014, I participated in Junior FIRST LEGO League (Jr. FLL), where I used block-based coding to program LEGO robots. This was my first introduction to technology, and it sparked my curiosity about automation and problem-solving.",
    image: ""
  },
  {
    id: "fll",
    year: "2016-2021",
    title: "FIRST LEGO League (FLL) & Developing a Passion for Robotics",
    description: "From 2016 to 2021, I participated in FIRST LEGO League (FLL), where I developed a deep passion for robotics and programming. FLL was an opportunity to design, build, and program robots while collaborating with a team to solve real-world challenges.",
    image: ""
  },
  {
    id: "public-speaking",
    year: "2018-Present",
    title: "Leadership & Public Speaking with Gallant Gaveliers Gavel Club",
    description: "Since 2018, I have been an active member of Gallant Gaveliers Gavel Club, where I have continuously refined my public speaking and leadership skills.",
    image: ""
  },
  {
    id: "vex-robotics",
    year: "2020-Present",
    title: "VEX Robotics with Gael Force Robotics 5327",
    description: "In 2020, I transitioned from FLL to VEX Robotics, joining Gael Force Robotics 5327. VEX provided me with more advanced engineering challenges, requiring strategic thinking, coding expertise, and collaboration.",
    image: ""
  },
  {
    id: "debate",
    year: "2021-Present",
    title: "Competitive Public Speaking with DHS Speech & Debate",
    description: "As a member of DHS Speech & Debate, I have competed in various tournaments, further enhancing my ability to think critically and communicate effectively.",
    image: ""
  },
  {
    id: "tennis",
    year: "2023-Present",
    title: "Varsity Tennis at Dublin High School",
    description: "In addition to my academic and leadership pursuits, I have been a Varsity Tennis player at DHS since 2023. Competing at this level has taught me the importance of discipline, perseverance, and teamwork.",
    image: ""
  },
  {
    id: "engineering-courses",
    year: "2023-2025",
    title: "Engineering Courses at Dublin High School",
    description: "As a freshman in the 2023-24 school year, I enrolled in Introduction to Engineering Design (IED) at Dublin High School. Now, as a sophomore (2024-25), I am taking Honors Principles of Engineering (POE).",
    image: ""
  },
  {
    id: "tvt",
    year: "2024-Present",
    title: "Leading Tri Valley Tech (TVT) as CEO",
    description: "In late 2024, I joined Tri Valley Tech (TVT), a nonprofit organization focused on making technology education and resources more accessible. After contributing to various initiatives, I became the CEO.",
    image: ""
  },
  {
    id: "vp-class",
    year: "2024-2025",
    title: "Vice President of DHS Class of 2027",
    description: "As the Vice President of the DHS Class of 2027, I have been responsible for organizing school events, fundraising, and representing my class.",
    image: ""
  }
];

const Journey = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderRange, setSliderRange] = useState(0);
  const [milestones, setMilestones] = useState(INITIAL_JOURNEY_DATA);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Calculate range based on number of milestones
    setSliderRange(milestones.length - 1);
  }, [milestones]);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const data = await getJourneyMilestones();
        if (data && Array.isArray(data) && data.length > 0) {
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
      {/* Back to Home button - improved styling */}
      <NavLink 
        to="/" 
        className="fixed top-20 left-4 z-10 flex items-center text-white bg-tertiary/80 hover:bg-tertiary px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="mr-1" size={18} />
        Back to Home
      </NavLink>

      <div className="padding-x padding-y max-w-7xl mx-auto relative z-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-20"
        >
          <h2 className={`${styles.sectionHeadText} mb-2`}>My Journey</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] mb-8"
        >
          During my time exploring engineering, technology, leadership, and public speaking, I have actively pursued experiences that have shaped my career aspirations. From robotics competitions and public speaking engagements to student government and varsity athletics, my journey has been defined by continuous learning, innovation, and leadership. Each experience has contributed to my growth as a problem-solver, leader, and communicator. As I continue on this path, I look forward to further developing my expertise and making a meaningful impact in technology, engineering, and entrepreneurship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-12 flex flex-col"
        >
          {/* Timeline Slider - improved with smooth animation */}
          <div className="w-full mb-12">
            <input
              ref={sliderRef}
              type="range"
              min="0"
              max={sliderRange}
              value={activeIndex}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-secondary"
              style={{
                transition: "all 0.3s ease-in-out",
                background: "linear-gradient(to right, #915eff 0%, #915eff calc((100% / 8) * " + activeIndex + "), #232631 calc((100% / 8) * " + activeIndex + "), #232631 100%)"
              }}
            />
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`text-center transition-colors duration-300 ${index === activeIndex ? 'text-white font-bold' : ''}`}
                  style={{ width: `${100/milestones.length}%` }}
                >
                  {milestone.year}
                </div>
              ))}
            </div>
          </div>
          
          {/* Active Milestone */}
          {!loading && (
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-tertiary p-8 rounded-2xl"
            >
              <h3 className="text-white font-bold text-2xl mb-2">
                {milestones[activeIndex].title}
              </h3>
              <p className="text-secondary mb-6">
                <span className="text-white font-semibold">{milestones[activeIndex].year}</span>
              </p>
              
              <div className="text-white space-y-4">
                {activeIndex === 0 && (
                  <>
                    <p>
                      In 2014, I participated in <strong>Junior FIRST LEGO League (Jr. FLL)</strong>, where I used block-based coding to program LEGO robots. This was my first introduction to technology, and it sparked my curiosity about automation and problem-solving.
                    </p>
                    <p>
                      A year later, in 2015, I wrote my <strong>first lines of code</strong>, marking the start of my programming journey. This early exposure laid the foundation for my future in robotics and software development.
                    </p>
                  </>
                )}
                
                {activeIndex === 1 && (
                  <>
                    <p>
                      From 2016 to 2021, I participated in <strong>FIRST LEGO League (FLL)</strong>, where I developed a deep passion for robotics and programming. FLL was an opportunity to design, build, and program robots while collaborating with a team to solve real-world challenges.
                    </p>
                    <p>
                      This experience taught me invaluable problem-solving skills and introduced me to <strong>industry professionals</strong> at competitions and events. These interactions gave me insights into engineering careers and inspired me to continue exploring technology.
                    </p>
                  </>
                )}
                
                {activeIndex === 2 && (
                  <>
                    <p>
                      Since 2018, I have been an active member of <strong>Gallant Gaveliers Gavel Club</strong>, where I have continuously refined my public speaking and leadership skills. Through regular speeches, impromptu speaking exercises, and competitions, I have developed confidence in articulating ideas clearly and persuasively.
                    </p>
                    <p>
                      This experience has played a crucial role in preparing me for leadership positions and career opportunities that require strong communication skills.
                    </p>
                  </>
                )}
                
                {activeIndex === 3 && (
                  <>
                    <p>
                      In 2020, I transitioned from FLL to <strong>VEX Robotics</strong>, joining <strong>Gael Force Robotics 5327</strong>. VEX provided me with more advanced engineering challenges, requiring strategic thinking, coding expertise, and collaboration.
                    </p>
                    <p>
                      Competing at high levels has allowed me to refine my technical skills while also learning to work under pressure and adapt to new challenges. Through VEX, I have also connected with <strong>STEM professionals</strong> and mentors, further solidifying my interest in engineering.
                    </p>
                  </>
                )}
                
                {activeIndex === 4 && (
                  <>
                    <p>
                      As a member of <strong>DHS Speech & Debate</strong>, I have competed in various tournaments, further enhancing my ability to think critically and communicate effectively.
                    </p>
                    <p>
                      The experience of debating complex topics, researching arguments, and presenting persuasively has strengthened my confidence and ability to articulate ideas in high-pressure situations. These skills have been crucial in leadership roles and will be valuable in my future career.
                    </p>
                  </>
                )}
                
                {activeIndex === 5 && (
                  <>
                    <p>
                      In addition to my academic and leadership pursuits, I have been a <strong>Varsity Tennis player at DHS</strong> since 2023. Competing at this level has taught me the importance of discipline, perseverance, and teamwork.
                    </p>
                    <p>
                      Balancing athletics with academics and extracurriculars has improved my time management and ability to perform under pressure. Tennis has also provided me with a competitive outlet that complements my technical and leadership endeavors.
                    </p>
                  </>
                )}
                
                {activeIndex === 6 && (
                  <>
                    <p>
                      As a freshman in the <strong>2023-24 school year</strong>, I enrolled in <strong>Introduction to Engineering Design (IED)</strong> at Dublin High School, where I learned fundamental engineering concepts, 3D modeling, and the design process.
                    </p>
                    <p>
                      Now, as a <strong>sophomore (2024-25)</strong>, I am taking <strong>Honors Principles of Engineering (POE)</strong>, where I have gained deeper insights into mechanical systems, circuitry, and real-world engineering applications. These courses have reinforced my decision to pursue engineering as a career.
                    </p>
                  </>
                )}
                
                {activeIndex === 7 && (
                  <>
                    <p>
                      In late 2024, I joined <strong>Tri Valley Tech (TVT)</strong>, a nonprofit organization focused on making technology education and resources more accessible. After contributing to various initiatives, I became the <strong>CEO</strong>, leading efforts to provide <strong>web development services, mentorship programs, and career-building opportunities</strong> for students.
                    </p>
                    <p>
                      Through this role, I have gained experience in <strong>business development, consulting, and leadership</strong>, all of which have shaped my long-term career goals.
                    </p>
                  </>
                )}
                
                {activeIndex === 8 && (
                  <>
                    <p>
                      As the <strong>Vice President of the DHS Class of 2027</strong>, I have been responsible for organizing <strong>school events, fundraising, and representing my class</strong>.
                    </p>
                    <p>
                      One of my most significant contributions was leading the <strong>Homecoming float design</strong>, where I created a <strong>3D model</strong> to ensure the execution of our vision. This role has strengthened my skills in <strong>project management, teamwork, and decision-making</strong>, all of which are critical for leadership in any field.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Future Goals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-16"
        >
          <h3 className="text-white font-bold text-2xl mb-4">Future Goals</h3>
          
          <div className="bg-tertiary p-8 rounded-2xl">
            <p className="text-secondary mb-6">
              Looking ahead, I plan to attend a <strong className="text-white">California university</strong> to earn a <strong className="text-white">Bachelor's degree in Engineering or Computer Science</strong>, followed by a <strong className="text-white">Master's degree</strong>. I aim to <strong className="text-white">continue expanding Tri Valley Tech</strong>, exploring <strong className="text-white">technology consulting</strong>, and potentially launching my own ventures in <strong className="text-white">robotics or software development</strong>.
            </p>
            <p className="text-secondary">
              My ultimate goal is to be at the forefront of innovation, whether by leading a company, developing <strong className="text-white">cutting-edge solutions</strong>, or mentoring the next generation of engineers.
            </p>
          </div>
          
          <div className="mt-16 bg-tertiary p-8 rounded-2xl">
            <h3 className="text-white font-bold text-2xl mb-4">Conclusion</h3>
            <p className="text-secondary">
              Through robotics, leadership, public speaking, and athletics, I have developed a diverse skill set that has prepared me for future success. Each experience has contributed to my growth as a problem-solver, leader, and communicator. As I continue on this path, I look forward to further developing my expertise and making a meaningful impact in <strong className="text-white">technology, engineering, and entrepreneurship</strong>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;
