"use client"
import { Button, Form , Col ,Row ,   message } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/loadersSlice'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
function CreateRoom() {
  const {currentUser} = useSelector((state:any)=>state.users) 
  const dispatch = useDispatch()
  const router = useRouter()
  const onFinish = async (values:any)=>{
    try {
      dispatch(setLoading(true))
      console.log(values)
      const response = await fetch("http://localhost:5000/api/rooms" , {
        method:"POST",
        headers:{
          "Authorization":`Bearer ${Cookies.get('token')}`,
          'Content-Type':"application/json"
        },
        body:JSON.stringify(values)
      }) 
      const data= await response.json()
      console.log(data)
      message.success("Room Created")
    } catch (error:any) {
      message.error(error.message.data.message || "Something went wrong")
    }finally{
      dispatch(setLoading(false))
    }
    console.log(values)
  }
  return (
    <div>
      <h1 className='text-3xl mb-3'>Open New Room</h1>
      <Form layout='vertical' initialValues={currentUser} onFinish={onFinish}>
      <>
      <Row gutter={[16,16]}>
        
        <Col span={24}>
          <Form.Item label='Title' name="title" >
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
        <Form.Item label="Type" name={"type"}>
          <select className='input ' name="" id="">
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="paid">Paid</option>
          </select>
        </Form.Item>
      </Col>
      </Row>
      
      
    </>
        <div className='flex justify-end my-3'>
          <Button onClick={()=>router.push('/')} className='mr-3 h-12 font-semibold' type="default" >
            Cancel
          </Button>
          <Button className='bg-ICblue h-12 font-semibold' type="primary" htmlType='submit'>
          Create Room
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default CreateRoom

