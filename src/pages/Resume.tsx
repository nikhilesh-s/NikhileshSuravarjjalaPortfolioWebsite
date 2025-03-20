import { useState, useEffect } from "react";

const Resume = () => {
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);
  const [hasFrameError, setHasFrameError] = useState(false);
  const resumePath = "/Nikhilesh_Suravarjjala_Resume.pdf";

  useEffect(() => {
    // If there's an error loading the iframe, redirect to the PDF directly
    if (hasFrameError) {
      window.location.href = resumePath;
    }

    // Set a timeout to detect if the iframe fails to load
    const timer = setTimeout(() => {
      if (!isFrameLoaded) {
        window.location.href = resumePath;
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isFrameLoaded, hasFrameError, resumePath]);

  return (
    <div className="w-full h-screen bg-primary">
      {!isFrameLoaded && !hasFrameError && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary z-10">
          <p className="text-white text-lg">Loading Resume...</p>
        </div>
      )}
      
      <iframe
        src={`${resumePath}#view=FitH`}
        title="Nikhilesh Suravarjjala Resume"
        className="w-full h-full"
        onLoad={() => setIsFrameLoaded(true)}
        onError={() => setHasFrameError(true)}
      />
    </div>
  );
}

export default Resume;
