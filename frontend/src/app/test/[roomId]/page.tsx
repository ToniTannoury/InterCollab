'use client'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { RoomContext } from '@/context/RoomContext';
import { VideoPlayer } from '@/components/VideoPlayer';
import { PeerState, peersReducer } from '../../../context/peerReducer'
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { ShareScreenButton } from '@/components/ShareScreenButton';
import { setLoading } from '@/redux/loadersSlice';
import { setCurrentUser } from '@/redux/usersSlice';
import { message } from 'antd';
import Image from 'next/image';
import LeaveRoomButton from '@/components/LeaveRoomButton';
import { CloseRoomButton } from '@/components/CloseRoomButton';
import { removeOtherPeersAction } from '@/context/peerActions';

interface Participant {
  _id: string;
  name: string;
  email: string;
  password: string;
  followings: any[]; 
}
function Room() {
  const [room, setRoom] = useState<any>({});
  
  const {currentUser} = useSelector((state:any)=>state.users)
  const router = useRouter()
  const {ws , me , stream ,peers,shareScreen , participants ,setRoomId,screenSharringId , messages, mediaShareStatus, setMediaShareStatus , leaveRoom , setMessages ,setParticipants } = useContext(RoomContext)
  const dispatch = useDispatch()
  const [state , dispatching] = useReducer(peersReducer , {})
  const [chat , setChat] = useState('')
    const {roomId} = useParams()
    
    const getCurrentUser = async()=>{
      try {
        dispatch(setLoading(true))
        const res = await fetch("http://16.171.116.7:5000/api/users/me" , {
          headers:{
            "Authorization" : `Bearer ${Cookies.get('token')}`
          }
        })
        const data = await res.json()
        dispatch(setCurrentUser(data))
      } catch (error:any) {
        message.error(error.message.data?.message || "Something went left")
      }finally{
        dispatch(setLoading(false))
      }
    }


     

   
     function filterDuplicateParticipants(participants: Participant[]): Participant[] {
      const uniqueParticipants: Record<string, boolean> = {};
      const result: Participant[] = [];
    
      participants.forEach((participant) => {
        if (!uniqueParticipants[participant._id]) {
          uniqueParticipants[participant._id] = true;
          result.push(participant);
        }
      });
    
      return result;
    }


  return (

         
          
          
          

</div>
  )
}
export default Room