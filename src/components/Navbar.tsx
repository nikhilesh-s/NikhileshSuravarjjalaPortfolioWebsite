import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NavLink } from '../types';

const navLinks: NavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "journey",
    title: "Career Exploration",
    isPage: true
  },
  {
    id: "resume",
    title: "Resume",
    isPage: true
  }
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isSpecialPage = location.pathname === '/journey' || location.pathname === '/resume';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
        if (scrollTop > 200 && !hovering) {
          setHidden(true);
        }
      } else {
        setScrolled(false);
        setHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Add keyboard shortcut for admin panel (Alt+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        navigate('/admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, hovering]);

  const handleNavClick = (id: string, isPage?: boolean) => {
    setActive(id);
    setToggle(false);
    
    if (isPage) {
      navigate(`/${id}`);
    } else if (location.pathname !== '/') {
      navigate('/');
      // Allow time for navigation before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`sm:px-16 px-6 w-full flex items-center fixed top-0 z-20 transition-all duration-300 ${
        scrolled ? "bg-primary" : "bg-transparent"
      } ${hidden ? "-translate-y-full" : "translate-y-0"} ${isSpecialPage ? "py-3" : "py-5"}`}
      onMouseEnter={() => { setHovering(true); setHidden(false); }}
      onMouseLeave={() => { setHovering(false); }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Nikhilesh Suravarjjala
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => handleNavClick(nav.id, nav.isPage)}
            >
              {nav.title}
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div
            className="w-[28px] h-[28px] object-contain cursor-pointer flex items-center justify-center"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <X /> : <Menu />}
          </div>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => handleNavClick(nav.id, nav.isPage)}
                >
                  {nav.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
