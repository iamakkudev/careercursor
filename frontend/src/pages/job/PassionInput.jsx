import { CornerDownLeft, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useJoblistStore} from '../../store/joblistStore.js'
import InterestList from "../../components/InterestList.jsx";

const PassionInput = () => {
  const [input, setInput] = useState("");   // controlled input
  const [interest, setInterest] = useState([]); // start empty array
  const { getPassionJoblist } = useJoblistStore();

  const navigate = useNavigate();


  const addData = (e) => {
    e.preventDefault();
    if (input.trim() === "" || interest.length == 10) return; // ignore empty input
    setInterest((prev) => [...prev, input.trim()]);
    setInput(""); // clear input
  };

  const removeInterest = (index) => {
    setInterest((prev) => prev.filter((_, i) => i !== index));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (interest.length === 0) return alert("Please add at least one interest!");
    
    navigate(`/joblist?q=passion`);
    await getPassionJoblist(interest);
    };
  return (
    <div className="w-full min-h-screen my-4 pt-8 flex flex-col items-center">
      <div className="text-6xl w-[40%] leading-20 text-center font-bold mb-6 opacity-95">
        Choose a job you love, and you will never have to work a day in your life
      </div>

      {/* Render selected interests */}
      <InterestList removeInterest={removeInterest} interest={interest} />
      {/* Input */}
      <form onSubmit={addData} className="w-full flex flex-col items-center gap-10">
      <div className="relative mt-6 w-[70%]">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <User className="size-10 text-violet-600/70 z-30" />
        </div>
        
          <input
            type="text"
            placeholder="Please Enter Your interest!"
            value={input}
            className="w-full z-0 pl-15 pr-6 py-6 font-normal text-violet-900/80 text-xl bg-white shadow-[0px_0px_20px] shadow-white/50 border-violet-900 rounded-full border-2 focus:backdrop-blur-md focus:bg-violet-950/20 focus:border-white focus:text-white/80 focus:placeholder:text-white/75 focus:shadow-violet-500/70 focus:outline-none placeholder-violet-950/75 transition duration-400"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
          onClick={addData}
          className="absolute inset-y-3 right-4 flex items-center px-6 bg-violet-700 rounded-2xl shadow-[0px_0px_10px] shadow-violet-900/70 active:bg-violet-800"
          ><CornerDownLeft /></button>
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

          <button
            type="button"
            onClick={() => setInterest([])}
            disabled={interest.length === 0}
            className={`w-[10rem] px-4 py-2 rounded-md text-center border-2 font-semibold
              ${interest.length === 0 
                ? "cursor-not-allowed opacity-50" 
                : "cursor-pointer hover:bg-red-500/90 hover:text-white hover:shadow-[0_0_10px] hover:font-bold hover:shadow-black hover:border-red-500/90 hover-anime"}`}
          >
            Clear all
          </button>
        </div>
      </form>
    </div>
   
  );
};

export default PassionInput;
