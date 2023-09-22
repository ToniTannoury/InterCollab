'use client'
import socketIO from "socket.io-client";
import { createContext, ReactNode, useEffect, useState , useReducer, useMemo} from "react";
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
  const memoizedStream = useMemo(() => stream, [stream]);
  const [isRoomInfoModalOpen , setIsRoomInfoModalOpen] = useState<boolean>(false)
  const [chosenRoom , setChosenRoom] = useState<string>('')
 const router = useRouter()
  const dispatching =  useDispatch()
  const switchStream = (stream: MediaStream)=>{
    
    setStream(stream )
    setScreenSharringId(!screenSharringId)
    ws.emit('screensharing', {roomId:roomId , status:!screenSharringId})
    connectionArray?.map((conn:any)=>{
      const videoTrack = stream?.getTracks().find(track=>track.kind === 'video')
      const videoTracks = stream?.getTracks().find(track=>track.kind === 'video')
        conn.peerConnection?.getSenders()[1]?.replaceTrack(videoTrack).catch(
          (err:any)=>console.log(err))
    })
  }
  const removePeer = (peerId: string, stream: MediaStream) => {
    setParticipants((prevParticipants: any[]) =>{
      const removedParticipant = prevParticipants.find(
        (prevParticipant:any) => prevParticipant._id === peerId
      );  
      removedParticipant !== undefined && message.error(`${removedParticipant?.name} left`)
    
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
  const removeAllPeers = async()=>{
    
  }
  const leaveRoom = async()=>{
    console.log(roomId)
    console.log(currentUser)
    console.log(currentUser._id !== roomId.user._id)
    
    currentUser._id !== roomId.user._id && setIsRating(true)
    dispatch(removeOtherPeersAction())
    setParticipants([])
    setMessages([])
    Cookies.set('creator_id' , roomId.user._id)
    ws.emit('leave-room',{roomId:roomId._id , peerId:currentUser._id})
    router.push('/')
    
  }
  const handleScreenShare = async(status:any)=>{
    setScreenSharringId(status)
  }
  const handleMediaShare = async(mediaShareStatus:any)=>{
    setMediaShareStatus(mediaShareStatus.mediaShareStatus)
  }
  useEffect(()=>{
    const getCurrentUser = async()=>{
      try {
        dispatching(setLoading(true))
        const res = await fetch("http://16.171.116.7:5000/api/users/me" , {
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
      ws.on('Messages' , (data:any)=>{
        setMessages((prevState:any) => [...prevState, {userName: data.userName , message : data.message}]); 
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
    if(!roomId) return
    me.on("call" , async(call)=>{
      console.log('will answer')
      console.log(stream.id)
      const getJoinedUser = async(id:string)=>{
        const res = await fetch(`http://16.171.116.7:5000/api/users/getUserById?userId=${id}` , {
          headers:{
            "Authorization" : `Bearer ${Cookies.get('token')}`
          }
        })
        const data = await res.json()
        setParticipants((prev:any)=>{
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
        const res = await fetch(`http://16.171.116.7:5000/api/users/getUserById?userId=${id}` , {
          headers:{
            "Authorization" : `Bearer ${Cookies.get('token')}`
          }
        })
        const data = await res.json()
        console.log(roomId)
        console.log(peers)
        console.log(memoizedStream)
        setParticipants((prev:any)=>{
          return[
          ...prev , data
        ]})
        return data
      }

      const user = await getJoinedUser(peerId)
      console.log(stream)
      message.success(`${user.name} joined`)
      const call = me.call(peerId , stream)
      call?.on("stream" , (peerStream)=>{
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
    console.log(stream)
  },[stream?.active])
  if(!path.startsWith("/test")){
    // ws.disconnect()
   
  }


  useEffect(()=>{
    if(!roomId) return
    if(!me)return
    try {
    
      Promise.all([
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }),
        // navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
      ])
      .then(([userMediaStream]) => {
        console.log("set")
        setStream(userMediaStream)
      })
    } catch (error) {
      console.log(error)
    }
  },[roomId])
  return <RoomContext.Provider value={{ ws , me, stream , peers , shareScreen , setRoomId  , participants , roomId , screenSharringId , messages,mediaShareStatus, setMediaShareStatus , leaveRoom , setMessages,isRating, setIsRating , removeAllPeers , isRoomInfoModalOpen , setIsRoomInfoModalOpen,chosenRoom , setChosenRoom}}>{children}</RoomContext.Provider>;
};