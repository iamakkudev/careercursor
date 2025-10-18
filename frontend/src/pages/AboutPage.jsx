import { motion } from "motion/react";

const AboutPage = () => {
  const services = [
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae eligendi deserunt facere.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, temporibus.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia obcaecati nisi iusto est voluptates nemo."
  ];

  return (
    <main className="w-full min-h-screen px-6 sm:px-28 my-6 flex flex-col gap-10 items-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-3xl font-bold"
      >
        About
      </motion.h1>

      <motion.section
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full border-2 rounded-2xl px-6 sm:px-10 py-8 bg-gradient-to-t from-violet-950/70 to-violet-700"
      >
        <h2 className="text-2xl font-bold mb-8">Services</h2>
        <div className="flex flex-col gap-10">
          {services.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="rounded-2xl px-6 sm:px-10 py-6 text-lg sm:text-xl font-light tracking-wide bg-white/90 text-violet-800"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full px-6 rounded-2xl py-8 bg-white/95 text-violet-700 shadow-[0_0_10px] shadow-black"
      >
        <h2 className="text-2xl font-bold mb-6">Why Trust Us</h2>
        <p className="text-lg sm:text-2xl tracking-wide font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt temporibus
          voluptatem eaque unde numquam veritatis, fuga debitis error odio dolor obcaecati.
        </p>
      </motion.section>
    </main>
  );
};

export default AboutPage;
