import { motion } from "framer-motion"
import { useEffect, useState } from 'react'

const Cursor = () => {
	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
	})

	useEffect(() => {
		const mouseMove = (e: MouseEvent) => {
			// console.log(target)
			setMousePosition({
				x: e.clientX,
				y: e.clientY,
			})
		}

		window.addEventListener("mousemove", mouseMove)

		return () => {
			window.removeEventListener("mousemove", mouseMove)
		}
	}, [])

	const variants = {
		default: {
			x: mousePosition.x,
			y: mousePosition.y,
		}
	}

  return (
    <>
      <motion.div 
        className='cursor bg-black outline outline-800 outline-offset-[1em] dark:bg-white dark:outline-white transition-colors duration-700 ease'
        variants={variants}	
        animate="default"
        transition={{  ease: "backOut" }}
      />
    </>
  )
}

export default Cursor