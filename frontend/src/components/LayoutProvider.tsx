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

function LayoutProvider({children}:{children:React.ReactNode}) {

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