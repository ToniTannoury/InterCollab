'use client'
import React from 'react'
import {Button , Form , message} from 'antd'
import Link from 'next/link'
import { error } from 'console'
function Register() {
  const onFinish =async (values:{name:string , email:string , password:string , confirmPassword:string})=>{
    try {
      const response = await fetch('http://localhost:5000/api/users',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(values)
    })
    const data = await response.json()  
    if(response.status !== 201){
      message.error(data.message)
    }else{
      message.success(data.message)
    }
    } catch (error) {
      
    }
    
    
  }
  return (
    <div className='flex justify-center h-screen items-center bg-ICblue'>
      <div className='card p-5 bg-white w-1/4'>
        <h1 className='text-4xl my-3 font-dark'>InterCollab - Register</h1>
        <hr className='mb-3' />
        <Form onFinish={onFinish} className='flex flex-col gap-3 text-ICblue' layout='vertical'  >
          <Form.Item label='Name' name='name'>
            <input name='name' type="text" className='input'/>
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <input name='email' type="email" className='input'/>
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <input name='password' type="password" className='input'/>
          </Form.Item>
          <Form.Item label='Verify Password' name='confirmPassword'>
            <input name='verifyPassword' type="password" className='input'/>
          </Form.Item>
          <Button className='bg-ICblue mt-1' type='primary' htmlType='submit'>
            Register
          </Button>
          <Link className='ml-1 text-ICblue font-semibold hover:text-ICblue w-1/2' href="/login">
            Already have an account ? Login
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default Register
