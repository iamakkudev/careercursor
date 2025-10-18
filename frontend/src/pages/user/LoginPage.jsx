import { useState } from 'react';
import { motion } from 'motion/react';
import Input from '../../components/Input.jsx';
import { Loader, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/AuthStore.js';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, error, isLoading } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      setFormData({ email: '', password: '' });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 md:px-0">
      <div className="w-full max-w-5xl flex flex-col md:flex-row border rounded-2xl p-2 md:p-4 bg-violet-100 shadow-lg">

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 md:h-auto p-6 flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-4xl tracking-wide font-inter font-bold mb-6 text-center bg-gradient-to-r from-violet-500 to-violet-900 text-transparent bg-clip-text">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="w-full px-2 md:px-12 flex flex-col gap-4">
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
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <div className="flex justify-end mb-2">
              <Link to="/forgot-password" className="text-sm font-semibold text-violet-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            {error && <p className="text-red-500 font-semibold">{error}</p>}

            <button
              type="submit"
              className="bg-gradient-to-r from-violet-500 to-violet-900 w-full py-3 text-white font-bold rounded-lg shadow-lg hover:from-violet-600 hover:to-violet-950 transition duration-200 flex items-center justify-center"
            >
              {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-md text-gray-700">
              Don't have an account?{' '}
              <Link to="/signup" className="text-violet-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 h-64 md:h-auto rounded-2xl shadow-[0_0_8px] shadow-black bg-[url('/img2.jpg')] bg-cover bg-center bg-gradient-to-r from-violet-500/90 to-violet-900/90"
        />
      </div>
    </div>
  );
};

export default LoginPage;
