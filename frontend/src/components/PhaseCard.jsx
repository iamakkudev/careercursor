import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";;

const PhaseCard = ({ anitime, phase, description, items }) => {
  const [open, setOpen] = useState(false);
  const count = anitime/10
  return (
    <motion.div 
          initial={{opacity: 0,x:-20}}
          animate={{opacity: 1,x:0,}}
          transition={{duration:1, delay:.5+count,ease: [0.25, 0.46, 0.45, 0.94]}}
    className="bg-violet-800/90 text-white rounded-2xl mb-3 active:bg-violet-900 hover-anime">
      {/* Header */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <div className="font-bold text-xl">{phase}</div>
          <div className="text-sm text-violet-200">{description}</div>
        </div>
        <span
          className={`text-xl transition-transform duration-300 ${
            open ? "rotate-90" : "rotate-0"
          }`}
        >
          <ChevronRight />
        </span>
      </div>

      {/* Animated Content (only this part expands/collapses) */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden px-4 border-t border-violet-600"
          >
            <div className="py-2">
              {items.map((item, idx) => (
                <div key={idx} className="mb-3">
                  <div className="font-bold">{item.title}</div>
                  <div className="text-sm text-violet-200 leading-6">
                    {item.details}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PhaseCard;
