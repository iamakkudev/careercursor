import {BriefcaseBusiness} from 'lucide-react'
import {motion} from 'motion/react';

const JobCard = ({title,reputation,reason,salary,handleJob}) => {
  return (
    <motion.div 
    initial={{opacity: 0,x:-40}}
    transition={{duration:1}} 
    whileInView={{ opacity: 1, x: 0 }}
    onClick={()=>handleJob(title)}
    className=' h-[8rem] flex  gap-2 p-2 rounded-2xl my-4 bg-white md:hover:bg-gray-200 cursor-pointer active:bg-gray-200 shadow-[0px_0px_10px] shadow-black hover-anime'
    >
        <div
          className='h-full w-[10%] flex justify-center items-center rounded-2xl bg-violet-800/60 shadow-[0px_0px_5px] shadow-black'
        >
          <BriefcaseBusiness className=' size-16' />
        </div>
        <div
          className=' w-[50%] p-1'
        >
            <div
            className='flex items-center gap-4 mb-2'
            >
                <div
                className=' font-bold text-xl text-black '
                >
                {title}
                </div>
                <div
                className={` ${reputation=="High" ? "bg-green-500/70 ": reputation=="Medium" ? "bg-amber-500/70" : "bg-red-500/70"}  px-4 rounded-sm`}
                >
                {reputation}
                </div>
            </div>

            <div
            className='   font-light text-sm leading-5 shrink text-black'
            >
                {reason}
            </div>
        </div>
        <div
          className='h-full w-[20%] py-2 flex flex-col gap-2 items-center ml-auto'
        >
            <div
            className='h-[40%] w-full px-2 mb-4 text-black text-center'
            >
                <p
                className='text-xl font-bold'
                >
                {salary}
                </p>
            </div>
            <div
                className={` ${reputation=="High" ? "": "hidden"} border-2 font-semibold px-2 bg-blue-500  rounded-2xl`}
            >
                Recommeneded
            </div>
        </div>
      </motion.div >
  )
}

export default JobCard