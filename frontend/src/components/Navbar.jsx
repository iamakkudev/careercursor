import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore.js';
import ProfileButton from './ProfileButton.jsx';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  return (
    <header className='font-poppins w-full flex justify-between items-center px-4 sm:px-6 md:px-10 h-[4rem] border-b border-white/20 relative z-50'>
      {/* Logo */}
      <div className='h-[3rem] flex justify-center items-center'>
        <Link to={"/"} className='font-bold text-xl font-inter italic'>
          CareerCursor<span className='font-normal text-xs'>.site</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <nav className='hidden md:flex w-[40%] justify-center gap-10 items-center'>
        <NavLink
          to={"/"}
          className='px-4 py-2 rounded-md hover:bg-violet-700 hover:font-semibold hover-anime'
        >
          Home
        </NavLink>

        <div className="dropdown relative dropdown-hover dropdown-start text-center">
          <button tabIndex={0} className="px-4 py-2 rounded-md hover:bg-violet-700 hover:font-semibold hover-anime">
            Top Jobs
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content absolute backdrop-blur-sm left-0 menu rounded-box mt-[0.1rem] z-10 bg-violet-700/20 border-[1px] w-40 py-2 px-2 shadow-sm"
          >
            <li>
              <Link to={"/private"} className='hover:bg-white hover:text-violet-700 hover:font-semibold'>
                Private Job
              </Link>
            </li>
            <li>
              <Link to={"/gov"} className='hover:bg-white hover:text-violet-700 hover:font-semibold'>
                Government Job
              </Link>
            </li>
          </ul>
        </div>

        <NavLink
          to={"/about"}
          className='px-4 py-2 rounded-md hover:bg-violet-700 hover:font-semibold hover-anime'
        >
          About
        </NavLink>
      </nav>

      {/* Auth / Profile Buttons (Desktop) */}
      <div className='hidden md:flex items-center space-x-4'>
        {user ? (
          <ProfileButton />
        ) : (
          <>
            <Link
              to={"/login"}
              className='px-4 py-2 border-2 border-white rounded-md hover:bg-white hover:text-violet-700 hover:font-semibold'
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className='px-4 py-2 rounded-md bg-white text-violet-700 hover:bg-violet-700 hover:text-white hover:font-semibold'
            >
              Signup
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className='md:hidden p-2'
        onClick={toggleMobileMenu}
        aria-label='Toggle Menu'
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='absolute top-[4rem] left-0 w-full bg-violet-900/90 backdrop-blur-md flex flex-col items-center space-y-4 py-4 z-40 md:hidden'>
          <NavLink
            to={"/"}
            onClick={() => setMobileMenuOpen(false)}
            className='px-4 py-2 w-full text-center rounded-md hover:bg-violet-700 hover:font-semibold'
          >
            Home
          </NavLink>

          <div className='w-full text-center'>
            <details className='dropdown'>
              <summary className='px-4 py-2 rounded-md cursor-pointer hover:bg-violet-700 hover:font-semibold'>
                Top Jobs
              </summary>
              <ul className='flex flex-col mt-2 space-y-2'>
                <li>
                  <Link
                    to={"/private"}
                    onClick={() => setMobileMenuOpen(false)}
                    className='block px-4 py-2 rounded-md hover:bg-white hover:text-violet-700 hover:font-semibold'
                  >
                    Private Job
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/gov"}
                    onClick={() => setMobileMenuOpen(false)}
                    className='block px-4 py-2 rounded-md hover:bg-white hover:text-violet-700 hover:font-semibold'
                  >
                    Government Job
                  </Link>
                </li>
              </ul>
            </details>
          </div>

          <NavLink
            to={"/about"}
            onClick={() => setMobileMenuOpen(false)}
            className='px-4 py-2 w-full text-center rounded-md hover:bg-violet-700 hover:font-semibold'
          >
            About
          </NavLink>

          {/* Auth / Profile Buttons */}
          {user ? (
            <ProfileButton />
          ) : (
            <div className='flex flex-col w-full space-y-2 px-4'>
              <Link
                to={"/login"}
                onClick={() => setMobileMenuOpen(false)}
                className='w-full text-center px-4 py-2 border-2 border-white rounded-md hover:bg-white hover:text-violet-700 hover:font-semibold'
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                onClick={() => setMobileMenuOpen(false)}
                className='w-full text-center px-4 py-2 rounded-md bg-white text-violet-700 hover:bg-violet-700 hover:text-white hover:font-semibold'
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
