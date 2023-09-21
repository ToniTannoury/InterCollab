"use client"
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Col, Row, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/loadersSlice';
import Cookies from 'js-cookie';
import socketIO from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { RoomContext } from '@/context/RoomContext';

function CreateRoom() {
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  const router = useRouter();
  const { ws } = useContext(RoomContext);
  const [showCoinInput, setShowCoinInput] = useState(false); // Add state for showing coin input

  const createRoom = (roomId: string) => {
    ws.emit('create-room', { roomId });
    router.push(`/test/${roomId}`);
  };

  const onFinish = async (values: any) => {
    try {

      const response = await fetch('http://16.171.116.7:5000/api/rooms', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      message.success('Room Created');
      createRoom(data._id);
    } catch (error: any) {
      message.error(error.message.data.message || 'Something went wrong');
    }
  };



  return (
    
  );
}

export default CreateRoom;
