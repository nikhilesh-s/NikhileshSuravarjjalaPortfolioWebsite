import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { ArrowUpRight } from "lucide-react";

const Resume = () => {
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
          <div className="bg-white rounded-lg aspect-[8.5/11] w-full mb-8 flex items-center justify-center">
            <p className="text-gray-400 text-center">Resume Preview</p>
          </div>
          
          <div className="flex justify-center">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-blue-600 py-3 px-8 outline-none text-white font-bold shadow-md shadow-primary rounded-xl flex items-center justify-center gap-2"
            >
              <span>Open Resume in New Tab</span>
              <ArrowUpRight className="ml-2" size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;
