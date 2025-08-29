import {NavLink,Link} from 'react-router-dom'
import { useAuthStore } from '../store/AuthStore'
const ProfileButton = () => {
  const {logout,user} = useAuthStore();
  return (
    <div className='w-[20%] relative flex px-8 '>
        <button  className="px-4 w-30 border-2 mr-10 rounded-md hover:bg-white hover:text-violet-700 hover:font-semibold hover:border-none"><NavLink to={"tracker"}>Tracker</NavLink></button>

      <div className="dropdown relative dropdown-hover">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.profilePic || "/avata.png"} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className=" menu menu-sm  dropdown-content absolute backdrop-blur-sm  -left-0 rounded-box mt-[.1rem] z-1 bg-violet-700/20 border-[1px]  w-32 px-[.4rem] py-4 shadow-sm">
        <li >
          <Link to={"/profile"} className='text-[.9rem] hover:bg-white hover:text-violet-700 hover:font-semibold active:bg-white '>
            Profile
          </Link>
        </li>
        <li><Link to={"/"} className='text-[.9rem] hover:bg-white hover:text-violet-700 hover:font-semibold active:bg-white '>Settings</Link></li>
        <li><button onClick={logout} className='text-[.9rem] hover:bg-white hover:text-violet-700 hover:font-semibold active:bg-white '>Logout</button></li>
      </ul>
    </div>
      </div>
  )
}

export default ProfileButton