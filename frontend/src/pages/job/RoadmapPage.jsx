import PhaseCard from '../../components/PhaseCard'
import { useRoadmapStore } from '../../store/roadmapStore.js';
// import {roadmapData} from '../../info.js'
import {motion} from 'motion/react'
import { useEffect, useState } from 'react';

const RoadmapPage = () => {
  const [mounted, setMounted] = useState(false);

  const { job, error, isLoading,get } = useRoadmapStore()
  const newerror = error || "Data not available";
  useEffect(() => {
    if (roadmapData) setMounted(true);
  }, [roadmapData]);

  if(isLoading) return <div className='text-xl text-center font-bold my-auto'>Loding....</div>
  if(error||!roadmapData) return <div className='text-center font-bold text-red-600 text-xl my-auto'>{newerror}</div>

  return (
    <div className="w-full py-4 px-6 flex flex-col items-center">
      
      {/* Job Title */}
      <motion.div  
      initial={{ opacity: 0, y: -20 }}
      animate={mounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="w-full sm:w-4/5 py-2 px-4 border-2 mb-4 font-bold text-4xl tracking-wider bg-violet-800/80 rounded-2xl">
        {job}
      </motion.div >

      {/* About Section */}
      <motion.div 
      initial={{opacity: 0,y:-20}}
      animate={{opacity: 1,y:0,}}
      transition={{duration:1, delay:.2,ease: [0.25, 0.46, 0.45, 0.94]}}
      className="w-full sm:w-4/5 py-4 px-4 bg-white border-2 mb-4 rounded-2xl">
        <div className="font-bold text-3xl text-violet-900 mb-2">About</div>
        <p className="text-violet-800">{roadmapData.about}</p>
      </motion.div >

      {/* Requirements */}
      <motion.div
        initial={{opacity: 0,y:-20}}
        animate={{opacity: 1,y:0,}}
        transition={{duration:1, delay:.3,ease: [0.25, 0.46, 0.45, 0.94]}}
        className="w-full sm:w-4/5 py-4 px-4 bg-white border-2 mb-4 rounded-2xl">
        <div className="font-bold text-3xl text-violet-900 mb-2">Requirements</div>
        <ul className="list-disc pl-5 text-violet-800">
          {roadmapData.requirements.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </motion.div >

      {/* Phases */}
      <motion.div 
          initial={{opacity: 0,y:20}}
          animate={{opacity: 1,y:0,}}
          transition={{duration:1, delay:.4,ease: [0.25, 0.46, 0.45, 0.94]}}
       className="w-full sm:w-4/5 py-4 px-4 bg-white border-2 rounded-2xl">
        <div className="font-bold text-3xl text-violet-900 mb-4">Phases</div>
        {roadmapData.phases.map((phase, idx) => (
          <PhaseCard key={idx} anitime={idx} {...phase} />
        ))}
      </motion.div>
    </div>
  );
};

export default RoadmapPage;
