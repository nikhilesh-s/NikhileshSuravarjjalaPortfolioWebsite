import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { titleContentSlideIn } from '../utils/motion';
import { getAbout } from '../services/dataService';

interface AboutContent {
  title: string;
  description: string[];
  image: string;
}

const defaultAboutData: AboutContent = {
  title: "Introduction",
  description: [
    "I'm a skilled software developer with experience in TypeScript and JavaScript, expertise in frameworks like React, Node.js, and Three.js.",
    "I'm a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems.",
    "Let's work together to bring your ideas to life!"
  ],
  image: "/src/assets/my-photo.jpg"
};

const About = () => {
  const animations = titleContentSlideIn();
  const [aboutData, setAboutData] = useState<AboutContent>(defaultAboutData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true);
        const data = await getAbout();
        if (data) {
          setAboutData(data);
        } else {
          // Fallback to localStorage if Firebase data is not available
          const localData = localStorage.getItem('about');
          if (localData) {
            setAboutData(JSON.parse(localData));
          }
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <section id="about" className="min-h-screen py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            About <span className="text-white">Me</span>
          </h2>
          <div className="w-20 h-1 bg-white mx-auto rounded-full"></div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Section - Modified for portrait orientation */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={animations.title}
              className="relative"
            >
              <div className="w-full h-[550px] bg-indigo-500/20 rounded-2xl overflow-hidden">
                {/* Add your portrait orientation image here */}
                <div className="w-full h-full flex items-center justify-center">
                  {/* If you have an actual image, use this format: */}
                  {/* <img src="/path-to-your-image.jpg" alt="Nikhilesh" className="w-full h-full object-cover object-center" /> */}
                  
                  {/* Placeholder for portrait photo */}
                  <div className="w-3/4 h-[90%] bg-indigo-500/30 rounded-2xl relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center text-indigo-300 text-lg font-semibold">
                      Portrait Photo
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={animations.content}
              className="text-gray-300"
            >
              <h3 className="text-2xl font-semibold mb-4 text-white">
                {aboutData.title}
              </h3>
              
              {aboutData.description.map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black-100 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Education</h4>
                  <p className="text-sm">Computer Science Major</p>
                </div>
                <div className="bg-black-100 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Experience</h4>
                  <p className="text-sm">Full Stack Development</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="bg-indigo-500/20 px-4 py-2 rounded-full">
                  <span className="text-indigo-400">Problem Solving</span>
                </div>
                <div className="bg-indigo-500/20 px-4 py-2 rounded-full">
                  <span className="text-indigo-400">Team Collaboration</span>
                </div>
                <div className="bg-indigo-500/20 px-4 py-2 rounded-full">
                  <span className="text-indigo-400">Quick Learning</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
