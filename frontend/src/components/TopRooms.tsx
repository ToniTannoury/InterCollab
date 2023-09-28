"use client"

import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import Carousel from './Carousel'
export interface Participant {
  _id: string;
  name: string;
  email: string;
  password: string;
  followings: []; 
  profile_picture: string; 
}
export type Room = {
  _id: string;
  title: string;
  type: string;
  pinCode: string;
  currentParticipants: []; 
  user:Participant
}
function TopRooms() {
  const [rooms , setRooms] = useState<{topRooms:Room[]}>()
  const getTop5RoomsByTotalParticipants = async()=>{
    const token = Cookies.get('token')
    const res = await fetch("http://16.171.116.7:5000/api/rooms/getTop5RoomsByTotalParticipants" , {
      headers:{
        "Authorization" : `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data
  }
  useEffect(()=>{
    const getTopRooms=async()=>{
      const rooms:any = await getTop5RoomsByTotalParticipants()
      console.log(rooms)
      setRooms(rooms)
    }
    
    getTopRooms()
  },[])
  return (
    
       rooms &&   

    <div>
    <Carousel rooms={rooms?.topRooms} home/>
  </div>
    

  )
}

export default TopRooms
