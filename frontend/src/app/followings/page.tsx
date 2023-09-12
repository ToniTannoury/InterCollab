'use client'
import SearchUserInput from '@/components/SearchUserInput'
import React from 'react'
import { useSelector } from 'react-redux';

function page() {
  const { currentUser } = useSelector((state: any) => state.users);
  return (
    <div>
      <h1 className='text-4xl mb-3 month-header text-ICblue'>Followings</h1>
       <div>
        <SearchUserInput/>
      </div>
      <div>
        <div className='following'>

        </div>
      </div>
    </div>
  )
}

export default page
