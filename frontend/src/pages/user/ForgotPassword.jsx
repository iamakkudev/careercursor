import { useState } from 'react';
import { motion } from 'motion/react';
import { Loader, Mail } from 'lucide-react';
import Input from '../../components/Input.jsx';
import { useAuthStore } from '../../store/AuthStore.js';
import ImagePanel from '../../components/AuthComponents/ImagePanel.jsx';

const FormView = ({ email, setEmail, handleSubmit }) => {
  const { error, message, isLoading } = useAuthStore();

  return (
    <>
      <ImagePanel side="left" />

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="w-full md:w-1/2 h-full z-10 p-6 flex flex-col justify-center"
      >
        <h2 className="text-3xl md:text-4xl tracking-wider font-inter font-bold mb-4 text-center bg-gradient-to-r from-violet-500 to-violet-900 text-transparent bg-clip-text">
          Forgot Password
        </h2>
        <p className="text-violet-400 mb-6 px-6 md:px-14 text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {message && <p className="text-violet-600 text-sm mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="px-4 md:px-12 flex flex-col gap-4">
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-gradient-to-r from-violet-500 to-violet-900 w-full py-3 text-white font-bold rounded-lg shadow-lg hover:from-violet-600 hover:to-violet-950 transition duration-200 flex items-center justify-center"
          >
            {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : 'Send Reset Link'}
          </button>
        </form>
      </motion.div>
    </>
  );
};

const SubmittedView = ({ email, setIsSubmitted }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="w-full md:w-1/2 h-full p-6 flex flex-col justify-center"
      >
        <h2 className="text-3xl md:text-4xl tracking-wider font-inter font-bold mb-4 text-center bg-gradient-to-r from-violet-500 to-violet-900 text-transparent bg-clip-text">
          Forgot Password
        </h2>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 700, damping: 30, delay: 0.5 }}
          className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Mail className="h-8 w-8 text-white" />
        </motion.div>

        <p className="text-violet-500 mb-6 px-4 md:px-6 text-center">
          If an account exists for <b>{email}</b>, you will receive a password reset link shortly.
        </p>

        <div className="flex justify-center">
          <p className="text-md text-violet-600/70">
            Wrong email?{' '}
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-sm text-violet-700 hover:underline hover:font-bold cursor-pointer transition duration-200 font-medium mt-2"
            >
              Go back
            </button>
          </p>
        </div>
      </motion.div>

      <ImagePanel side="right" />
    </>
  );
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-0">
      <div className=" w-full max-w-4xl flex flex-col md:flex-row border rounded-2xl p-2 md:p-4 bg-violet-100 shadow-lg">
        {!isSubmitted ? (
          <FormView email={email} setEmail={setEmail} handleSubmit={handleSubmit} />
        ) : (
          <SubmittedView email={email} setIsSubmitted={setIsSubmitted} />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
