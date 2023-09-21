
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



  return (
    
  );
}


export default RoomSearchInput;
