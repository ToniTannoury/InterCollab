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
 
  // const getUser= async()=>{
  //   try {
  //     const token = Cookies.get('token')
  //     console.log(token)
  //     const res = await fetch("http://localhost:5000/api/users/me" , {
  //         headers:{
  //           "Authorization" : `Bearer ${token}`
  //         }
  //       })
  //       const data = await res.json()
  //       dispatch(setCurrentUser(data))
  //       console.log(data)
  
  //       return data
  //   } catch (error:any) {
  //     console.log(error)
  //   }
  // }
  // useEffect(()=>{
  //   getUser()
  // },[])
  console.log(currentUser)
  const onFinish = async (values:any)=>{
    try {
      values._id = currentUser._id
      values.userType = currentUser.userType
      dispatch(setLoading(true))
      const response = await fetch("http://localhost:5000/api/users/updateUser", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${Cookies.get('token')}`
        },
        body:JSON.stringify(values)
      });
      message.success("Profile updated successfully")
      const data = await response.json()
      console.log(data)
      dispatch(setCurrentUser(data.data))
    } catch (error:any) {
      message.error(error.message.data.message || "Something went wrong")
    }finally{
      dispatch(setLoading(false))
    }
  }
  return (
    <div>
      <h1 className='text-3xl mb-3'>Profile</h1>
    
      <UserInfoBar user={currentUser}/>
    {currentUser &&<Form layout='vertical' initialValues={currentUser} onFinish={onFinish}>
      <>
      <Row gutter={[16,16]}>
        
        <Col span={8}>
          <Form.Item label='Name' name="name" >
            <input className='input' type="text" required/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Email' name="email" >
            <input className='input' type="text" required/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Phone' name="phone" >
            <input className='input ' type="text" required/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label='About' name="about" >
            <textarea className='input text-area' required/>
          </Form.Item>
        </Col>
   
      
      </Row>
      
      
    </>
        <div className='flex justify-end my-3'>
    
          <Button className='bg-ICblue h-10' type="primary" htmlType='submit'>
            Save
          </Button>
        </div>
      </Form>}
    </div>
  )
}

export default Pofile
