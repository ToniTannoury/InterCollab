'use client'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useParams } from 'next/navigation';
import { RoomContext } from '@/context/RoomContext';
import { VideoPlayer } from '@/components/VideoPlayer';
import { PeerState, peersReducer } from '../../../context/peerReducer'
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { removeOtherPeersAction } from '@/context/peerActions';
import { ShareScreenButton } from '@/components/ShareScreenButton';
import { setLoading } from '@/redux/loadersSlice';
import { setCurrentUser } from '@/redux/usersSlice';
import { message } from 'antd';
function Room() {
  const [room, setRoom] = useState<any>({});
  const {currentUser} = useSelector((state:any)=>state.users)

  const [state , dispatching ] = useReducer(peersReducer , {})
  const s = new MediaStream
 
  const {ws , me , stream ,peers,shareScreen , setRoomId , screenStream} = useContext(RoomContext)
  const dispatch = useDispatch()
    const {roomId} = useParams()
    const getCurrentUser = async()=>{
      try {
        dispatch(setLoading(true))
        const res = await fetch("http://localhost:5000/api/users/me" , {
          headers:{
            "Authorization" : `Bearer ${Cookies.get('token')}`
          }
        })
        const data = await res.json()
        console.log(data)    
        dispatch(setCurrentUser(data))
      } catch (error:any) {
        message.error(error.message.data?.message || "Something went left")
      }finally{
        dispatch(setLoading(false))
      }
    }
    useEffect(()=>{
      const fetchRoom = async()=>{
        const res = await fetch(`http://localhost:5000/api/rooms/searchRoomById?roomId=${roomId}` , {
          headers:{
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        })
        const data = await res.json()
        console.log(currentUser)
        console.log(data)
        
        setRoom(data)
      }
      getCurrentUser().then(res=>fetchRoom())
      
    } , [me])
    useEffect(()=>{
      console.log(me)
      console.log(roomId)
      console.log(22222222)

      if(me) ws.emit("join-room" , {roomId:roomId , peerId:me._id })
     },[ws , me , roomId ])
    useEffect(()=>{
      console.log(room)
     },[room])
  return (
    me !== null && peers.length !== 0 &&  room.user && stream &&
    
    <div>
  {me?._id === room.user._id && <>{console.log(stream)}<VideoPlayer stream={stream[0]} />{console.log(screenStream)}<VideoPlayer stream={stream[1]} /></>}
  {Object.values(peers as PeerState).map((peer, index) =>{ 
    {console.log(Object.keys(peers as PeerState)[index])}
    {console.log(peer)}
    return <div key={index}>
      
    {Object.keys(peers as PeerState)[index] === room.user._id && <VideoPlayer stream={peer.stream[0]} />}
    </div>
  })}
  <div className="fixed bottom-0 p-6 w-full flex justify-center border-t-2">
    <ShareScreenButton onClick={shareScreen} />
  </div>
</div>

  )
}

export default Room
