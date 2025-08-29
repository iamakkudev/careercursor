import {motion} from 'motion/react';

const AboutPage = () => {
  return (
    <div className='w-full min-h-screen px-30 my-4 flex flex-col gap-10 items-center'>
      <motion.div 
          initial={{opacity: 0,y:-10}}
          animate={{opacity: 1,y:0,}}
          transition={{duration:.8,ease: [0.25, 0.46, 0.45, 0.94]}}
      className='text-3xl font-bold'>About</motion.div>
      <motion.div 
          initial={{opacity: 0,y:-20}}
          animate={{opacity: 1,y:0,}}
          transition={{duration:.8,delay:.5,ease: [0.25, 0.46, 0.45, 0.94]}}
          className='w-full border-2 px-6 rounded-2xl py-8 bg-gradient-to-t from-violet-950/70 to-violet-700'>
        <div className='text-2xl font-bold mb-8'>Services</div>
        <div className='px-10 flex flex-col justify-center items-start gap-10'>
          <motion.div 
          initial={{opacity: 0,x:-20}}
          animate={{opacity: 1,x:0,}}
          transition={{duration:.8,delay:.7,ease: [0.25, 0.46, 0.45, 0.94]}}
          className=' w-full rounded-2xl px-10 py-6 text-xl font-light tracking-wide bg-white/90 text-violet-700/90'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae eligendi deserunt facere. Possimus vitae magnam ea libero.</motion.div>
          <motion.div
          initial={{opacity: 0,x:-20}}
          animate={{opacity: 1,x:0,}}
          transition={{duration:.8,delay:1,ease: [0.25, 0.46, 0.45, 0.94]}}
           className='w-full rounded-2xl px-10 py-6 text-xl font-light tracking-wide bg-white/90 text-violet-700/90'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, temporibus.</motion.div>
          <motion.div 
          initial={{opacity: 0,x:-20}}
          animate={{opacity: 1,x:0,}}
          transition={{duration:.8,delay:1.3,ease: [0.25, 0.46, 0.45, 0.94]}}
          className='w-full rounded-2xl px-10 py-6 text-xl font-light tracking-wide bg-white/90 text-violet-700/90'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia obcaecati nisi iusto est voluptates nemo.</motion.div>
        </div>
      </motion.div>
      <motion.div
          initial={{opacity: 0,y:20}}
          animate={{opacity: 1,y:0,}}
          transition={{duration:.8,delay:.5,ease: [0.25, 0.46, 0.45, 0.94]}}
      className='w-full px-6 rounded-2xl py-8 bg-white/95 text-violet-700 shadow-[0_0_10px] shadow-black'>
        <div className='text-2xl font-bold mb-6'>Why trust us</div>
        <div className=' text-2xl tracking-wide font-light'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt temporibus voluptatem eaque unde numquam veritatis, fuga debitis error odio dolor obcaecati, et minus odit vitae dicta. Unde quos corrupti odio temporibus amet esse qui ipsa. Consequuntur repellat odit animi quos!</div>
      </motion.div>
    </div>
  )
}

export default AboutPage