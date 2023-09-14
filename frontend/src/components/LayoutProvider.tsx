'use client'
import {ConfigProvider, message} from 'antd'
import { usePathname } from 'next/navigation'
import {useState , useEffect, useReducer} from 'react'
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
function LayoutProvider({children}:{children:React.ReactNode}) {
  const router = useRouter()
  const {currentUser} = useSelector((state:any)=>state.users)
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null);

  const [isSidebarExpanded , setIsSidebarExpanded] = useState(true)
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
      const res = await fetch("http://localhost:5000/api/users/me" , {
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
      // await axios.post('/api/users/logout')
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
    <html lang="en">
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
        {pathname === "/login" || pathname === "/register" || path.startsWith("/test") ? <div>{children}</div> : 
        (
          <div className='layout-parent'>
            <div className={`sidebar ${isSidebarExpanded ? "w-1/6":"w-20"}`}>
              <div className='logo'>
                {isSidebarExpanded && <div className='flex justify-center items-center '><Image className='image' src={require('/public/ICL.PNG')} alt='logo' width={70} height={50}></Image><span className='text-2xl text-white font-bold md'>InterCollab</span></div>}
                {!isSidebarExpanded && <i className='ri-menu-2-line ml-3' onClick={()=>setIsSidebarExpanded(!isSidebarExpanded)}></i>}
                {isSidebarExpanded && <i className='ri-close-line font-extrabold' onClick={()=>setIsSidebarExpanded(!isSidebarExpanded)}></i>}
                
                
              </div>
              <div className='menu-items '>
                {menuItems.map((item , index)=>{
                  const isActive = pathname === item.path
                  return(
                  <div style={{justifyContent:isSidebarExpanded?'start':"center"}} className={`menu-item ${isActive ? "active-menu-item" : ""}`} key={index} onClick={()=>{
               
                    router.push(item.path)}}>
                    <i className={item.icon}></i>
                    <span>
                      {isSidebarExpanded && item.name}
                    </span>
                  </div>
                )})}
                <div style={{justifyContent:isSidebarExpanded?'start':"center"}} className='menu-item' onClick={openModal}>
               <i className={'ri-coin-line'}></i>
               <span>
                 {isSidebarExpanded && "Coins"}
               </span>
             </div>
              </div>
            
              <div className='user-info flex gap-1 items-center'>
               { isSidebarExpanded &&
                <span className=''>
                  <Image className='img mr-1 mb-2' src={(`http://localhost:5000/images/${currentUser?.profile_picture}`)} alt='logo' width={1000} height={500}>
                  </Image>
                </span>}
                {isSidebarExpanded && 
                <div className='flex flex-col'>
                  
                  <span className='text-base'>
                    {currentUser?.name}
                  </span>
                  
                  <span className='text-base mb-3'>
                    {currentUser?.email}
                  </span>
                </div>
                }
                <i onClick={onLogout} className='ri-logout-box-r-line mb-1'></i>
              </div>
            </div>
            <div className="body">
              {children}
            </div>
          </div>
        )}
         <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Coins Modal"
      ariaHideApp={false}
      className={'modal'}
    >
      <h2>Get Coins</h2>
      <div className='flex justify-center items-center gap-4'>
        <div
          data-id={1}
          className={`bundle hover:cursor-pointer ${
            selectedBundle === 1 ? 'selected-bundle' : ''
          }`}
          onClick={() => handleBundleClick(1)} 
        >
          <p className='w-3/4 ml-7 mt-5 hover:cursor-pointer'>
            100 coins for 1.29$
          </p>
        </div>
        <div
          data-id={2}
          className={`bundle hover:cursor-pointer ${
            selectedBundle === 2 ? 'selected-bundle' : ''
          }`}
          onClick={() => handleBundleClick(2)} 
        >
          <p className='w-3/4 ml-7 mt-5 '>500 coins for 5.55$</p>
        </div>
        <div
          data-id={3}
          className={`bundle hover:cursor-pointer ${
            selectedBundle === 3 ? 'selected-bundle' : ''
          }`}
          onClick={() => handleBundleClick(3)} 
        >
          <p className='w-3/4 ml-7 mt-5 '>1000 coins for 10.00$</p>
        </div>
      </div>
      <button onClick={processCheckout} className='p-1 h-10 bg-white my-4'>Checkout</button>
    </Modal>
      </ConfigProvider>
    </body>
  </html>
  )
}

export default LayoutProvider
