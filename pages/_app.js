//FADE IN AND FADE OUT
import "@/styles/globals.css";
import { motion } from "framer-motion";

export default function App({ Component, pageProps, router }) {
  const variants = {
    hidden: { opacity: 0 }, // New page starts off as invisible
    enter: { opacity: 1 }, // New page fades in
    exit: { opacity: 0 }, // Old page fades out
  };
  return (
    <motion.div
      key={router.route} // Unique key for each page
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: "linear", duration: 1.2 }} // Adjust the duration as needed
    >
      <Component {...pageProps} />
    </motion.div>
  );
}
