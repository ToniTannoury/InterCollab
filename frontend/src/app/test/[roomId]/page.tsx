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
import Image from 'next/image';
import StopSharingButton from '@/components/StopSharingButton';
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

  
  const {ws , me , stream ,peers,shareScreen , participants ,setRoomId,roomId:id,screenSharringId , messages, mediaShareStatus, setMediaShareStatus} = useContext(RoomContext)
  console.log(id)
  const dispatch = useDispatch()
  const [state , dispatching] = useReducer(peersReducer , {})

  const [chat , setChat] = useState('')
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
        
        setRoom(data)
        
      }
      getCurrentUser().then(res=>fetchRoom())
      
    } , [])
    useEffect(()=>{
      if(me && roomId) ws.emit("join-room" , {roomId:roomId , peerId:me._id })
      if(me && roomId!==undefined) ws.emit("join" , {roomId:roomId})
      
     },[ws , me , roomId ])
     
     const sendChat = (e:any)=>{
      e.preventDefault()
 
      roomId!==undefined && ws.emit('chatMessage', {"roomId":roomId,"userName":currentUser.name , "message": chat})
      setChat('')
    }
    useEffect(()=>{
      setRoomId((prev:any)=>{
        console.log(room)
       return room
      })
     },[room])
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
    const emitStopSharing = async()=>{
      setMediaShareStatus(!mediaShareStatus)
      ws.emit('stopShare' , {roomId:roomId , mediaShareStatus:!mediaShareStatus })
    }
  return (
    me !== null && peers.length !== 0 &&  room.user && stream &&
    
    <div className=' bg-ICblue h-full'>
      
      <div className='flex w-full h-screen pt-3 pb-3 gap-4 justify-between'>
      <section className=' users1 ml-10 '>

          <span className='text-black min-w-full text-3xl border-b-2 pl-8 mt-4 pr-10'>
            
            Users In Call
          </span>
          <div>
            
            {filterDuplicateParticipants(participants)?.map((participant:any)=>
              (<div className='flex gap-2 items-center ml-5 mt-3'>
                <Image className='img mr-1 ' src={(`http://localhost:5000/images/emptyProfile.png`)} alt='logo' width={1000} height={500}>

                </Image>
                <div>
                  {participant.name}
                </div>
              </div>
               
              )
            ) }
          </div>
      </section >
          {me?._id === room.user._id && <div className=''>{mediaShareStatus ? <VideoPlayer screenSharringId={screenSharringId} stream={stream} />:<div className='not-sharing'>
                <p>Waiting for the creator...</p>
              </div>}</div>}
          {me?._id !== room.user._id && <div>
            {Object.values(peers as PeerState).map((peer, index) =>{ 
              {console.log(Object.keys(peers as PeerState)[index])}
              {console.log(peer)}
              return <>
              {Object.keys(peers as PeerState)[index] === room.user._id && mediaShareStatus ? <VideoPlayer screenSharringId={screenSharringId} stream={peer.stream} />:
              <div className='not-sharing'>
                <p>Waiting for the creator...</p>
              </div>}
              </>
            })}
          </div>}
          
          <section className='self-stretch users mr-10 flex flex-col justify-between'>
          <div className='text-black min-w-full text-center text-3xl border-b-2 align-center' style={{width:"200px" , textAlign:'center'}}>
            {room.title}
          </div>
          <div>
          <form className='mb-10' onSubmit={sendChat} style={{ position: 'relative'}}>
      <input
        type="text"
        value={chat}
        onChange={(e)=>setChat(e.target.value)}
        placeholder="Type a message..."
        className='focus:border-transparent'
        style={{
          
          padding: '8px',
          fontSize: '16px',
          width: '330px',
        }}
      />
      <button
        type="submit"
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '8px',
          borderRadius: '40px',
          cursor: 'pointer',
        }}
      >
        Send
      </button>
    </form>
          </div>
          </section >
          {messages?.map((message:any)=>(
            message.userName
          ))}
      </div>
     
  <div className="fixed bottom-0 p-6 w-full flex justify-center border-t-2">
    {me?._id === room.user._id &&<ShareScreenButton onClick={shareScreen} />}
    {me?._id === room.user._id &&<StopSharingButton onClick={emitStopSharing}/>}
  </div>
  
</div>

  )
}

export default Room
