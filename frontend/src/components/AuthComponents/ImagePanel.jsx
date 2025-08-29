import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom'
import {motion} from 'motion/react'

const ImagePanel = ({ side = "left" }) => {
  const animation = side === "left"
    ? { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } }
    : { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } };

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      transition={{ duration: .7, ease: "easeInOut" }}
      className="relative h-full w-1/2 rounded-2xl shadow-[0_0_8px] shadow-black bg-[url('/img2.jpg')] bg-cover bg-center bg-gradient-to-r from-violet-500/90 to-violet-900/90"
    >
      <div className="absolute bottom-0 w-full px-8 py-4 bg-violet-950/20 backdrop-blur-sm border-t-1 border-violet-600 flex justify-center rounded-b-2xl">
        <Link
          to={"/login"}
          className="text-[.9rem] text-violet-100 hover:underline hover:font-semibold flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ImagePanel;
