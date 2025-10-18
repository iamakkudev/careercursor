import { User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomInput = () => {
  const [input, setInput] = useState(""); // controlled input
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    try {
      await getJobRoadmap(input.trim());
      navigate("/roadmap");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="w-full min-h-screen my-4 pt-8 flex flex-col items-center">
      <div className="text-5xl md:text-6xl w-[80%] md:w-[40%] mb-20 leading-20 text-center font-bold opacity-95">
        Get the Roadmap for the Job YOU WANT!
      </div>

    
      {/* Input */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-10">
      <div className="relative mt-6 w-[90%] md:w-[70%]">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <User className="size-10 text-violet-600/70 z-30" />
        </div>
        
          <input
            type="text"
            placeholder="Please Enter The Job!"
            value={input}
            className="w-full z-0 pl-15 pr-6 py-6 font-normal text-violet-900/80 text-xl bg-white shadow-[0px_0px_20px] shadow-white/50 border-violet-900 rounded-full border-2 focus:backdrop-blur-md focus:bg-violet-950/20 focus:border-white focus:text-white/80 focus:placeholder:text-white/75 focus:shadow-violet-500/70 focus:outline-none placeholder-violet-950/75 transition duration-400"
            onChange={(e) => setInput(e.target.value)}
            required
          />
      </div>
        <div
          className="flex gap-10"
          >
          <button
          onClick={handleSubmit}
          className='w-[10rem] bg-white px-4 cursor-pointer py-2 rounded-md text-center font-semibold text-violet-700  hover:bg-violet-700 hover:text-white hover:shadow-[0_0_10px] hover:font-bold hover:shadow-black hover-anime'
          >
            Submit
          </button>

         
        </div>
      </form>
    </div>
  )
}

export default CustomInput