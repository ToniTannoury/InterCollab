'use client'
import React, { useEffect } from 'react'
import {Button , Form , message} from 'antd'
import Link from 'next/link'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useDispatch , useSelector } from 'react-redux'
import { setLoading } from '@/redux/loadersSlice'

function Login() {
  
  const dispatch = useDispatch()
  const router = useRouter()
  const onFinish =async (values:{email:string , password:string})=>{
    try {
      dispatch(setLoading(true))
      const response = await fetch('http://16.171.116.7:5000/api/users/login',{
      credentials: 'same-origin',
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(values),
    })
    const data = await response.json()
   
   

    if(response.status!==200){
      message.error(data.message)
    }else{
      
      setTimeout(()=>{
        location.reload()
        
      },100)
      router.push("/")
      Cookie.set('token' , data.token)
    }
    } catch (error:any) {
      message.error(error.message)
    }finally{
      dispatch(setLoading(false))
    }
    
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
          <Link className='ml-1 text-ICblue font-semibold hover:text-ICblue ' href="/register">
            Dont have an account ? Register
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default Login
