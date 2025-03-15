import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          {/* Social Links */}
          <div className="flex space-x-6 mb-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Mail size={24} />
            </a>
          </div>

          {/* Attribution */}
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-2">© 2025 Nikhilesh. All rights reserved.</p>
            <p>
              Design inspired by{' '}
              <a
                href="https://github.com/sunnypatell/Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
              >
                Sunny Patel's Portfolio
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
