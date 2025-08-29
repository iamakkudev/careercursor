import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative rounded-2xl text-white bg-gradient-to-b from-[#6D28D9] via-[#4C1D95] to-[#1E1B4B] backdrop-blur-sm border-t border-violet-800">
      <div className="relative z-10 px-6 py-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-10 max-w-6xl mx-auto">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-bold tracking-wide font-outfit">Career Cursor</h1>
          <p className="text-sm text-gray-300 mt-2 max-w-xs text-center md:text-left font-inter">
            Navigate your future with personalized career guidance and smart roadmaps.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-end gap-3 font-inter">
          <section aria-label="Footer Navigation">
            <nav className="flex gap-4 text-sm text-gray-300">
              <Link to="/about" className="hover:underline underline-offset-4">About</Link>
              <Link to="/contact" className="hover:underline underline-offset-4">Contact</Link>
              <Link to="/privacy" className="hover:underline underline-offset-4">Privacy</Link>
              <Link to="/terms" className="hover:underline underline-offset-4">Terms</Link>
            </nav>
          </section>

          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500">
              <Facebook />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400">
              <Twitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-600">
              <Linkedin />
            </a>
            <a href="#" aria-label="Email" className="hover:text-pink-400">
              <Mail />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center text-xs text-gray-400 border-t border-violet-800/40 py-4">
        © {new Date().getFullYear()} Career Cursor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
