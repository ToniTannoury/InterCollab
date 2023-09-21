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
  const { currentUser } = useSelector((state: any) => state.users);
  const [followings , setFollowings] = useState<any>([])
  const dispatch = useDispatch()
  const getFollowingInfo = async()=>{
    try {
      dispatch(setLoading(true))
      console.log(currentUser?.followings)
      const userfollowings = currentUser?.followings?.map(async (user: any) => {
        console.log(user);
      
        const res = await fetch(`http://16.171.116.7:5000/api/users/getUserById?userId=${user}`, {
          headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
          }
        });
      
        const data = await res.json();
        console.log(data);
      
        return data; // Return the result for each user
      });
      
      // Wait for all promises to resolve and get an array of results
      Promise.all(userfollowings)
        .then(results => {
          console.log("All user data:", results);
          setFollowings(results)
        })
        .catch(error => {
          console.error("Error:", error);
        });
      
      const a = userfollowings
      console.log(a)
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
 
  

  // Filter duplicates
  const uniqueIds = new Set<string>();

const filteredArray: MyObject[] = followings.filter((obj:any) => {
  if (!uniqueIds.has(obj._id)) {
    uniqueIds.add(obj._id);
    console.log(1111111111)
    return true;
  }
  return false;
});
const handleUnFollowClick = async (e:any) => {
  const id = e.target.parentElement.getAttribute("data-id")
  try {
    const url =  `http://16.171.116.7:5000/api/users/unfollow/${id}`
     

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${Cookies.get('token')}`
      }
    });

    if (response.ok) {
      dispatch(removeFollowing(id));
    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
  return (
   
  )
}

export default page
