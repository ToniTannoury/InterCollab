"use client"

import { Button, Col, Form, message , Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/loadersSlice'
import { setCurrentUser } from '@/redux/usersSlice'
import { useRouter } from 'next/navigation'
import UserInfoBar from '@/components/UserInfoBar'
import Cookies from 'js-cookie'
function Pofile() {
  const {currentUser} = useSelector((state:any)=>state.users) 
  const dispatch = useDispatch()
  const router = useRouter()
 

  const onFinish = async (values:any)=>{
 
  }
  return (
    <div>
    
    
    </div>
  )
}

export default Pofile
