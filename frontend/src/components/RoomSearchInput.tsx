'use client'
import React, { useState, useEffect } from 'react';
import { Form, message } from "antd";
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadersSlice';
import Cookie from 'js-cookie';
import useDebounce from '../customHooks/useDebounce';
import UserInfoBar from './UserInfoBar';
import { setSearching } from '@/redux/searchingSlice'
function SearchUserInput() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [searchResults, setSearchResults] = useState<any>([]);

  // useEffect(() => {
  //   if (debouncedSearchTerm) {
  //     performSearch(debouncedSearchTerm);
  //   }
  // }, [debouncedSearchTerm]);
  // useEffect(()=>{
  //   searchTerm !== "" ? dispatch(setSearching(true)) : dispatch(setSearching(false))
  // })
  // const performSearch = async (searchTerm:any) => {
  //   try {
  //     dispatch(setLoading(true));
  //     const response = await fetch(`http://localhost:5000/api/users/searchUsers?query=${searchTerm}`, {
  //       method: "GET",
  //       headers: {
  //         "Authorization": `Bearer ${Cookie.get('token')}`,
  //       },
  //     });
  //     const data = await response.json();
  //     setSearchResults(data); 
  //   } catch (error:any) {
  //     message.error(error.message);
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // }

  return (
    <div>
      <div className='flex flex-col'>
        <label className=' text-gray-600 ' htmlFor="">Look for Rooms of that suits your mood</label>
        <input
          type="text"
          className='input user-search'
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='relative'>
        {searchTerm && searchResults.message !=='No users found matching the search query' &&<div className='containing-users fixed w-1/3'>
          {searchTerm && searchResults.message !=='No users found matching the search query' && searchResults.map((user:any , index:number) => (
          <UserInfoBar  key={index} user={user} search/>
          ))}
        </div>}
      </div>
    </div>
  );
}

export default SearchUserInput;
