import {
    motion,
    useMotionValue,
} from "motion/react"
import { useEffect, useRef } from "react";
import TestomonyCard from "./TestomonyCard";

const leftInset = `20%`
const rightInset = `80%`
const transparent = `#0000`
const opaque = `#000`


const TestomonyScroll = () => {
  const ref = useRef(null)
  const maskImage = useMotionValue('')

    useEffect(() => {
      const el = ref.current
      if (!el) return

      const updateMask = () => {
        const maxScroll = el.scrollWidth - el.clientWidth
        const scrollLeft = el.scrollLeft
        const scrollProgress = scrollLeft / maxScroll

        let gradient = ''

        if (scrollProgress <= 0.01) {
          gradient = `linear-gradient(90deg, ${opaque}, ${opaque} ${rightInset}, ${transparent})`
        } else if (scrollProgress >= 0.99) {
          gradient = `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque})`
        } else {
          gradient = `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
        }

        maskImage.set(gradient)
      }

    el.addEventListener('scroll', updateMask)
    updateMask() // initial render

    return () => el.removeEventListener('scroll', updateMask)
  }, [])

  return (
    <motion.div 
    initial={{opacity: 0,y:40}}
    transition={{duration:1,delay:.5}} 
    whileInView={{ opacity: 1, y: 0 }}
    className='w-full h-[25rem] testomony flex justify-center overflow-hidden'>
      <div className='w-[90%] h-[95%] border-2 flex flex-col justify-center items-start px-10 rounded-2xl bg-violet-600/20 overflow-hidden'>
      <div className=" text-3xl font-bold tracking-wide font-inter">Testmony</div>
        <motion.ul 
        initial={{scrollProgress: 1}}
        transition={{duration:1}} 
        whileInView={{scrollProgress: 1}}
          ref={ref}
          className='w-full h-[85%] overflow-x-auto flex-nowrap flex items-center gap-10 scroll-smooth scrollbar-hide' 
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
          }}
        >
          <TestomonyCard />
          <TestomonyCard />
          <TestomonyCard />
          <TestomonyCard />
          <TestomonyCard />
          <TestomonyCard />
          <TestomonyCard />
          <TestomonyCard />
        </motion.ul>
      </div>
    </motion.div>
  )
}

export default TestomonyScroll