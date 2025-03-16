import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getHero } from '../services/dataService';

const Hero = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [roles, setRoles] = useState(["Software Developer", "Full Stack Developer", "Student"]);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(150 - Math.random() * 50);
  const period = 1500;
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await getHero();
        if (data) {
          setHeroData(data);
          if (data.roles && Array.isArray(data.roles) && data.roles.length > 0) {
            setRoles(data.roles);
          }
        } else {
          // Try localStorage as fallback
          const localHero = localStorage.getItem('portfolio-hero');
          if (localHero) {
            try {
              const parsedHero = JSON.parse(localHero);
              setHeroData(parsedHero);
              if (parsedHero.roles && Array.isArray(parsedHero.roles) && parsedHero.roles.length > 0) {
                setRoles(parsedHero.roles);
              }
            } catch (e) {
              console.error("Error parsing localStorage hero data:", e);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
        // Try localStorage as fallback
        const localHero = localStorage.getItem('portfolio-hero');
        if (localHero) {
          try {
            const parsedHero = JSON.parse(localHero);
            setHeroData(parsedHero);
            if (parsedHero.roles && Array.isArray(parsedHero.roles) && parsedHero.roles.length > 0) {
              setRoles(parsedHero.roles);
            }
          } catch (e) {
            console.error("Error parsing localStorage hero data:", e);
          }
        }
      }
    };

    fetchHeroData();
  }, []);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text]);

  const tick = () => {
    let i = loopNum % roles.length;
    let fullText = roles[i];
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 1.5);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(300);
    }
  };

  return (
    <section className="relative w-full h-screen mx-auto flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-white">
            Hi, I'm {heroData?.name || 'Nikhilesh'}
          </h1>
          <div className="flex items-center justify-center md:justify-start h-16 mt-5">
            <span className="text-indigo-500 text-4xl font-semibold">I'm a </span>
            <span className="text-white text-4xl font-semibold ml-2">{text}</span>
            <span className="text-indigo-500 text-4xl font-semibold animate-blink">|</span>
          </div>
          <p className="text-gray-300 mt-6 text-lg max-w-lg mx-auto md:mx-0">
            {heroData?.description || 'Building the future with clean, elegant code. Currently working on cutting-edge web applications and exploring the frontiers of technology.'}
          </p>
          <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
            <a 
              href="#contact" 
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              Contact Me
            </a>
            <a 
              href={heroData?.resumeLink || '#'}
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white text-white hover:bg-white hover:text-indigo-900 font-medium rounded-lg transition-colors duration-300"
            >
              Resume
            </a>
          </div>
        </motion.div>
        
        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-indigo-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <img 
              src={heroData?.image || "/hero-image.png"} 
              alt="hero" 
              className="max-w-full h-auto rounded-full border-4 border-indigo-500 z-10 relative"
              style={{ width: '400px', height: '400px', objectFit: 'cover' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-white"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
