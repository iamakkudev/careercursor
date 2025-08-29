import { useState } from 'react'
import { motion } from "motion/react"
import Input from '../../components/Input.jsx'
import {Loader, Lock, Mail} from 'lucide-react'
import {Link} from 'react-router-dom'
import { useAuthStore } from '../../store/AuthStore.js'
const LoginPage = () => {
  const [formData, setFormData] = useState({
      email:'',
      password:''
    })
     
    const { login,error,isLoading } = useAuthStore();


    const handleLogin = async (e) =>{
    e.preventDefault();
      await login(formData.email,formData.password)

      setFormData({...formData, password:'' ,email:''})
  }
  return (
    <div
      className="w-full h-[40rem] flex items-center justify-center">
      <div className="w-[70%] h-[65%] flex border rounded-2xl p-2 bg-violet-100">
        <motion.div
        initial={{opacity: 0,x:40}}
        animate={{opacity: 1,x:0}}
        transition={{duration:1}}
         className="h-full w-1/2  p-6 ">
          <h2
          className='text-3xl tracking-wider font-inter font-bold mb-6 text-center bg-gradient-to-r from-violet-500 to-violet-900 text-transparent bg-clip-text'
          >
            Welcome Back
          </h2>
          <form onSubmit={handleLogin} className='px-12'>
            <Input icon={Mail} 
            type="email" 
            placeholder="Please Enter Email"
            value={formData.email}
            onChange={(e)=> setFormData({...formData, email:e.target.value})}
            
          />
          <Input icon={Lock} 
            marb={4}
            type="password" 
            placeholder="Please Enter Password"
            value={formData.password}
            onChange={(e)=> setFormData({...formData, password:e.target.value})}
          />
          <div className='flex items-center mb-4'>
						<Link to='/forgot-password' className='text-sm font-semibold text-violet-500 hover:underline'>
							Forgot password?
						</Link>
				</div>
        {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
          <button type="submit" className="bg-violet-600 w-full py-3 px-4 mb-8 bg-gradient-to-r from-violet-500 to-violet-900 text-white 
						font-bold rounded-lg shadow-lg hover:from-violet-600
						hover:to-violet-950 focus:outline-none focus:border-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
						 focus:ring-offset-violet-950 transition duration-200"
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
          </button>
          </form>
          <div className='px-8 py-4 flex justify-center'>
          <p className='text-md text-gray-700'>
            Don't have an account?{" "}
            <Link to={"/signup"} className='text-violet-500 hover:underline'>
              Sign Up
            </Link>
          </p>
			</div>
        </motion.div>
        <motion.div
        initial={{opacity: 0,x:-40}}
        animate={{opacity: 1,x:0}}
        transition={{duration:1}}
        className="h-full w-1/2 rounded-2xl shadow-[0_0_8px]  shadow-black bg-[url('/img2.jpg')] bg-cover bg-center bg-gradient-to-r from-violet-500/90 to-violet-900/90">
          
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage