"use client"
import { Carousel } from 'antd'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'

function TopRooms() {
  const [rooms , setRooms] = useState()
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
    
  })
  return (
    <div>
      <Carousel rooms={rooms?.topRooms} home/>
    </div>
  )
}

export default TopRooms
