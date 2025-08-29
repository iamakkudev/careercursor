import { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import Input from '../../components/Input.jsx'
import {Loader, Lock, Mail, User} from 'lucide-react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuthStore } from '../../store/AuthStore.js'
import PasswordStrengthMeter from '../../components/AuthComponents/PasswordStrengthMeter.jsx'

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:''
  })
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  
  const navigate = useNavigate();
  const { signup,error,isLoading } = useAuthStore();

  const handleSignUp = async(e) =>{
    e.preventDefault();
    try {
      await signup(formData.email,formData.password,formData.name);
      console.log(formData.email,formData.password,formData.name)
      setFormData({...formData, email:'',name:'',password:''})
      navigate("/verify-email")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      className="w-full h-[40rem] flex items-center justify-center">
      <div className="w-[70%] h-[65%] flex border rounded-2xl p-2 bg-violet-100">
        <motion.div
        initial={{opacity: 0,x:40}}
        animate={{opacity: 1,x:0}}
        transition={{duration:1}}
        className="h-full w-1/2 rounded-2xl shadow-[0_0_8px]  shadow-black bg-[url('/img2.jpg')] bg-cover bg-center bg-gradient-to-r from-violet-500/90 to-violet-900/90">
          <div className=' relative w-full h-full flex items-end justify-center'>
            <AnimatePresence>
              {(formData.password.length > 0 || isPasswordFocused) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1, }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }} // easeOutBack
                  style={{ overflow: "hidden" }}
                  className="absolute w-[70%] flex justify-center rounded-t-2xl backdrop-blur-md shadow-[0px_0px_10px] shadow-black"
                >
                  <PasswordStrengthMeter password={formData.password} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        <motion.div
        initial={{opacity: 0,x:-40}}
        animate={{opacity: 1,x:0}}
        transition={{duration:1}}
         className="h-full w-1/2  p-4 ">
          <h2
          className='text-3xl tracking-wider font-inter font-bold mb-6 text-center bg-gradient-to-r from-violet-500 to-violet-900 text-transparent bg-clip-text'
          >
             Create an Account
          </h2>
          <form onSubmit={handleSignUp} className='px-12'>
          <Input icon={User} 
      
          type="text" 
          placeholder="Please Enter Name"
          value={formData.name}
          onChange={(e)=> setFormData({...formData, name:e.target.value})}
          />
          <Input icon={Mail} 
    
          type="email" 
          placeholder="Please Enter Email"
          value={formData.email}
          onChange={(e)=> setFormData({...formData, email:e.target.value})}
          />
          <Input icon={Lock} 
       
            type="password" 
            placeholder="Please Enter Password"
            value={formData.password}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            onChange={(e)=> setFormData({...formData, password:e.target.value})}
            
          />
          {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
          
          <button type="submit" className="bg-violet-600 w-full py-3 px-4 mb-2 bg-gradient-to-r from-violet-500 to-violet-900 text-white 
						font-bold rounded-lg shadow-lg hover:from-violet-600
						hover:to-violet-950 focus:outline-none focus:border-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
						 focus:ring-offset-violet-950 transition duration-200"
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "SignUp"}
          </button>
          </form>
          <div className='px-8 py-4 flex justify-center'>
          <p className='text-md text-gray-700'>
            Already have an account?{" "}
            <Link to={"/login"} className='text-violet-500 hover:underline'>
              Login
            </Link>
          </p>
			</div>
        </motion.div>
        
      </div>
    </div>
  )
  }

export default SignupPage;