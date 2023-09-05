'use client'
import React, { useState, useEffect } from 'react';
import { Form, message } from "antd";
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadersSlice';
import Cookie from 'js-cookie';
import useDebounce from '../customHooks/useDebounce';

function SearchUserInput() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {

    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const performSearch = async (searchTerm: string) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`http://localhost:5000/api/users/searchUsers?query=${searchTerm}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${Cookie.get('token')}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error:any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className='flex flex-col'>
      <label className=' text-gray-400' htmlFor="">Look for other creators</label>
      <input
        type="text"
        className='input user-search'
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchUserInput;
