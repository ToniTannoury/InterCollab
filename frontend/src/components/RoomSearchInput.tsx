
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

      const response = await fetch(`http://16.171.116.7:5000/api/rooms/${endpoint}?${searchCriteria}=${searchTerm}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${Cookie.get('token')}`
        },
      });
      const data = await response.json()
      if(data.message==='No rooms found matching the criteria.') setSearchResults([])
      setSearchResults(groupRoomsByCategory(data.docs))
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
    
  );
}


export default RoomSearchInput;
