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
        const body = document.body;
        const isInverted: boolean = scrollYProgress.get() > 0;

        const handleScroll = () => {
            const currentInverted: boolean = scrollYProgress.get() > 0;
            if (currentInverted != isInverted) {
                body.setAttribute('data-theme', 'vintage-one')
            } else {
                body.removeAttribute('data-theme');
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
            <div className='py-72 px-8 relative text-center mx-auto max-w-5xl'>
                {items.map((value, index) => (
                    <Linetext text={`${value}`} key={index} />
                ))}
            </div>
        </section>
    )
}

export default About

const Linetext: React.FC<{text: string}> = ({ text }: { text: string }) => {
    const boldItems = [
        'applications',
        'middleware',
        'solutions.'
    ]

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

    const htmlString = text.split(" ");

    // Add motion variants
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    }

    return (
        <div className="d-block relative text-start" ref={ref}>
            <motion.h2 variants={container} initial="hidden" whileInView="show" viewport={{ margin: '-300px', once: true }} className="h2 text-4xl font-medium leading-tight text-center block">
                { htmlString.map((value, index) => (
                    <span key={index} className={boldItems.includes(value) ? `font-bold` : ''}>{parse(value)} </span>
                ))}
            </motion.h2>
            <motion.div 
                className="line-mask flex"
                style={{ scaleX }}
                >
            </motion.div>
        </div>
    )
}