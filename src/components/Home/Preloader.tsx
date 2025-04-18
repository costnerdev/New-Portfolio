import { motion, type Variants } from "framer-motion"

const Preloader = () => {
  const loadingCounter = {
    initial: {
      opacity: 1,
    },
    show: {
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.5,
        when: "afterChildren",
        delay: 2.5,
      },
      transitionEnd: { display: "none" }
    },
    exit: {
      opacity: 1,
    }
  }

  //Variants
  const container = {
    initial: {
      x: '0',
    },
    show: {
      display: 'none',
      transition: {
        staggerChildren: .3,
        delayChildren: 3.5,
        when: "afterChildren",
      },
    },
    exit: {
      display: 'none',
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        delayChildren: .5,
        when: "afterChildren",
      },
    }
  }

  const heroLines = {
    initial: {
      x: '0',
    },
    show: {
      x: '-100vw',
      transition: {
        type: 'spring',
        stiffness: 30,
        origin: 1,
        duration: 2.5,
      },
      transitionEnd: { display: "none" }
    },
    exit: {
      x: '0',
      transition: {
        type: 'spring',
        stiffness: 30,
        origin: 1,
        duration: 2.5,
      },
      transitionEnd: { display: "none" }
    }
  }
  
  return (
    <>
      <motion.div
        key="loadingText"
        className="z-50 text-black text-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold" variants={loadingCounter} 
        initial="initial"
        animate="show"
        exit="exit">
        <span>Transition in progress</span>
      </motion.div>

      <motion.div 
        key="preloader"
        className="hero__lines z-20 fixed top-0 left-0 w-full h-full"
        variants={container}
        initial="initial"
        animate="show"
        exit="exit"
        >
          <BlockLoader variant={heroLines} id="block-1" />
          <BlockLoader variant={heroLines} id="block-2" />
          <BlockLoader variant={heroLines} id="block-3" />
          <BlockLoader variant={heroLines} id="block-4" />
          <BlockLoader variant={heroLines} id="block-5" />
      </motion.div>
    </>
  )
}

export const BlockLoader = ({id, variant}: {
  id: string,
  variant: Variants
}) => {
  return (
    <motion.div className={`hero__line relative bg-white w-full hero-${id} text-white`}
      key={id}
      variants={variant}
      >
    </motion.div>
  )
}

export default Preloader