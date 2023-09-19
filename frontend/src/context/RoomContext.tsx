'use client'

import socketIO from "socket.io-client";
import { createContext, ReactNode, useEffect, useState , useReducer} from "react";
import { useDispatch, useSelector } from "react-redux";
import Peer from "peerjs";
import { setLoading } from "@/redux/loadersSlice";
import { setCurrentUser } from "@/redux/usersSlice";
import { message } from "antd";
import { peersReducer } from "./peerReducer";
import { usePathname, useRouter } from "next/navigation";

import Cookies from "js-cookie";
import { addPeerAction, removePeerAction,removeOtherPeersAction  } from "./peerActions";
type RoomProviderProps = {
  children: ReactNode; 
};

const WS = "http://localhost:5000";

export const RoomContext = createContext<null | any>(null);
const ws = socketIO(WS);


export const RoomProvider: React.FunctionComponent<RoomProviderProps> = ({
  children,
}) => {
  const [screenSharringId , setScreenSharringId] = useState<boolean>(false)
  const path = usePathname()
  const {currentUser} = useSelector((state:any)=>state.users)
  const [me , setMe] = useState<Peer>()
  const [stream , setStream] = useState<MediaStream>()
  const [peers , dispatch] = useReducer(peersReducer , {})
  const [participants , setParticipants] = useState<any>([])
  const [isRating, setIsRating] = useState<boolean>(false);

  const [connectionArray, setConnectionArray] = useState<any>([]);
  const [roomId , setRoomId] = useState<any>("")
  const [messages,setMessages] = useState<any>([]) 
  const [mediaShareStatus, setMediaShareStatus] = useState<boolean>(true);
 const router = useRouter()
  const dispatching =  useDispatch()
  const switchStream = (stream: MediaStream)=>{
    setStream(stream )
    setScreenSharringId(!screenSharringId)
    console.log(12341234)
    ws.emit('screensharing', {roomId:roomId , status:!screenSharringId})
    connectionArray?.map((conn:any)=>{
      const videoTrack = stream?.getTracks().find(track=>track.kind === 'video')
      const videoTracks = stream?.getTracks().find(track=>track.kind === 'video')
      console.log(videoTracks)
        conn.peerConnection?.getSenders()[1]?.replaceTrack(videoTrack).catch(
          (err:any)=>console.log(err))
    })
  }
  const removePeer = (peerId: string, stream: MediaStream) => {
    setParticipants((prevParticipants: any[]) =>{
      const removedParticipant = prevParticipants.find(
        (prevParticipant:any) => prevParticipant._id === peerId
      );  
      message.error(`${removedParticipant?.name} left`)
    
      return prevParticipants.filter((participant) => participant._id !== peerId)
    });
  
    dispatch(removePeerAction(peerId, stream));
  };
  
  const getUsers = (participants:{participants:string[]})=>{
    // console.log(participants)
  }
  const enterRoom = ({roomId}:{roomId:string})=>{
    // console.log(roomId)
    // navigate(`/room/${roomId}`)
  }

  const shareScreen = ()=>{
    if(screenSharringId ){
      navigator.mediaDevices.getUserMedia({video:true , audio:true}).then(switchStream)

    }else{
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(switchStream)

    }

  }
  const leaveRoom = async()=>{
    console.log(roomId)
    setIsRating(true)
    Cookies.set('creator_id' , roomId.user._id)
    ws.disconnect()
    router.push('/')
  }
  const handleScreenShare = async(status:any)=>{
    setScreenSharringId(status)
  }
  const handleMediaShare = async(mediaShareStatus:any)=>{
    console.log(mediaShareStatus)
    setMediaShareStatus(mediaShareStatus.mediaShareStatus)
  }
  useEffect(()=>{
    const getCurrentUser = async()=>{
      try {
        dispatching(setLoading(true))

        const res = await fetch("http://localhost:5000/api/users/me" , {
          headers:{
            "Authorization" : `Bearer ${Cookies.get('token')}`
          }
        })
        const data = await res.json()
        const peer = new Peer(data?._id)
        setMe(peer)
      } catch (error:any) {
        message.error(error.message.data?.message || "Something went left")
        
      }finally{
        dispatching(setLoading(false))
      }
    } 
    getCurrentUser().then(res=>{
      console.log(path)
      console.log(me)
      console.log(currentUser)
      console.log(peers)
      ws.on('Messages' , (data:any)=>{
        console.log(data)
        setMessages((prevState:any) => [...prevState, {userName: data.userName , message : data.message}]); 
        console.log(messages)
      })
      ws.on("mediaSharing" , handleMediaShare)
      ws.on("screenSharing" , handleScreenShare)
      ws.on("room-created" , enterRoom)
      ws.on("get-users" , getUsers)
      ws.on("user-disconnected" , removePeer)
      return ()=>{
        ws.off("room-created")
        ws.off("get-users")
        ws.off("user-disconnected")
        ws.off("user-joined")
      }
    })
  },[])
  useEffect(()=>{
    if(!me) return
    if(!stream) return
    me.on("call" , async(call)=>{
      console.log('will answer')
      const getJoinedUser = async(id:string)=>{
        const res = await fetch(`http://localhost:5000/api/users/getUserById?userId=${id}` , {
          headers:{
            "Authorization" : `Bearer ${Cookies.get('token')}`
          }
        })
        const data = await res.json()
        setParticipants((prev:any)=>{
          console.log(prev)
          return[
          ...prev , data
        ]})
        return data
      }
      const user = await getJoinedUser(call.peer)
      call.answer(stream)
   
      call.on("stream" , (peerStream)=>{
         const peerId = call.peer;
      dispatch(addPeerAction(peerId, peerStream));
      
      setConnectionArray((prevConnections:any) => ([
        ...prevConnections,
        call,
      ]));
    });
  });
    ws.on("user-joined",async ({peerId})=>{
      console.log("bitch joined")
      const getJoinedUser = async(id:string)=>{
        const res = await fetch(`http://localhost:5000/api/users/getUserById?userId=${id}` , {
          headers:{
            "Authorization" : `Bearer ${Cookies.get('token')}`
          }
        })
        const data = await res.json()
        message.success(`${data?.name} joined the room`)  
        setParticipants((prev:any)=>{
          console.log(prev)
          return[
          ...prev , data
        ]})
        return data
      }
      const user = await getJoinedUser(peerId)
      console.log(user)
      const call = me.call(peerId , stream)

      call.on("stream" , (peerStream)=>{
        dispatch(addPeerAction(peerId , peerStream))
      })
 
      setConnectionArray((prevConnections:any) => ([
        ...prevConnections,
        call,
      ]));
    
      call.on("error", function (err) {
        console.error(err);
    });
    })


  },[me , stream])

  if(!path.startsWith("/test")){
    // ws.disconnect()
   
  }
  useEffect(()=>{
    console.log(me)
  },[me])
  useEffect(()=>{
    console.log(stream)
  },[stream])
  useEffect(()=>{
    console.log(peers)
  },[peers])
  useEffect(()=>{
    console.log(participants)
  },[participants])
  useEffect(()=>{
    if(!roomId) return
    if(!me)return
    try {

    
      Promise.all([

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }),
        // navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
      ])
      .then(([userMediaStream]) => {
        setStream(userMediaStream)
      })
    } catch (error) {
      console.log(error)
    }
  },[roomId])
  console.log(peers)
  console.log(Cookies.get('token'))
  console.log(roomId)
  return <RoomContext.Provider value={{ ws , me, stream , peers , shareScreen , setRoomId  , participants , roomId , screenSharringId , messages,mediaShareStatus, setMediaShareStatus , leaveRoom , setMessages,isRating, setIsRating}}>{children}</RoomContext.Provider>;
};
