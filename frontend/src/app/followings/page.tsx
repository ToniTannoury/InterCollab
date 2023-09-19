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
      
        const res = await fetch(`http://localhost:5000/api/users/getUserById?userId=${user}`, {
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
    const url =  `http://localhost:5000/api/users/unfollow/${id}`
     

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
    filteredArray &&
    <div>
      <h1 className='text-4xl mb-3 month-header text-ICblue'>Followings</h1>
       <div className='my-5'>
        <SearchUserInput/>
      </div>
      <div>
       <div className='flex gap-5 flex-wrap'>
        {console.log(filteredArray)}
        {filteredArray?.map((user:any)=>{
            return (
              user && <div data-id={user._id} className='following bg-ICblue rounded-xl'>
                <div className='flex items-center gap-3'>
                  <Image className='img-1 ml-5 mt-5 ' src={(`http://localhost:5000/images/${user.profile_picture}`)} alt='logo' width={2000} height={500}>

                  </Image>  
                  <span className='flex flex-col pt-6'>
                    <b className='text-lg text-white'>{user.name}</b>
                    <b className='flex gap-1 text-lg text-white'>{user.rating}<div  className='ri-star-line text-yellow-400 font-extrabold'></div></b>
                  </span>
                  
                </div>
                <div>
                  
                  
                  <div className='flex gap-1 ml-6 mt-3 text-white'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" h-7 w-7 text-white -ml-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                    <p className='text-about'>
                      {user.about}
                    </p>
                  </div>
                </div>
                <div className='flex justify-end'>
                <button onClick={handleUnFollowClick} className='pl-2 pr-2 bg-white h-7  mr-11 my-4 rounded card-button'>Unfollow</button>

                </div>
              </div>
            )
          })}
       </div>
        
        
      </div>
    </div>
  )
}

export default page
