import { motion, useSpring, useInView } from "framer-motion"
import { useRef, useState } from "react"

interface ImageItem {
  key: string,
  title: string,
  tags: string,
  img: string
}

const Projects = () => {
  const projectArr: ImageItem[] = [
    {
      key: "rspca-vic",
      title: "RSPCA Victoria",
      tags: "Wordpress, Salient, Bootstrap, JavaScript",
      img: 'https://images.unsplash.com/photo-1682806816936-c3ac11f65112?q=80&w=1274&auto=format&fit=crop',
    },
    {
      key: "cherrys-goods",
      title: "Cherry's Goods",
      tags: "Shopify, Javascript, web design",
      img: 'https://images.unsplash.com/photo-1681063762354-d542c03bbfc5?q=80&w=1274&auto=format&fit=crop',
    },
    {
      key: "documentary-australia",
      title: "Documentary Australia",
      tags: "Symfony, Salesforce, Xero, MySql",
      img: 'https://images.unsplash.com/photo-1681063762354-d542c03bbfc5?q=80&w=1274&auto=format&fit=crop',
    },
    {
      key: "dejamarc-platform",
      title: "Dejamarc Platform",
      tags: "Symfony, Shopify, Dropbox, EasyAdmin",
      img: 'https://images.unsplash.com/photo-1682806816936-c3ac11f65112?q=80&w=1274&auto=format&fit=crop',
    },
    {
      key: "ios-flight-app",
      title: "IOS Flight App",
      tags: "IOS, Swift, Firebase, Xcode",
      img: 'https://images.unsplash.com/photo-1682806816936-c3ac11f65112?q=80&w=1274&auto=format&fit=crop',
    },
  ]

  const [img, setImg] = useState<{src: string, alt: string, opacity: number}>({
    src: '',
    alt: '',
    opacity: 0
  });

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const spring = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };

  const imagePos = {
    x: useSpring(0, spring),
    y: useSpring(0, spring),
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const relativeX = clientX - containerRect.x;
    const relativeY = clientY - containerRect.y;
  }

  const handleImageInteraction = (item: ImageItem, opacity: number) => {
    setImg({ src: item.img, alt: item.title, opacity });
  };

  // Handle title
  const title = "Projects"

  const titleParentMotion = {
    initial: {
      y: '0',
    },
    show: {
      transition: {
        staggerChildren: .5,
        when: "afterChildren",
      },
    }
  }

  const titleMotion = {
    initial: {
      y: '-100%',
    },
    show: {
      y: '0',
      transition: {
        type: 'spring',
        stiffness: 30,
        origin: 1,
        duration: 2.5,
      }
    }
  }

  return (
    <>
      <section id="projects" className="section z-10 w-full flex flex-col">
        
        <div className='overflow-hidden relative'>
          <div className='container mx-auto'>
            <div className='grid grid-flow-row'>

              <div className='py-12 flex flex-col md:flex-row justify-between'>
                <div className='flex mb-4 md:mb-0 m-auto relative'>
                  <motion.h4 className='text-9xl font-bold relative'
                    variants={titleParentMotion}
                    initial="initial"
                    whileInView="show" 
                    viewport={{ margin: '-2000px', once: true }}
                  >
                    {
                      title.split("").map(item => (
                        <motion.span
                          className="relative inline-block"
                          variants={titleMotion}
                          initial="initial"
                          animate="show">{item}
                        </motion.span>)
                      )
                    }
                  </motion.h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="project-list z-10 relative container mx-auto"  ref={containerRef} onMouseMove={handleMove}>

          {projectArr.map((item, index) => {
            return (
              <div   
                onMouseEnter={() => handleImageInteraction(item, 1)}
                onMouseMove={() => handleImageInteraction(item, 1)}
                onMouseLeave={() => handleImageInteraction(item, 0)}
                className="group"
              >
                <ProjectRow 
                  key={index} 
                  el={item} 
                  index={index + 1} 
                />
              </div>
            )
          })}

          <motion.img
            ref={imageRef}
            src={img.src}
            alt={img.alt}
            className='w-[300px] h-[220px] fixed z-20 block rounded-lg object-cover bottom-16 right-16 transition-opacity duration-200 ease-in-out pointer-events-none'
            style={{
              x: imagePos.x,
              y: imagePos.y,
              opacity: img.opacity,
            }}
          />
          
        </div>
      </section>
    </>
  )
}

export const ProjectRow = ({el, index}: {el: ImageItem, index: number}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "3000px 0px 0px 0px",
    amount: "all",
    once: true,
    // root: ref
  })

  const tags = el!.tags.split(",")

  return (
    <>
      <div className='project-row overflow-hidden relative transition-all duration-500 cursor-pointer after:bg-[#060200] after:duration-300 after:-z-[1] after:h-full after:w-full after:block after:absolute after:translate-y-0 group-hover:after:-translate-y-full group-hover:text-[#f7f2e4]' ref={ref}>        
        <a href={`/projects/${el.key}`} key={el.key}>
          <div className='grid grid-flow-row'>
            <div className='py-10 px-8 flex flex-col md:flex-row justify-between gap-4'>

              {/* Project Title */}
              <div className='flex' style={{
                opacity: isInView ? 1 : 0,
                transition: 'opacity .5s',
              }}>
                <h2 className='text-3xl tracking-normal uppercase font-bold'>
                  {el.title.split("").map((char: string) => (
                    <span>{char}</span>
                  ))}
                </h2>
              </div>

              {/* Project Tags */}
              <div className='badges flex flex-wrap' style={{
                opacity: isInView ? 1 : 0,
                transition: 'opacity 1s',
              }}>
                {tags.map((e) => {
                    return <div key={e} className='bg-zinc-900 text-[#FFF2D8] capitalize text-[12px] leading-8 tracking-wide font-bold me-2 mb-2 px-4 rounded-full duration-500 project-badge group-hover:bg-[#f7f2e4] group-hover:text-zinc-900'>{e}</div>
                })}
              </div>
              
            </div>
          </div>

          <hr className="project-line h-[2px] my-0 bg-zinc-900 border-0" style={{
            transform: isInView ? "translateX(0)" : "translateX(-100vw)", 
            transition: "all 1.8s",
          }}/> 
        </a>
      </div>
    </>
  )
}

export default Projects