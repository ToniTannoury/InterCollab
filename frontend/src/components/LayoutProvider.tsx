'use client'
import {ConfigProvider, message} from 'antd'
import { usePathname } from 'next/navigation'
import {useState , useEffect, useReducer, useContext} from 'react'
import {useRouter} from 'next/navigation'
import "../stylesheets/layout.css"
import Image from 'next/image'
import { useDispatch , useSelector } from 'react-redux'
import { setCurrentUser } from '@/redux/usersSlice'
import Loader from './Loader'
import { setLoading } from '@/redux/loadersSlice'
import Cookie from 'js-cookie'
import { removeOtherPeersAction } from '@/context/peerActions'
import { peersReducer } from '@/context/peerReducer'
import Modal from 'react-modal';
import { RoomContext } from '@/context/RoomContext'
import RoomInfoModal from './RoomInfoModal'
function LayoutProvider({children}:{children:React.ReactNode}) {
  const router = useRouter()
  const {currentUser} = useSelector((state:any)=>state.users)
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null);
  const {isRating, setIsRating} = useContext(RoomContext)
  const [isSidebarExpanded , setIsSidebarExpanded] = useState(true)
  const [rating, setRating] = useState<number>(0);
  const {loading} = useSelector((state:any)=>state.loaders)
  const [peers , dispatching] = useReducer(peersReducer , {})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBundleClick = (dataId: number) => {
    setSelectedBundle(dataId);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleStarClick = (index:number) => {
    setRating(index + 1);
  };
  const path  = usePathname()



  return (
    <>
      <head>
      <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet"/>
      </head>
    <body>
      <ConfigProvider 
      theme={{
        token:{
          colorPrimary:'#213555'
        }
      }}>
        {loading && <Loader/>}
        {pathname === "/login" || pathname === "/register"||pathname === "/adminPanel" || path.startsWith("/test") ? <div>{children}</div> : 
        (
          
        )}
         
   
      </ConfigProvider>
      <RoomInfoModal/>
    </body>
  </>
  )
}
export default LayoutProvider