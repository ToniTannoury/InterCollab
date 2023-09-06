
'use client'
import React, { useState, useEffect } from 'react';
import { Form, message } from "antd";
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadersSlice';
import Cookie from 'js-cookie';
import useDebounce from '../customHooks/useDebounce';
import UserInfoBar from './UserInfoBar';
import { setSearching } from '@/redux/searchingSlice';
import Carousel from './Carousel';
interface Room {
  category: string;
  title: string;
  type: string;
  _id:string
  
}


function RoomSearchInput() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState<string>('userName'); // Default search criteria
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [searchResults, setSearchResults] = useState<Room[][]|[]>([]);

  const fetchSearchResults = async () => {
    try {
      let endpoint = ''; 
      switch (searchCriteria) {
        case 'userName':
          endpoint = 'searchRoomsByUserName';
          break;
        case 'category':
          endpoint = 'searchRooms';
          break;
        case 'type':
          endpoint = 'searchRoomsByType';
          break;
        case 'title':
          endpoint = 'searchRoomsByTitle';
          break;
        default:
          endpoint = 'searchRooms';
          break;
      }

      const response = await fetch(`http://localhost:5000/api/rooms/${endpoint}?${searchCriteria}=${searchTerm}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${Cookie.get('token')}`
        },
      });
      const data = await response.json()
      console.log(data)
      if(data.message==='No rooms found matching the criteria.') setSearchResults([])
      setSearchResults(groupRoomsByCategory(data.docs))
      console.log(groupRoomsByCategory(data.docs))
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.docs);
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [debouncedSearchTerm, searchCriteria]);
  function groupRoomsByCategory(rooms: Room[]): Room[][] {
    const groupedRooms: Room[][] = [];
  
    rooms.forEach((room) => {
      const { category } = room;
      const existingCategory = groupedRooms.find((group) => group[0]?.category === category);
  
      if (existingCategory) {
        existingCategory.push(room);
      } else {
        groupedRooms.push([room]);
      }
    });
  
    return groupedRooms;
  }
  return (
    <div>
      <div className='flex flex-col'>
        <label className='text-gray-600' htmlFor="">Look for Rooms that suit your mood</label>
        <div className='flex'>
          <input
            type="text"
            className='input user-search'
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className='flex flex-col'>
          <label className='ml-3 text-gray-600 -mt-6' htmlFor="">Choose a filter</label>
          <select
            className='border-slate-900 border ml-3 p-2 rounded'
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
          >
            <option className='option' value="userName">User Name</option>
            <option value="category">Room Category</option>
            <option value="type">Room Type</option>
            <option value="title">Room Title</option>
          </select>
          </span>
          
        </div>
        
      </div>
      <div className='relative'>
      {searchResults.map((categoryGroup, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold text-gray-800">
              Category: {categoryGroup[0].category}
            </h2>
            <Carousel rooms={categoryGroup}>
              <div className="grid grid-cols-3 gap-4">
                {categoryGroup.map((room) => (
                  <div key={room._id} className="border rounded p-2">
                    <h3 className="text-md font-semibold">{room.title}</h3>
                    <p>Type: {room.type}</p>
                  </div>
                ))}
              </div>
            </Carousel>
          </div>
        ))}
      </div>
    </div>
  );
}


export default RoomSearchInput;
