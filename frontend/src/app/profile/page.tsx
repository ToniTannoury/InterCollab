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
    try {
      values._id = currentUser._id
      values.userType = currentUser.userType
      dispatch(setLoading(true))
      const response = await fetch("http://16.171.116.7:5000/api/users/updateUser", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${Cookies.get('token')}`
        },
        body:JSON.stringify(values)
      });
      message.success("Profile updated successfully")
      const data = await response.json()

      dispatch(setCurrentUser(data.data))
    } catch (error:any) {
      message.error(error.message.data.message || "Something went wrong")
    }finally{
      dispatch(setLoading(false))
    }
  }
  return (
    <div>
      <h1 className='text-4xl mb-3 month-header text-ICblue'>Profile</h1>
    
      <UserInfoBar user={currentUser}/>
    
    </div>
  )
}

export default Pofile
