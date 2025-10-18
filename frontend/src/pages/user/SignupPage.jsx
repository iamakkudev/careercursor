import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Input from '../../components/Input.jsx';
import { Loader, Lock, Mail, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/AuthStore.js';
import PasswordStrengthMeter from '../../components/AuthComponents/PasswordStrengthMeter.jsx';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(formData.email, formData.password, formData.name);
      setFormData({ name: '', email: '', password: '' });
      navigate('/verify-email');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 md:px-0">
      <div className="w-full max-w-5xl flex flex-col md:flex-row border rounded-2xl p-2 md:p-4 bg-violet-100 shadow-lg">
        
        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 h-64 md:h-auto rounded-2xl shadow-[0_0_8px] shadow-black bg-[url('/img2.jpg')] bg-cover bg-center bg-gradient-to-r from-violet-500/90 to-violet-900/90 relative flex items-end justify-center"
        >
          <AnimatePresence>
            {(formData.password.length > 0 || isPasswordFocused) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{overflow:'hidden'}}
                className="absolute bottom-0 w-11/12 max-w-xs flex justify-center rounded-t-2xl backdrop-blur-md shadow-[0px_0px_10px] shadow-black"
              >
                <PasswordStrengthMeter password={formData.password} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 p-4 flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-4xl tracking-wide font-inter font-bold mb-6 text-center bg-gradient-to-r from-violet-500 to-violet-900 text-transparent bg-clip-text">
            Create an Account
          </h2>

          <form onSubmit={handleSignUp} className="w-full px-2 md:px-12 flex flex-col gap-4">
            <Input
              icon={User}
              type="text"
              placeholder="Please Enter Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Input
              icon={Mail}
              type="email"
              placeholder="Please Enter Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              icon={Lock}
              type="password"
              placeholder="Please Enter Password"
              value={formData.password}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            {error && <p className="text-red-500 font-semibold">{error}</p>}

            <button
              type="submit"
              className="bg-gradient-to-r from-violet-500 to-violet-900 w-full py-3 text-white font-bold rounded-lg shadow-lg hover:from-violet-600 hover:to-violet-950 transition duration-200 flex items-center justify-center"
            >
              {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : 'Sign Up'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-md text-gray-700">
              Already have an account?{' '}
              <Link to="/login" className="text-violet-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
