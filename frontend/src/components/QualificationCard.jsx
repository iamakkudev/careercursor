import { motion, AnimatePresence } from "framer-motion";

const QualificationCard = ({ql,handleClick,qualify,setQualify,isOpen}) => {
  return (
    <div
          onClick={() => handleClick(ql)}
          className={`w-[90%] ${
            isOpen(ql) ? "bg-violet-900" : "bg-violet-900/70"
          } py-4 px-2 tracking-wider cursor-pointer rounded-2xl`}
        >
          <div className="font-semibold text-2xl">{ql === "ug"? "UnderGraduate":ql==="pg"? "PostGraduate":"Additional Education"}</div>
          {!isOpen(ql) && <div className="font-mono opacity-80">{qualify[ql]}</div>}

          <AnimatePresence initial={false}>
            {isOpen(ql) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden font-mono"
              >
                <div className="pt-4 px-4">
                <input type="text" 
                value={qualify[ql]}
                onClick={(e) => e.stopPropagation()}
                onChange={(e)=> setQualify({...qualify, [ql]:e.target.value})}
                placeholder={`Enter Your ${ql==="ad"? "Detail":"Degree"}`}
                className="py-2 pl-4 pr-8 text-xl bg-white border-none placeholder:text-gray-700 outline-none focus:shadow-[0_0_10px] shadow-white text-black rounded-md hover-anime"
                />
                <div className=" text-white/70 mt-2">{ql==="ug" ? 'Ex:-"Bsc with mathatics"':""}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
  )
}

export default QualificationCard