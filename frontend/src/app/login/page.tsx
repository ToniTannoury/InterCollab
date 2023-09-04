'use client'
import React from 'react'
import {Button , Form} from 'antd'
import Link from 'next/link'
function Login() {
  const onFinish = (values:any)=>{
    console.log(values)
  }
  return (
    <div className='flex justify-center h-screen items-center bg-ICblue'>
      <div className='card p-5 bg-white w-1/4'>
        <h1 className='text-4xl my-3 font-dark'>InterCollab - Login</h1>
        <hr className='mb-3' />
        <Form onFinish={onFinish} className='flex flex-col gap-3 text-ICblue' layout='vertical'  >
          <Form.Item label='Email' name='email'>
            <input name='email' type="email" className='input'/>
          </Form.Item>
          <Form.Item label="Password" name='password'>
            <input name='password' type="password" className='input  focus:bg-white'/>
          </Form.Item>
          <Button className='bg-ICblue mt-1' type='primary' htmlType='submit'>
            Login
          </Button>
          <Link className='ml-1 text-ICblue font-semibold hover:text-ICblue w-1/2' href="/register">
            Dont have an account ? Register
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default Login
