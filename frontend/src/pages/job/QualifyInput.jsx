import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QualificationCard from "../../components/QualificationCard";
import { X } from "lucide-react";

const QualifyInput = () => {
  const [open, setOpen] = useState({
    iliterate: true,
    openBox: "", // can be "basic", "ug", "pg", "ad"
  });
  const [submit, setSubmit] = useState(false)
  const [validate, setValidate] = useState(false)
  const [qualify,setQualify] = useState({
    basic:{
      sec:"",ssec:""
    },
    ug:"",
    pg:"",
    ad:""

  })

  let arr = [];

  // helper function to handle clicks
  const handleClick = (boxName) => {
    // if clicked on Illiterate
    if (boxName === "iliterate") {
      setOpen({ iliterate: true, openBox: "" });
      return;
    }

    // else toggle the selected box
    setOpen((prev) => ({
      iliterate: false,
      openBox: prev.openBox === boxName ? "" : boxName,
    }));
  };
  const handleSubmit = () =>{
  setSubmit(true);
  const allEmpty =
    !open.iliterate &&
    Object.values(qualify).every((q) =>
      typeof q === "string"
        ? q.trim() === ""
        : Object.values(q).every((v) => v.trim() === "")
    );

  setValidate(!allEmpty);


  arr = Object.values(qualify).flatMap((q) =>
    typeof q === "string"
      ? q.trim() !== "" ? [q.trim()] : []
      : Object.values(q).filter((v) => v.trim() !== "")
  );
    console.log(arr)
  }

  const isOpen = (box) => open.openBox === box;

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 h-fit flex justify-center">
      {/* ✅ MODAL OVERLAY */}
      {submit && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl z-50 flex justify-center items-center">
          <div className="bg-white text-black rounded-2xl shadow-xl w-[90%] max-w-[400px] text-center">
            <div>
              <X onClick={() => setSubmit(false)}  className=" ml-auto size-8 p-1 hover:bg-gray-700/40 rounded-tr-xl hover-anime"/>
            </div>
            { !validate ? 
            <div
            className="p-4 text-2xl "
            >Please Enter the Details</div>:
            <div className=" p-4">
              <div className="text-xl font-bold text-center  text-violet-800 mb-4">
                Confirm Your Qualification
              </div>
              

              {open.iliterate ?
              <div className="font-mono text-xl font-semibold">"Illiterate"</div>
              :
              <div className="ml-12 flex flex-col gap-4 items-start">
                <div><span className=" font-semibold text-violet-800">Basic : </span>{qualify.basic.sec ? `${qualify.basic.sec} ${qualify.basic.ssec && ` ,12th with ${qualify.basic.ssec}`}`: "NA" }</div>
                <div><span className=" font-semibold text-violet-800">UnderGraduate : </span>{qualify.ug ? `${qualify.ug}`: "NA" }</div>
                <div><span className=" font-semibold text-violet-800">PostGraduate : </span>{qualify.pg ? `${qualify.pg}`: "NA" }</div>
                <div><span className=" font-semibold text-violet-800">Additional Qualification : </span>{qualify.ad ? `${qualify.ad}`: "NA" }</div>
              </div>
              }
              <button
              onClick={() => setSubmit(false)}
              className="px-6 py-2 mt-4 bg-violet-700 text-white rounded-md hover:bg-violet-800 transition"
              >
              Confirm
            </button>
            </div>}
            
          </div>
        </div>
      )}
      <div className="w-full max-w-[650px] z-10 my-8 flex flex-col items-center p-4 gap-4 bg-white rounded-4xl">
        <div className="text-3xl font-bold  text-violet-800">
          Qualification
        </div>

        {/* ILLITERATE */}
        <div
          onClick={() => handleClick("iliterate")}
          className={`w-[90%] ${
            open.iliterate ? "bg-violet-900" : "bg-violet-900/70"
          } text-2xl py-4 px-2 font-semibold tracking-wider cursor-pointer rounded-2xl`}
        >
          Illiterate
        </div>

        {/* BASIC */}
        <div
          onClick={() => handleClick("basic")}
          className={`w-[90%] ${
            isOpen("basic") ? "bg-violet-900" : "bg-violet-900/70"
          } py-4 px-2 tracking-wider cursor-pointer rounded-2xl`}
        >
          <div className="font-semibold text-2xl">Basic</div>
          {!isOpen("basic") && <div className="font-mono opacity-80">{qualify.basic.sec} {qualify.basic.ssec && `,12 with ${qualify.basic.ssec}`}</div>}

          <AnimatePresence initial={false}>
            {isOpen("basic") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden font-mono"
              >
                <div className="pt-4 px-4">

                <div className=" flex gap-2 items-center mb-4"
                onClick={(e) => e.stopPropagation()}
                >
                  <input type="checkbox" 
                    className="checkbox checkbox-primary" 
                    id="pass"
                    checked={qualify.basic.sec === "10th"} // ✅ controlled checkbox
                    onChange={(e) =>
                      setQualify((prev) => ({
                        ...prev,
                        basic: {
                          ...prev.basic,
                          sec: e.target.checked ? "10th" : "", // ✅ toggle logic
                        },
                      }))
                    }

                   />
                  <label htmlFor="pass" className="text-xl font-semibold">10th</label>
                </div>

                <div>
                  <label htmlFor="" className=" block text-xl font-semibold">12th with</label>
                  <input type="text" 
                  value={qualify.basic.ssec}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e)=> setQualify(prev => ({ ...prev, basic: { ...prev.basic, ssec: e.target.value }  }))    }
                  placeholder="Enter Your Stream"
                  className="py-2 pl-4 pr-8  mb-4 mt-1 text-xl bg-white border-none placeholder:text-gray-700 text-black focus:shadow-[0_0_10px] shadow-white outline-none rounded-md"
                  />
                </div>
                </div>
                
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        { ["ug","pg","ad"].map((ql,idx)=>(<QualificationCard key={idx} ql={ql} qualify={qualify} setQualify={setQualify} isOpen={isOpen} handleClick={handleClick} />)) }

        <div>
          <button 
          onClick={handleSubmit}
          type="submit" className="bg-violet-600 py-2 self-end px-8 mt-6  bg-gradient-to-r from-violet-500 to-violet-900 text-white 
						font-bold rounded-lg shadow-lg hover:from-violet-600
						hover:to-violet-950 cursor-pointer  transition duration-200"
          >
            Submit
          </button>
          </div>
      </div>
    </div>
  );
};

export default QualifyInput;
