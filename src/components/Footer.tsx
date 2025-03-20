import { Github, Linkedin, Mail, Phone, MapPin, ArrowRight, Instagram } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { getContact } from '../services/dataService';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    location: "",
    social: {
      github: "",
      linkedin: "",
      twitter: "",
      instagram: ""
    }
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactData = await getContact();
        setContact(contactData);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    fetchContact();
  }, []);

  return (
    <footer className="bg-tertiary py-10 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-white font-bold text-xl mb-2">Contact Me</h3>
            <a 
              href={`mailto:${contact.email}`}
              className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
            >
              <Mail size={18} className="mr-2" />
              {contact.email}
            </a>
            <a 
              href={`tel:${contact.phone}`}
              className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
            >
              <Phone size={18} className="mr-2" />
              {contact.phone}
            </a>
            <div className="text-gray-300 flex items-center">
              <MapPin size={18} className="mr-2" />
              {contact.location}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-white font-bold text-xl mb-2">Quick Links</h3>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              offset={-70}
              className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              About
            </ScrollLink>
            <ScrollLink
              to="projects"
              smooth={true}
              duration={500}
              offset={-70}
              className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Projects
            </ScrollLink>
            <Link
              to="/journey"
              className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              My Journey
            </Link>
            <a
              href="/Nikhilesh_Suravarjjala_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Resume
            </a>
          </div>

          {/* Contact CTA */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-bold text-xl mb-2">Get in Touch</h3>
            <p className="text-gray-300">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="bg-gradient-to-r from-purple-600 to-blue-600 py-2 px-4 rounded-lg text-white font-medium inline-flex items-center w-fit hover:opacity-90 transition-opacity duration-300"
            >
              Contact Me <ArrowRight className="ml-2" size={16} />
            </ScrollLink>

            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <a
                href={contact.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Github size={20} />
              </a>
              <a
                href={contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Attribution */}
        <div className="text-center text-gray-400 text-sm mt-10 pt-6 border-t border-gray-800">
          <p className="mb-2"> {new Date().getFullYear()} Nikhilesh Suravarjjala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
