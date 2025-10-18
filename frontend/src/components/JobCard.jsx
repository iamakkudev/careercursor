import { BriefcaseBusiness } from 'lucide-react';
import { motion } from 'motion/react';

const JobCard = ({ title, reputation, reason, salary, handleJob }) => {
  const repColors = {
    High: "bg-green-500/70",
    Medium: "bg-amber-500/70",
    Low: "bg-red-500/70"
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      onClick={() => handleJob(title)}
      role="button"
      tabIndex={0}
      className="flex flex-col sm:flex-row gap-3 sm:gap-2 p-3 rounded-2xl my-4 bg-white hover:bg-gray-100 active:bg-gray-200 shadow-md transition-all cursor-pointer"
    >
      {/* Icon Section */}
      <div className="flex-shrink-0 flex justify-center items-center rounded-2xl bg-violet-800/60 shadow-[0px_0px_5px] shadow-black w-12 h-12 sm:w-[10%] sm:h-auto mx-auto sm:mx-0">
        <BriefcaseBusiness className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
      </div>

      {/* Info Section */}
      <div className="flex-1 p-1 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-1 sm:mb-2">
          <div className="font-bold text-base sm:text-xl text-black">{title}</div>
          <div
            className={`${repColors[reputation] || "bg-gray-400"} text-xs sm:text-sm px-3 py-0.5 rounded-md text-white font-semibold inline-block mx-auto sm:mx-0`}
          >
            {reputation}
          </div>
        </div>
        <div className="font-light text-sm sm:text-base leading-5 text-gray-800 line-clamp-3 sm:line-clamp-none">
          {reason}
        </div>
      </div>

      {/* Salary and Recommendation */}
      <div className="flex flex-col items-center justify-between sm:w-[20%] mt-2 sm:mt-0">
        <p className="text-lg sm:text-xl font-bold text-black">{salary}</p>
        {reputation === "High" && (
          <div className="border-2 border-blue-600 text-white bg-blue-500 px-3 py-0.5 rounded-2xl text-xs sm:text-sm font-semibold mt-2 sm:mt-0">
            Recommended
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default JobCard;
