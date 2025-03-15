import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = ["Software Developer", "Full Stack Developer", "Student"];
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(150 - Math.random() * 50);
  const period = 1500;

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
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Hi, I'm <span className="text-indigo-500">Nikhilesh</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-300 mb-6">
            I'm a{" "}
            <span className="text-indigo-400">
              {text}
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Passionate about creating innovative solutions and learning new technologies.
            Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-indigo-600 text-indigo-400 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* 3D Element Container */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center items-center"
        >
          <div className="w-72 h-72 rounded-full bg-indigo-500/20 flex items-center justify-center relative">
            <div className="w-64 h-64 rounded-full bg-indigo-500/30 absolute"></div>
            <div className="w-56 h-56 rounded-full bg-indigo-500/40 absolute"></div>
            {/* We'll add a 3D model or profile image here later */}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-gray-400 flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-gray-400 mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
