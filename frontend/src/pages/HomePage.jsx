import {Link, useNavigate} from 'react-router-dom';
import {motion} from 'motion/react';
import CardOption from '../components/HomepageComponents/CardOption';
import TestomonyScroll from '../components/HomepageComponents/TestomonyScroll';



const HomePage = () => {
  
  return (
      <>
      <div className="hero w-full min-h-screen flex flex-col z-10 justify-start  relative px-10 py-4">
      <motion.div
          initial={{opacity: 0,y:-20}}
          animate={{opacity: 1,y:0,}}
          transition={{duration:.6, delay:.4,ease: [0.25, 0.46, 0.45, 0.94]}}
       className=" w-[90%] h-[60%] p-10 flex items-center justify-between bg-gradient-to-bl from-violet-200/40   via-violet-600/60  to-violet-900/40 rounded-2xl">
          <div className='w-1/2 h-full'>

              <motion.div
              initial={{opacity: 0,x:-40}}
              animate={{opacity: 1,x:0}}
              transition={{duration:.6, delay:1}} 
              
              className='text-5xl px-4 leading-14 font-bold mb-2'>
                  Shape Your Future With Career Cursor
              </motion.div>
              <motion.div
              initial={{opacity: 0,x:-40}}
              animate={{opacity: 1,x:0}}
              transition={{duration:.6, delay:1.3}} 
              className='text-xl px-4 tracking-wider font-light italic  pr-40'>
                  Discover your path,plan your journey, and reach your career goals- <br />
                  All In One Place
              </motion.div>
              <motion.div
              initial={{opacity: 0,x:-40}}
              animate={{opacity: 1,x:0}}
              transition={{duration:.6, delay:1.6}}
              className=' ml-4 mt-10'
              
              
              >
                <Link to={"/"}
                className='w-[10rem] bg-white text-violet-700 px-4 py-3 font-[500] cursor-pointer  rounded-md hover:bg-violet-700 hover:text-white hover:shadow-[0_0_10px] hover:font-semibold hover:shadow-black shadow-[1px_1px_10px] shadow-violet-200 hover-anime'
                >Get Started</Link>
              </motion.div>
          </div>
          <div className='w-[40%] h-full'>
            <img src="/img5.png" alt="Hero image" />
          </div>
      </motion.div>
      <div className=" w-[80%] px-10 py-0  absolute bottom-12 h-[40%] flex items-start justify-center gap-18 ">
        {/* todo:make card to be jumpy */}
        <CardOption title={"Find The Career You Love"} desc={"Explore personalized job matches based on your interests and strengths."} button={"Passionate Job"} time={1.8} route={"passion"}/>

        <CardOption title={"Find The Career That Match Your Qualification"} desc={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia reiciendis ."} button={"Qualified Job"} time={2} route={"qualify"}/>

        <CardOption title={"Create Your Own Custom Roadmap"} desc={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia reiciendis voluptates animi nihil."} button={"Create"} time={2.2} route={"custom"}/>
      </div>

    </div>
    <motion.div 
    initial={{opacity: 0,y:40}}
    transition={{duration:1}} 
    whileInView={{ opacity: 1, y: 0 }}
    className='Quiz w-full h-[5rem] flex justify-center mb-10'>
        <div className=' w-[60%] h-[90%] rounded-2xl flex items-center justify-between px-4 bg-gradient-to-l from-violet-600    to-violet-900 border-2'>
              <div className='text-2xl font-bold'>Not Sure? Take Quiz Here -</div>
              <button
              disabled
              className='w-[10rem] bg-white text-violet-700 px-4 py-3 font-[500] cursor-pointer  rounded-md hover:bg-violet-700 hover:text-white hover:shadow-[0_0_10px] hover:font-semibold hover:shadow-black shadow-[1px_1px_10px] shadow-violet-200 hover-anime disabled:opacity-50 disabled:cursor-not-allowed'>
               Coming Soon
              </button>
        </div>
    </motion.div>
    <TestomonyScroll/>

    </>
  )
}

export default HomePage