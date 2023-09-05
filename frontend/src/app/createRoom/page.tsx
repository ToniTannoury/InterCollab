"use client"
import { Button, Form , Col ,Row ,   message } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoading } from '@/redux/loadersSlice'
import { setCurrentUser } from '@/redux/usersSlice'
function CreateRoom() {
  const {currentUser} = useSelector((state:any)=>state.users) 
  const dispatch = useDispatch()

  const onFinish = async (values:any)=>{
    // try {
    //   values._id = currentUser._id
    //   values.userType = currentUser.userType
    //   dispatch(setLoading(true))
    //   const response = await axios.put("api/users" , values) 
    //   message.success("Profile updated successfully")
    //   dispatch(setCurrentUser(response.data.data))
    // } catch (error:any) {
    //   message.error(error.message.data.message || "Something went wrong")
    // }finally{
    //   dispatch(setLoading(false))
    // }
    console.log(values)
  }
  return (
    <div>
      <h1 className='text-3xl mb-3'>Open New Room</h1>
      <Form layout='vertical' initialValues={currentUser} onFinish={onFinish}>
      <>
      <Row gutter={[16,16]}>
        
        <Col span={24}>
          <Form.Item label='Title' name="name" >
            <input className='input' type="text" required/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label='Description' name="description" >
            <textarea className='input' required/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Category' name="category" >
            <input className='input' type="text" required/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Max number of participants' name="maxNumberOfParticipants" >
            <input className='input' type="number" required/>
          </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item label="Type" name={"jobType"}>
          <select className='input ' name="" id="">
            <option value="full-time">Public</option>
            <option value="part-time">Private</option>
            <option value="contract">Paid</option>
          </select>
        </Form.Item>
      </Col>
      </Row>
      
      
    </>
        <div className='flex justify-end my-3'>
          <Button className='bg-ICblue' type="primary" htmlType='submit'>
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default CreateRoom

