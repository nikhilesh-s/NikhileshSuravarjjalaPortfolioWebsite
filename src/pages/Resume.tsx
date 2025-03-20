import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { Download, ExternalLink } from "lucide-react";

const Resume = () => {
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);
  const [hasFrameError, setHasFrameError] = useState(false);
  const resumePath = "/Nikhilesh_Suravarjjala_Resume.pdf";

  useEffect(() => {
    // Set a timeout to detect if the iframe fails to load
    const timer = setTimeout(() => {
      if (!isFrameLoaded) {
        setHasFrameError(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isFrameLoaded]);

  return (
    <div className="bg-primary min-h-screen">
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

        <div className="mt-12 flex flex-col items-center">
          {/* Action buttons */}
          <div className="mb-8 flex justify-center gap-4 w-full flex-wrap">
            <a 
              href={resumePath}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-tertiary text-white px-6 py-3 rounded-lg flex items-center hover:bg-indigo-600 transition-all"
            >
              <ExternalLink className="mr-2" size={20} />
              View Resume in New Tab
            </a>
            <a 
              href={resumePath}
              download="Nikhilesh_Suravarjjala_Resume.pdf"
              className="bg-tertiary text-white px-6 py-3 rounded-lg flex items-center hover:bg-indigo-600 transition-all"
            >
              <Download className="mr-2" size={20} />
              Download Resume
            </a>
          </div>
          
          {/* PDF Viewer */}
          <div className="w-full h-[800px] rounded-lg overflow-hidden shadow-xl relative">
            {!isFrameLoaded && !hasFrameError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                <p className="text-white text-lg">Loading Resume...</p>
              </div>
            )}
            
            {hasFrameError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <div className="text-center p-8">
                  <p className="text-gray-700 mb-4">Unable to display the PDF viewer.</p>
                  <p className="text-gray-600 mb-6">Your browser might be blocking the PDF viewer or the file might not be accessible.</p>
                  <a 
                    href={resumePath}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-700 transition-all"
                  >
                    Open Resume in New Tab
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                src={`${resumePath}#view=FitH`}
                title="Nikhilesh Suravarjjala Resume"
                className="w-full h-full"
                onLoad={() => setIsFrameLoaded(true)}
                onError={() => setHasFrameError(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
