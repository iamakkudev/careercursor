import { useState } from 'react'
import { Loader, Mail} from 'lucide-react'
import {motion} from 'motion/react'
import Input from '../../components/Input.jsx'
import {useAuthStore} from '../../store/AuthStore.js'
import ImagePanel from '../../components/AuthComponents/ImagePanel.jsx'




const FormView = ({email, setEmail, handleSubmit}) =>{
  const { error, message, isLoading } = useAuthStore();
        return(
                <>
        <ImagePanel side={"left"}/>

        <motion.div
        initial={{opacity: 0,x:-40}}
        animate={{opacity: 1,x:0}}
        transition={{duration:.7,ease: "easeInOut"}}
         className="h-full w-1/2 z-10  p-6 ">
          <h2
          className='text-3xl  tracking-wider font-inter font-bold mb-6 text-center bg-gradient-to-r from-violet-500 to-violet-900 text-transparent bg-clip-text'
          >
            Forgot Password
          </h2>
          <p className='text-violet-400 mb-6 px-14 text-center  '>
							Enter your email address and we'll send you a link to reset your password.
					</p>
		    {/* todo:make toast */}
		    {message && <p className='text-violet-600 text-sm mb-4'>{message}</p>}
          <form onSubmit={handleSubmit} className='px-12  '>
          		<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

          {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        
            <button type="submit" className="bg-violet-600 w-full py-3 px-4 mb-8 bg-gradient-to-r from-violet-500 to-violet-900 text-white 
              font-bold rounded-lg shadow-lg hover:from-violet-600
              hover:to-violet-950 focus:outline-none focus:border-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
              focus:ring-offset-violet-950 transition duration-200"
            >
              {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Send Reset Link"}
            </button>
        </form>
        </motion.div>
          </>

        )
}
const SubmittedView = ({email,setIsSubmitted}) =>{
  return(
    <>
    <motion.div
        initial={{opacity: 0,x:40}}
        animate={{opacity: 1,x:0}}
        transition={{duration:.7,ease: "easeInOut"}}
        
         className="h-full w-1/2  p-6 ">

          <div className='text-center w-full px-4  '>
            <h2
            className='text-3xl  tracking-wider font-inter font-bold mb-6 text-center bg-gradient-to-r from-violet-500 to-violet-900 text-transparent bg-clip-text'
            >
            Forgot Password
            </h2>

						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1}}
							transition={{ type: "spring", stiffness: 700, damping: 30,delay:1}}
							className='w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 '
						>
							<Mail className='h-8 w-8 text-white' />
						</motion.div>
						<p className='text-violet-500 mb-6 px-6 leading-md '>
							If an account exists for <b>{email}</b>, you will receive a password reset link shortly.
						</p>
					</div>

          <div className='flex justify-center'>
            <p className='text-md text-violet-600/70'>
           Wrong email? {" "}
            <button
            onClick={() => setIsSubmitted(false)}
            className="text-sm text-violet-700 hover:underline hover:font-bold cursor-pointer transition duration-200 font-medium mt-4"
              >
              Go back
            </button>
          </p>
          </div>
		    
        </motion.div>
        <ImagePanel side={"right"} />
    </>
  )
}

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};
  return (
    <div
      className=" relative w-full h-[40rem] flex items-center justify-center">
      <div className="w-[70%] h-[65%] flex border rounded-2xl p-2 bg-violet-100">

        {!isSubmitted ? (
          <FormView email={email} setEmail={setEmail} handleSubmit={handleSubmit} />
        ) : (
          <SubmittedView email={email} setIsSubmitted={setIsSubmitted} />
        )}
		    
        
      </div>
    </div>
  )
}

export default ForgotPassword