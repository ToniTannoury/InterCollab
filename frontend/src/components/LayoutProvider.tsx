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
  const [menuItems , setMenuItems] = useState([
    {
      name:'Home',
      path:'/',
      icon:"ri-home-7-line"
    },
    {
      name:'Profile',
      path:'/profile',
      icon:"ri-shield-user-line"
    },
    {
      name:'Interactive Rooms',
      path:'/rooms',
      icon:"ri-file-list-2-line"
    },
    {
      name:'Followings',
      path:'/followings',
      icon:"ri-user-line"
    },
  ])
  const dispatch = useDispatch()
  const pathname = usePathname()
  const getCurrentUser = async()=>{
    try {
      dispatch(setLoading(true))
      const res = await fetch("http://16.171.116.7:5000/api/users/me" , {
        headers:{
          "Authorization" : `Bearer ${Cookie.get('token')}`
        }
      })
      const data = await res.json()   
      dispatch(setCurrentUser(data))
    } catch (error:any) {
      message.error(error.message.data?.message || "Something went left")
    }finally{
      dispatch(setLoading(false))
    }
  }
  useEffect(()=>{
    if(pathname !== '/login' && pathname !== "/register" && !currentUser){
      getCurrentUser()
    }
  },[pathname])
  const onLogout = async ()=>{
    try {
      dispatch(setLoading(true))
      message.success("Logged out successfully")
      dispatch(setCurrentUser(null))
      Cookie.set('token' , '')
      router.push('/login')
    } catch (error:any) {
      message.error(error.response.data?.message || "Something went left")
    }finally{
      dispatch(setLoading(false))
    }
  }



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