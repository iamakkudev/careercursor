import React, { useState } from 'react'
import {AnimatePresence, motion} from 'motion/react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/AuthStore';
import Input from '../../components/Input';
import { Lock } from 'lucide-react';
import PasswordStrengthMeter from '../../components/AuthComponents/PasswordStrengthMeter';
import {toast} from 'react-hot-toast'

const ResetPassword = () => {
  const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading, message } = useAuthStore();
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
	};
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
            Reset Password
          </h2>
		{error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
		{message && <p className='text-violet-600 text-sm mb-4'>{message}</p>}
          <form onSubmit={handleSubmit} className='px-12'>
          		<Input
					icon={Lock}
					type='password'
					placeholder='New Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onFocus={() => setIsPasswordFocused(true)}
            		onBlur={() => setIsPasswordFocused(false)}
					required
				/>

				<Input
					icon={Lock}
					type='password'
					placeholder='Confirm New Password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					onFocus={() => setIsPasswordFocused(true)}
            		onBlur={() => setIsPasswordFocused(false)}
					required
				/>

             {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
          <button type="submit" className="bg-violet-600 w-full py-3 px-4 mb-8 bg-gradient-to-r from-violet-500 to-violet-900 text-white 
						font-bold rounded-lg shadow-lg hover:from-violet-600
						hover:to-violet-950 focus:outline-none focus:border-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
						 focus:ring-offset-violet-950 transition duration-200"
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Reset Password"}
          </button>
        </form>
        </motion.div>
		<motion.div
        initial={{opacity: 0,x:-40}}
        animate={{opacity: 1,x:0}}
        transition={{duration:1}}
        className="h-full w-1/2 rounded-2xl shadow-[0_0_8px]  shadow-black bg-[url('/img2.jpg')] bg-cover bg-center bg-gradient-to-r from-violet-500/90 to-violet-900/90">
          <div className=' relative w-full h-full flex items-end justify-center'>
            <AnimatePresence>
              {(password.length > 0 || isPasswordFocused) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1, }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }} // easeOutBack
                  style={{ overflow: "hidden" }}
                  className="absolute w-[70%] flex justify-center rounded-t-2xl backdrop-blur-md shadow-[0px_0px_10px] shadow-black"
                >
                  <PasswordStrengthMeter password={password} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
      </div>
    </div>
  )
}

export default ResetPassword