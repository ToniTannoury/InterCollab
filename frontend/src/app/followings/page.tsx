'use client'
import SearchUserInput from '@/components/SearchUserInput'
import React, { use, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/loadersSlice'
import { message } from 'antd';
import Image from 'next/image';
import { removeFollowing } from '@/redux/usersSlice';
interface MyObject {
  _id: string;
  name: string;
  email: string;
  password: string;
  followings: any[]; 
}
function page() {



  return (
   
  )
}

export default page
