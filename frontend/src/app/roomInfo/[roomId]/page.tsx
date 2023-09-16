'use client'

import { setLoading } from "@/redux/loadersSlice"
import { Button, Col, Divider, Row, message } from "antd"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Cookies from "js-cookie"
// import socketIO from 'socket.io-client'
// const WS = 'http://localhost:5000'
function RoomInfo() {
  const router = useRouter()
  const {roomId} = useParams()
  const dispatch = useDispatch()
  const [roomData , setRoomData] = useState<any>(null)
  const [code , setCode] = useState<string>('')
  const {currentUser} = useSelector((state:any)=>state.users)

  const fetchJob = async()=>{
    try {
      dispatch(setLoading(true))
      const response = await fetch(`http://localhost:5000/api/rooms/searchRoomById?roomId=${roomId}`,{
        headers:{
          "Authorization":`Bearer ${Cookies.get('token')}`
        }
      })
      const data = await response.json()
      setRoomData(data)
    } catch (error:any) {
      message.error(error.message)
    }finally{
      dispatch(setLoading(false))
    }
  }

  
  
  useEffect(()=>{
    fetchJob()
  },[])
  const checkPin = async(e:any)=>{
    e.preventDefault()
    roomData.pinCode === code && router.push(`/test/${roomData._id}`)
  }

  
  return (
    roomData && <div>
      <h1 className="text-2xl -mt-1 mb-3">{roomData.title}</h1>
      <Row gutter={[16,16]}>
        <Col span={12} className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>
              Creator's name
            </span>
            <span>
              {roomData.user?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
            Creator's rating
            </span>
            <span>
              {roomData.user?.rating}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
            Creator's email
            </span>
            <span>
              {roomData.user?.email}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
            Room Category
            </span>
            <span>
              {roomData.category}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
            Max number of participants
            </span>
            <span>
              {roomData.maxNumberOfParticipants}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              Room Type
            </span>
            <span>
              {roomData.type}
            </span>
          </div>
        </Col>
        <Col span={24} className="flex flex-col gap-2">
          <h1 className="text-xl">
            About the creator
          </h1>
          <Divider className="p-0 h-0 m-0"/>
          <span>{roomData.user?.about}</span>
          <h1 className="text-xl">
            Room Description
          </h1>
          <Divider className="p-0 h-0 m-0"/>
          <span>{roomData.description}</span>
         
          <div className="flex justify-end gap-3">
          
          <Button type="default" onClick={()=>router.back()}>Cancel</Button>

          {(roomData.type === "public" || roomData.user._id === currentUser._id) && <Button type="primary" className="bg-ICblue"  onClick={()=>router.push(`/test/${roomData._id}`)}>Join Now</Button>}

          {roomData.type === "private" && roomData.user._id !== currentUser._id &&
          (
            <form onSubmit={checkPin} action="">
              <input value={code} className="pincode" type="text" onChange={(e)=>setCode(e.target.value)}/>
            </form>
          )}
        </div>
        </Col>
        
      </Row>
    </div>
  )
}

export default RoomInfo
