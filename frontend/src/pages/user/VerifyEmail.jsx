import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuthStore } from '../../store/AuthStore';

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pasted = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) newCode[i] = pasted[i] || "";
      setCode(newCode);

      const next = newCode.findIndex((d) => d === "");
      if (next !== -1) inputRefs.current[next].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0)
      inputRefs.current[index - 1].focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      toast.success("Email verified successfully");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) handleSubmit(new Event("submit"));
  }, [code]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 md:px-0">
      <div className="w-full max-w-4xl p-2 flex flex-col md:flex-row border rounded-2xl bg-violet-100 shadow-lg overflow-hidden">
        {/* Left side (form) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center"
        >
          <h2 className="text-3xl md:text-4xl font-inter font-bold text-center mb-4 bg-gradient-to-r from-violet-500 to-violet-900 text-transparent bg-clip-text">
            Verify Your Email
          </h2>

          <p className="text-center text-violet-700/70 mb-6">
            Enter the 6-digit code sent to your email address.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <div className="flex justify-between mb-8">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-10 md:w-12 md:h-12 text-center text-xl font-bold text-violet-950 border border-violet-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 mx-1 transition"
                />
              ))}
            </div>

            {error && <p className="text-red-500 font-semibold mb-3">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || code.some((d) => !d)}
              className="w-full py-3 bg-gradient-to-r from-violet-500 to-violet-900 text-white font-bold rounded-lg shadow-md hover:from-violet-600 hover:to-violet-950 transition disabled:opacity-60"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </motion.button>
          </form>
        </motion.div>

        {/* Right side (image) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex md:w-1/2 bg-[url('/img2.jpg')] bg-cover bg-center relative rounded-2xl"
        >
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyEmail;
