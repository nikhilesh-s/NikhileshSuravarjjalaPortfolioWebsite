import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { titleContentSlideIn } from '../utils/motion';
import { getAbout } from '../services/dataService';

interface AboutContent {
  title: string;
  description: string[];
  image: string;
  skills: string[];
}

const About = () => {
  const animations = titleContentSlideIn();
  const [aboutData, setAboutData] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true);
        const data = await getAbout();
        if (data) {
          setAboutData(data);
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
            About
          </h2>
          <div className="w-20 h-1 bg-white mx-auto rounded-full"></div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : aboutData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={animations.title}
              className="relative"
            >
              <div className="w-full h-[550px] bg-indigo-500/20 rounded-2xl overflow-hidden">
                <img 
                  src="/profile.jpg"
                  alt="Nikhilesh Suravarjjala"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent"></div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={animations.content}
              className="text-white"
            >
              <div className="space-y-4">
                {aboutData.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
