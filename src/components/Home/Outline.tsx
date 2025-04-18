import { motion } from 'framer-motion';

type Props = {}

const Outline = (props: Props) => {
  return (
    <>
    <motion.div
      key="outline"
      variants={{
        initial:{ 
          borderWidth: 0, 
          transition: { duration: 1 },
        },
        animate: { 
          borderWidth: 36, 
          transition: { duration: 1, ease: "easeInOut", delay: 2 },
        },
      }}
      initial="initial"
      animate="animate"
      className="border-[36px] border-[#060200] dark:border-[#FFF2D8] top-0 left-0 w-full h-screen fixed z-30 pointer-events-none">
      </motion.div>
    </>
  )
}

export default Outline