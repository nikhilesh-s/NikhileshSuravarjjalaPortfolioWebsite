import { motion } from "framer-motion";
import { FC } from "react";
import { staggerContainer } from "./motion";
import { styles } from "../styles/index";

export const SectionWrapper = (Component: FC, idName: string) => 
function HOC() {
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
    >
      <span className="hash-span" id={idName}>
        &nbsp;
      </span>
      <Component />
    </motion.section>
  );
};
