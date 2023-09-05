'use client'
import image1 from '../../public/1.jpg'
import image2 from '../../public/2.jpg'
import image3 from '../../public/3.jpg'
import image4 from '../../public/4.jpg'
import image5 from '../../public/5.jpg'
import image6 from '../../public/6.jpg'
import image7 from '../../public/7.jpg'
import "../stylesheets/carousel.css"
import {motion} from 'framer-motion'
import { useRef , useEffect , useState} from 'react'

function Carousel() {
  const [width  , setWidth] = useState<number>(0)
  const carousel:any = useRef()
  const images = [image1 , image2 , image3 , image4 , image5 , image6]
  console.log(images)
  useEffect(()=>{
    console.log(carousel)
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  },[])
  return (
    <motion.div ref={carousel} className='carousel'>
      <motion.div drag="x" dragConstraints={{right:0 , left:-width}} whileTap={{cursor:'grabbing'}}className='inner-carousel'>
        {images.map((image , index)=>{
          return(
            <motion.div className='item' key={index}>
              <img src={image.src} alt="img" />
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default Carousel
