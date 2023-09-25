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
import StopSharingButton from '@/components/StopSharingButton';
import LeaveRoomButton from '@/components/LeaveRoomButton';
import { CloseRoomButton } from '@/components/CloseRoomButton';
import { removeOtherPeersAction } from '@/context/peerActions';

interface Participant {
  _id: string;
  name: string;
  email: string;
  password: string;
  followings: []; 
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
    useEffect(()=>{
      const fetchRoom = async()=>{
        const res = await fetch(`http://16.171.116.7:5000/api/rooms/searchRoomById?roomId=${roomId}` , {
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
     
     const sendChat = (e:React.FormEvent)=>{
      e.preventDefault()
      setMessages((prevState:Participant[]) => [...prevState, {userName: "You" , message : chat}]); 
      roomId!==undefined && ws.emit('chatMessage', {"roomId":roomId,"userName":currentUser.name , "message": chat})
      setChat('')
    }
    useEffect(()=>{
      if(room._id === undefined) return
      setRoomId((prev:any)=>{
       return room
      })
     },[room._id])
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
    const emitCloseRoom = async()=>{
      console.log("emiting closeroom")
      console.log(roomId)
      console.log(me)
      if(me?._id !== room.user._id)return
      ws.emit('CloseRoom' , {roomId:roomId ,peerId: me._id})
      dispatch(removeOtherPeersAction())
      setParticipants([])
      setMessages([])
      router.push('/')
      
      
    }
  return (
    me !== null && peers.length !== 0 &&  room.user && stream &&
    
    <div className=' bg-ICblue h-full'>
      
      <div className='flex w-full h-screen pt-3 pb-3 gap-2 justify-center'>
      <section className=' users1 ml-10 '>
          <p className='text-ICblue min-w-full text-3xl border-b-2 pl-8 mt-4 pr-10 room-header p-1'>
            
            Users In Call
          </p>
          <div>
            
            {filterDuplicateParticipants(participants)?.map((participant:Participant)=>
              (<div className='flex gap-2 items-center ml-5 mt-3'>
                <Image className='img mr-1 ' src={(`http://16.171.116.7:5000/images/${participant.profile_picture}`)} alt='logo' width={1000} height={500}>
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
              return <>
              {Object.keys(peers as PeerState)[index] === room.user._id && mediaShareStatus ? <VideoPlayer screenSharringId={screenSharringId} stream={peer.stream} />:
              <div className='not-sharing'>
                <p>Waiting for the creator...</p>
              </div>}
              </>
            })}
          </div>}
          
          <section className='self-stretch users mr-10 flex flex-col justify-between'>
            <div>
            <div className='text-ICblue room-header min-w-full text-center text-3xl border-b-2 align-center' style={{width:"200px" , textAlign:'center'}}>
            {room.title}
          </div>
          <div className='flex flex-col scrollable '>
          {messages?.map((message:{userName:string , message:string})=>(
            <div className='my-2 ml-2 bg-slate-300 rounded-lg container-message max-w-max pr-10'>
              <b className='ml-3 text-ICblue'>{message.userName}</b>
              <p className='ml-3 text-ICblue width break-words'>{message.message}</p>
            </div>
          ))}
          </div>
            </div>
          
          <div>
          <form className='mb-10' onSubmit={sendChat} style={{ position: 'relative'}}>
            <hr className='pb-4'/>
      <input
        type="text"
        value={chat}
        onChange={(e)=>setChat(e.target.value)}
        placeholder="Type a message..."
        className='focus:border-transparent'
        style={{
          
          padding: '8px',
          fontSize: '16px',
          width: '295px',
        }}
      />
      <button
        type="submit"
        className='bg-ICblue'
        style={{
          position: 'absolute',
          top: '65%',
          right: '10px',
          transform: 'translateY(-50%)',
          
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
          
      </div>
     
  <div className="fixed bottom-0 p-3 w-full flex justify-center border-t-2">
    <LeaveRoomButton onClick={leaveRoom}/>
    {me?._id === room.user._id &&<ShareScreenButton onClick={shareScreen} />}
    {me?._id === room.user._id &&<StopSharingButton onClick={emitStopSharing}/>}
    {me?._id === room.user._id &&<CloseRoomButton onClick={emitCloseRoom}/>}
    {me?._id === room.user._id && room.type === "private" && <div className='text-white flex flex-col justify-center items-center border-white border-1 p-1'><div>Room's PIN</div>{room.pinCode}</div>}
  </div>
  
</div>
  )
}
export default Room