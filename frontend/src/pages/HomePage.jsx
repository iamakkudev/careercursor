import { Link } from "react-router-dom";
import { motion } from "motion/react";
import CardOption from "../components/HomepageComponents/CardOption";
import TestomonyScroll from "../components/HomepageComponents/TestomonyScroll";

const HomePage = () => {
  const cards = [
    {
      title: "Find The Career You Love",
      desc: "Explore personalized job matches based on your interests and strengths.",
      button: "Passionate Job",
      route: "passion",
      delay: 1.8,
    },
    {
      title: "Find The Career That Matches Your Qualification",
      desc: "Discover roles that align perfectly with your educational background.",
      button: "Qualified Job",
      route: "qualify",
      delay: 2.0,
    },
    {
      title: "Create Your Own Custom Roadmap",
      desc: "Design a tailored roadmap to achieve your unique career goals.",
      button: "Create",
      route: "custom",
      delay: 2.2,
    },
  ];

  return (
    <>
      {/* HERO */}
      <div className="hero w-full min-h-screen flex flex-col justify-start relative px-6 sm:px-10 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-[95%] md:w-[90%] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between bg-gradient-to-bl from-violet-300/50 via-violet-600/80 to-violet-900/80 rounded-2xl"
        >
          {/* LEFT */}
          <div className="md:w-1/2 h-full flex flex-col items-center md:items-start">
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-4xl md:text-5xl leading-tight font-bold mb-4 text-violet-50"
            >
              Shape Your Future With Career Cursor
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="text-lg md:text-xl font-light italic text-violet-100 md:pr-10"
            >
              Discover your path, plan your journey, and reach your career goals —
              all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="mt-10"
            >
              <Link
                to="/passion"
                className="w-[10rem] bg-white text-violet-700 px-4 py-3 font-medium rounded-md hover:bg-violet-700 hover:text-white hover:shadow-[0_0_10px] hover:font-semibold hover:shadow-black transition-all"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="md:w-[40%] w-full h-full flex justify-center mt-8 md:mt-0">
            <img
              src="/img5.png"
              alt="Hero"
              loading="lazy"
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* CARDS */}
        <div className="w-full flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 md:gap-14 mt-16">
          {cards.map((c, i) => (
            <CardOption key={i} {...c} time={c.delay} />
          ))}
        </div>
      </div>

      {/* QUIZ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="Quiz w-full flex justify-center mb-10"
      >
        <div className="w-[90%] sm:w-[80%] md:w-[60%] rounded-2xl flex flex-col sm:flex-row items-center justify-between px-4 py-4 bg-gradient-to-l from-violet-600 to-violet-900 border-2 text-white">
          <div className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">
            Not Sure? Take Quiz Here —
          </div>
          <button
            disabled
            className="w-[10rem] bg-white text-violet-700 px-4 py-3 font-medium rounded-md shadow hover:bg-violet-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Coming Soon
          </button>
        </div>
      </motion.div>

      <TestomonyScroll />
    </>
  );
};

export default HomePage;
