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
   
  };



  return (
    
  );
}

export default CreateRoom;
