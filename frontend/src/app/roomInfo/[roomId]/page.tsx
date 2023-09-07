'use client'

import { setLoading } from "@/redux/loadersSlice"
import { Button, Col, Divider, Row, message } from "antd"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Cookies from "js-cookie"
function RoomInfo() {
  const router = useRouter()
  const {roomId} = useParams()
  const dispatch = useDispatch()
  const [roomData , setRoomData] = useState<any>(null)
  const {currentUser} = useSelector((state:any)=>state.users)

  const fetchJob = async()=>{
    try {
      dispatch(setLoading(true))
      console.log(roomId)
      const response = await fetch(`http://localhost:5000/api/rooms/searchRoomById?roomId=${roomId}`,{
        headers:{
          "Authorization":`Bearer ${Cookies.get('token')}`
        }
      })
      const data = await response.json()
      console.log(data)
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

  const onJoin = async ()=>{
   
  }
  return (
    roomData && <div>
      <Row gutter={[16,16]}>
        <Col span={12} className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>
              Company
            </span>
            <span>
              {roomData.user.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              Location
            </span>
            <span>
              {roomData.type}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              Salary
            </span>
            <span>
              {/* {roomData.salaryFromRange} - {roomData.salaryToRange} USD */}11
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              {/* Wok Mode */}11
            </span>
            <span>
              {roomData.workMode}
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              Job Type
            </span>
            <span>
              {/* {roomData.jobType} */}22
            </span>
          </div>
          <div className="flex justify-between">
            <span>
              Experience Required
            </span>
            <span>
              {/* {roomData.experience} Years */}uuu
            </span>
          </div>
        </Col>
        <Col span={24} className="flex flex-col gap-2">
          <h1 className="text-md">
            Job Description
          </h1>
          <Divider/>
          <span>{roomData.description}</span>
         
          <div className="flex justify-end gap-3">
          
          <Button type="default" onClick={()=>router.back()}>Cancel</Button>
        
        
          <Button type="primary"   onClick={onJoin}>Join</Button>
        </div>
        </Col>
        
      </Row>
    </div>
  )
}

export default RoomInfo
