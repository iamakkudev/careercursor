import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {useAuthStore} from '../store/AuthStore.js'
import ProfileButton from './ProfileButton.jsx'

const Navbar = () => {
  const {user} = useAuthStore();
  return (
    <header className=' font-poppins w-full h-[4rem] flex justify-between items-center z-50 px-10 border-b border-white/20'>
      <div className='w-[10%] h-[3rem] flex justify-center items-center '>
        <Link to={"/"} className='font-bold text-xl font-inter italic'>CareerCursor<span className=' font-normal text-xs'>.site</span></Link>
      </div>

      {/* todo: Add icon On it */}
      <nav className='w-[30%] px-8 flex justify-between items-center ml-25'>
        <NavLink to={"/"} className='w-[30%] text-center px-4 py-2 rounded-md hover:bg-violet-700 hover:font-semibold hover-anime'>
          Home
        </NavLink>
          <div className="dropdown w-[30%] relative dropdown-hover dropdown-start text-center">
          <button tabIndex={0} className="px-4 py-2 rounded-md hover:bg-violet-700 hover:font-semibold focus:bg-violet-700 focus:font-semibold hover-anime">Top Jobs</button>
          <ul tabIndex={0} className="dropdown-content absolute backdrop-blur-sm  left-10 menu rounded-box mt-[.1rem] z-1 bg-violet-700/20 border-[1px]  w-42 py-4 px-2 shadow-sm">

            <li ><Link to={"/private"} className=' hover:bg-white hover:text-violet-700 hover:font-semibold active:bg-white'>Private Job</Link></li>

            <li><Link to={"/gov"} className=' hover:bg-white hover:text-violet-700 hover:font-semibold '>Private Job</Link></li>

          </ul>
        </div>
        <NavLink to={"/about"} className='w-[30%] text-center px-4 py-2 rounded-md hover:bg-violet-700 hover:font-semibold hover-anime'>
          About
        </NavLink>
      </nav>
      { user ?
      (
        <ProfileButton/>
      )
      :
      (<div className=' w-[20%] h-full flex items-center px-6'>
      <button className='w-[40%] h-[70%] px-6 py-2 mr-8 cursor-pointer hover:bg-white hover:text-violet-700 border-white hover:font-semibold   rounded-md border-2 hover-anime'><Link to={"/login"}>Login</Link></button>
      <button className=' w-[40%] h-[70%] px-6 py-2 cursor-pointer  rounded-md bg-white text-violet-700 hover:bg-violet-700 hover:text-white hover:font-semibold hover-anime'><Link to={"/signup"}>Signup</Link></button>
      </div>)
      }

      
       
    </header>
  )
}

export default Navbar