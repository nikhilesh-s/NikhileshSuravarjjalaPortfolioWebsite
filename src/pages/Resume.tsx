import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { Download, ExternalLink } from "lucide-react";

const Resume = () => {
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);
  const [hasFrameError, setHasFrameError] = useState(false);
  const resumePdfPath = "/Nikhilesh_Suravarjjala_Resume.pdf";
  const resumeGoogleDocsLink = "https://docs.google.com/document/d/1KW5Jd7CDVGd_OfyRVZenZcLrHPkEODwC/edit?usp=sharing&ouid=117324809776665953812&rtpof=true&sd=true";

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
          {/* PDF Viewer */}
          <div className="w-full h-[800px] rounded-lg overflow-hidden shadow-xl relative mb-8">
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
                    href={resumeGoogleDocsLink}
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
                src={`${resumePdfPath}#view=FitH`}
                title="Nikhilesh Suravarjjala Resume"
                className="w-full h-full"
                onLoad={() => setIsFrameLoaded(true)}
                onError={() => setHasFrameError(true)}
              />
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-6 w-full flex-wrap mt-4">
            <a 
              href={resumeGoogleDocsLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
            >
              <ExternalLink className="mr-2" size={20} />
              View Resume in New Tab
            </a>
            <a 
              href={resumePdfPath}
              download="Nikhilesh_Suravarjjala_Resume.pdf"
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
            >
              <Download className="mr-2" size={20} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
