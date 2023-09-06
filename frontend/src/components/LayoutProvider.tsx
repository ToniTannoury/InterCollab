'use client'
import {ConfigProvider, message} from 'antd'
import { usePathname } from 'next/navigation'
import {useState , useEffect} from 'react'
import {useRouter} from 'next/navigation'
import "../stylesheets/layout.css"
import Image from 'next/image'
import { useDispatch , useSelector } from 'react-redux'
import { setCurrentUser } from '@/redux/usersSlice'
import Loader from './Loader'
import { setLoading } from '@/redux/loadersSlice'
import Cookie from 'js-cookie'
function LayoutProvider({children}:{children:React.ReactNode}) {
  const router = useRouter()
  const {currentUser} = useSelector((state:any)=>state.users)
  const [isSidebarExpanded , setIsSidebarExpanded] = useState(true)
  const {loading} = useSelector((state:any)=>state.loaders)
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
      name:'Coins',
      path:'/settings',
      icon:"ri-coin-line"
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
      console.log(data)    
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
        {pathname === "/login" || pathname === "/register" ? <div>{children}</div> : 
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
                  <div style={{justifyContent:isSidebarExpanded?'start':"center"}} className={`menu-item ${isActive ? "active-menu-item" : ""}`} key={index} onClick={()=>router.push(item.path)}>
                    <i className={item.icon}></i>
                    <span>
                      {isSidebarExpanded && item.name}
                    </span>
                  </div>
                )})}
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
      </ConfigProvider>
    </body>
  </html>
  )
}

export default LayoutProvider
