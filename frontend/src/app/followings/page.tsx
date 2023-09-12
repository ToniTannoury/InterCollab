'use client'
import SearchUserInput from '@/components/SearchUserInput'
import React, { use, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/loadersSlice'
import { message } from 'antd';

function page() {
  const { currentUser } = useSelector((state: any) => state.users);
  const [followings , setFollowings] = useState<any>([])
  const dispatch = useDispatch()
  const getFollowingInfo = async()=>{
    try {
      dispatch(setLoading(true))
      console.log(currentUser?.followings)
      currentUser?.followings?.map(async(user:any)=>{
        const res = await fetch(`http://localhost:5000/api/users/getUserById?userId=${user._id}` , {
          headers:{
            "Authorization" : `Bearer ${Cookies.get('token')}`
          }
        })
        const data = await res.json()
        console.log(data)
        setFollowings((prev:any)=>{
          
          return[
            ...prev , data
          ]}
        )
      })
    } catch (error:any) {
      message.error(error.message)
      console.log(error)
    }finally{
      dispatch(setLoading(false))
    }
  }
  useEffect(()=>{
    getFollowingInfo()
  },[currentUser])

  return (
     
    <div>
      <h1 className='text-4xl mb-3 month-header text-ICblue'>Followings</h1>
       <div className='my-5'>
        <SearchUserInput/>
      </div>
      <div>
       <div className='flex gap-4'>
        {followings?.map((user:any)=>{
            return (
              <div className='following bg-ICblue rounded'>
                
              </div>
            )
          })}
       </div>
        
        
      </div>
    </div>
  )
}

export default page
