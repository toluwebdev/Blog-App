import React from "react";
import { motion } from "framer-motion";
const Newsleter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 150 }}
      transition={{ duration: 1.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center text-center space-y-2 my-32"
    >
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog</h1>

      <p className="md:text-lg text-gray-500/70 pb-8">
        Subscibe to get the latest blog, new tech, and exclusive news.
      </p>
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12 px-5">
        <input
          className="border  border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </motion.div>
  );
};

export default Newsleter;
