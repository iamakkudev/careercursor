import { CornerDownLeft, User } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useJoblistStore } from '../../store/joblistStore.js';
import InterestList from "../../components/InterestList.jsx";

const PassionInput = () => {
  const [input, setInput] = useState("");
  const [interest, setInterest] = useState([]);
  const inputRef = useRef(null);
  const { getPassionJoblist } = useJoblistStore();
  const navigate = useNavigate();

  const addData = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();

    if (!trimmedInput) return alert("Please enter a valid interest!");
    if (interest.length >= 10) return alert("You can only add up to 10 interests!");
    if (interest.includes(trimmedInput)) return alert("This interest is already added!");

    setInterest((prev) => [...prev, trimmedInput]);
    setInput("");
    inputRef.current.focus(); // keep focus after adding
  };

  const removeInterest = (index) => {
    setInterest((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (interest.length === 0) return alert("Please add at least one interest!");

    try {
      navigate(`/joblist?q=passion`);
      await getPassionJoblist(interest); // fetch first
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  const clearAll = () => setInterest([]);

  return (
    <div className="w-full min-h-screen my-4 pt-8 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl w-[80%] md:w-[40%] text-center font-bold leading-15 mb-6 opacity-95">
        Choose a job you love, and you will never have to work a day in your life
      </h1>

      {/* Selected Interests */}
      <InterestList removeInterest={removeInterest} interest={interest} />

      {/* Input */}
      <form onSubmit={addData} className="w-full flex flex-col items-center gap-6 mt-6">
        <div className="relative w-[80%] md:w-[60%] group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <User className="text-violet-600/70 z-10" />
          </div>

          <input
            type="text"
            placeholder="Enter your interest..."
            value={input}
            ref={inputRef}
            className="w-full pl-12 pr-16 py-4 text-xl text-violet-900/80 bg-white shadow-[0px_0px_20px] shadow-white/50 border-violet-900 rounded-full border-2 focus:backdrop-blur-md focus:bg-violet-950/20 focus:border-white focus:text-white/80 focus:placeholder:text-white/75 focus:shadow-violet-500/70 focus:outline-none transition duration-300"
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer bg-violet-700 border-2 border-violet-900 rounded-r-4xl md:shadow-[0px_0px_10px] shadow-violet-900/70 active:bg-violet-800 group-focus-within:border-white"
          >
            <CornerDownLeft />
          </button>
        </div>

        {/* Submit + Clear Buttons */}
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-[10rem] bg-white px-4 py-2 rounded-md text-center font-semibold text-violet-700 hover:bg-violet-700 hover:text-white hover:shadow-[0_0_10px] hover:font-bold hover:shadow-black transition-all"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={clearAll}
            disabled={interest.length === 0}
            className={`w-[10rem] px-4 py-2 rounded-md text-center border-2 font-semibold ${
              interest.length === 0
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-red-500/90 hover:text-white hover:shadow-[0_0_10px] hover:font-bold hover:shadow-black hover:border-red-500/90 transition-all"
            }`}
          >
            Clear All
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {interest.length}/10 interests added
        </p>
      </form>
    </div>
  );
};

export default PassionInput;
