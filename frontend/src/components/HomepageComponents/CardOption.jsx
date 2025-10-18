import { motion} from 'motion/react'
import { Link } from 'react-router-dom'

const CardOption = ({title,desc,button,time,route}) => {
  return (
    <>
    <motion.div 
          initial={{opacity: 0,y:40}}
          animate={{opacity: 1,y:0}}
          transition={{duration:.5, delay:`${time}`}}
          className="w-65 h-80  px-4 py-6 flex flex-col  justify-between bg-gradient-to-t from-violet-500/60 via-white/60 via-20% to-white/90 to-35%  border-2  backdrop-blur-sm shadow-[1px_1px_10px] shadow-violet-200 rounded-2xl  hover:-rotate-6 hover:scale-110 transition ease-linear duration-200">
              <div>
                <div className=' text-3xl font-bold text-violet-800 leading-9'>
                {title}
              </div>
              <div className=' font-[400] text-violet-600/80  tracking-wider'>{desc}</div>
              </div>
              <Link to={`/${route}`} className='w-[10rem] bg-violet-700 px-4 cursor-pointer py-2 rounded-md text-center hover:bg-white hover:text-violet-700 hover:shadow-[0_0_10px] hover:font-semibold hover:shadow-black hover-anime'>
               {button}
              </Link>
    </motion.div>
    </>
  )
}

export default CardOption