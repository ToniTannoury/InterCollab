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
import { useDispatch , useSelector } from 'react-redux'
import { setSearching } from '@/redux/searchingSlice'
import RoomCard from './RoomCard'
function Carousel({rooms , home}:any) {
  const dispatch = useDispatch();
  const [width, setWidth] = useState<number>(0);
  const { searching } = useSelector((state: any) => state.searching);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const carousel: any = useRef();
  const images = [image1, image2, image3, image4, image5, image6];

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  return (
    <>
      <motion.div ref={carousel} className={`carousel relative -z-3 ${searching && 'app'}`}>
        <motion.div drag={searching ? "undefined" : 'x'} dragConstraints={{ right: 0, left: -width }} whileTap={{ cursor: 'grabbing' }} className='inner-carousel gap-2'>
          {rooms?.map((room:any, index:number) => {
            return (
              <motion.div
                className='item'
                key={index}
                onMouseEnter={() => handleMouseEnter(index)} // Add mouse enter event handler
              >
                
                <RoomCard room={room}/>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
      <div className='flex gap-4 justify-center items-center mt-3'>
        {home && rooms.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 border-ICblue border-2 rounded-3xl ${hoveredIndex === index ? 'bg-ICblue' : ''}`}
          ></div>
        ))}
      </div>
    </>
  );
}

export default Carousel;

