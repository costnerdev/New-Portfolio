import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import parse from 'html-react-parser'

const About: React.FC = () => {
    const ref : React.RefObject<null> = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start center', 'end end']
    })

    useEffect(() => {
        const root = document.documentElement;
        const isInverted: boolean = scrollYProgress.get() > 0;

        const handleScroll = () => {
            const currentInverted: boolean = scrollYProgress.get() > 0;
            if (currentInverted != isInverted) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollYProgress.get() > 0])

    const items = [
        "Full-stack developer focused on building web",
        "applications and middleware solutions. I enjoy",
        "exploring different technologies and continuously",
        "expanding my technical skills. Seeking new",
        "opportunities to work on meaningful projects that",
        "make an impact.",
    ]
    
  return (
    <section className='' ref={ref}>
        <div className='py-32 px-8 relative text-center mx-auto max-w-5xl'>
            {items.map((value, index) => (
                <Linetext text={`${value}`} key={index} />
            ))}
        </div>
    </section>
  )
}

export default About

const Linetext: React.FC<{text: string}> = ({ text }) => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end center", "start center"]
    })

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const htmlString = parse(text);

    return (
        <div className="d-block relative text-start" ref={ref}>
        <h2 className="h2 text-4xl font-medium leading-tight text-center">{htmlString}</h2>
        <motion.div 
            className="line-mask flex"
            style={{ scaleX }}
            >
        </motion.div>
        </div>
    )
}