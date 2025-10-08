import { AnimatePresence,motion } from "motion/react";
import { X } from 'lucide-react';


const InterestList = ({removeInterest,interest}) => {
  return (
    <div className="w-[70%] flex flex-wrap p-2">
                <AnimatePresence>
                {interest.map((item, index) => (
                  <motion.div
                    key={item + index}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      y: 40,
                      scale: 0.7,
                      transition: { duration: 0.2 },
                    }}
                    layout
                    className="h-12 bg-gray-500 m-2 flex items-center rounded-full shadow-md"
                  >
                    <div className="text-center text-xl px-4 mb-1.5">{item}</div>
                    <X
                      className="p-2.5 h-full size-10 hover:border-l-2 hover:border-l-white/60 pl-1 hover:bg-gray-600/50 hover:rounded-r-full hover:text-white/50 cursor-pointer"
                      onClick={() => removeInterest(index)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
      </div>
  )
}

export default InterestList