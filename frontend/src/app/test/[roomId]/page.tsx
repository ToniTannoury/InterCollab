'use client'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useParams } from 'next/navigation';
import { RoomContext } from '@/context/RoomContext';
import { VideoPlayer } from '@/components/VideoPlayer';
import { PeerState, peersReducer } from '../../../context/peerReducer'
import { useDispatch } from 'react-redux';

import { removeOtherPeersAction } from '@/context/peerActions';
import { ShareScreenButton } from '@/components/ShareScreenButton';
function Room() {
  const [callStatus, setCallStatus] = useState("inCall");

  const [state , dispatching ] = useReducer(peersReducer , {})
  const s = new MediaStream
 
  const {ws , me , stream ,peers,shareScreen , setRoomId} = useContext(RoomContext)
  const dispatch = useDispatch()
    const {roomId} = useParams()
    useEffect(()=>{

    } , [roomId , setRoomId])
    useEffect(()=>{
      
      
      console.log(me)
      console.log(roomId)
      console.log(22222222)

      if(me) ws.emit("join-room" , {roomId:roomId , peerId:me._id })
     },[ws , me , roomId ])
  return (
    me && peers.length !== 0 &&
    
    <div>
      
      <VideoPlayer stream={stream}/>
      
      {Object.values(peers as PeerState).map((peer)=>(
        <VideoPlayer stream={peer.stream}/>
      ))}
       <div className="fixed bottom-0 p-6 w-full flex justify-center border-t-2">
      <ShareScreenButton onClick={shareScreen}/>
    </div>
    </div>
  )
}

export default Room
