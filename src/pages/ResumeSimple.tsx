import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { ArrowUpRight, Download } from "lucide-react";
import { useState } from "react";

const ResumeThumbnail = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="bg-white rounded-lg aspect-[8.5/11] w-full mb-8 flex items-center justify-center overflow-hidden relative">
      {!isLoaded && <p className="text-gray-400 text-center absolute">Loading Resume Preview...</p>}
      <img 
        src="/Nikhilesh_Suravarjjala_Resume.pdf"
        alt="Resume Preview"
        className={`w-full h-full object-contain ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(false)}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400 text-center">
            Resume Preview Not Available
            <br />
            <span className="text-sm">Click below to view the full resume</span>
          </p>
        </div>
      )}
    </div>
  );
};

const ResumeSimple = () => {
  return (
    <div className="bg-primary">
      <div className="padding-x padding-y max-w-7xl mx-auto">
        <motion.div
          variants={textVariant()}
          initial="hidden"
          animate="show"
          className="mt-20"
        >
          <p className={styles.sectionSubText}>My professional background</p>
          <h2 className={styles.sectionHeadText}>Resume</h2>
        </motion.div>

        <motion.div
          variants={fadeIn("up", "spring", 0.3, 0.8)}
          initial="hidden"
          animate="show"
          className="mt-10 bg-tertiary p-8 rounded-lg shadow-md w-full max-w-4xl mx-auto"
        >
          <ResumeThumbnail />
          
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/Nikhilesh_Suravarjjala_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-blue-600 py-3 px-8 outline-none text-white font-bold shadow-md shadow-primary rounded-xl flex items-center justify-center gap-2"
            >
              <span>View Resume</span>
              <ArrowUpRight size={18} />
            </a>
            
            <a
              href="/Nikhilesh_Suravarjjala_Resume.pdf"
              download="Nikhilesh_Suravarjjala_Resume.pdf"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 py-3 px-8 outline-none text-white font-bold shadow-md shadow-primary rounded-xl flex items-center justify-center gap-2"
            >
              <span>Download Resume</span>
              <Download size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeSimple;
