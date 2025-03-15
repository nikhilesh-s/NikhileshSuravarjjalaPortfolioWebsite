import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const Resume = () => {
  // Resume data organized by sections
  const resumeData = {
    education: [
      {
        degree: "Master of Science in Computer Science",
        institution: "Stanford University",
        year: "2019 - 2021",
        description: "Specialized in Artificial Intelligence and Machine Learning with a focus on Computer Vision."
      },
      {
        degree: "Bachelor of Engineering in Computer Science",
        institution: "University of California, Berkeley",
        year: "2015 - 2019",
        description: "Graduated with honors. Participated in the ACM programming competition."
      }
    ],
    workExperience: [
      {
        position: "Senior Software Engineer",
        company: "Tech Innovations Inc.",
        year: "2021 - Present",
        responsibilities: [
          "Led a team of 5 engineers in developing a cloud-based analytics platform",
          "Architected and implemented microservices using Node.js and Docker",
          "Improved system performance by 40% through code optimization and database indexing",
          "Mentored junior developers and conducted technical interviews"
        ]
      },
      {
        position: "Software Developer",
        company: "DataViz Solutions",
        year: "2019 - 2021",
        responsibilities: [
          "Developed interactive data visualization components using React and D3.js",
          "Collaborated with UX designers to implement responsive web designs",
          "Integrated RESTful APIs with frontend applications",
          "Contributed to open-source projects related to data visualization"
        ]
      },
      {
        position: "Software Engineering Intern",
        company: "Global Tech",
        year: "Summer 2018",
        responsibilities: [
          "Assisted in developing a mobile application using React Native",
          "Implemented user authentication and profile management features",
          "Participated in daily stand-ups and sprint planning meetings",
          "Created comprehensive documentation for the codebase"
        ]
      }
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        year: "2022"
      },
      {
        name: "Professional Scrum Master I",
        issuer: "Scrum.org",
        year: "2021"
      },
      {
        name: "Google Cloud Professional Data Engineer",
        issuer: "Google Cloud",
        year: "2020"
      }
    ],
    skills: {
      programming: ["JavaScript", "TypeScript", "Python", "Java", "C++", "SQL"],
      frameworks: ["React", "Node.js", "Express", "Django", "TensorFlow"],
      tools: ["Git", "Docker", "Kubernetes", "AWS", "GCP", "CI/CD", "Jira"],
      languages: ["English (Native)", "Spanish (Proficient)", "Mandarin (Basic)"]
    }
  };

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

        <div className="mt-12">
          {/* Education Section */}
          <motion.div
            variants={fadeIn("", "", 0.1, 1)}
            initial="hidden"
            animate="show"
            className="mb-12"
          >
            <h3 className="text-white font-bold text-[24px] mb-6 border-b border-gray-600 pb-2">
              Education
            </h3>
            <div className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="bg-tertiary p-6 rounded-lg">
                  <h4 className="text-[20px] font-bold text-white">{edu.degree}</h4>
                  <div className="flex justify-between items-start mt-1">
                    <p className="text-secondary text-[16px]">{edu.institution}</p>
                    <p className="text-secondary text-[14px]">{edu.year}</p>
                  </div>
                  <p className="text-white mt-3">{edu.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Work Experience Section */}
          <motion.div
            variants={fadeIn("", "", 0.2, 1)}
            initial="hidden"
            animate="show"
            className="mb-12"
          >
            <h3 className="text-white font-bold text-[24px] mb-6 border-b border-gray-600 pb-2">
              Work Experience
            </h3>
            <div className="space-y-6">
              {resumeData.workExperience.map((exp, index) => (
                <div key={index} className="bg-tertiary p-6 rounded-lg">
                  <h4 className="text-[20px] font-bold text-white">{exp.position}</h4>
                  <div className="flex justify-between items-start mt-1">
                    <p className="text-secondary text-[16px]">{exp.company}</p>
                    <p className="text-secondary text-[14px]">{exp.year}</p>
                  </div>
                  <ul className="list-disc list-inside mt-3">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-white mt-1">{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            variants={fadeIn("", "", 0.3, 1)}
            initial="hidden"
            animate="show"
            className="mb-12"
          >
            <h3 className="text-white font-bold text-[24px] mb-6 border-b border-gray-600 pb-2">
              Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="bg-tertiary p-4 rounded-lg">
                  <h4 className="text-[18px] font-bold text-white">{cert.name}</h4>
                  <p className="text-secondary mt-1">{cert.issuer}</p>
                  <p className="text-secondary text-[14px] mt-1">{cert.year}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            variants={fadeIn("", "", 0.4, 1)}
            initial="hidden"
            animate="show"
            className="mb-12"
          >
            <h3 className="text-white font-bold text-[24px] mb-6 border-b border-gray-600 pb-2">
              Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-tertiary p-4 rounded-lg">
                <h4 className="text-[18px] font-bold text-white mb-3">Programming Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.programming.map((skill, idx) => (
                    <span key={idx} className="bg-primary px-3 py-1 rounded-full text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-tertiary p-4 rounded-lg">
                <h4 className="text-[18px] font-bold text-white mb-3">Frameworks & Libraries</h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.frameworks.map((skill, idx) => (
                    <span key={idx} className="bg-primary px-3 py-1 rounded-full text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-tertiary p-4 rounded-lg">
                <h4 className="text-[18px] font-bold text-white mb-3">Tools & Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.tools.map((skill, idx) => (
                    <span key={idx} className="bg-primary px-3 py-1 rounded-full text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-tertiary p-4 rounded-lg">
                <h4 className="text-[18px] font-bold text-white mb-3">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.languages.map((skill, idx) => (
                    <span key={idx} className="bg-primary px-3 py-1 rounded-full text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Download Resume Button */}
          <motion.div
            variants={fadeIn("", "", 0.5, 1)}
            initial="hidden"
            animate="show"
            className="flex justify-center mt-8"
          >
            <a
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-blue-600 py-3 px-8 outline-none text-white font-bold shadow-md shadow-primary rounded-xl flex items-center justify-center"
            >
              View Resume PDF
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
